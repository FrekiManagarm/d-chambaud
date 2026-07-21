import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { deletePricingOfferAction } from "../../../../actions";
import { BackofficeHeader } from "../../../../Header";
import { PricingOfferForm } from "../../../PricingOfferForm";

export const dynamic = "force-dynamic";

type PricingOfferPageProps = { params: Promise<{ yearId: string; offerId: string }> };

export default async function PricingOfferPage({ params }: PricingOfferPageProps) {
  const user = await requireBackofficeUser();
  const { yearId, offerId } = await params;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({ slug: "home-page", locale: "fr", depth: 0, overrideAccess: true });
  const year = homePage.pricing?.years?.find((item) => item.id === yearId);
  const category = year?.categories?.find((item) => item.offers?.some((offer) => offer.id === offerId));
  const offer = category?.offers?.find((item) => item.id === offerId);

  if (!year || !year.id || !category || !category.id || !offer || !offer.id) notFound();

  const deleteAction = deletePricingOfferAction.bind(null, yearId, category.id, offerId);

  return <div className="bo-page"><BackofficeHeader userEmail={user.email} /><main className="bo-shell"><section className="bo-page-head"><div><p className="bo-kicker">{year.label}</p><h1>{offer.name}</h1></div><Link className="bo-button" href={`/backoffice/tarifs/${yearId}`}>Retour</Link></section><PricingOfferForm categories={year.categories ?? []} categoryId={category.id} offer={offer} yearId={yearId} /><form action={deleteAction}><button className="bo-button bo-danger-button" type="submit">Supprimer l’offre</button></form></main></div>;
}
