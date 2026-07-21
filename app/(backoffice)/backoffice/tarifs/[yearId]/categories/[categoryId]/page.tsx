import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { deletePricingCategoryAction } from "../../../../actions";
import { BackofficeHeader } from "../../../../Header";
import { PricingCategoryForm } from "../../../PricingCategoryForm";

export const dynamic = "force-dynamic";

type PricingCategoryPageProps = { params: Promise<{ yearId: string; categoryId: string }> };

export default async function PricingCategoryPage({ params }: PricingCategoryPageProps) {
  const user = await requireBackofficeUser();
  const { yearId, categoryId } = await params;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({ slug: "home-page", locale: "fr", depth: 0, overrideAccess: true });
  const year = homePage.pricing?.years?.find((item) => item.id === yearId);
  const category = year?.categories?.find((item) => item.id === categoryId);

  if (!year || !year.id || !category || !category.id) notFound();

  const deleteAction = deletePricingCategoryAction.bind(null, yearId, categoryId);

  return <div className="bo-page"><BackofficeHeader userEmail={user.email} /><main className="bo-shell"><section className="bo-page-head"><div><p className="bo-kicker">{year.label}</p><h1>{category.label}</h1></div><Link className="bo-button" href={`/backoffice/tarifs/${yearId}/categories`}>Retour</Link></section><PricingCategoryForm category={category} yearId={yearId} /><form action={deleteAction}><button className="bo-button bo-danger-button" type="submit">Supprimer la catégorie</button></form></main></div>;
}
