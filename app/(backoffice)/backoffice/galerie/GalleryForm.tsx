import { Info, Save } from "lucide-react";

import type { HomePage, Media } from "@/payload-types";

import { ImagePickerField } from "../ImagePickerField";
import { saveGalleryAction } from "../actions";

type GalleryFormProps = {
  gallery?: HomePage["gallery"] | null;
  galleryText?: HomePage["galleryText"] | null;
  media: Media[];
};

const MAX_PHOTOS = 12;

export function GalleryForm({ gallery, galleryText, media }: GalleryFormProps) {
  const rows = Array.from(
    { length: MAX_PHOTOS },
    (_, index) => gallery?.[index] ?? null,
  );

  return (
    <form action={saveGalleryAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte de la galerie</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={galleryText?.eyebrow ?? ""} name="eyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={galleryText?.titleLineOne ?? ""}
              name="titleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={galleryText?.titleLineTwo ?? ""}
              name="titleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea defaultValue={galleryText?.intro ?? ""} name="intro" rows={3} />
        </label>
      </section>

      <div className="bo-callout">
        <Info aria-hidden="true" size={18} />
        <span>
          Jusqu&apos;à {MAX_PHOTOS} photos. Choisissez une image pour chaque
          emplacement que vous souhaitez utiliser ; laissez l&apos;image sur
          « par défaut » pour ne pas utiliser cet emplacement.
        </span>
      </div>

      <input name="photoCount" type="hidden" value={MAX_PHOTOS} />

      <div className="bo-nested-stack">
        {rows.map((photo, index) => (
          <fieldset className="bo-nested-panel" key={index}>
            <legend>Photo {index + 1}</legend>
            <ImagePickerField
              currentValue={photo?.image}
              label="Image"
              media={media}
              name={`photo.${index}.image`}
            />
            <div className="bo-form-grid">
              <label className="bo-form-field">
                <span>Titre</span>
                <input defaultValue={photo?.title ?? ""} name={`photo.${index}.title`} />
              </label>
              <label className="bo-form-field">
                <span>Note courte</span>
                <input defaultValue={photo?.note ?? ""} name={`photo.${index}.note`} />
              </label>
            </div>
            <div className="bo-form-grid">
              <label className="bo-form-field">
                <span>Texte alternatif</span>
                <input defaultValue={photo?.alt ?? ""} name={`photo.${index}.alt`} />
              </label>
              <label className="bo-form-field">
                <span>Position de l&apos;image</span>
                <input
                  defaultValue={photo?.position ?? "center center"}
                  name={`photo.${index}.position`}
                />
              </label>
            </div>
          </fieldset>
        ))}
      </div>
    </form>
  );
}
