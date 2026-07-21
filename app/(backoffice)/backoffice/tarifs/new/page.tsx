import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../../Header";
import { PricingFormError } from "../PricingFormError";
import { PricingYearForm } from "../PricingYearForm";

export const dynamic = "force-dynamic";

type NewPricingYearPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewPricingYearPage({
  searchParams,
}: NewPricingYearPageProps) {
  const user = await requireBackofficeUser();
  const { error } = await searchParams;
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
        <PricingFormError error={error} />
        <PricingYearForm redirectTo="/backoffice/tarifs/new" />
      </main>
    </div>
  );
}
