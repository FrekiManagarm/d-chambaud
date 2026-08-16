"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";
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

const mediaId = (formData: FormData, key: string): number | null => {
  const value = text(formData, key);

  if (!value) {
    return null;
  }

  const id = Number(value);

  return Number.isFinite(id) ? id : null;
};

const lines = (formData: FormData, key: string) =>
  text(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

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
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=a-propos&saved=1");
};

const ensureActiveYear = (
  years: NonNullable<HomePage["pricing"]>["years"],
) => {
  const list = years ?? [];
  const hasActive = list.some((year) => year.isActive);

  return list.map((year, index) => ({
    ...year,
    isActive: hasActive ? year.isActive : index === 0,
  }));
};

export const addPricingYearAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const label = text(formData, "label");

  if (!label) {
    redirect("/backoffice/tarifs");
  }

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const existingYears = current.pricing?.years ?? [];
  const newYearIndex = existingYears.length;
  const years = ensureActiveYear([
    ...existingYears,
    { label, isActive: false, categories: [] },
  ]);

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      pricing: {
        ...current.pricing,
        years,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect(
    `/backoffice/page-accueil?tab=tarifs&seasonAdded=1&openYear=${newYearIndex}`,
  );
};

export const addPricingOfferAction = async (
  yearIndex: number,
  categoryIndex: number,
  formData: FormData,
) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const years = [...(current.pricing?.years ?? [])];
  const year = years[yearIndex];
  const category = year?.categories?.[categoryIndex];

  if (!year || !category) {
    redirect("/backoffice/tarifs");
  }

  const name = text(formData, "name");
  const price = text(formData, "price");
  const features = text(formData, "features")
    .split("\n")
    .map((feature) => feature.trim())
    .filter(Boolean)
    .map((feature) => ({ text: feature }));

  const categories = [...(year.categories ?? [])];
  categories[categoryIndex] = {
    ...category,
    offers: [
      ...(category.offers ?? []),
      {
        name: name || "Nouvelle offre",
        price: price || "Sur devis",
        unit: text(formData, "unit"),
        sub: text(formData, "sub"),
        tone: text(formData, "tone"),
        detail: text(formData, "detail"),
        features,
        highlight: checked(formData, "highlight"),
      },
    ],
  };
  years[yearIndex] = { ...year, categories };

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      pricing: {
        ...current.pricing,
        years,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect(
    `/backoffice/page-accueil?tab=tarifs&offerAdded=1&openYear=${yearIndex}`,
  );
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
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=tarifs&saved=1");
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

export const saveHeroAction = async (formData: FormData) => {
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
      hero: {
        locationLine: text(formData, "locationLine"),
        titleWords: text(formData, "titleWords"),
        titleAccent: text(formData, "titleAccent"),
        subtitle: text(formData, "subtitle"),
        tagline: text(formData, "tagline"),
        primaryCtaLabel: text(formData, "primaryCtaLabel"),
        secondaryCtaLabel: text(formData, "secondaryCtaLabel"),
      },
      marquee: {
        items: lines(formData, "marqueeItems").map((line) => ({
          text: line,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=hero&saved=1");
};

const serviceTextGroup = (
  formData: FormData,
  key: string,
): { title: string; sub: string; desc: string } => ({
  title: text(formData, `${key}.title`),
  sub: text(formData, `${key}.sub`),
  desc: text(formData, `${key}.desc`),
});

export const saveServicesAction = async (formData: FormData) => {
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
      servicesText: {
        eyebrow: text(formData, "eyebrow"),
        titleLineOne: text(formData, "titleLineOne"),
        titleLineTwo: text(formData, "titleLineTwo"),
        intro: text(formData, "intro"),
        traiteur: serviceTextGroup(formData, "traiteur"),
        mariages: serviceTextGroup(formData, "mariages"),
        chefADomicile: serviceTextGroup(formData, "chefADomicile"),
        receptions: serviceTextGroup(formData, "receptions"),
      },
      serviceImages: {
        traiteur: mediaId(formData, "image.traiteur"),
        mariages: mediaId(formData, "image.mariages"),
        chefADomicile: mediaId(formData, "image.chefADomicile"),
        receptions: mediaId(formData, "image.receptions"),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=prestations&saved=1");
};

export const savePavillonAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const points = [0, 1, 2].map((index) => ({
    label: text(formData, `point.${index}.label`),
    text: text(formData, `point.${index}.text`),
  }));

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      pavillonText: {
        eyebrow: text(formData, "eyebrow"),
        titleLineOne: text(formData, "titleLineOne"),
        titleLineTwo: text(formData, "titleLineTwo"),
        intro: text(formData, "intro"),
        badgeKicker: text(formData, "badgeKicker"),
        badgeQuote: text(formData, "badgeQuote"),
        points,
        linkUrl: text(formData, "linkUrl"),
        linkLabel: text(formData, "linkLabel"),
        linkNote: text(formData, "linkNote"),
        stripKicker: text(formData, "stripKicker"),
        stripTitle: text(formData, "stripTitle"),
      },
      pavillonImages: {
        main: mediaId(formData, "image.main"),
        portrait: mediaId(formData, "image.portrait"),
        table: mediaId(formData, "image.table"),
        stripOne: mediaId(formData, "image.stripOne"),
        stripTwo: mediaId(formData, "image.stripTwo"),
        stripThree: mediaId(formData, "image.stripThree"),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=pavillon&saved=1");
};

export const saveGalleryAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const rowCount = Number(text(formData, "photoCount")) || 0;
  const gallery = [];

  for (let index = 0; index < rowCount; index += 1) {
    const image = mediaId(formData, `photo.${index}.image`);

    if (!image) {
      continue;
    }

    gallery.push({
      image,
      title: text(formData, `photo.${index}.title`),
      note: text(formData, `photo.${index}.note`),
      alt: text(formData, `photo.${index}.alt`),
      position: text(formData, `photo.${index}.position`) || "center center",
    });
  }

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      galleryText: {
        eyebrow: text(formData, "eyebrow"),
        titleLineOne: text(formData, "titleLineOne"),
        titleLineTwo: text(formData, "titleLineTwo"),
        intro: text(formData, "intro"),
      },
      gallery,
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=galerie&saved=1");
};

export const saveValuesStatsAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const bands = [0, 1, 2].map((index) => ({
    title: text(formData, `band.${index}.title`),
    desc: text(formData, `band.${index}.desc`),
  }));

  const statItems = [0, 1, 2, 3].map((index) => ({
    value: Number(text(formData, `stat.${index}.value`)) || 0,
    suffix: text(formData, `stat.${index}.suffix`),
    label: text(formData, `stat.${index}.label`),
    detail: text(formData, `stat.${index}.detail`),
  }));

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      values: {
        eyebrow: text(formData, "valuesEyebrow"),
        titleLineOne: text(formData, "valuesTitleLineOne"),
        titleLineTwo: text(formData, "valuesTitleLineTwo"),
        intro: text(formData, "valuesIntro"),
        signatureKicker: text(formData, "signatureKicker"),
        signatureQuote: text(formData, "signatureQuote"),
        bands,
      },
      stats: {
        eyebrow: text(formData, "statsEyebrow"),
        titleLineOne: text(formData, "statsTitleLineOne"),
        titleLineTwo: text(formData, "statsTitleLineTwo"),
        intro: text(formData, "statsIntro"),
        items: statItems,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=valeurs&saved=1");
};

export const saveTestimonialsAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const rowCount = Number(text(formData, "itemCount")) || 0;
  const items: {
    quote: string;
    author: string;
    occasion: string;
    source: "site" | "tripadvisor";
  }[] = [];

  for (let index = 0; index < rowCount; index += 1) {
    const quote = text(formData, `item.${index}.quote`);
    const author = text(formData, `item.${index}.author`);

    if (!quote || !author) {
      continue;
    }

    const source = text(formData, `item.${index}.source`);

    items.push({
      quote,
      author,
      occasion: text(formData, `item.${index}.occasion`),
      source: source === "tripadvisor" ? "tripadvisor" : "site",
    });
  }

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      testimonials: {
        eyebrow: text(formData, "eyebrow"),
        titleLineOne: text(formData, "titleLineOne"),
        titleLineTwo: text(formData, "titleLineTwo"),
        intro: text(formData, "intro"),
        featuredNote: text(formData, "featuredNote"),
        footerNote: text(formData, "footerNote"),
        ctaLabel: text(formData, "ctaLabel"),
        items,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=temoignages&saved=1");
};

export const saveClientsAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const rowCount = Number(text(formData, "logoCount")) || 0;
  const logos = [];

  for (let index = 0; index < rowCount; index += 1) {
    const image = mediaId(formData, `logo.${index}.image`);

    if (!image) {
      continue;
    }

    logos.push({
      image,
      alt: text(formData, `logo.${index}.alt`),
    });
  }

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      clients: {
        eyebrow: text(formData, "eyebrow"),
        titleLineOne: text(formData, "titleLineOne"),
        titleLineTwo: text(formData, "titleLineTwo"),
        intro: text(formData, "intro"),
        logos,
      },
      serviceAreasText: {
        eyebrow: text(formData, "areasEyebrow"),
        title: text(formData, "areasTitle"),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=clients&saved=1");
};

export const saveContactCtaAction = async (formData: FormData) => {
  await requireBackofficeUser();

  const payload = await getPayloadClient();
  const current = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  const briefItems = [0, 1, 2, 3].map((index) => ({
    title: text(formData, `brief.${index}.title`),
    desc: text(formData, `brief.${index}.desc`),
  }));

  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: {
      ...current,
      contact: {
        eyebrow: text(formData, "contactEyebrow"),
        titleLineOne: text(formData, "contactTitleLineOne"),
        titleLineTwo: text(formData, "contactTitleLineTwo"),
        intro: text(formData, "contactIntro"),
        responseNote: text(formData, "responseNote"),
        briefItems,
      },
      finalCta: {
        eyebrow: text(formData, "finalCtaEyebrow"),
        titleLineOne: text(formData, "finalCtaTitleLineOne"),
        titleLineTwo: text(formData, "finalCtaTitleLineTwo"),
        ctaLabel: text(formData, "finalCtaLabel"),
      },
      footer: {
        tagline: text(formData, "footerTagline"),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/backoffice/page-accueil");
  redirect("/backoffice/page-accueil?tab=contact&saved=1");
};
