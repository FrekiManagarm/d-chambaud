import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../../Header";
import { PricingFormError } from "../PricingFormError";
import { PricingYearForm } from "../PricingYearForm";

export const dynamic = "force-dynamic";

type PricingYearPageProps = {
  params: Promise<{ yearId: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function PricingYearPage({
  params,
  searchParams,
}: PricingYearPageProps) {
  const user = await requireBackofficeUser();
  const { yearId } = await params;
  const { error } = await searchParams;
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({
    slug: "home-page",
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });
  const year = homePage.pricing?.years?.find((item) => item.id === yearId);

  if (!year || !year.id) {
    notFound();
  }

  const offers = (year.categories ?? []).flatMap((category) =>
    (category.offers ?? []).map((offer) => ({ category, offer })),
  );

  return (
    <div className="bo-page">
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Saison tarifaire</p>
            <h1>{year.label}</h1>
          </div>
          <Link className="bo-button" href="/backoffice/tarifs">Retour</Link>
        </section>

        <PricingFormError error={error} />
        <PricingYearForm redirectTo={`/backoffice/tarifs/${yearId}`} year={year} />

        <section className="bo-card bo-form-section">
          <div className="bo-section-head">
            <div>
              <p className="bo-kicker">Offres</p>
              <h2>Offres de la saison</h2>
            </div>
            <Link className="bo-button bo-button-primary" href={`/backoffice/tarifs/${yearId}/offers/new`}>
              <Plus aria-hidden="true" size={17} />
              <span>Ajouter une offre</span>
            </Link>
          </div>
          {offers.length ? (
            <div className="bo-form-stack">
              {offers.map(({ category, offer }) =>
                offer.id ? (
                  <Link className="bo-button" href={`/backoffice/tarifs/${yearId}/offers/${offer.id}`} key={offer.id}>
                    {offer.name} · {category.label}
                  </Link>
                ) : null,
              )}
            </div>
          ) : <p>Aucune offre dans cette saison.</p>}
        </section>

        <section className="bo-card bo-form-section">
          <div className="bo-section-head">
            <div>
              <p className="bo-kicker">Catégories</p>
              <h2>Organiser les catégories</h2>
            </div>
            <Link className="bo-button" href={`/backoffice/tarifs/${yearId}/categories`}>Gérer catégories</Link>
          </div>
          {(year.categories ?? []).length ? (
            <ul>
              {(year.categories ?? []).map((category) => <li key={category.id ?? category.label}>{category.label}</li>)}
            </ul>
          ) : <p>Aucune catégorie dans cette saison.</p>}
        </section>
      </main>
    </div>
  );
}
