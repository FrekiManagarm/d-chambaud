"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";
import {
  addOffer,
  addPricingCategory,
  addPricingYear,
  deleteOffer,
  deletePricingCategory,
  deletePricingYear,
  emptyPricing,
  setActivePricingYear,
  type Pricing,
  updateOffer,
  updatePricingCategory,
  updatePricingYear,
} from "@/lib/backoffice/pricing";
import { plainTextToLexical } from "@/lib/backoffice/rich-text";
import {
  serviceBrochureCategoryOptions,
  type ServiceBrochureCategory,
} from "@/lib/service-brochures";
import type { HomePage, Post } from "@/payload-types";

type PostWriteData = Partial<Post> & {
  content: Post["content"];
  excerpt: string;
  title: string;
  _status: "draft" | "published";
};

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

const toIsoDate = (value: string) => {
  if (!value) {
    return new Date().toISOString();
  }

  return new Date(value).toISOString();
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
) => {
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

export const createPricingYearAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      addPricingYear(
        pricing,
        requiredText(formData, "label", "La saison est obligatoire."),
      ),
    "/backoffice/tarifs",
  );

export const updatePricingYearAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      updatePricingYear(pricing, text(formData, "yearId"), {
        label: requiredText(formData, "label", "La saison est obligatoire."),
      }),
    "/backoffice/tarifs",
  );

export const deletePricingYearAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) => deletePricingYear(pricing, text(formData, "yearId")),
    "/backoffice/tarifs",
  );

export const setActivePricingYearAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) => setActivePricingYear(pricing, text(formData, "yearId")),
    "/backoffice/tarifs",
  );

export const createPricingCategoryAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      addPricingCategory(
        pricing,
        text(formData, "yearId"),
        requiredText(formData, "label", "La catégorie est obligatoire."),
      ),
    "/backoffice/tarifs",
  );

export const updatePricingCategoryAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      updatePricingCategory(
        pricing,
        text(formData, "yearId"),
        text(formData, "categoryId"),
        {
          label: requiredText(formData, "label", "La catégorie est obligatoire."),
          summaryLabel: text(formData, "summaryLabel"),
        },
      ),
    "/backoffice/tarifs",
  );

export const deletePricingCategoryAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      deletePricingCategory(
        pricing,
        text(formData, "yearId"),
        text(formData, "categoryId"),
      ),
    "/backoffice/tarifs",
  );

export const createPricingOfferAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      addOffer(
        pricing,
        text(formData, "yearId"),
        text(formData, "categoryId"),
        {
          name: requiredText(formData, "name", "Le nom de l’offre est obligatoire."),
          price: requiredText(formData, "price", "Le prix est obligatoire."),
        },
      ),
    "/backoffice/tarifs",
  );

export const updatePricingOfferAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      updateOffer(
        pricing,
        text(formData, "yearId"),
        text(formData, "categoryId"),
        text(formData, "offerId"),
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
  );

export const deletePricingOfferAction = async (formData: FormData) =>
  updatePricingGlobal(
    (pricing) =>
      deleteOffer(
        pricing,
        text(formData, "yearId"),
        text(formData, "categoryId"),
        text(formData, "offerId"),
      ),
    "/backoffice/tarifs",
  );

const postDataFromForm = (formData: FormData): PostWriteData => {
  const title = text(formData, "title");
  const slug = text(formData, "slug");
  const status: "published" | "draft" =
    text(formData, "status") === "published" ? "published" : "draft";
  const categoryLabels = text(formData, "categories")
    .split(",")
    .map((category) => category.trim())
    .filter(Boolean)
    .map((label) => ({ label }));

  return {
    title,
    slug,
    publishedAt: toIsoDate(text(formData, "publishedAt")),
    author: text(formData, "author") || "David Chambaud",
    categories: categoryLabels,
    excerpt: text(formData, "excerpt"),
    content: plainTextToLexical(text(formData, "content")),
    seo: {
      title: text(formData, "seoTitle"),
      description: text(formData, "seoDescription"),
    },
    _status: status,
  };
};

export const createPostAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();

  await payload.create({
    collection: "posts",
    draft: true,
    locale: "fr",
    overrideAccess: true,
    data: postDataFromForm(formData),
  });

  revalidatePath("/blog");
  revalidatePath("/backoffice/articles");
  redirect("/backoffice/articles?saved=1");
};

export const updatePostAction = async (id: number, formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();

  await payload.update({
    collection: "posts",
    draft: true,
    id,
    locale: "fr",
    overrideAccess: true,
    data: postDataFromForm(formData),
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${text(formData, "slug")}`);
  revalidatePath("/backoffice/articles");
  redirect("/backoffice/articles?saved=1");
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
