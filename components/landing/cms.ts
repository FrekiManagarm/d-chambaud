"use client";

import { useQuery } from "@tanstack/react-query";

import { resolveMediaURL } from "@/lib/media-url";
import type { ServiceBrochureSummary } from "@/lib/service-brochures";

import { galleryItems } from "./GallerySection";
import { fallbackPricing } from "./FormulasSection";
import type { Formula, PricingContent, PricingTab } from "./FormulasSection";
import type {
  AboutContent,
  ClientLogo,
  ClientsContent,
  CMSHomePage,
  ContactContent,
  FinalCtaContent,
  FooterContent,
  HeroContent,
  HomeImages,
  PavillonTextContent,
  SectionHeading,
  ServiceAreasTextContent,
  ServicesTextContent,
  StatsContent,
  TestimonialItem,
  TestimonialsContent,
  ValuesContent,
} from "./types";

const homePageCMSQueryKey = ["cms", "home-page"] as const;
const serviceBrochuresQueryKey = ["cms", "service-brochures"] as const;

type ServiceBrochuresResponse = {
  docs?: ServiceBrochureSummary[];
};

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

async function fetchServiceBrochures({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<ServiceBrochureSummary[]> {
  const response = await fetch(
    "/api/service-brochures?depth=0&limit=100&sort=-updatedAt",
    { signal },
  );

  if (!response.ok) {
    throw new Error("Unable to fetch service brochures");
  }

  const data = (await response.json()) as ServiceBrochuresResponse;

  return data.docs ?? [];
}

export function useServiceBrochures() {
  const { data } = useQuery({
    queryKey: serviceBrochuresQueryKey,
    queryFn: fetchServiceBrochures,
  });

  return data ?? [];
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
      resolveMediaURL(
        cms?.serviceImages?.traiteur,
        "/AdobeStock_418339639.jpeg",
      ),
      resolveMediaURL(
        cms?.serviceImages?.mariages,
        "/AdobeStock_522340892.jpeg",
      ),
      resolveMediaURL(
        cms?.serviceImages?.chefADomicile,
        "/AdobeStock_54050217.jpeg",
      ),
      resolveMediaURL(
        cms?.serviceImages?.receptions,
        "/AdobeStock_555480279.jpeg",
      ),
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

const text = (value: string | null | undefined, fallback: string) =>
  value?.trim() || fallback;

export const fallbackHero: HeroContent = {
  locationLine: "Nouvelle‑Aquitaine · Bordeaux · Saint‑Émilion",
  primaryCtaLabel: "Demander un Devis",
  secondaryCtaLabel: "Découvrir",
  subtitle: "L'histoire d'une cuisine gourmande",
  tagline: "Traiteur · Chef à Domicile · Réceptions · Mariages",
  titleAccent: "Gastronomie",
  titleWords: "L'Art de la",
};

export function getHomeHero(cms: CMSHomePage | null): HeroContent {
  const hero = cms?.hero;

  return {
    locationLine: text(hero?.locationLine, fallbackHero.locationLine),
    primaryCtaLabel: text(hero?.primaryCtaLabel, fallbackHero.primaryCtaLabel),
    secondaryCtaLabel: text(
      hero?.secondaryCtaLabel,
      fallbackHero.secondaryCtaLabel,
    ),
    subtitle: text(hero?.subtitle, fallbackHero.subtitle),
    tagline: text(hero?.tagline, fallbackHero.tagline),
    titleAccent: text(hero?.titleAccent, fallbackHero.titleAccent),
    titleWords: text(hero?.titleWords, fallbackHero.titleWords),
  };
}

export const fallbackMarquee: string[] = [
  "Mariages qui ont du goût",
  "Cocktails nets",
  "Dîners privés",
  "Service précis",
  "Tables gourmandes",
  "Produits de saison",
  "Pavillon des Millésimes",
  "Nouvelle‑Aquitaine",
];

export function getHomeMarquee(cms: CMSHomePage | null): string[] {
  const items =
    cms?.marquee?.items
      ?.map((item) => item.text?.trim())
      .filter((item): item is string => Boolean(item)) || [];

  return items.length > 0 ? items : fallbackMarquee;
}

export const fallbackServicesText: ServicesTextContent = {
  chefADomicile: {
    desc: "Une expérience à la maison, en petit comité, avec le confort d'un service précis et l'intensité d'une vraie table.",
    sub: "Service Privé",
    title: "Chef à Domicile",
  },
  eyebrow: "Nos Prestations",
  intro:
    "Pas de formule plaquée: le service, les quantités et le rythme s'adaptent au lieu, à la météo et au style de vos invités.",
  mariages: {
    desc: "Du vin d'honneur au dîner puis au brunch, une prestation pensée pour tenir la journée sans perdre la gourmandise.",
    sub: "Célébrations",
    title: "Mariages",
  },
  receptions: {
    desc: "Séminaires, baptêmes, anniversaires, lancements: une cuisine qui rassemble sans faire perdre le fil de l'événement.",
    sub: "Tous Événements",
    title: "Réceptions",
  },
  titleLineOne: "Le bon format",
  titleLineTwo: "pour votre évènement.",
  traiteur: {
    desc: "Cocktails dinatoires, buffets dessinés pour circuler, repas assis et formats hybrides pour donner du relief à vos invités.",
    sub: "Réceptions",
    title: "Traiteur",
  },
};

export function getHomeServicesText(
  cms: CMSHomePage | null,
): ServicesTextContent {
  const st = cms?.servicesText;

  const serviceText = (
    key: "chefADomicile" | "mariages" | "receptions" | "traiteur",
  ) => ({
    desc: text(st?.[key]?.desc, fallbackServicesText[key].desc),
    sub: text(st?.[key]?.sub, fallbackServicesText[key].sub),
    title: text(st?.[key]?.title, fallbackServicesText[key].title),
  });

  return {
    chefADomicile: serviceText("chefADomicile"),
    eyebrow: text(st?.eyebrow, fallbackServicesText.eyebrow),
    intro: text(st?.intro, fallbackServicesText.intro),
    mariages: serviceText("mariages"),
    receptions: serviceText("receptions"),
    titleLineOne: text(st?.titleLineOne, fallbackServicesText.titleLineOne),
    titleLineTwo: text(st?.titleLineTwo, fallbackServicesText.titleLineTwo),
    traiteur: serviceText("traiteur"),
  };
}

export const fallbackGalleryText: SectionHeading = {
  eyebrow: "Nos Réalisations",
  intro:
    "Une galerie vivante, entre gestes de service, dressages nets et tables prêtes à recevoir.",
  titleLineOne: "Des images qui",
  titleLineTwo: "donnent faim.",
};

export function getHomeGalleryText(cms: CMSHomePage | null): SectionHeading {
  const gt = cms?.galleryText;

  return {
    eyebrow: text(gt?.eyebrow, fallbackGalleryText.eyebrow),
    intro: text(gt?.intro, fallbackGalleryText.intro),
    titleLineOne: text(gt?.titleLineOne, fallbackGalleryText.titleLineOne),
    titleLineTwo: text(gt?.titleLineTwo, fallbackGalleryText.titleLineTwo),
  };
}

export const fallbackPavillonText: PavillonTextContent = {
  badgeKicker: "Maison confidentielle",
  badgeQuote: "Dormir sur place, dîner juste, repartir lentement.",
  eyebrow: "Le lieu de David & Nathalie",
  intro:
    "Le Pavillon des Millésimes n'est pas seulement une adresse à visiter. C'est une maison où le repas, la chambre et le lendemain se répondent avec la même attention.",
  linkLabel: "Découvrir le lieu",
  linkNote:
    "Table d'hôtes sur réservation, séjour et cuisine de saison au même endroit.",
  linkUrl: "https://www.pavillon-des-millesimes.com",
  points: [
    {
      label: "Table d'hôtes",
      text: "Une cuisine bistronomique en quatre temps, pensée comme un dîner de maison très soigné.",
    },
    {
      label: "Chambres",
      text: "Des espaces calmes pour prolonger un mariage, une escapade ou un week-end gourmand.",
    },
    {
      label: "Adresse",
      text: "Une maison de caractère en Nouvelle-Aquitaine, entre intimité, vin et art de recevoir.",
    },
  ],
  stripKicker: "Séjour gourmand",
  stripTitle: "Quand le dîner devient le centre d'un week-end.",
  titleLineOne: "Une parenthèse",
  titleLineTwo: "où l'on reste.",
};

export function getHomePavillonText(
  cms: CMSHomePage | null,
): PavillonTextContent {
  const pt = cms?.pavillonText;
  const points = fallbackPavillonText.points.map((fallback, index) => {
    const point = pt?.points?.[index];

    return {
      label: text(point?.label, fallback.label),
      text: text(point?.text, fallback.text),
    };
  });

  return {
    badgeKicker: text(pt?.badgeKicker, fallbackPavillonText.badgeKicker),
    badgeQuote: text(pt?.badgeQuote, fallbackPavillonText.badgeQuote),
    eyebrow: text(pt?.eyebrow, fallbackPavillonText.eyebrow),
    intro: text(pt?.intro, fallbackPavillonText.intro),
    linkLabel: text(pt?.linkLabel, fallbackPavillonText.linkLabel),
    linkNote: text(pt?.linkNote, fallbackPavillonText.linkNote),
    linkUrl: text(pt?.linkUrl, fallbackPavillonText.linkUrl),
    points,
    stripKicker: text(pt?.stripKicker, fallbackPavillonText.stripKicker),
    stripTitle: text(pt?.stripTitle, fallbackPavillonText.stripTitle),
    titleLineOne: text(pt?.titleLineOne, fallbackPavillonText.titleLineOne),
    titleLineTwo: text(pt?.titleLineTwo, fallbackPavillonText.titleLineTwo),
  };
}

export const fallbackValues: ValuesContent = {
  bands: [
    {
      desc: "Un cocktail qui se lit vite, circule bien et installe l'énergie de la fête sans bloquer les invités autour d'un buffet.",
      title: "L'arrivée donne le ton",
    },
    {
      desc: "Cuissons, envois, dressages et transitions sont pensés pour garder le repas vivant, même avec une grande tablée.",
      title: "Le dîner tient la salle",
    },
    {
      desc: "Desserts, fromages, brunch ou retour de soirée: les derniers moments gardent la même attention que la première coupe.",
      title: "La fin reste en bouche",
    },
  ],
  eyebrow: "Scénographie culinaire",
  intro:
    "Il se construit comme une progression: l'arrivée, la première bouchée, le plat que l'on attend, le dessert qui signe la soirée. C'est cette montée que David dessine.",
  signatureKicker: "Signature",
  signatureQuote: "Gourmandise, élégance, précision ...",
  titleLineOne: "Un repas ne se pose pas",
  titleLineTwo: "sur une table.",
};

export function getHomeValues(cms: CMSHomePage | null): ValuesContent {
  const v = cms?.values;
  const bands = fallbackValues.bands.map((fallback, index) => {
    const band = v?.bands?.[index];

    return {
      desc: text(band?.desc, fallback.desc),
      title: text(band?.title, fallback.title),
    };
  });

  return {
    bands,
    eyebrow: text(v?.eyebrow, fallbackValues.eyebrow),
    intro: text(v?.intro, fallbackValues.intro),
    signatureKicker: text(v?.signatureKicker, fallbackValues.signatureKicker),
    signatureQuote: text(v?.signatureQuote, fallbackValues.signatureQuote),
    titleLineOne: text(v?.titleLineOne, fallbackValues.titleLineOne),
    titleLineTwo: text(v?.titleLineTwo, fallbackValues.titleLineTwo),
  };
}

export const fallbackStats: StatsContent = {
  eyebrow: "Ce que vous achetez vraiment",
  intro:
    "Le jour d'un mariage, tout bouge. La valeur d'un traiteur, c'est de rendre la cuisine invisible dans l'effort et évidente dans le plaisir.",
  items: [
    { detail: "", label: "d'expérience", suffix: " ans", value: 25 },
    {
      detail: "Mariages, domaines, séminaires",
      label: "Prestations servies",
      suffix: "+",
      value: 500,
    },
    {
      detail: "Pour cadrer votre demande",
      label: "Premier retour",
      suffix: "h",
      value: 48,
    },
    {
      detail: "Recommandation & fidélité",
      label: "Clients satisfaits",
      suffix: "%",
      value: 99,
    },
  ],
  titleLineOne: "Du calme",
  titleLineTwo: "pendant l'intense.",
};

export function getHomeStats(cms: CMSHomePage | null): StatsContent {
  const s = cms?.stats;
  const items = fallbackStats.items.map((fallback, index) => {
    const item = s?.items?.[index];

    return {
      detail: text(item?.detail, fallback.detail),
      label: text(item?.label, fallback.label),
      suffix: text(item?.suffix, fallback.suffix),
      value:
        typeof item?.value === "number" && !Number.isNaN(item.value)
          ? item.value
          : fallback.value,
    };
  });

  return {
    eyebrow: text(s?.eyebrow, fallbackStats.eyebrow),
    intro: text(s?.intro, fallbackStats.intro),
    items,
    titleLineOne: text(s?.titleLineOne, fallbackStats.titleLineOne),
    titleLineTwo: text(s?.titleLineTwo, fallbackStats.titleLineTwo),
  };
}

export const fallbackTestimonials: TestimonialsContent = {
  ctaLabel: "Échanger avec nous",
  eyebrow: "Ils nous font confiance",
  featuredNote:
    "Le type de retour qui compte: pas seulement “bon”, mais fluide, généreux, rassurant et mémorable pour les invités.",
  footerNote: "Avis collectés sur Google, Tripadvisor & site officiel",
  intro:
    "Mariages, séjours, baptêmes ou séminaires : des retours sobres, directs, et souvent très généreux.",
  items: [
    {
      author: "Fatima-zahra H.",
      occasion: "Mariage · Cocktail, dîner & brunch",
      quote:
        "Nous avons eu le plaisir de faire appel à David pour le cocktail, le dîner et le brunch de notre mariage et la surprise fut juste magnifique ! Le raffinement, le goût, le service, le professionnalisme… tout était au rendez-vous.",
      source: "site",
    },
    {
      author: "Erika D.",
      occasion: "Mariage · Château Soulac",
      quote:
        "David and his team did an incredible job for our wedding at Chateau Soulac. Every piece of food served was out of this world. I cannot recommend him highly enough.",
      source: "site",
    },
    {
      author: "Jeremy Enaud",
      occasion: "Pavillon des Millésimes · Août 2025",
      quote: "A unique experience and exceptional welcoming.",
      source: "tripadvisor",
    },
    {
      author: "Anne-Laure B.",
      occasion: "Baptême · Chef à domicile",
      quote:
        "Tout simplement parfait. Équipe agréable à notre service qui a fait preuve de souplesse sur les menus particuliers (végétarien, intolérance, allergie). Nos invités étaient ravis.",
      source: "site",
    },
    {
      author: "Isa",
      occasion: "Pavillon des Millésimes · Mai 2025",
      quote:
        "We oscillate between luxury and voluptuousness with this feeling of being at home !",
      source: "tripadvisor",
    },
    {
      author: "Yannick R.",
      occasion: "Séminaire · Aerocampus",
      quote:
        "Évènement organisé sur l'Aerocampus avec l'équipe de David. Une équipe hyper pro et dévouée ! Une prestation qui a ravi les papilles et qui nous a permis de vivre un moment convivial et gourmand.",
      source: "site",
    },
    {
      author: "Jean-luc S.",
      occasion: "Pavillon des Millésimes · Avril 2026",
      quote:
        "Beautiful home with a charming decor in a relaxing setting with very attentive hosts.",
      source: "tripadvisor",
    },
    {
      author: "Isabelle I.",
      occasion: "Pavillon des Millésimes · Août 2025",
      quote: "What a wonderful time we had. Thank you to Nathalie and David.",
      source: "tripadvisor",
    },
    {
      author: "James M.",
      occasion: "Pavillon des Millésimes · Mars 2025",
      quote: "I couldn't recommend Pavillon more highly.",
      source: "tripadvisor",
    },
  ],
  titleLineOne: "Quelques mots",
  titleLineTwo: "après le service.",
};

export function getHomeTestimonials(
  cms: CMSHomePage | null,
): TestimonialsContent {
  const t = cms?.testimonials;
  const items: TestimonialItem[] =
    t?.items
      ?.map((item) => {
        const quote = item.quote?.trim();
        const author = item.author?.trim();

        if (!quote || !author) {
          return null;
        }

        return {
          author,
          occasion: item.occasion?.trim() || "",
          quote,
          source: item.source === "tripadvisor" ? "tripadvisor" : "site",
        } satisfies TestimonialItem;
      })
      .filter((item): item is TestimonialItem => Boolean(item)) || [];

  return {
    ctaLabel: text(t?.ctaLabel, fallbackTestimonials.ctaLabel),
    eyebrow: text(t?.eyebrow, fallbackTestimonials.eyebrow),
    featuredNote: text(t?.featuredNote, fallbackTestimonials.featuredNote),
    footerNote: text(t?.footerNote, fallbackTestimonials.footerNote),
    intro: text(t?.intro, fallbackTestimonials.intro),
    items: items.length > 0 ? items : fallbackTestimonials.items,
    titleLineOne: text(t?.titleLineOne, fallbackTestimonials.titleLineOne),
    titleLineTwo: text(t?.titleLineTwo, fallbackTestimonials.titleLineTwo),
  };
}

export const fallbackClientLogos: ClientLogo[] = [
  { alt: "Château Le Puy", src: "/Chateau-le-Puy-Logo.webp" },
  { alt: "Château Les Carmes Haut-Brion", src: "/logo-carmes-haut-brion.jpg" },
  { alt: "Château Faugères", src: "/chateau-faugeres-1998.jpg" },
  {
    alt: "Château Grand Arnaud",
    src: "/creation-de-logo-chateau-grand-arnaud-webmaster-graphiste-bordeaux_Plan-de-travail-3.jpg",
  },
  { alt: "Château de Seguin", src: "/logo-chateau-de-seguin.jpg" },
  { alt: "Franc Mayne", src: "/francmayne_logo_cmjn.png" },
  { alt: "Château Montlabert", src: "/logo-montlabert-big.png" },
  { alt: "LACES Bordeaux", src: "/logo-laces-bordeaux.jpg" },
  {
    alt: "Société Générale",
    src: "/logo-societe-generale-seminaire-congres-incentive-inauguration-lancement-de-produit-agence-evenementielle-pays-basque-biarritz-saint-sebastien-bordeaux-pyrenees-erronda-800x800.png",
  },
  { alt: "Vinci Energies", src: "/Logo-Vinci-Energies-1.png" },
  { alt: "Partenaire", src: "/logo_societe_682268ef6b2a18e22.jpg" },
  { alt: "Partenaire", src: "/logo_societe_filiale_2506931484f8b947.png" },
  { alt: "Ville de Bordeaux", src: "/Ville_de_Bordeaux_(logo).svg.png" },
  { alt: "Bordeaux 2025", src: "/partenaires-entreprise-bordeaux25-png.webp" },
  { alt: "Château Pape Clément", src: "/pape-clement.webp" },
  { alt: "Partenaire", src: "/Logo-OK-1.png" },
];

export const fallbackClients: ClientsContent = {
  eyebrow: "Références",
  intro:
    "Châteaux, domaines viticoles, entreprises et institutions: le décor change, l'exigence reste la même.",
  logos: fallbackClientLogos,
  titleLineOne: "Des lieux exigeants,",
  titleLineTwo: "des repas remarqués.",
};

export function getHomeClients(cms: CMSHomePage | null): ClientsContent {
  const c = cms?.clients;
  const logos =
    c?.logos
      ?.map((logo, index) => {
        const fallback = fallbackClientLogos[index] || fallbackClientLogos[0];
        const src = resolveMediaURL(logo.image, fallback.src);

        return { alt: logo.alt?.trim() || fallback.alt, src };
      })
      .filter((logo) => logo.src) || [];

  return {
    eyebrow: text(c?.eyebrow, fallbackClients.eyebrow),
    intro: text(c?.intro, fallbackClients.intro),
    logos: logos.length > 0 ? logos : fallbackClients.logos,
    titleLineOne: text(c?.titleLineOne, fallbackClients.titleLineOne),
    titleLineTwo: text(c?.titleLineTwo, fallbackClients.titleLineTwo),
  };
}

export const fallbackServiceAreasText: ServiceAreasTextContent = {
  eyebrow: "Zones d'intervention",
  title: "Une table ancrée à Bordeaux, mobile en Gironde.",
};

export function getHomeServiceAreasText(
  cms: CMSHomePage | null,
): ServiceAreasTextContent {
  const sa = cms?.serviceAreasText;

  return {
    eyebrow: text(sa?.eyebrow, fallbackServiceAreasText.eyebrow),
    title: text(sa?.title, fallbackServiceAreasText.title),
  };
}

export const fallbackContact: ContactContent = {
  briefItems: [
    { desc: "Domaine, maison, salle ou lieu à confirmer.", title: "Le lieu" },
    {
      desc: "Cocktail, dîner, brunch, retour de soirée.",
      title: "Le rythme",
    },
    {
      desc: "Nombre approximatif, enfants, régimes.",
      title: "Les invités",
    },
    {
      desc: "Champêtre, gastronomique, familial, très festif.",
      title: "L'envie",
    },
  ],
  eyebrow: "Contact",
  intro:
    "Racontez-nous l'ambiance, le nombre d'invités, vos goûts et ce qui compte le plus pour vous. David vous aide ensuite à transformer l'idée en réception concrète.",
  responseNote:
    "Réponse sous 24 à 48 h ouvrées. Pour un mariage ou une demande proche, le téléphone reste le plus direct.",
  titleLineOne: "Une date,",
  titleLineTwo: "un lieu, une envie.",
};

export function getHomeContact(cms: CMSHomePage | null): ContactContent {
  const c = cms?.contact;
  const briefItems = fallbackContact.briefItems.map((fallback, index) => {
    const item = c?.briefItems?.[index];

    return {
      desc: text(item?.desc, fallback.desc),
      title: text(item?.title, fallback.title),
    };
  });

  return {
    briefItems,
    eyebrow: text(c?.eyebrow, fallbackContact.eyebrow),
    intro: text(c?.intro, fallbackContact.intro),
    responseNote: text(c?.responseNote, fallbackContact.responseNote),
    titleLineOne: text(c?.titleLineOne, fallbackContact.titleLineOne),
    titleLineTwo: text(c?.titleLineTwo, fallbackContact.titleLineTwo),
  };
}

export const fallbackFinalCta: FinalCtaContent = {
  ctaLabel: "Accéder au formulaire",
  eyebrow: "Demande de devis",
  titleLineOne: "Une date à poser,",
  titleLineTwo: "une réception à imaginer.",
};

export function getHomeFinalCta(cms: CMSHomePage | null): FinalCtaContent {
  const f = cms?.finalCta;

  return {
    ctaLabel: text(f?.ctaLabel, fallbackFinalCta.ctaLabel),
    eyebrow: text(f?.eyebrow, fallbackFinalCta.eyebrow),
    titleLineOne: text(f?.titleLineOne, fallbackFinalCta.titleLineOne),
    titleLineTwo: text(f?.titleLineTwo, fallbackFinalCta.titleLineTwo),
  };
}

export const fallbackFooter: FooterContent = {
  tagline:
    "Cuisine de réception, chef à domicile et accompagnement événementiel pour les tables privées et professionnelles en Nouvelle-Aquitaine.",
};

export function getHomeFooter(cms: CMSHomePage | null): FooterContent {
  return {
    tagline: text(cms?.footer?.tagline, fallbackFooter.tagline),
  };
}
