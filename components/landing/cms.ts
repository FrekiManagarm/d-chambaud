"use client";

import { useQuery } from "@tanstack/react-query";

import { resolveMediaURL } from "@/lib/media-url";

import { galleryItems } from "./GallerySection";
import { fallbackPricing } from "./FormulasSection";
import { services } from "./ServicesSection";
import type { Formula, PricingContent, PricingTab } from "./FormulasSection";
import type {
  AboutContent,
  CMSHomePage,
  HomeImages,
} from "./types";

const homePageCMSQueryKey = ["cms", "home-page"] as const;

async function fetchHomePageCMS({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<CMSHomePage | null> {
  const response = await fetch("/api/globals/home-page?depth=2", { signal });

  if (!response.ok) {
    throw new Error("Unable to fetch home page CMS content");
  }

  return response.json();
}

export const fallbackAbout: AboutContent = {
  ctaLabel: "Prendre contact",
  eyebrow: "À Propos",
  firstParagraph:
    "David Chambaud accompagne les mariages, réceptions privées et événements professionnels avec une cuisine lisible, généreuse et tenue jusqu'au dernier service.",
  quote:
    "Un événement réussi se reconnaît à ce que les invités ressentent: le plaisir, le rythme, l'évidence.",
  quoteAuthor: "David Chambaud",
  secondParagraph:
    "Son approche réunit le goût du produit, l'exigence du dressage et une organisation discrète: les invités voient la fluidité, jamais la mécanique.",
  titleLineOne: "Le chef que l'on choisit",
  titleLineTwo: "quand le repas compte vraiment.",
};

export function useHomePageCMS() {
  const { data } = useQuery({
    queryKey: homePageCMSQueryKey,
    queryFn: fetchHomePageCMS,
  });

  return data ?? null;
}

export function getHomeAbout(cms: CMSHomePage | null): AboutContent {
  const about = cms?.about;

  return {
    ctaLabel: about?.ctaLabel?.trim() || fallbackAbout.ctaLabel,
    eyebrow: about?.eyebrow?.trim() || fallbackAbout.eyebrow,
    firstParagraph:
      about?.firstParagraph?.trim() || fallbackAbout.firstParagraph,
    quote: about?.quote?.trim() || fallbackAbout.quote,
    quoteAuthor: about?.quoteAuthor?.trim() || fallbackAbout.quoteAuthor,
    secondParagraph:
      about?.secondParagraph?.trim() || fallbackAbout.secondParagraph,
    titleLineOne: about?.titleLineOne?.trim() || fallbackAbout.titleLineOne,
    titleLineTwo: about?.titleLineTwo?.trim() || fallbackAbout.titleLineTwo,
  };
}

export function getHomeImages(cms: CMSHomePage | null): HomeImages {
  const cmsGallery =
    cms?.gallery
      ?.map((item, index) => {
        const fallback = galleryItems[index] || galleryItems[0];
        const src = resolveMediaURL(item.image, fallback.src);

        return {
          alt: item.alt || fallback.alt,
          h: fallback.h,
          note: item.note || fallback.note,
          position: item.position || fallback.position,
          src,
          title: item.title || fallback.title,
          w: fallback.w,
        };
      })
      .filter((item) => item.src) || [];

  return {
    about: resolveMediaURL(cms?.aboutImage, "/20260212_DSC2953.jpg"),
    gallery: cmsGallery,
    hero: resolveMediaURL(cms?.heroImage, "/AdobeStock_420273742.jpeg"),
    pavillon: {
      main: resolveMediaURL(cms?.pavillonImages?.main, "/Pavillon-70.jpg"),
      portrait: resolveMediaURL(
        cms?.pavillonImages?.portrait,
        "/Pavillon-37.jpg",
      ),
      stripOne: resolveMediaURL(
        cms?.pavillonImages?.stripOne,
        "/Pavillon-71.jpg",
      ),
      stripThree: resolveMediaURL(
        cms?.pavillonImages?.stripThree,
        "/pavillon-facade.jpg",
      ),
      stripTwo: resolveMediaURL(
        cms?.pavillonImages?.stripTwo,
        "/Pavillon-73.jpg",
      ),
      table: resolveMediaURL(cms?.pavillonImages?.table, "/Pavillon-49.jpg"),
    },
    services: [
      resolveMediaURL(cms?.serviceImages?.traiteur, services[0].img),
      resolveMediaURL(cms?.serviceImages?.mariages, services[1].img),
      resolveMediaURL(cms?.serviceImages?.chefADomicile, services[2].img),
      resolveMediaURL(cms?.serviceImages?.receptions, services[3].img),
    ],
    valuesBridge: resolveMediaURL(
      cms?.valuesBridgeImage,
      "/AdobeStock_241622609.jpeg",
    ),
    valuesPrimary: resolveMediaURL(
      cms?.valuesPrimaryImage,
      "/20260212_DSC2967.jpg",
    ),
    valuesSecondary: resolveMediaURL(
      cms?.valuesSecondaryImage,
      "/20260212_DSC3156.jpg",
    ),
  };
}

const toPricingKey = (label: string, index: number) => {
  const key = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return key || `offre-${index + 1}`;
};

export function getHomePricing(cms: CMSHomePage | null): PricingContent {
  const cmsPricing = cms?.pricing;
  const activeYear =
    cmsPricing?.years?.find((year) => year.isActive) ??
    cmsPricing?.years?.[0] ??
    null;

  const cmsTabs =
    activeYear?.categories
      ?.map((category, categoryIndex) => {
        const label = category.label?.trim();
        if (!label) {
          return null;
        }

        const formulas =
          category.offers
            ?.map((offer, offerIndex) => {
              const name = offer.name?.trim();
              const price = offer.price?.trim();

              if (!name || !price) {
                return null;
              }

              return {
                detail: offer.detail?.trim() || "",
                features:
                  offer.features
                    ?.map((feature) => feature.text?.trim())
                    .filter((feature): feature is string => Boolean(feature)) ||
                  [],
                highlight: Boolean(offer.highlight),
                name,
                offset: !offer.highlight && offerIndex % 2 === 0,
                price,
                sub: offer.sub?.trim() || "",
                tone: offer.tone?.trim() || "",
                unit: offer.unit?.trim() || "",
              };
            })
            .filter((offer): offer is Formula => Boolean(offer)) || [];

        if (formulas.length === 0) {
          return null;
        }

        return {
          formulas,
          key: toPricingKey(label, categoryIndex),
          label,
          summaryLabel: category.summaryLabel?.trim() || "Sur mesure",
        };
      })
      .filter((tab): tab is PricingTab => Boolean(tab)) || [];

  if (cmsTabs.length === 0) {
    return fallbackPricing;
  }

  const yearLabel = activeYear?.label?.trim() || fallbackPricing.yearLabel;

  return {
    ctaLabel: cmsPricing?.ctaLabel?.trim() || fallbackPricing.ctaLabel,
    eyebrow:
      cmsPricing?.eyebrow?.trim() ||
      fallbackPricing.eyebrow ||
      `Tarifs ${yearLabel}`,
    footerNote: cmsPricing?.footerNote?.trim() || fallbackPricing.footerNote,
    intro: cmsPricing?.intro?.trim() || fallbackPricing.intro,
    tabs: cmsTabs,
    titleLineOne:
      cmsPricing?.titleLineOne?.trim() || fallbackPricing.titleLineOne,
    titleLineTwo:
      cmsPricing?.titleLineTwo?.trim() || fallbackPricing.titleLineTwo,
    yearLabel,
  };
}
