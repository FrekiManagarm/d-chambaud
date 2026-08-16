import { Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { saveContactCtaAction } from "../actions";

type ContactCtaFormProps = {
  contact?: HomePage["contact"] | null;
  finalCta?: HomePage["finalCta"] | null;
  footer?: HomePage["footer"] | null;
};

export function ContactCtaForm({
  contact,
  finalCta,
  footer,
}: ContactCtaFormProps) {
  const briefItems = contact?.briefItems ?? [];

  return (
    <form action={saveContactCtaAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte de la section contact</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input defaultValue={contact?.eyebrow ?? ""} name="contactEyebrow" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={contact?.titleLineOne ?? ""}
              name="contactTitleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={contact?.titleLineTwo ?? ""}
              name="contactTitleLineTwo"
            />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea
            defaultValue={contact?.intro ?? ""}
            name="contactIntro"
            rows={3}
          />
        </label>

        <label className="bo-form-field">
          <span>Mention délai de réponse</span>
          <textarea
            defaultValue={contact?.responseNote ?? ""}
            name="responseNote"
            rows={2}
          />
        </label>
      </section>

      <section className="bo-card bo-form-section">
        <p className="bo-kicker">4 points à préciser</p>
        <div className="bo-nested-stack">
          {[0, 1, 2, 3].map((index) => (
            <fieldset className="bo-nested-panel" key={index}>
              <legend>Point {index + 1}</legend>
              <div className="bo-form-grid">
                <label className="bo-form-field">
                  <span>Titre</span>
                  <input
                    defaultValue={briefItems[index]?.title ?? ""}
                    name={`brief.${index}.title`}
                  />
                </label>
                <label className="bo-form-field">
                  <span>Description</span>
                  <input
                    defaultValue={briefItems[index]?.desc ?? ""}
                    name={`brief.${index}.desc`}
                  />
                </label>
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>CTA final de la page d&apos;accueil</h2>
          </div>
        </div>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Petit titre</span>
            <input
              defaultValue={finalCta?.eyebrow ?? ""}
              name="finalCtaEyebrow"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 1</span>
            <input
              defaultValue={finalCta?.titleLineOne ?? ""}
              name="finalCtaTitleLineOne"
            />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input
              defaultValue={finalCta?.titleLineTwo ?? ""}
              name="finalCtaTitleLineTwo"
            />
          </label>
          <label className="bo-form-field">
            <span>Libellé du bouton</span>
            <input
              defaultValue={finalCta?.ctaLabel ?? ""}
              name="finalCtaLabel"
            />
          </label>
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Pied de page</h2>
          </div>
        </div>

        <label className="bo-form-field">
          <span>Texte de présentation</span>
          <textarea
            defaultValue={footer?.tagline ?? ""}
            name="footerTagline"
            rows={3}
          />
        </label>
      </section>
    </form>
  );
}
