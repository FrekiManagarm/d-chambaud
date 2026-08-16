import { Info, Save } from "lucide-react";

import type { HomePage, Media } from "@/payload-types";

import { ImagePickerField } from "../ImagePickerField";
import { saveClientsAction } from "../actions";

type ClientsFormProps = {
  clients?: HomePage["clients"] | null;
  media: Media[];
  serviceAreasText?: HomePage["serviceAreasText"] | null;
};

const SPARE_ROWS = 3;

export function ClientsForm({
  clients,
  media,
  serviceAreasText,
}: ClientsFormProps) {
  const logos = clients?.logos ?? [];
  const rowCount = Math.max(logos.length + SPARE_ROWS, 16);
  const rows = Array.from({ length: rowCount }, (_, index) => logos[index] ?? null);

  return (
    <form action={saveClientsAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte de la section références</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={clients?.eyebrow ?? ""} name="eyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={clients?.titleLineOne ?? ""}
              name="titleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={clients?.titleLineTwo ?? ""}
              name="titleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea defaultValue={clients?.intro ?? ""} name="intro" rows={3} />
        </label>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Zones d&apos;intervention</h2>
          </div>
        </div>
        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input
              defaultValue={serviceAreasText?.eyebrow ?? ""}
              name="areasEyebrow"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre</span>
            <input
              defaultValue={serviceAreasText?.title ?? ""}
              name="areasTitle"
            />
          </label>
        </div>
      </section>

      <div className="bo-callout">
        <Info aria-hidden="true" size={18} />
        <span>
          Laissez un emplacement sur « image par défaut » pour ne pas
          l&apos;utiliser. Ajoutez d&apos;abord vos logos depuis la page
          Images.
        </span>
      </div>

      <input name="logoCount" type="hidden" value={rowCount} />

      <div className="bo-nested-stack">
        {rows.map((logo, index) => (
          <fieldset className="bo-nested-panel" key={index}>
            <legend>Logo {index + 1}</legend>
            <ImagePickerField
              currentValue={logo?.image}
              label="Logo"
              media={media}
              name={`logo.${index}.image`}
            />
            <label className="bo-form-field">
              <span>Nom (texte alternatif)</span>
              <input defaultValue={logo?.alt ?? ""} name={`logo.${index}.alt`} />
            </label>
          </fieldset>
        ))}
      </div>
    </form>
  );
}
