import { Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { saveAboutAction } from "../actions";

type AboutFormProps = {
  about?: HomePage["about"] | null;
};

export function AboutForm({ about }: AboutFormProps) {
  return (
    <form action={saveAboutAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <h2>Titre</h2>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Surtitre</span>
            <input defaultValue={about?.eyebrow ?? ""} name="eyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Début du titre</span>
            <input
              defaultValue={about?.titleLineOne ?? ""}
              name="titleLineOne"
            />
          </label>
          <label className="bo-form-field bo-form-field-full">
            <span>Suite du titre</span>
            <input
              defaultValue={about?.titleLineTwo ?? ""}
              name="titleLineTwo"
            />
          </label>
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <h2>Textes</h2>
        </div>

        <label className="bo-form-field">
          <span>Premier paragraphe</span>
          <textarea
            defaultValue={about?.firstParagraph ?? ""}
            name="firstParagraph"
            rows={4}
          />
        </label>

        <label className="bo-form-field">
          <span>Deuxième paragraphe</span>
          <textarea
            defaultValue={about?.secondParagraph ?? ""}
            name="secondParagraph"
            rows={4}
          />
        </label>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <h2>Citation</h2>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Citation</span>
            <textarea defaultValue={about?.quote ?? ""} name="quote" rows={4} />
          </label>
          <label className="bo-form-field">
            <span>Auteur de la citation</span>
            <input defaultValue={about?.quoteAuthor ?? ""} name="quoteAuthor" />
          </label>
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <h2>Bouton</h2>
        </div>

        <label className="bo-form-field">
          <span>Texte du bouton</span>
          <input defaultValue={about?.ctaLabel ?? ""} name="ctaLabel" />
        </label>

        <button className="bo-button bo-button-primary" type="submit">
          <Save aria-hidden="true" size={17} />
          <span>Enregistrer</span>
        </button>
      </section>
    </form>
  );
}
