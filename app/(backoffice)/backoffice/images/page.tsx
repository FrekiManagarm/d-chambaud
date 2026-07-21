import Image from "next/image";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";
import { resolveMediaURL } from "@/lib/media-url";

import {
  deleteMediaAction,
  updateMediaAltAction,
} from "../actions";
import { ConfirmSubmitButton } from "../ConfirmSubmitButton";
import { BackofficeHeader } from "../Header";
import { MediaUploadForm } from "./MediaUploadForm";

export const dynamic = "force-dynamic";

type ImagesPageProps = {
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

export default async function ImagesPage({ searchParams }: ImagesPageProps) {
  const user = await requireBackofficeUser();
  const { deleted, saved } = await searchParams;
  const payload = await getPayloadClient();
  const media = await payload.find({
    collection: "media",
    locale: "fr",
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
            <p className="bo-kicker">Médiathèque</p>
            <h1>Images</h1>
            <p className="bo-muted">
              Ajoutez les visuels du site et gardez leurs textes alternatifs à
              jour.
            </p>
          </div>
        </section>

        {saved ? <p className="bo-success">Image mise à jour.</p> : null}
        {deleted ? <p className="bo-success">Image supprimée.</p> : null}

        <div className="bo-form-stack">
          <MediaUploadForm />

          <section aria-label="Images enregistrées" className="bo-resource-list">
            {media.docs.map((image) => {
              const updateAction = updateMediaAltAction.bind(null, image.id);
              const deleteAction = deleteMediaAction.bind(null, image.id);
              const previewUrl = resolveMediaURL(image);

              return (
                <article className="bo-resource-item bo-media-item" key={image.id}>
                  <div className="bo-media-preview">
                    {previewUrl ? (
                      <Image
                        alt={image.alt}
                        fill
                        sizes="(max-width: 720px) 100vw, 33vw"
                        src={previewUrl}
                      />
                    ) : (
                      <span>Aperçu indisponible</span>
                    )}
                  </div>
                  <div className="bo-resource-content">
                    <div>
                      <p className="bo-resource-title">{image.filename}</p>
                      <p className="bo-resource-detail">
                        Texte alternatif : {image.alt}
                      </p>
                      <p className="bo-resource-date">
                        Mise à jour le {formatDate(image.updatedAt)}
                      </p>
                    </div>

                    <div className="bo-resource-actions">
                      <details className="bo-resource-edit">
                        <summary className="bo-button">Modifier</summary>
                        <form action={updateAction} className="bo-resource-edit-form">
                          <label className="bo-form-field">
                            <span>Texte alternatif</span>
                            <input defaultValue={image.alt} name="alt" required />
                          </label>
                          <button className="bo-button bo-button-primary" type="submit">
                            Enregistrer les modifications
                          </button>
                        </form>
                      </details>
                      {previewUrl ? (
                        <a className="bo-button" download={image.filename} href={previewUrl}>
                          Télécharger
                        </a>
                      ) : null}
                      <form action={deleteAction}>
                        <ConfirmSubmitButton
                          className="bo-button bo-danger-button"
                          confirmation={`Supprimer définitivement l’image « ${image.filename} » ?`}
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

            {media.docs.length === 0 ? (
              <p className="bo-empty-state">Aucune image pour le moment.</p>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
