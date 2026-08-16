import { Save } from "lucide-react";

import type { HomePage, Media } from "@/payload-types";

import { ImagePickerField } from "../ImagePickerField";
import { saveServicesAction } from "../actions";

type ServicesFormProps = {
  media: Media[];
  serviceImages?: HomePage["serviceImages"] | null;
  servicesText?: HomePage["servicesText"] | null;
};

const serviceRows: {
  key: "traiteur" | "mariages" | "chefADomicile" | "receptions";
  label: string;
}[] = [
  { key: "traiteur", label: "Traiteur" },
  { key: "mariages", label: "Mariages" },
  { key: "chefADomicile", label: "Chef à domicile" },
  { key: "receptions", label: "Réceptions" },
];

export function ServicesForm({
  media,
  serviceImages,
  servicesText,
}: ServicesFormProps) {
  return (
    <form action={saveServicesAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Introduction de la section</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={servicesText?.eyebrow ?? ""} name="eyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={servicesText?.titleLineOne ?? ""}
              name="titleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={servicesText?.titleLineTwo ?? ""}
              name="titleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea defaultValue={servicesText?.intro ?? ""} name="intro" rows={3} />
        </label>
      </section>

      <div className="bo-nested-stack">
        {serviceRows.map((row) => {
          const value = servicesText?.[row.key];

          return (
            <fieldset className="bo-nested-panel" key={row.key}>
              <legend>{row.label}</legend>
              <div className="bo-form-grid">
                <label className="bo-form-field">
                  <span>Titre</span>
                  <input
                    defaultValue={value?.title ?? ""}
                    name={`${row.key}.title`}
                  />
                </label>
                <label className="bo-form-field">
                  <span>Sous-titre</span>
                  <input defaultValue={value?.sub ?? ""} name={`${row.key}.sub`} />
                </label>
              </div>
              <label className="bo-form-field">
                <span>Description</span>
                <textarea
                  defaultValue={value?.desc ?? ""}
                  name={`${row.key}.desc`}
                  rows={3}
                />
              </label>
              <ImagePickerField
                currentValue={serviceImages?.[row.key]}
                label="Image"
                media={media}
                name={`image.${row.key}`}
              />
            </fieldset>
          );
        })}
      </div>
    </form>
  );
}
