import { Save } from "lucide-react";

import type { HomePage, Media } from "@/payload-types";

import { ImagePickerField } from "../ImagePickerField";
import { savePavillonAction } from "../actions";

type PavillonFormProps = {
  media: Media[];
  pavillonImages?: HomePage["pavillonImages"] | null;
  pavillonText?: HomePage["pavillonText"] | null;
};

const imageRows: { key: keyof NonNullable<HomePage["pavillonImages"]>; label: string }[] = [
  { key: "main", label: "Image principale" },
  { key: "portrait", label: "Image verticale" },
  { key: "table", label: "Image de table" },
  { key: "stripOne", label: "Bandeau 1" },
  { key: "stripTwo", label: "Bandeau 2" },
  { key: "stripThree", label: "Bandeau 3" },
];

export function PavillonForm({
  media,
  pavillonImages,
  pavillonText,
}: PavillonFormProps) {
  const points = pavillonText?.points ?? [];

  return (
    <form action={savePavillonAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte du Pavillon</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={pavillonText?.eyebrow ?? ""} name="eyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={pavillonText?.titleLineOne ?? ""}
              name="titleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={pavillonText?.titleLineTwo ?? ""}
              name="titleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea defaultValue={pavillonText?.intro ?? ""} name="intro" rows={3} />
        </label>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Badge - petit titre</span>
            <input
              defaultValue={pavillonText?.badgeKicker ?? ""}
              name="badgeKicker"
            />
          </label>
          <label className="bo-form-field">
            <span>Badge - citation</span>
            <input
              defaultValue={pavillonText?.badgeQuote ?? ""}
              name="badgeQuote"
            />
          </label>
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <p className="bo-kicker">3 points clés</p>
        <div className="bo-nested-stack">
          {[0, 1, 2].map((index) => (
            <fieldset className="bo-nested-panel" key={index}>
              <legend>Point {index + 1}</legend>
              <div className="bo-form-grid">
                <label className="bo-form-field">
                  <span>Titre</span>
                  <input
                    defaultValue={points[index]?.label ?? ""}
                    name={`point.${index}.label`}
                  />
                </label>
                <label className="bo-form-field">
                  <span>Texte</span>
                  <input
                    defaultValue={points[index]?.text ?? ""}
                    name={`point.${index}.text`}
                  />
                </label>
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <p className="bo-kicker">Lien vers le site du Pavillon</p>
        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Adresse du lien</span>
            <input defaultValue={pavillonText?.linkUrl ?? ""} name="linkUrl" />
          </label>
          <label className="bo-form-field">
            <span>Libellé du lien</span>
            <input
              defaultValue={pavillonText?.linkLabel ?? ""}
              name="linkLabel"
            />
          </label>
        </div>
        <label className="bo-form-field">
          <span>Texte à côté du lien</span>
          <textarea
            defaultValue={pavillonText?.linkNote ?? ""}
            name="linkNote"
            rows={2}
          />
        </label>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Bandeau - petit titre</span>
            <input
              defaultValue={pavillonText?.stripKicker ?? ""}
              name="stripKicker"
            />
          </label>
          <label className="bo-form-field">
            <span>Bandeau - titre</span>
            <input
              defaultValue={pavillonText?.stripTitle ?? ""}
              name="stripTitle"
            />
          </label>
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <p className="bo-kicker">Images</p>
        <div className="bo-form-grid">
          {imageRows.map((row) => (
            <ImagePickerField
              currentValue={pavillonImages?.[row.key]}
              key={row.key}
              label={row.label}
              media={media}
              name={`image.${row.key}`}
            />
          ))}
        </div>
      </section>
    </form>
  );
}
