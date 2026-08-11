import { CheckCircle2, Download, Trash2 } from "lucide-react";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";
import { serviceBrochureCategoryOptions } from "@/lib/service-brochures";

import {
  deleteServiceBrochureAction,
  updateServiceBrochureAction,
} from "../actions";
import { ConfirmSubmitButton } from "../ConfirmSubmitButton";
import { BackofficeSidebar } from "../Sidebar";
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
      <BackofficeSidebar userEmail={user.email} />
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

        {saved ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Plaquette mise à jour.
          </p>
        ) : null}
        {deleted ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Plaquette supprimée.
          </p>
        ) : null}

        <div className="bo-form-stack">
          <ServiceBrochureUploadForm />

          <section className="bo-card bo-table">
            <div className="bo-table-row bo-table-head bo-brochure-row">
              <span>Titre</span>
              <span>Fichier</span>
              <span>Catégorie</span>
              <span>Mise à jour</span>
              <span>Actions</span>
            </div>

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
                <form
                  action={updateAction}
                  className="bo-table-row bo-brochure-row"
                  key={brochure.id}
                >
                  <label className="bo-form-field">
                    <span>Titre</span>
                    <input defaultValue={brochure.title} name="title" required />
                  </label>
                  <label className="bo-form-field">
                    <span>Description</span>
                    <textarea
                      defaultValue={brochure.description ?? ""}
                      name="description"
                      rows={2}
                    />
                    <small>{brochure.filename}</small>
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
                  <span>
                    <strong>{formatDate(brochure.updatedAt)}</strong>
                    <small>{brochure.mimeType}</small>
                  </span>
                  <span className="bo-media-actions">
                    <a
                      className="bo-icon-button"
                      href={downloadHref}
                      title="Télécharger"
                    >
                      <Download aria-hidden="true" size={17} />
                      <span className="sr-only">Télécharger</span>
                    </a>
                    <button className="bo-button" type="submit">
                      Enregistrer
                    </button>
                    <ConfirmSubmitButton
                      className="bo-icon-button bo-danger-button"
                      confirmMessage="Supprimer définitivement cette plaquette ? Cette action est irréversible."
                      formAction={deleteAction}
                      title="Supprimer"
                      type="submit"
                    >
                      <Trash2 aria-hidden="true" size={17} />
                      <span className="sr-only">Supprimer</span>
                    </ConfirmSubmitButton>
                  </span>
                </form>
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
