import { Info, Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { saveTestimonialsAction } from "../actions";

type TestimonialsFormProps = {
  testimonials?: HomePage["testimonials"] | null;
};

const SPARE_ROWS = 3;

export function TestimonialsForm({ testimonials }: TestimonialsFormProps) {
  const items = testimonials?.items ?? [];
  const rowCount = items.length + SPARE_ROWS;
  const rows = Array.from({ length: rowCount }, (_, index) => items[index] ?? null);

  return (
    <form action={saveTestimonialsAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte de la section témoignages</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={testimonials?.eyebrow ?? ""} name="eyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={testimonials?.titleLineOne ?? ""}
              name="titleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={testimonials?.titleLineTwo ?? ""}
              name="titleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea
            defaultValue={testimonials?.intro ?? ""}
            name="intro"
            rows={3}
          />
        </label>

        <label className="bo-form-field">
          <span>Texte à côté de l&apos;avis mis en avant</span>
          <textarea
            defaultValue={testimonials?.featuredNote ?? ""}
            name="featuredNote"
            rows={2}
          />
        </label>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Mention sous les avis</span>
            <input
              defaultValue={testimonials?.footerNote ?? ""}
              name="footerNote"
            />
          </label>
          <label className="bo-form-field">
            <span>Libellé du lien</span>
            <input defaultValue={testimonials?.ctaLabel ?? ""} name="ctaLabel" />
          </label>
        </div>
      </section>

      <div className="bo-callout">
        <Info aria-hidden="true" size={18} />
        <span>
          Le premier avis rempli est mis en avant en haut de la section. Un
          avis avec citation et auteur vides ne sera pas enregistré.
        </span>
      </div>

      <input name="itemCount" type="hidden" value={rowCount} />

      <div className="bo-nested-stack">
        {rows.map((item, index) => (
          <fieldset className="bo-nested-panel" key={index}>
            <legend>Avis {index + 1}</legend>
            <label className="bo-form-field">
              <span>Citation</span>
              <textarea
                defaultValue={item?.quote ?? ""}
                name={`item.${index}.quote`}
                rows={3}
              />
            </label>
            <div className="bo-form-grid">
              <label className="bo-form-field">
                <span>Auteur</span>
                <input
                  defaultValue={item?.author ?? ""}
                  name={`item.${index}.author`}
                />
              </label>
              <label className="bo-form-field">
                <span>Contexte</span>
                <input
                  defaultValue={item?.occasion ?? ""}
                  name={`item.${index}.occasion`}
                />
              </label>
              <label className="bo-form-field">
                <span>Source</span>
                <select
                  defaultValue={item?.source ?? "site"}
                  name={`item.${index}.source`}
                >
                  <option value="site">Avis vérifié (site)</option>
                  <option value="tripadvisor">Tripadvisor</option>
                </select>
              </label>
            </div>
          </fieldset>
        ))}
      </div>
    </form>
  );
}
