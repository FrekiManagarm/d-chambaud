import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../../Header";
import { PricingFormError } from "../PricingFormError";
import { PricingSectionForm } from "../PricingSectionForm";

export const dynamic = "force-dynamic";

type PricingSettingsPageProps = {
  searchParams: Promise<{ error?: string; saved?: string }>;
};

export default async function PricingSettingsPage({ searchParams }: PricingSettingsPageProps) {
  const user = await requireBackofficeUser();
  const { error, saved } = await searchParams;
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
            <p className="bo-kicker">Tarifs</p>
            <h1>Texte de la section</h1>
          </div>
          <Link className="bo-button" href="/backoffice/tarifs">Retour</Link>
        </section>
        {saved ? <p className="bo-success">Texte de la section enregistré.</p> : null}
        <PricingFormError error={error} />
        <PricingSectionForm pricing={homePage.pricing} />
      </main>
    </div>
  );
}
