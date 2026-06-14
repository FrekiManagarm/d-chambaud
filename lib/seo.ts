export const siteConfig = {
  name: "David Chambaud Traiteur",
  legalName: "DC Restauration",
  url: "https://david-chambaud.fr",
  email: "contact@david-chambaud.fr",
  phone: "+33650754406",
  instagram: "https://www.instagram.com/chambauddavid",
  foundingDate: "2008",
  image: "/20260212_DSC2953.jpg",
  logo: "/favicon.ico",
  locale: "fr_FR",
  language: "fr",
  primaryArea: "Bordeaux",
  region: "Nouvelle-Aquitaine",
  serviceAreas: [
    "Bordeaux",
    "Gironde",
    "Saint-Émilion",
    "Libourne",
    "Pessac",
    "Mérignac",
    "Bassin d'Arcachon",
    "Médoc",
    "Nouvelle-Aquitaine",
  ],
} as const;

export type LocalSeoPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  serviceType: string;
  area: string;
  intent: string;
  image: string;
  highlights: string[];
  sections: {
    title: string;
    body: string;
  }[];
  related: string[];
};

export const localSeoPages: LocalSeoPage[] = [
  {
    slug: "traiteur-bordeaux",
    title: "Traiteur à Bordeaux",
    metaTitle: "Traiteur Bordeaux | David Chambaud",
    description:
      "Traiteur à Bordeaux pour mariages, cocktails, séminaires, réceptions privées et dîners gastronomiques sur mesure.",
    eyebrow: "Bordeaux",
    h1: "Traiteur à Bordeaux pour réceptions privées et professionnelles.",
    intro:
      "David Chambaud accompagne les événements bordelais avec une cuisine de saison, une organisation discrète et un service pensé pour tenir le rythme de la réception.",
    serviceType: "Traiteur événementiel",
    area: "Bordeaux",
    intent: "traiteur Bordeaux",
    image: "/20260212_DSC2967.jpg",
    highlights: [
      "Cocktails, buffets et repas assis",
      "Mariages, séminaires et dîners privés",
      "Intervention à Bordeaux et en métropole bordelaise",
    ],
    sections: [
      {
        title: "Une cuisine lisible pour les lieux bordelais",
        body: "Chaque prestation est construite autour du lieu, du nombre d'invités et du format attendu: vin d'honneur, cocktail d'entreprise, dîner assis ou brunch du lendemain.",
      },
      {
        title: "Un interlocuteur unique du devis au service",
        body: "Le cadrage porte sur le rythme de la journée, les contraintes du site, les régimes alimentaires et la fluidité du service afin que les invités profitent sans voir la mécanique.",
      },
    ],
    related: [
      "traiteur-mariage-bordeaux",
      "chef-a-domicile-bordeaux",
      "traiteur-gironde",
    ],
  },
  {
    slug: "traiteur-mariage-bordeaux",
    title: "Traiteur mariage à Bordeaux",
    metaTitle: "Traiteur mariage Bordeaux | David Chambaud",
    description:
      "Traiteur mariage à Bordeaux: vin d'honneur, dîner, brunch et accompagnement gastronomique pour une réception fluide.",
    eyebrow: "Mariages à Bordeaux",
    h1: "Traiteur mariage à Bordeaux, du vin d'honneur au brunch.",
    intro:
      "Pour un mariage à Bordeaux ou dans ses environs, la prestation est pensée comme une journée complète: accueil, cocktail, dîner, dessert, retour de soirée et lendemain si besoin.",
    serviceType: "Traiteur mariage",
    area: "Bordeaux",
    intent: "traiteur mariage Bordeaux",
    image: "/AdobeStock_522340892.jpeg",
    highlights: [
      "Vin d'honneur, dîner et brunch",
      "Menus ajustés aux saisons et aux invités",
      "Coordination avec domaines, salles et wedding planners",
    ],
    sections: [
      {
        title: "Un rythme de service adapté au mariage",
        body: "Le repas est construit pour accompagner les temps forts sans casser l'énergie de la journée: bouchées faciles à partager, dîner précis, service discret et transitions nettes.",
      },
      {
        title: "Une table généreuse sans surcharge",
        body: "L'objectif est de garder une cuisine mémorable, élégante et lisible, avec des propositions adaptées aux enfants, intolérances et régimes particuliers.",
      },
    ],
    related: ["traiteur-bordeaux", "traiteur-gironde", "traiteur-saint-emilion"],
  },
  {
    slug: "chef-a-domicile-bordeaux",
    title: "Chef à domicile à Bordeaux",
    metaTitle: "Chef à domicile Bordeaux | David Chambaud",
    description:
      "Chef à domicile à Bordeaux pour dîner privé, anniversaire, repas familial ou expérience gastronomique à la maison.",
    eyebrow: "Chef privé",
    h1: "Chef à domicile à Bordeaux pour recevoir sans quitter la maison.",
    intro:
      "David Chambaud transforme un dîner à domicile en table soignée, avec une cuisine de saison, un service précis et une organisation légère pour les hôtes.",
    serviceType: "Chef à domicile",
    area: "Bordeaux",
    intent: "chef à domicile Bordeaux",
    image: "/AdobeStock_54050217.jpeg",
    highlights: [
      "Dîners privés et anniversaires",
      "Menus sur mesure selon la saison",
      "Service à domicile à Bordeaux et alentours",
    ],
    sections: [
      {
        title: "Une expérience gastronomique chez vous",
        body: "Le menu, les quantités, le rythme du service et les contraintes de cuisine sont définis en amont pour conserver le confort d'un dîner privé.",
      },
      {
        title: "Recevoir avec précision et simplicité",
        body: "L'équipe prend en charge la partie culinaire pour que les hôtes restent avec leurs invités, du premier échange jusqu'à la fin du service.",
      },
    ],
    related: ["traiteur-bordeaux", "traiteur-mariage-bordeaux", "traiteur-gironde"],
  },
  {
    slug: "traiteur-gironde",
    title: "Traiteur en Gironde",
    metaTitle: "Traiteur Gironde | David Chambaud",
    description:
      "Traiteur en Gironde pour mariages, domaines viticoles, réceptions privées, séminaires et événements professionnels.",
    eyebrow: "Gironde",
    h1: "Traiteur en Gironde pour domaines, maisons et lieux de réception.",
    intro:
      "En Gironde, David Chambaud intervient auprès de domaines, châteaux, entreprises et particuliers avec une prestation ajustée au lieu et à l'ambiance.",
    serviceType: "Traiteur événementiel",
    area: "Gironde",
    intent: "traiteur Gironde",
    image: "/AdobeStock_418339639.jpeg",
    highlights: [
      "Domaines viticoles et châteaux",
      "Mariages, séminaires et réceptions familiales",
      "Bordeaux, Libourne, Médoc, Entre-deux-Mers et Bassin",
    ],
    sections: [
      {
        title: "Des formats adaptés aux lieux girondins",
        body: "La prestation peut prendre la forme d'un cocktail, d'un buffet, d'un dîner servi à table ou d'un format hybride selon les contraintes du lieu.",
      },
      {
        title: "Une implantation régionale utile",
        body: "La connaissance des rythmes de réception en Gironde permet d'anticiper les accès, les offices, les extérieurs et les besoins de coordination.",
      },
    ],
    related: [
      "traiteur-bordeaux",
      "traiteur-mariage-bordeaux",
      "traiteur-saint-emilion",
    ],
  },
  {
    slug: "traiteur-saint-emilion",
    title: "Traiteur à Saint-Émilion",
    metaTitle: "Traiteur Saint-Émilion | David Chambaud",
    description:
      "Traiteur à Saint-Émilion pour mariages, dîners privés, domaines viticoles, cocktails et réceptions gastronomiques.",
    eyebrow: "Saint-Émilion",
    h1: "Traiteur à Saint-Émilion pour réceptions et domaines viticoles.",
    intro:
      "Autour de Saint-Émilion, David Chambaud accompagne les événements privés et professionnels dans les domaines, maisons de caractère et lieux de réception.",
    serviceType: "Traiteur événementiel",
    area: "Saint-Émilion",
    intent: "traiteur Saint-Émilion",
    image: "/Pavillon-70.jpg",
    highlights: [
      "Réceptions en domaines et châteaux",
      "Accords de saison et esprit gastronomique",
      "Cocktails, repas assis et dîners privés",
    ],
    sections: [
      {
        title: "Une cuisine à la hauteur du lieu",
        body: "Les prestations à Saint-Émilion demandent un équilibre entre raffinement, générosité et lisibilité, sans voler la place au vin, au lieu ou aux invités.",
      },
      {
        title: "Du cocktail à la table d'hôtes",
        body: "Le format peut rester très événementiel ou devenir plus intime, avec un dîner servi, une table d'hôtes ou une réception sur plusieurs temps.",
      },
    ],
    related: ["traiteur-gironde", "traiteur-mariage-bordeaux", "traiteur-bordeaux"],
  },
  {
    slug: "traiteur-nouvelle-aquitaine",
    title: "Traiteur en Nouvelle-Aquitaine",
    metaTitle: "Traiteur Nouvelle-Aquitaine | David Chambaud",
    description:
      "Traiteur en Nouvelle-Aquitaine pour mariages, réceptions, séminaires, dîners privés et événements gastronomiques.",
    eyebrow: "Nouvelle-Aquitaine",
    h1: "Traiteur en Nouvelle-Aquitaine pour événements sur mesure.",
    intro:
      "Depuis 2008, David Chambaud imagine des prestations culinaires en Nouvelle-Aquitaine pour les mariages, événements professionnels et moments privés.",
    serviceType: "Traiteur événementiel",
    area: "Nouvelle-Aquitaine",
    intent: "traiteur Nouvelle-Aquitaine",
    image: "/20260212_DSC3037.jpg",
    highlights: [
      "Prestations privées et professionnelles",
      "Cuisine française, saisonnière et gastronomique",
      "Accompagnement de Bordeaux aux lieux de réception régionaux",
    ],
    sections: [
      {
        title: "Une région large, une prestation cadrée",
        body: "Chaque projet commence par le lieu, la date, le nombre d'invités et le niveau de service attendu afin de proposer une réponse cohérente.",
      },
      {
        title: "Des événements privés aux séminaires",
        body: "Mariage, dîner à domicile, lancement, baptême ou séminaire: le format est adapté sans perdre la signature culinaire ni la rigueur du service.",
      },
    ],
    related: ["traiteur-bordeaux", "traiteur-gironde", "chef-a-domicile-bordeaux"],
  },
];

export function absoluteUrl(path = "") {
  if (!path) {
    return siteConfig.url;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getLocalSeoPage(slug: string) {
  return localSeoPages.find((page) => page.slug === slug) || null;
}

export function getRelatedLocalSeoPages(page: LocalSeoPage) {
  return page.related
    .map((slug) => getLocalSeoPage(slug))
    .filter((related): related is LocalSeoPage => Boolean(related));
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": `${siteConfig.url}/#business`,
      },
    },
    {
      "@type": ["LocalBusiness", "FoodEstablishment", "CateringBusiness"],
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      description:
        "Chef traiteur en Nouvelle-Aquitaine spécialisé dans la création d'expériences culinaires sur mesure pour des événements privés et professionnels.",
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      image: absoluteUrl(siteConfig.image),
      logo: absoluteUrl(siteConfig.logo),
      priceRange: "€€€",
      foundingDate: siteConfig.foundingDate,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.primaryArea,
        addressRegion: siteConfig.region,
        addressCountry: "FR",
      },
      areaServed: siteConfig.serviceAreas.map((area) => ({
        "@type": "Place",
        name: area,
      })),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "customer service",
        areaServed: "FR",
        availableLanguage: ["fr"],
      },
      sameAs: [siteConfig.instagram],
      servesCuisine: ["Française", "Gastronomique", "Cuisine de saison"],
      founder: {
        "@type": "Person",
        name: "David Chambaud",
        jobTitle: "Chef Traiteur",
      },
      makesOffer: [
        "Traiteur événementiel",
        "Traiteur mariage",
        "Chef à domicile",
        "Réceptions et séminaires",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          areaServed: siteConfig.serviceAreas.map((area) => ({
            "@type": "Place",
            name: area,
          })),
        },
      })),
    },
  ],
};

export function localServiceJsonLd(page: LocalSeoPage) {
  const pageUrl = absoluteUrl(`/${page.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.title,
        serviceType: page.serviceType,
        description: page.description,
        provider: {
          "@id": `${siteConfig.url}/#business`,
        },
        areaServed: {
          "@type": "Place",
          name: page.area,
        },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
