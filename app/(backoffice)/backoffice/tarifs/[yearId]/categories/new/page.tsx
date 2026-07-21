import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../../../../Header";
import { PricingCategoryForm } from "../../../PricingCategoryForm";

export const dynamic = "force-dynamic";

type NewPricingCategoryPageProps = { params: Promise<{ yearId: string }> };

export default async function NewPricingCategoryPage({ params }: NewPricingCategoryPageProps) {
  const user = await requireBackofficeUser();
  const { yearId } = await params;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({ slug: "home-page", locale: "fr", depth: 0, overrideAccess: true });
  const year = homePage.pricing?.years?.find((item) => item.id === yearId);

  if (!year || !year.id) notFound();

  return <div className="bo-page"><BackofficeHeader userEmail={user.email} /><main className="bo-shell"><section className="bo-page-head"><div><p className="bo-kicker">{year.label}</p><h1>Ajouter une catégorie</h1></div><Link className="bo-button" href={`/backoffice/tarifs/${yearId}/categories`}>Retour</Link></section><PricingCategoryForm yearId={yearId} /></main></div>;
}
