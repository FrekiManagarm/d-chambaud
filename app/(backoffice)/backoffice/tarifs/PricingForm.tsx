import { Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { savePricingAction } from "../actions";

type PricingFormProps = {
  pricing?: HomePage["pricing"] | null;
};

const emptyOffer = {
  name: "",
  price: "",
  unit: "",
  sub: "",
  tone: "",
  detail: "",
  features: [],
  highlight: false,
};

const emptyCategory = {
  label: "",
  summaryLabel: "",
  offers: [emptyOffer],
};

const emptyYear = {
  label: "",
  isActive: false,
  categories: [emptyCategory],
};

const featuresToText = (features?: { text: string }[] | null) =>
  features?.map((feature) => feature.text).join("\n") ?? "";

export function PricingForm({ pricing }: PricingFormProps) {
  const years = [...(pricing?.years ?? []), emptyYear];

  return (
    <form action={savePricingAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Texte de la section tarifs</h2>
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
            <span>Titre ligne 1</span>
            <input defaultValue={pricing?.titleLineOne ?? ""} name="titleLineOne" />
          </label>
          <label className="bo-form-field">
            <span>Titre ligne 2</span>
            <input defaultValue={pricing?.titleLineTwo ?? ""} name="titleLineTwo" />
          </label>
          <label className="bo-form-field">
            <span>Bouton</span>
            <input defaultValue={pricing?.ctaLabel ?? ""} name="ctaLabel" />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Introduction</span>
          <textarea defaultValue={pricing?.intro ?? ""} name="intro" rows={3} />
        </label>

        <label className="bo-form-field">
          <span>Note sous les offres</span>
          <textarea
            defaultValue={pricing?.footerNote ?? ""}
            name="footerNote"
            rows={3}
          />
        </label>
      </section>

      <input name="yearCount" type="hidden" value={years.length} />

      {years.map((year, yearIndex) => {
        const categories = [...(year.categories ?? []), emptyCategory];

        return (
          <section className="bo-card bo-form-section" key={yearIndex}>
            <div className="bo-section-head">
              <div>
                <p className="bo-kicker">Saison {yearIndex + 1}</p>
                <h2>{year.label || "Nouvelle saison tarifaire"}</h2>
              </div>
              <label className="bo-switch">
                <input
                  defaultChecked={Boolean(year.isActive)}
                  name={`year.${yearIndex}.isActive`}
                  type="checkbox"
                />
                <span>Afficher</span>
              </label>
            </div>

            <div className="bo-form-grid">
              <label className="bo-form-field">
                <span>Année ou saison</span>
                <input
                  defaultValue={year.label}
                  name={`year.${yearIndex}.label`}
                  placeholder="2026"
                />
              </label>
            </div>

            <input
              name={`year.${yearIndex}.categoryCount`}
              type="hidden"
              value={categories.length}
            />

            <div className="bo-nested-stack">
              {categories.map((category, categoryIndex) => {
                const offers = [...(category.offers ?? []), emptyOffer];

                return (
                  <div className="bo-nested-panel" key={categoryIndex}>
                    <div className="bo-form-grid">
                      <label className="bo-form-field">
                        <span>Catégorie</span>
                        <input
                          defaultValue={category.label}
                          name={`year.${yearIndex}.category.${categoryIndex}.label`}
                          placeholder="Mariages, réceptions..."
                        />
                      </label>
                      <label className="bo-form-field">
                        <span>Libellé résumé</span>
                        <input
                          defaultValue={category.summaryLabel ?? ""}
                          name={`year.${yearIndex}.category.${categoryIndex}.summaryLabel`}
                          placeholder="A partir de..."
                        />
                      </label>
                    </div>

                    <input
                      name={`year.${yearIndex}.category.${categoryIndex}.offerCount`}
                      type="hidden"
                      value={offers.length}
                    />

                    <div className="bo-offer-grid">
                      {offers.map((offer, offerIndex) => (
                        <fieldset
                          className="bo-offer-card"
                          key={offerIndex}
                        >
                          <legend>Offre {offerIndex + 1}</legend>
                          <div className="bo-form-grid">
                            <label className="bo-form-field">
                              <span>Nom</span>
                              <input
                                defaultValue={offer.name}
                                name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.name`}
                              />
                            </label>
                            <label className="bo-form-field">
                              <span>Prix</span>
                              <input
                                defaultValue={offer.price}
                                name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.price`}
                              />
                            </label>
                            <label className="bo-form-field">
                              <span>Unité</span>
                              <input
                                defaultValue={offer.unit ?? ""}
                                name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.unit`}
                              />
                            </label>
                            <label className="bo-form-field">
                              <span>Sous-texte</span>
                              <input
                                defaultValue={offer.sub ?? ""}
                                name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.sub`}
                              />
                            </label>
                          </div>
                          <label className="bo-form-field">
                            <span>Détail</span>
                            <textarea
                              defaultValue={offer.detail ?? ""}
                              name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.detail`}
                              rows={2}
                            />
                          </label>
                          <label className="bo-form-field">
                            <span>Points inclus</span>
                            <textarea
                              defaultValue={featuresToText(offer.features)}
                              name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.features`}
                              rows={4}
                            />
                          </label>
                          <div className="bo-inline-fields">
                            <label className="bo-form-field">
                              <span>Ton visuel</span>
                              <input
                                defaultValue={offer.tone ?? ""}
                                name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.tone`}
                                placeholder="default, dark..."
                              />
                            </label>
                            <label className="bo-switch">
                              <input
                                defaultChecked={Boolean(offer.highlight)}
                                name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.highlight`}
                                type="checkbox"
                              />
                              <span>Mise en avant</span>
                            </label>
                          </div>
                        </fieldset>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </form>
  );
}
