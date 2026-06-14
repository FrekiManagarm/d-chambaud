import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothCursor from "@/components/SmoothCursor";
import { businessJsonLd, jsonLdScript, siteConfig } from "@/lib/seo";
import { Providers } from "./providers";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Traiteur Bordeaux & chef à domicile | David Chambaud",
    template: "%s | David Chambaud Traiteur",
  },
  description:
    "Traiteur à Bordeaux et en Nouvelle-Aquitaine depuis 2008: mariages, réceptions, dîners privés et chef à domicile sur mesure.",
  keywords: [
    "traiteur Bordeaux",
    "traiteur nouvelle aquitaine",
    "chef à domicile Bordeaux",
    "traiteur Saint-Émilion",
    "traiteur mariage Gironde",
    "mariage nouvelle aquitaine",
    "chef traiteur Nouvelle-Aquitaine",
    "réception gastronomique Bordeaux",
    "traiteur événementiel Bordeaux",
    "mariage Bordeaux",
    "chef à domicile",
    "dîner privé Bordeaux",
    "Pavillon des Millésimes",
    "traiteur séminaire Bordeaux",
    "buffet gastronomique Gironde",
  ],
  authors: [{ name: "David Chambaud", url: siteConfig.url }],
  creator: "David Chambaud",
  publisher: "David Chambaud Traiteur",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Traiteur Bordeaux & chef à domicile | David Chambaud",
    description:
      "Traiteur à Bordeaux et en Nouvelle-Aquitaine depuis 2008: mariages, réceptions, dîners privés et chef à domicile sur mesure.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "David Chambaud, traiteur à Bordeaux et en Nouvelle-Aquitaine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traiteur Bordeaux & chef à domicile | David Chambaud",
    description:
      "Traiteur à Bordeaux et en Nouvelle-Aquitaine depuis 2008: mariages, réceptions, dîners privés et chef à domicile sur mesure.",
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
    canonical: siteConfig.url,
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
          dangerouslySetInnerHTML={{ __html: jsonLdScript(businessJsonLd) }}
        />
        <LoadingScreen />
        <ScrollProgress />
        <SmoothCursor />
        <Navigation />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
