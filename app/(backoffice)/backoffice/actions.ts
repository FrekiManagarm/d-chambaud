"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";
import { plainTextToLexical } from "@/lib/backoffice/rich-text";
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

const parsePricing = (formData: FormData): NonNullable<HomePage["pricing"]> => {
  const years = [];
  const yearCount = Number(text(formData, "yearCount")) || 0;

  for (let yearIndex = 0; yearIndex < yearCount; yearIndex += 1) {
    const label = text(formData, `year.${yearIndex}.label`);

    if (!label) {
      continue;
    }

    const categories = [];
    const categoryCount =
      Number(text(formData, `year.${yearIndex}.categoryCount`)) || 0;

    for (
      let categoryIndex = 0;
      categoryIndex < categoryCount;
      categoryIndex += 1
    ) {
      const categoryLabel = text(
        formData,
        `year.${yearIndex}.category.${categoryIndex}.label`,
      );
      const summaryLabel = text(
        formData,
        `year.${yearIndex}.category.${categoryIndex}.summaryLabel`,
      );

      if (!categoryLabel && !summaryLabel) {
        continue;
      }

      const offers = [];
      const offerCount =
        Number(
          text(
            formData,
            `year.${yearIndex}.category.${categoryIndex}.offerCount`,
          ),
        ) || 0;

      for (let offerIndex = 0; offerIndex < offerCount; offerIndex += 1) {
        const name = text(
          formData,
          `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.name`,
        );
        const price = text(
          formData,
          `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.price`,
        );

        if (!name && !price) {
          continue;
        }

        const features = text(
          formData,
          `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.features`,
        )
          .split("\n")
          .map((feature) => feature.trim())
          .filter(Boolean)
          .map((feature) => ({ text: feature }));

        offers.push({
          name: name || "Nouvelle offre",
          price: price || "Sur devis",
          unit: text(
            formData,
            `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.unit`,
          ),
          sub: text(
            formData,
            `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.sub`,
          ),
          tone: text(
            formData,
            `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.tone`,
          ),
          detail: text(
            formData,
            `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.detail`,
          ),
          features,
          highlight: checked(
            formData,
            `year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.highlight`,
          ),
        });
      }

      categories.push({
        label: categoryLabel || "Nouvelle categorie",
        summaryLabel,
        offers,
      });
    }

    years.push({
      label,
      isActive: checked(formData, `year.${yearIndex}.isActive`),
      categories,
    });
  }

  const hasActiveYear = years.some((year) => year.isActive);

  return {
    eyebrow: text(formData, "eyebrow"),
    titleLineOne: text(formData, "titleLineOne"),
    titleLineTwo: text(formData, "titleLineTwo"),
    intro: text(formData, "intro"),
    footerNote: text(formData, "footerNote"),
    ctaLabel: text(formData, "ctaLabel"),
    years: years.map((year, index) => ({
      ...year,
      isActive: hasActiveYear ? year.isActive : index === 0,
    })),
  };
};

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

export const savePricingAction = async (formData: FormData) => {
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
      pricing: parsePricing(formData),
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/tarifs");
  redirect("/backoffice/tarifs?saved=1");
};

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
      category: text(formData, "category"),
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
