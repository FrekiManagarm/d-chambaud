import { CheckCircle2, Info, Trash2 } from "lucide-react";
import Image from "next/image";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";
import { resolveMediaURL } from "@/lib/media-url";

import {
  deleteMediaAction,
  updateMediaAltAction,
} from "../actions";
import { ConfirmSubmitButton } from "../ConfirmSubmitButton";
import { BackofficeSidebar } from "../Sidebar";
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
      <BackofficeSidebar userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Médiathèque</p>
            <h1>Images</h1>
            <p className="bo-muted">
              Ajoutez les photos utilisées sur le site et décrivez chacune
              d&apos;elles en quelques mots.
            </p>
          </div>
        </section>

        {saved ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Image mise à jour.
          </p>
        ) : null}
        {deleted ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Image supprimée.
          </p>
        ) : null}

        <div className="bo-callout">
          <Info aria-hidden="true" size={18} />
          <span>
            Le texte alternatif décrit l&apos;image pour les personnes
            malvoyantes et pour Google : soyez simple et précis, par exemple
            « Buffet dressé dans une salle de réception ».
          </span>
        </div>

        <div className="bo-form-stack">
          <MediaUploadForm />

          <section className="bo-media-grid">
            {media.docs.map((image) => {
              const updateAction = updateMediaAltAction.bind(null, image.id);
              const deleteAction = deleteMediaAction.bind(null, image.id);
              const previewUrl = resolveMediaURL(image);

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
                      <ConfirmSubmitButton
                        className="bo-icon-button bo-danger-button"
                        confirmMessage="Supprimer définitivement cette image ? Cette action est irréversible."
                        formAction={deleteAction}
                        title="Supprimer"
                        type="submit"
                      >
                        <Trash2 aria-hidden="true" size={17} />
                        <span className="sr-only">Supprimer</span>
                      </ConfirmSubmitButton>
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
