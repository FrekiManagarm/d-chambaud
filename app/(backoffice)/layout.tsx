import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "../(frontend)/globals.css";
import "./backoffice/backoffice.css";

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
      className={montserrat.variable}
      lang="fr"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
