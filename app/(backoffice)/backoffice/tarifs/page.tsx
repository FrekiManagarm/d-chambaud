import { Plus } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../Header";
import { PricingFormError } from "./PricingFormError";
import {
  deletePricingYearAction,
  setActivePricingYearAction,
  updatePricingYearAction,
} from "../actions";

export const dynamic = "force-dynamic";

type PricingPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
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
            <h1>Saisons tarifaires</h1>
            <p className="bo-muted">Choisissez la saison affichée sur le site et gérez ses offres séparément.</p>
          </div>
          <Link className="bo-button bo-button-primary" href="/backoffice/tarifs/new">
            <Plus aria-hidden="true" size={17} />
            <span>Ajouter une saison</span>
          </Link>
        </section>

        {saved ? <p className="bo-success">Tarifs enregistrés.</p> : null}
        <PricingFormError error={error} />

        <p className="bo-muted">
          <Link href="/backoffice/tarifs/settings">Modifier le texte visible sur le site</Link>
          {" · "}
          <Link href="/#tarifs" target="_blank">Voir la section publique</Link>
        </p>

        <div className="bo-form-stack">
          {(homePage.pricing?.years ?? []).map((year) => {
            if (!year.id) {
              return null;
            }

            const updateAction = updatePricingYearAction.bind(null, year.id);
            const activateAction = setActivePricingYearAction.bind(null, year.id);
            const deleteAction = deletePricingYearAction.bind(null, year.id);

            return (
              <section className="bo-card bo-form-section" key={year.id}>
                <div className="bo-section-head">
                  <div>
                    <p className="bo-kicker">{year.isActive ? "Affichée sur le site" : "Non affichée"}</p>
                    <h2>{year.label}</h2>
                  </div>
                  <Link className="bo-button" href={`/backoffice/tarifs/${year.id}`}>
                    Ouvrir
                  </Link>
                </div>
                <div className="bo-form-grid">
                  <form action={updateAction} className="bo-form-field">
                    <input name="redirectTo" type="hidden" value="/backoffice/tarifs" />
                    <label htmlFor={`year-${year.id}`}>Nom de la saison</label>
                    <input defaultValue={year.label} id={`year-${year.id}`} name="label" required />
                    <button className="bo-button" type="submit">Modifier le nom</button>
                  </form>
                  <div className="bo-form-field">
                    <span>Publication</span>
                    <form action={activateAction}>
                      <input name="redirectTo" type="hidden" value="/backoffice/tarifs" />
                      <button className="bo-button" disabled={Boolean(year.isActive)} type="submit">
                        Afficher sur le site
                      </button>
                    </form>
                    <form action={deleteAction}>
                      <input name="redirectTo" type="hidden" value="/backoffice/tarifs" />
                      <button className="bo-button bo-danger-button" type="submit">Supprimer</button>
                    </form>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {(homePage.pricing?.years ?? []).length === 0 ? (
          <section className="bo-card bo-form-section">
            <p>Aucune saison tarifaire n’est encore créée.</p>
          </section>
        ) : null}
      </main>
    </div>
  );
}
