import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { deletePricingCategoryAction } from "../../../../actions";
import { BackofficeHeader } from "../../../../Header";
import { ConfirmSubmitButton } from "../../../../ConfirmSubmitButton";
import { PricingCategoryForm } from "../../../PricingCategoryForm";
import { PricingFormError } from "../../../PricingFormError";

export const dynamic = "force-dynamic";

type PricingCategoryPageProps = {
  params: Promise<{ yearId: string; categoryId: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function PricingCategoryPage({
  params,
  searchParams,
}: PricingCategoryPageProps) {
  const user = await requireBackofficeUser();
  const { yearId, categoryId } = await params;
  const { error } = await searchParams;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({ slug: "home-page", locale: "fr", depth: 0, overrideAccess: true });
  const year = homePage.pricing?.years?.find((item) => item.id === yearId);
  const category = year?.categories?.find((item) => item.id === categoryId);

  if (!year || !year.id || !category || !category.id) notFound();

  const deleteAction = deletePricingCategoryAction.bind(null, yearId, categoryId);

  return <div className="bo-page"><BackofficeHeader userEmail={user.email} /><main className="bo-shell"><section className="bo-page-head"><div><p className="bo-kicker">{year.label}</p><h1>{category.label}</h1></div><Link className="bo-button" href={`/backoffice/tarifs/${yearId}/categories`}>Retour</Link></section><PricingFormError error={error} /><PricingCategoryForm category={category} redirectTo={`/backoffice/tarifs/${yearId}/categories/${categoryId}`} yearId={yearId} /><form action={deleteAction}><input name="redirectTo" type="hidden" value={`/backoffice/tarifs/${yearId}/categories/${categoryId}`} /><ConfirmSubmitButton className="bo-button bo-danger-button" confirmation="Supprimer définitivement cet élément ? Cette action est irréversible." type="submit">Supprimer la catégorie</ConfirmSubmitButton></form></main></div>;
}
