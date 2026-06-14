import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

import "../(frontend)/globals.css";
import "./backoffice/backoffice.css";

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
  title: "Back office | David Chambaud",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BackofficeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${cormorant.variable} ${montserrat.variable}`}
      lang="fr"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
