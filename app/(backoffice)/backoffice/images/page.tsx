import { Trash2 } from "lucide-react";
import Image from "next/image";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import {
  deleteMediaAction,
  updateMediaAltAction,
} from "../actions";
import { BackofficeHeader } from "../Header";
import { MediaUploadForm } from "./MediaUploadForm";

export const dynamic = "force-dynamic";

type ImagesPageProps = {
  searchParams: Promise<{
    deleted?: string;
    saved?: string;
  }>;
};

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

          <section className="bo-media-grid">
            {media.docs.map((image) => {
              const updateAction = updateMediaAltAction.bind(null, image.id);
              const deleteAction = deleteMediaAction.bind(null, image.id);
              const previewUrl = image.sizes?.thumb?.url ?? image.url;

              return (
                <article className="bo-media-card" key={image.id}>
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
                  <form action={updateAction} className="bo-media-body">
                    <label className="bo-form-field">
                      <span>Texte alternatif</span>
                      <input defaultValue={image.alt} name="alt" required />
                    </label>
                    <small>{image.filename}</small>
                    <div className="bo-media-actions">
                      <button className="bo-button" type="submit">
                        Enregistrer
                      </button>
                      <button
                        className="bo-icon-button bo-danger-button"
                        formAction={deleteAction}
                        title="Supprimer"
                        type="submit"
                      >
                        <Trash2 aria-hidden="true" size={17} />
                        <span className="sr-only">Supprimer</span>
                      </button>
                    </div>
                  </form>
                </article>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
