import { Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { savePricingSectionAction } from "../actions";

type PricingSectionFormProps = {
  pricing?: HomePage["pricing"] | null;
};

export function PricingSectionForm({ pricing }: PricingSectionFormProps) {
  return (
    <form action={savePricingSectionAction} className="bo-card bo-form-section">
      <input name="redirectTo" type="hidden" value="/backoffice/tarifs/settings" />
      <div className="bo-section-head">
        <div>
          <p className="bo-kicker">Section publique</p>
          <h2>Texte visible sur le site</h2>
        </div>
        <button className="bo-button bo-button-primary" type="submit">
          <Save aria-hidden="true" size={17} />
          <span>Enregistrer</span>
        </button>
      </div>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>Petit titre</span>
          <input defaultValue={pricing?.eyebrow ?? ""} name="eyebrow" />
        </label>
        <label className="bo-form-field">
          <span>Libellé du bouton</span>
          <input defaultValue={pricing?.ctaLabel ?? ""} name="ctaLabel" />
        </label>
        <label className="bo-form-field">
          <span>Titre ligne 1</span>
          <input defaultValue={pricing?.titleLineOne ?? ""} name="titleLineOne" />
        </label>
        <label className="bo-form-field">
          <span>Titre ligne 2</span>
          <input defaultValue={pricing?.titleLineTwo ?? ""} name="titleLineTwo" />
        </label>
      </div>

      <label className="bo-form-field">
        <span>Introduction</span>
        <textarea defaultValue={pricing?.intro ?? ""} name="intro" rows={4} />
      </label>

      <label className="bo-form-field">
        <span>Note sous les offres</span>
        <textarea defaultValue={pricing?.footerNote ?? ""} name="footerNote" rows={4} />
      </label>
    </form>
  );
}
