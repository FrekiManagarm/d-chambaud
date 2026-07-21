import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../../Header";
import { PricingYearForm } from "../PricingYearForm";

export const dynamic = "force-dynamic";

export default async function NewPricingYearPage() {
  const user = await requireBackofficeUser();
  const payload = await getPayloadClient();
  await payload.findGlobal({
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
            <h1>Ajouter une saison</h1>
          </div>
          <Link className="bo-button" href="/backoffice/tarifs">Retour</Link>
        </section>
        <PricingYearForm />
      </main>
    </div>
  );
}
