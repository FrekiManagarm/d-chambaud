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
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte de la section à propos</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={about?.eyebrow ?? ""} name="eyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Libellé du lien</span>
            <input defaultValue={about?.ctaLabel ?? ""} name="ctaLabel" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={about?.titleLineOne ?? ""}
              name="titleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={about?.titleLineTwo ?? ""}
              name="titleLineTwo"
            />
          </label>
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
    </form>
  );
}
