import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";
import { serviceBrochureCategoryOptions } from "@/lib/service-brochures";

import {
  deleteServiceBrochureAction,
  updateServiceBrochureAction,
} from "../actions";
import { ConfirmSubmitButton } from "../ConfirmSubmitButton";
import { BackofficeHeader } from "../Header";
import { ServiceBrochureUploadForm } from "./ServiceBrochureUploadForm";

export const dynamic = "force-dynamic";

type ServiceBrochuresPageProps = {
  searchParams: Promise<{
    deleted?: string;
    saved?: string;
  }>;
};

const formatDate = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
      }).format(new Date(value))
    : "Date inconnue";

export default async function ServiceBrochuresPage({
  searchParams,
}: ServiceBrochuresPageProps) {
  const user = await requireBackofficeUser();
  const { deleted, saved } = await searchParams;
  const payload = await getPayloadClient();
  const brochures = await payload.find({
    collection: "service-brochures",
    depth: 0,
    limit: 60,
    sort: "-updatedAt",
    overrideAccess: true,
  });

  return (
    <div className="bo-page">
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Plaquettes</p>
            <h1>Prestations PowerPoint</h1>
            <p className="bo-muted">
              Ajoutez les plaquettes commerciales en PowerPoint et récupérez
              leur lien de téléchargement public.
            </p>
          </div>
        </section>

        {saved ? <p className="bo-success">Plaquette mise à jour.</p> : null}
        {deleted ? <p className="bo-success">Plaquette supprimée.</p> : null}

        <div className="bo-form-stack">
          <ServiceBrochureUploadForm />

          <section
            aria-label="Plaquettes enregistrées"
            className="bo-resource-list"
          >
            {brochures.docs.map((brochure) => {
              const updateAction = updateServiceBrochureAction.bind(
                null,
                brochure.id,
              );
              const deleteAction = deleteServiceBrochureAction.bind(
                null,
                brochure.id,
              );
              const downloadHref = `/api/plaquettes-prestation/${brochure.id}/download`;

              return (
                <article className="bo-resource-item" key={brochure.id}>
                  <div className="bo-resource-content">
                    <div>
                      <p className="bo-resource-title">{brochure.title}</p>
                      <p className="bo-resource-detail">{brochure.filename}</p>
                      <p className="bo-resource-date">
                        Mise à jour le {formatDate(brochure.updatedAt)}
                      </p>
                    </div>

                    <div className="bo-resource-actions">
                      <details className="bo-resource-edit">
                        <summary className="bo-button">Modifier</summary>
                        <form action={updateAction} className="bo-resource-edit-form">
                          <label className="bo-form-field">
                            <span>Titre</span>
                            <input defaultValue={brochure.title} name="title" required />
                          </label>
                          <label className="bo-form-field">
                            <span>Catégorie</span>
                            <select
                              defaultValue={brochure.category ?? ""}
                              name="category"
                              required
                            >
                              {serviceBrochureCategoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="bo-form-field">
                            <span>Description</span>
                            <textarea
                              defaultValue={brochure.description ?? ""}
                              name="description"
                              rows={3}
                            />
                          </label>
                          <button className="bo-button bo-button-primary" type="submit">
                            Enregistrer les modifications
                          </button>
                        </form>
                      </details>
                      <a className="bo-button" href={downloadHref}>
                        Télécharger
                      </a>
                      <form action={deleteAction}>
                        <ConfirmSubmitButton
                          className="bo-button bo-danger-button"
                          confirmation={`Supprimer définitivement la plaquette « ${brochure.title} » ?`}
                          type="submit"
                        >
                          Supprimer
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}

            {brochures.docs.length === 0 ? (
              <p className="bo-empty-state">Aucune plaquette pour le moment.</p>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
