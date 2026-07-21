import { Save } from "lucide-react";

import type { PricingYear } from "@/lib/backoffice/pricing";

import { createPricingYearAction, updatePricingYearAction } from "../actions";

type PricingYearFormProps = {
  year?: PricingYear;
};

export function PricingYearForm({ year }: PricingYearFormProps) {
  const action = year?.id
    ? updatePricingYearAction.bind(null, year.id)
    : createPricingYearAction;

  return (
    <form action={action} className="bo-card bo-form-section">
      <div className="bo-section-head">
        <div>
          <p className="bo-kicker">{year ? "Saison" : "Nouvelle saison"}</p>
          <h2>{year ? "Modifier la saison" : "Ajouter une saison"}</h2>
        </div>
        <button className="bo-button bo-button-primary" type="submit">
          <Save aria-hidden="true" size={17} />
          <span>Enregistrer</span>
        </button>
      </div>

      <label className="bo-form-field">
        <span>Nom de la saison</span>
        <input defaultValue={year?.label ?? ""} name="label" required />
      </label>
    </form>
  );
}
