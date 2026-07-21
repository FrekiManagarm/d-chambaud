"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import {
  formatPricingError,
  isMissingPricingItemError,
} from "@/lib/backoffice/pricing-errors";
import { getPayloadClient } from "@/lib/backoffice/payload";
import {
  addOffer,
  addPricingCategory,
  addPricingYear,
  deleteOffer,
  deletePricingCategory,
  deletePricingYear,
  emptyPricing,
  moveOffer,
  setActivePricingYear,
  type Pricing,
  updatePricingCategory,
  updatePricingYear,
} from "@/lib/backoffice/pricing";
import {
  buildPostData,
  isDuplicateSlugError,
  nextAvailableSlug,
  type PostFields,
} from "@/lib/backoffice/post-data";
import {
  serviceBrochureCategoryOptions,
  type ServiceBrochureCategory,
} from "@/lib/service-brochures";
import type { HomePage } from "@/payload-types";

const text = (formData: FormData, key: string) => {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
};

const checked = (formData: FormData, key: string) => formData.get(key) === "on";

const serviceBrochureCategoryValues = new Set(
  serviceBrochureCategoryOptions.map((option) => option.value),
);

const serviceBrochureCategory = (
  formData: FormData,
  key: string,
): ServiceBrochureCategory => {
  const value = text(formData, key);

  return serviceBrochureCategoryValues.has(value as ServiceBrochureCategory)
    ? (value as ServiceBrochureCategory)
    : "traiteur";
};

const parseAbout = (formData: FormData): NonNullable<HomePage["about"]> => ({
  ctaLabel: text(formData, "ctaLabel"),
  eyebrow: text(formData, "eyebrow"),
  firstParagraph: text(formData, "firstParagraph"),
  quote: text(formData, "quote"),
  quoteAuthor: text(formData, "quoteAuthor"),
  secondParagraph: text(formData, "secondParagraph"),
  titleLineOne: text(formData, "titleLineOne"),
  titleLineTwo: text(formData, "titleLineTwo"),
});

export const saveAboutAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      about: parseAbout(formData),
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/a-propos");
  redirect("/backoffice/a-propos?saved=1");
};

const updatePricingGlobal = async (
  mutate: (pricing: Pricing) => Pricing,
  redirectTo: string,
  errorRedirectTo = redirectTo,
) => {
  let errorMessage: string | undefined;
  let missingPricingItem = false;

  try {
    await requireBackofficeUser();

    const payload = await getPayloadClient();
    const current = await payload.findGlobal({
      slug: "home-page",
      locale: "fr",
      depth: 0,
      overrideAccess: true,
    });

    await payload.updateGlobal({
      slug: "home-page",
      locale: "fr",
      overrideAccess: true,
      data: {
        ...current,
        pricing: mutate(current.pricing ?? emptyPricing()),
      },
    });
  } catch (error) {
    errorMessage = formatPricingError(error);
    missingPricingItem = isMissingPricingItemError(error);
  }

  if (errorMessage) {
    const errorRedirect = missingPricingItem
      ? "/backoffice/tarifs"
      : errorRedirectTo;

    redirect(`${errorRedirect}?error=${encodeURIComponent(errorMessage)}`);
  }

  revalidatePath("/");
  revalidatePath("/backoffice/tarifs");
  redirect(`${redirectTo}?saved=1`);
};

const requiredText = (formData: FormData, key: string, message: string) => {
  const value = text(formData, key);

  if (!value) {
    throw new Error(message);
  }

  return value;
};

const pricingFeatures = (formData: FormData) =>
  text(formData, "features")
    .split("\n")
    .map((feature) => feature.trim())
    .filter(Boolean)
    .map((feature) => ({ text: feature }));

const pricingErrorRedirectTo = (formData: FormData, fallback: string) => {
  const redirectTo = text(formData, "redirectTo");

  return redirectTo === "/backoffice/tarifs" ||
    redirectTo.startsWith("/backoffice/tarifs/")
    ? redirectTo
    : fallback;
};

export const createPricingYearAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      addPricingYear(
        pricing,
        requiredText(formData, "label", "La saison est obligatoire."),
      ),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(formData, "/backoffice/tarifs/new"),
  );

export const updatePricingYearAction = async (
  yearId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) =>
      updatePricingYear(pricing, yearId, {
        label: requiredText(formData, "label", "La saison est obligatoire."),
      }),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(formData, `/backoffice/tarifs/${yearId}`),
  );

export const deletePricingYearAction = async (
  yearId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) => deletePricingYear(pricing, yearId),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(formData, "/backoffice/tarifs"),
  );

export const setActivePricingYearAction = async (
  yearId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) => setActivePricingYear(pricing, yearId),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(formData, "/backoffice/tarifs"),
  );

export const createPricingCategoryAction = async (
  yearId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) =>
      addPricingCategory(
        pricing,
        yearId,
        requiredText(formData, "label", "La catégorie est obligatoire."),
      ),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(
      formData,
      `/backoffice/tarifs/${yearId}/categories/new`,
    ),
  );

export const updatePricingCategoryAction = async (
  yearId: string,
  categoryId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) =>
      updatePricingCategory(
        pricing,
        yearId,
        categoryId,
        {
          label: requiredText(formData, "label", "La catégorie est obligatoire."),
          summaryLabel: text(formData, "summaryLabel"),
        },
      ),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(
      formData,
      `/backoffice/tarifs/${yearId}/categories/${categoryId}`,
    ),
  );

export const deletePricingCategoryAction = async (
  yearId: string,
  categoryId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) =>
      deletePricingCategory(pricing, yearId, categoryId),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(
      formData,
      `/backoffice/tarifs/${yearId}/categories/${categoryId}`,
    ),
  );

export const createPricingOfferAction = async (
  yearId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) =>
      addOffer(
        pricing,
        yearId,
        requiredText(formData, "categoryId", "La catégorie est obligatoire."),
        {
          name: requiredText(formData, "name", "Le nom de l’offre est obligatoire."),
          price: requiredText(formData, "price", "Le prix est obligatoire."),
          unit: text(formData, "unit"),
          detail: text(formData, "detail"),
          features: pricingFeatures(formData),
          highlight: checked(formData, "highlight"),
        },
      ),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(formData, `/backoffice/tarifs/${yearId}/offers/new`),
  );

export const updatePricingOfferAction = async (
  yearId: string,
  categoryId: string,
  offerId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) =>
      moveOffer(
        pricing,
        yearId,
        categoryId,
        requiredText(formData, "categoryId", "La catégorie est obligatoire."),
        offerId,
        {
          name: requiredText(formData, "name", "Le nom de l’offre est obligatoire."),
          price: requiredText(formData, "price", "Le prix est obligatoire."),
          unit: text(formData, "unit"),
          detail: text(formData, "detail"),
          features: pricingFeatures(formData),
          highlight: checked(formData, "highlight"),
        },
      ),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(
      formData,
      `/backoffice/tarifs/${yearId}/offers/${offerId}`,
    ),
  );

export const deletePricingOfferAction = async (
  yearId: string,
  categoryId: string,
  offerId: string,
  formData: FormData,
) =>
  updatePricingGlobal(
    (pricing) => deleteOffer(pricing, yearId, categoryId, offerId),
    "/backoffice/tarifs",
    pricingErrorRedirectTo(
      formData,
      `/backoffice/tarifs/${yearId}/offers/${offerId}`,
    ),
  );

export const savePricingSectionAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) => ({
      ...pricing,
      eyebrow: text(formData, "eyebrow"),
      titleLineOne: text(formData, "titleLineOne"),
      titleLineTwo: text(formData, "titleLineTwo"),
      intro: text(formData, "intro"),
      footerNote: text(formData, "footerNote"),
      ctaLabel: text(formData, "ctaLabel"),
    }),
    "/backoffice/tarifs/settings",
    pricingErrorRedirectTo(formData, "/backoffice/tarifs/settings"),
  );

const postFieldsFromForm = (formData: FormData): PostFields => ({
  title: text(formData, "title"),
  publishedAt: text(formData, "publishedAt"),
  status: text(formData, "status"),
  excerpt: text(formData, "excerpt"),
  content: text(formData, "content"),
});

export const createPostAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const postData = buildPostData(postFieldsFromForm(formData));
  const baseSlug = postData.slug;
  const takenSlugs: string[] = [];
  let created = false;

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const slug = nextAvailableSlug(baseSlug, takenSlugs);
    const existing = await payload.find({
      collection: "posts",
      draft: true,
      locale: "fr",
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (existing.docs.length === 0) {
      postData.slug = slug;

      try {
        await payload.create({
          collection: "posts",
          draft: true,
          locale: "fr",
          overrideAccess: true,
          data: postData,
        });
        created = true;
      } catch (error) {
        if (!isDuplicateSlugError(error)) {
          throw error;
        }
      }

      if (created) {
        break;
      }
    }

    takenSlugs.push(slug);
  }

  if (!created) {
    throw new Error("Impossible de générer un slug unique pour cet article.");
  }

  revalidatePath("/blog");
  revalidatePath("/backoffice/articles");
  redirect("/backoffice/articles?saved=1");
};

export const updatePostAction = async (id: number, formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findByID({
    collection: "posts",
    id,
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  await payload.update({
    collection: "posts",
    draft: true,
    id,
    locale: "fr",
    overrideAccess: true,
    data: buildPostData(postFieldsFromForm(formData), current),
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath("/backoffice/articles");
  redirect("/backoffice/articles?saved=1");
};

export const deletePostAction = async (id: number) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();

  await payload.delete({
    collection: "posts",
    id,
    overrideAccess: true,
  });

  revalidatePath("/blog");
  revalidatePath("/backoffice/articles");
  redirect("/backoffice/articles?deleted=1");
};

export const updateMediaAltAction = async (id: number, formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();

  await payload.update({
    collection: "media",
    id,
    locale: "fr",
    overrideAccess: true,
    data: {
      alt: text(formData, "alt"),
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/images");
  redirect("/backoffice/images?saved=1");
};

export const deleteMediaAction = async (id: number) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();

  await payload.delete({
    collection: "media",
    id,
    overrideAccess: true,
  });

  revalidatePath("/");
  revalidatePath("/backoffice/images");
  redirect("/backoffice/images?deleted=1");
};

export const updateServiceBrochureAction = async (
  id: number,
  formData: FormData,
) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();

  await payload.update({
    collection: "service-brochures",
    id,
    overrideAccess: true,
    data: {
      category: serviceBrochureCategory(formData, "category"),
      title: text(formData, "title"),
      description: text(formData, "description"),
    },
  });

  revalidatePath("/backoffice/plaquettes");
  redirect("/backoffice/plaquettes?saved=1");
};

export const deleteServiceBrochureAction = async (id: number) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();

  await payload.delete({
    collection: "service-brochures",
    id,
    overrideAccess: true,
  });

  revalidatePath("/backoffice/plaquettes");
  redirect("/backoffice/plaquettes?deleted=1");
};
