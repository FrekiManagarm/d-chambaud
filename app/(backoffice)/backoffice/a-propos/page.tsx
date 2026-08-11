import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeSidebar } from "../Sidebar";
import { AboutForm } from "./AboutForm";

export const dynamic = "force-dynamic";

type AboutPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const user = await requireBackofficeUser();
  const { saved } = await searchParams;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  return (
    <div className="bo-page">
      <BackofficeSidebar userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">À propos</p>
            <h1>Présentation du chef</h1>
            <p className="bo-muted">
              Modifiez les textes affichés dans la section à propos de la page
              d&apos;accueil.
            </p>
          </div>
          <Link className="bo-button" href="/#a-propos" target="_blank">
            Voir la section
          </Link>
        </section>

        {saved ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Section à propos enregistrée.
          </p>
        ) : null}

        <AboutForm about={homePage.about} />
      </main>
    </div>
  );
}
