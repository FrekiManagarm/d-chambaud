"use client";

import { useEffect, useState } from "react";

import { galleryItems } from "./GallerySection";
import { fallbackPricing } from "./FormulasSection";
import { services } from "./ServicesSection";
import type { Formula, PricingContent, PricingTab } from "./FormulasSection";
import type { CMSHomePage, CMSRelationship, HomeImages } from "./types";

const mediaURL = (media: CMSRelationship, fallback: string) => {
  if (media && typeof media === "object" && typeof media.url === "string") {
    return media.url;
  }

  return fallback;
};

export function useHomePageCMS() {
  const [cms, setCms] = useState<CMSHomePage | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/globals/home-page?depth=2")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: CMSHomePage | null) => {
        if (active && data) {
          setCms(data);
        }
      })
      .catch(() => {
        if (active) {
          setCms(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return cms;
}

export function getHomeImages(cms: CMSHomePage | null): HomeImages {
  const cmsGallery =
    cms?.gallery
      ?.map((item, index) => {
        const fallback = galleryItems[index] || galleryItems[0];
        const src = mediaURL(item.image, fallback.src);

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
    about: mediaURL(cms?.aboutImage, "/20260212_DSC2953.jpg"),
    gallery: cmsGallery,
    hero: mediaURL(cms?.heroImage, "/AdobeStock_420273742.jpeg"),
    pavillon: {
      main: mediaURL(cms?.pavillonImages?.main, "/Pavillon-70.jpg"),
      portrait: mediaURL(cms?.pavillonImages?.portrait, "/Pavillon-37.jpg"),
      stripOne: mediaURL(cms?.pavillonImages?.stripOne, "/Pavillon-71.jpg"),
      stripThree: mediaURL(
        cms?.pavillonImages?.stripThree,
        "/pavillon-facade.jpg",
      ),
      stripTwo: mediaURL(cms?.pavillonImages?.stripTwo, "/Pavillon-73.jpg"),
      table: mediaURL(cms?.pavillonImages?.table, "/Pavillon-49.jpg"),
    },
    services: [
      mediaURL(cms?.serviceImages?.traiteur, services[0].img),
      mediaURL(cms?.serviceImages?.mariages, services[1].img),
      mediaURL(cms?.serviceImages?.chefADomicile, services[2].img),
      mediaURL(cms?.serviceImages?.receptions, services[3].img),
    ],
    valuesBridge: mediaURL(
      cms?.valuesBridgeImage,
      "/AdobeStock_241622609.jpeg",
    ),
    valuesPrimary: mediaURL(cms?.valuesPrimaryImage, "/20260212_DSC2967.jpg"),
    valuesSecondary: mediaURL(
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
      cmsPricing?.eyebrow?.trim() || fallbackPricing.eyebrow || `Tarifs ${yearLabel}`,
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
