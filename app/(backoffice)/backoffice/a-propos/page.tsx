import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../Header";
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
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <h1>Présentation</h1>
            <p className="bo-muted">
              Modifiez les éléments affichés sur la page d&apos;accueil.
            </p>
          </div>
          <div className="bo-header-actions">
            <Link className="bo-button" href="/backoffice">
              Retour à l&apos;accueil
            </Link>
            <Link className="bo-button" href="/#a-propos" target="_blank">
              Voir la section
            </Link>
          </div>
        </section>

        {saved ? (
          <p className="bo-success">Section à propos enregistrée.</p>
        ) : null}

        <AboutForm about={homePage.about} />
      </main>
    </div>
  );
}
