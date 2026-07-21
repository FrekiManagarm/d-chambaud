import { Save } from "lucide-react";

import type {
  PricingCategory,
  PricingOffer,
} from "@/lib/backoffice/pricing";

import { createPricingOfferAction, updatePricingOfferAction } from "../actions";

type PricingOfferFormProps = {
  categories: PricingCategory[];
  categoryId?: string;
  offer?: PricingOffer;
  yearId: string;
};

const featuresToText = (features?: { text: string }[] | null) =>
  features?.map((feature) => feature.text).join("\n") ?? "";

export function PricingOfferForm({
  categories,
  categoryId,
  offer,
  yearId,
}: PricingOfferFormProps) {
  const action = offer?.id && categoryId
    ? updatePricingOfferAction.bind(null, yearId, categoryId, offer.id)
    : createPricingOfferAction.bind(null, yearId);

  return (
    <form action={action} className="bo-card bo-form-section">
      <div className="bo-section-head">
        <div>
          <p className="bo-kicker">{offer ? "Offre" : "Nouvelle offre"}</p>
          <h2>{offer ? "Modifier l’offre" : "Ajouter une offre"}</h2>
        </div>
        <button className="bo-button bo-button-primary" type="submit">
          <Save aria-hidden="true" size={17} />
          <span>Enregistrer</span>
        </button>
      </div>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>Nom</span>
          <input defaultValue={offer?.name ?? ""} name="name" required />
        </label>
        <label className="bo-form-field">
          <span>Catégorie</span>
          <select defaultValue={categoryId ?? ""} name="categoryId" required>
            <option disabled value="">
              Choisir une catégorie
            </option>
            {categories.map((category) =>
              category.id ? (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ) : null,
            )}
          </select>
        </label>
        <label className="bo-form-field">
          <span>Prix</span>
          <input defaultValue={offer?.price ?? ""} name="price" required />
        </label>
        <label className="bo-form-field">
          <span>Unité</span>
          <input defaultValue={offer?.unit ?? ""} name="unit" />
        </label>
      </div>

      <label className="bo-form-field">
        <span>Détail</span>
        <textarea defaultValue={offer?.detail ?? ""} name="detail" rows={3} />
      </label>

      <label className="bo-form-field">
        <span>Prestations incluses</span>
        <textarea
          defaultValue={featuresToText(offer?.features)}
          name="features"
          rows={6}
        />
        <small>Une prestation par ligne.</small>
      </label>

      <label className="bo-switch">
        <input defaultChecked={Boolean(offer?.highlight)} name="highlight" type="checkbox" />
        <span>Mettre cette offre en avant</span>
      </label>
    </form>
  );
}
