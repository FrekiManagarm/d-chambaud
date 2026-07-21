import { Save } from "lucide-react";

import type { PricingCategory } from "@/lib/backoffice/pricing";

import {
  createPricingCategoryAction,
  updatePricingCategoryAction,
} from "../actions";

type PricingCategoryFormProps = {
  category?: PricingCategory;
  redirectTo: string;
  yearId: string;
};

export function PricingCategoryForm({
  category,
  redirectTo,
  yearId,
}: PricingCategoryFormProps) {
  const action = category?.id
    ? updatePricingCategoryAction.bind(null, yearId, category.id)
    : createPricingCategoryAction.bind(null, yearId);

  return (
    <form action={action} className="bo-card bo-form-section">
      <input name="redirectTo" type="hidden" value={redirectTo} />
      <div className="bo-section-head">
        <div>
          <p className="bo-kicker">{category ? "Catégorie" : "Nouvelle catégorie"}</p>
          <h2>{category ? "Modifier la catégorie" : "Ajouter une catégorie"}</h2>
        </div>
        <button className="bo-button bo-button-primary" type="submit">
          <Save aria-hidden="true" size={17} />
          <span>Enregistrer</span>
        </button>
      </div>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>Nom</span>
          <input defaultValue={category?.label ?? ""} name="label" required />
        </label>
        <label className="bo-form-field">
          <span>Libellé résumé</span>
          <input defaultValue={category?.summaryLabel ?? ""} name="summaryLabel" />
        </label>
      </div>
    </form>
  );
}
