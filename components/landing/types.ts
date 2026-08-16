export type CMSMedia = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

export type CMSRelationship = CMSMedia | number | string | null | undefined;

export type CMSHomePage = {
  about?: CMSAbout;
  aboutImage?: CMSRelationship;
  clients?: CMSClients;
  contact?: CMSContact;
  finalCta?: CMSFinalCta;
  footer?: CMSFooter;
  gallery?: {
    alt?: string | null;
    image?: CMSRelationship;
    note?: string | null;
    position?: string | null;
    title?: string | null;
  }[];
  galleryText?: CMSSectionHeading;
  hero?: CMSHero;
  heroImage?: CMSRelationship;
  marquee?: {
    items?: { text?: string | null }[] | null;
  };
  pavillonImages?: {
    main?: CMSRelationship;
    portrait?: CMSRelationship;
    stripOne?: CMSRelationship;
    stripThree?: CMSRelationship;
    stripTwo?: CMSRelationship;
    table?: CMSRelationship;
  };
  pavillonText?: CMSPavillonText;
  serviceAreasText?: {
    eyebrow?: string | null;
    title?: string | null;
  };
  serviceImages?: {
    chefADomicile?: CMSRelationship;
    mariages?: CMSRelationship;
    receptions?: CMSRelationship;
    traiteur?: CMSRelationship;
  };
  servicesText?: CMSServicesText;
  pricing?: CMSPricing;
  stats?: CMSStats;
  testimonials?: CMSTestimonials;
  values?: CMSValues;
  valuesBridgeImage?: CMSRelationship;
  valuesPrimaryImage?: CMSRelationship;
  valuesSecondaryImage?: CMSRelationship;
};

export type CMSSectionHeading = {
  eyebrow?: string | null;
  intro?: string | null;
  titleLineOne?: string | null;
  titleLineTwo?: string | null;
};

export type CMSHero = {
  locationLine?: string | null;
  primaryCtaLabel?: string | null;
  secondaryCtaLabel?: string | null;
  subtitle?: string | null;
  tagline?: string | null;
  titleAccent?: string | null;
  titleWords?: string | null;
};

export type CMSServiceText = {
  desc?: string | null;
  sub?: string | null;
  title?: string | null;
};

export type CMSServicesText = CMSSectionHeading & {
  chefADomicile?: CMSServiceText;
  mariages?: CMSServiceText;
  receptions?: CMSServiceText;
  traiteur?: CMSServiceText;
};

export type CMSPavillonText = {
  badgeKicker?: string | null;
  badgeQuote?: string | null;
  eyebrow?: string | null;
  intro?: string | null;
  linkLabel?: string | null;
  linkNote?: string | null;
  linkUrl?: string | null;
  points?: { label?: string | null; text?: string | null }[] | null;
  stripKicker?: string | null;
  stripTitle?: string | null;
  titleLineOne?: string | null;
  titleLineTwo?: string | null;
};

export type CMSValues = CMSSectionHeading & {
  bands?: { desc?: string | null; title?: string | null }[] | null;
  signatureKicker?: string | null;
  signatureQuote?: string | null;
};

export type CMSStats = CMSSectionHeading & {
  items?:
    | {
        detail?: string | null;
        label?: string | null;
        suffix?: string | null;
        value?: number | null;
      }[]
    | null;
};

export type CMSTestimonials = CMSSectionHeading & {
  ctaLabel?: string | null;
  featuredNote?: string | null;
  footerNote?: string | null;
  items?:
    | {
        author?: string | null;
        occasion?: string | null;
        quote?: string | null;
        source?: "site" | "tripadvisor" | null;
      }[]
    | null;
};

export type CMSClients = CMSSectionHeading & {
  logos?: { alt?: string | null; image?: CMSRelationship }[] | null;
};

export type CMSContact = CMSSectionHeading & {
  briefItems?: { desc?: string | null; title?: string | null }[] | null;
  responseNote?: string | null;
};

export type CMSFinalCta = {
  ctaLabel?: string | null;
  eyebrow?: string | null;
  titleLineOne?: string | null;
  titleLineTwo?: string | null;
};

export type CMSFooter = {
  tagline?: string | null;
};

export type SectionHeading = {
  eyebrow: string;
  intro: string;
  titleLineOne: string;
  titleLineTwo: string;
};

export type HeroContent = {
  locationLine: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  subtitle: string;
  tagline: string;
  titleAccent: string;
  titleWords: string;
};

export type ServiceTextContent = {
  desc: string;
  sub: string;
  title: string;
};

export type ServicesTextContent = SectionHeading & {
  chefADomicile: ServiceTextContent;
  mariages: ServiceTextContent;
  receptions: ServiceTextContent;
  traiteur: ServiceTextContent;
};

export type PavillonTextContent = {
  badgeKicker: string;
  badgeQuote: string;
  eyebrow: string;
  intro: string;
  linkLabel: string;
  linkNote: string;
  linkUrl: string;
  points: { label: string; text: string }[];
  stripKicker: string;
  stripTitle: string;
  titleLineOne: string;
  titleLineTwo: string;
};

export type ValuesContent = SectionHeading & {
  bands: { desc: string; title: string }[];
  signatureKicker: string;
  signatureQuote: string;
};

export type StatsContent = SectionHeading & {
  items: { detail: string; label: string; suffix: string; value: number }[];
};

export type TestimonialItem = {
  author: string;
  occasion: string;
  quote: string;
  source: "site" | "tripadvisor";
};

export type TestimonialsContent = SectionHeading & {
  ctaLabel: string;
  featuredNote: string;
  footerNote: string;
  items: TestimonialItem[];
};

export type ClientLogo = {
  alt: string;
  src: string;
};

export type ClientsContent = SectionHeading & {
  logos: ClientLogo[];
};

export type ServiceAreasTextContent = {
  eyebrow: string;
  title: string;
};

export type ContactContent = SectionHeading & {
  briefItems: { desc: string; title: string }[];
  responseNote: string;
};

export type FinalCtaContent = {
  ctaLabel: string;
  eyebrow: string;
  titleLineOne: string;
  titleLineTwo: string;
};

export type FooterContent = {
  tagline: string;
};

export type CMSAbout = {
  ctaLabel?: string | null;
  eyebrow?: string | null;
  firstParagraph?: string | null;
  quote?: string | null;
  quoteAuthor?: string | null;
  secondParagraph?: string | null;
  titleLineOne?: string | null;
  titleLineTwo?: string | null;
};

export type AboutContent = {
  ctaLabel: string;
  eyebrow: string;
  firstParagraph: string;
  quote: string;
  quoteAuthor: string;
  secondParagraph: string;
  titleLineOne: string;
  titleLineTwo: string;
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
