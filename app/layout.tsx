import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import SmoothCursor from "./components/SmoothCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chambaud.fr"),
  title: {
    default: "David Chambaud — Traiteur & Chef à Domicile | Nouvelle-Aquitaine",
    template: "%s | David Chambaud Traiteur",
  },
  description:
    "Chef traiteur en Nouvelle-Aquitaine depuis 2008. Réceptions, mariages, dîners privés et chef à domicile autour de Bordeaux. Gastronomie raffinée, produits de saison, expériences sur mesure.",
  keywords: [
    "traiteur Bordeaux",
    "chef à domicile Bordeaux",
    "traiteur mariage Gironde",
    "chef traiteur Nouvelle-Aquitaine",
    "réception gastronomique Bordeaux",
    "traiteur événementiel Bordeaux",
    "dîner privé Bordeaux",
    "Pavillon des Millésimes",
    "traiteur séminaire Bordeaux",
    "buffet gastronomique Gironde",
  ],
  authors: [{ name: "David Chambaud", url: "https://chambaud.fr" }],
  creator: "David Chambaud",
  publisher: "David Chambaud Traiteur",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://chambaud.fr",
    siteName: "David Chambaud Traiteur",
    title: "David Chambaud — Traiteur & Chef à Domicile | Nouvelle-Aquitaine",
    description:
      "Chef traiteur en Nouvelle-Aquitaine depuis 2008. Réceptions, mariages, dîners privés et chef à domicile autour de Bordeaux.",
    images: [
      {
        url: "/20260212_DSC2953.jpg",
        width: 1200,
        height: 630,
        alt: "David Chambaud, chef traiteur en Nouvelle-Aquitaine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Chambaud — Traiteur & Chef à Domicile | Nouvelle-Aquitaine",
    description:
      "Chef traiteur en Nouvelle-Aquitaine. Réceptions, mariages et dîners privés. Une gastronomie raffinée depuis 2008.",
    images: ["/20260212_DSC2953.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://chambaud.fr",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "@id": "https://chambaud.fr",
  name: "David Chambaud Traiteur",
  description:
    "Chef traiteur en Nouvelle-Aquitaine spécialisé dans la création d'expériences culinaires sur mesure pour des événements privés et professionnels.",
  url: "https://chambaud.fr",
  telephone: "+33650754406",
  email: "david@chambaud.fr",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Nouvelle-Aquitaine",
    addressLocality: "Bordeaux",
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "State",
    name: "Nouvelle-Aquitaine",
  },
  priceRange: "€€€",
  image: "https://chambaud.fr/20260212_DSC2953.jpg",
  sameAs: ["https://www.instagram.com/chambauddavid"],
  servesCuisine: ["Française", "Gastronomique"],
  foundingDate: "2008",
  founder: {
    "@type": "Person",
    name: "David Chambaud",
    jobTitle: "Chef Traiteur",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations traiteur",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Traiteur événementiel",
        description: "Cocktails dinatoires, buffets raffinés et repas gastronomiques",
      },
      {
        "@type": "Offer",
        name: "Traiteur mariage",
        description: "Mariages hors du commun en Gironde et Nouvelle-Aquitaine",
      },
      {
        "@type": "Offer",
        name: "Chef à domicile",
        description: "Expérience gastronomique dans l'intimité de votre maison",
      },
      {
        "@type": "Offer",
        name: "Réceptions & séminaires",
        description: "Anniversaires, baptêmes, séminaires d'entreprise",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    ratingCount: "500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        <ScrollProgress />
        <SmoothCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
