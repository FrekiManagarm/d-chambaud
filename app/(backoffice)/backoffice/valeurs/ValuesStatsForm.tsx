import { Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { saveValuesStatsAction } from "../actions";

type ValuesStatsFormProps = {
  stats?: HomePage["stats"] | null;
  values?: HomePage["values"] | null;
};

export function ValuesStatsForm({ stats, values }: ValuesStatsFormProps) {
  const bands = values?.bands ?? [];
  const statItems = stats?.items ?? [];

  return (
    <form action={saveValuesStatsAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte de la section valeurs</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={values?.eyebrow ?? ""} name="valuesEyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={values?.titleLineOne ?? ""}
              name="valuesTitleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={values?.titleLineTwo ?? ""}
              name="valuesTitleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea
            defaultValue={values?.intro ?? ""}
            name="valuesIntro"
            rows={3}
          />
        </label>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Badge - petit titre</span>
            <input
              defaultValue={values?.signatureKicker ?? ""}
              name="signatureKicker"
            />
          </label>
          <label className="bo-form-field">
            <span>Badge - citation</span>
            <input
              defaultValue={values?.signatureQuote ?? ""}
              name="signatureQuote"
            />
          </label>
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <p className="bo-kicker">3 étapes du repas</p>
        <div className="bo-nested-stack">
          {[0, 1, 2].map((index) => (
            <fieldset className="bo-nested-panel" key={index}>
              <legend>Étape {index + 1}</legend>
              <label className="bo-form-field">
                <span>Titre</span>
                <input
                  defaultValue={bands[index]?.title ?? ""}
                  name={`band.${index}.title`}
                />
              </label>
              <label className="bo-form-field">
                <span>Description</span>
                <textarea
                  defaultValue={bands[index]?.desc ?? ""}
                  name={`band.${index}.desc`}
                  rows={2}
                />
              </label>
            </fieldset>
          ))}
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte des chiffres clés</h2>
          </div>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={stats?.eyebrow ?? ""} name="statsEyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={stats?.titleLineOne ?? ""}
              name="statsTitleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={stats?.titleLineTwo ?? ""}
              name="statsTitleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea defaultValue={stats?.intro ?? ""} name="statsIntro" rows={3} />
        </label>

        <div className="bo-nested-stack">
          {[0, 1, 2, 3].map((index) => (
            <fieldset className="bo-nested-panel" key={index}>
              <legend>Chiffre {index + 1}</legend>
              <div className="bo-form-grid">
                <label className="bo-form-field">
                  <span>Valeur</span>
                  <input
                    defaultValue={statItems[index]?.value ?? ""}
                    name={`stat.${index}.value`}
                    type="number"
                  />
                </label>
                <label className="bo-form-field">
                  <span>Suffixe (ex: +, %, ans)</span>
                  <input
                    defaultValue={statItems[index]?.suffix ?? ""}
                    name={`stat.${index}.suffix`}
                  />
                </label>
              </div>
              <div className="bo-form-grid">
                <label className="bo-form-field">
                  <span>Libellé</span>
                  <input
                    defaultValue={statItems[index]?.label ?? ""}
                    name={`stat.${index}.label`}
                  />
                </label>
                <label className="bo-form-field">
                  <span>Détail</span>
                  <input
                    defaultValue={statItems[index]?.detail ?? ""}
                    name={`stat.${index}.detail`}
                  />
                </label>
              </div>
            </fieldset>
          ))}
        </div>
      </section>
    </form>
  );
}
