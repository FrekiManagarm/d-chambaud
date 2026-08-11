import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeSidebar } from "../Sidebar";
import { PricingForm } from "./PricingForm";

export const dynamic = "force-dynamic";

type PricingPageProps = {
  searchParams: Promise<{
    saved?: string;
    seasonAdded?: string;
    offerAdded?: string;
    openYear?: string;
  }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const user = await requireBackofficeUser();
  const { saved, seasonAdded, offerAdded, openYear } = await searchParams;
  const openYearIndex = openYear ? Number(openYear) : undefined;
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
            <p className="bo-kicker">Tarifs</p>
            <h1>Offres et prix</h1>
            <p className="bo-muted">
              Modifiez les offres proposées et leurs prix. N&apos;oubliez pas
              d&apos;enregistrer chaque saison après vos changements.
            </p>
          </div>
          <Link className="bo-button" href="/#tarifs" target="_blank">
            Voir la section
          </Link>
        </section>

        {saved ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Tarifs enregistrés.
          </p>
        ) : null}
        {seasonAdded ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Saison ajoutée. Complétez ses catégories et offres ci-dessous.
          </p>
        ) : null}
        {offerAdded ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Offre ajoutée.
          </p>
        ) : null}

        <PricingForm openYearIndex={openYearIndex} pricing={homePage.pricing} />
      </main>
    </div>
  );
}
