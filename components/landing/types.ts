export type CMSMedia = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

export type CMSRelationship = CMSMedia | number | string | null | undefined;

export type CMSHomePage = {
  aboutImage?: CMSRelationship;
  gallery?: {
    alt?: string | null;
    image?: CMSRelationship;
    note?: string | null;
    position?: string | null;
    title?: string | null;
  }[];
  heroImage?: CMSRelationship;
  pavillonImages?: {
    main?: CMSRelationship;
    portrait?: CMSRelationship;
    stripOne?: CMSRelationship;
    stripThree?: CMSRelationship;
    stripTwo?: CMSRelationship;
    table?: CMSRelationship;
  };
  serviceImages?: {
    chefADomicile?: CMSRelationship;
    mariages?: CMSRelationship;
    receptions?: CMSRelationship;
    traiteur?: CMSRelationship;
  };
  pricing?: CMSPricing;
  valuesBridgeImage?: CMSRelationship;
  valuesPrimaryImage?: CMSRelationship;
  valuesSecondaryImage?: CMSRelationship;
};

export type CMSPricing = {
  ctaLabel?: string | null;
  eyebrow?: string | null;
  footerNote?: string | null;
  intro?: string | null;
  titleLineOne?: string | null;
  titleLineTwo?: string | null;
  years?: CMSPricingYear[] | null;
};

export type CMSPricingYear = {
  categories?: CMSPricingCategory[] | null;
  isActive?: boolean | null;
  label?: string | null;
};

export type CMSPricingCategory = {
  label?: string | null;
  offers?: CMSPricingOffer[] | null;
  summaryLabel?: string | null;
};

export type CMSPricingOffer = {
  detail?: string | null;
  features?: { text?: string | null }[] | null;
  highlight?: boolean | null;
  name?: string | null;
  price?: string | null;
  sub?: string | null;
  tone?: string | null;
  unit?: string | null;
};

export type GalleryItem = {
  alt: string;
  h: number;
  note: string;
  position: string;
  src: string;
  title: string;
  w: number;
};

export type HomeImages = {
  about: string;
  gallery: GalleryItem[];
  hero: string;
  pavillon: {
    main: string;
    portrait: string;
    stripOne: string;
    stripThree: string;
    stripTwo: string;
    table: string;
  };
  services: string[];
  valuesBridge: string;
  valuesPrimary: string;
  valuesSecondary: string;
};
