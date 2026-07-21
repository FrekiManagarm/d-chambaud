import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../../../../Header";
import { PricingOfferForm } from "../../../PricingOfferForm";
import { PricingFormError } from "../../../PricingFormError";

export const dynamic = "force-dynamic";

type NewPricingOfferPageProps = {
  params: Promise<{ yearId: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function NewPricingOfferPage({
  params,
  searchParams,
}: NewPricingOfferPageProps) {
  const user = await requireBackofficeUser();
  const { yearId } = await params;
  const { error } = await searchParams;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({ slug: "home-page", locale: "fr", depth: 0, overrideAccess: true });
  const year = homePage.pricing?.years?.find((item) => item.id === yearId);

  if (!year || !year.id) notFound();

  return <div className="bo-page"><BackofficeHeader userEmail={user.email} /><main className="bo-shell"><section className="bo-page-head"><div><p className="bo-kicker">{year.label}</p><h1>Ajouter une offre</h1></div><Link className="bo-button" href={`/backoffice/tarifs/${yearId}`}>Retour</Link></section><PricingFormError error={error} />{(year.categories ?? []).length ? <PricingOfferForm categories={year.categories ?? []} redirectTo={`/backoffice/tarifs/${yearId}/offers/new`} yearId={yearId} /> : <section className="bo-card bo-form-section"><p>Créez d’abord une catégorie avant d’ajouter une offre.</p><Link className="bo-button" href={`/backoffice/tarifs/${yearId}/categories/new`}>Ajouter une catégorie</Link></section>}</main></div>;
}
