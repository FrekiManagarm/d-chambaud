import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../../../Header";

export const dynamic = "force-dynamic";

type PricingCategoriesPageProps = { params: Promise<{ yearId: string }> };

export default async function PricingCategoriesPage({ params }: PricingCategoriesPageProps) {
  const user = await requireBackofficeUser();
  const { yearId } = await params;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({ slug: "home-page", locale: "fr", depth: 0, overrideAccess: true });
  const year = homePage.pricing?.years?.find((item) => item.id === yearId);

  if (!year || !year.id) notFound();

  return (
    <div className="bo-page">
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div><p className="bo-kicker">{year.label}</p><h1>Catégories</h1></div>
          <Link className="bo-button bo-button-primary" href={`/backoffice/tarifs/${yearId}/categories/new`}><Plus aria-hidden="true" size={17} /><span>Ajouter une catégorie</span></Link>
        </section>
        <section className="bo-card bo-form-section">
          {(year.categories ?? []).length ? (
            <div className="bo-form-stack">
              {(year.categories ?? []).map((category) => category.id ? <Link className="bo-button" href={`/backoffice/tarifs/${yearId}/categories/${category.id}`} key={category.id}>{category.label}</Link> : null)}
            </div>
          ) : <p>Aucune catégorie dans cette saison.</p>}
        </section>
        <Link className="bo-button" href={`/backoffice/tarifs/${yearId}`}>Retour à la saison</Link>
      </main>
    </div>
  );
}
