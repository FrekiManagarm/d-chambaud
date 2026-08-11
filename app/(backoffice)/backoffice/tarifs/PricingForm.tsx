import { ChevronRight, Info, Plus, Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { addPricingOfferAction, addPricingYearAction, savePricingAction } from "../actions";
import { Modal } from "../Modal";

type PricingFormProps = {
  pricing?: HomePage["pricing"] | null;
  openYearIndex?: number;
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

const featuresToText = (features?: { text: string }[] | null) =>
  features?.map((feature) => feature.text).join("\n") ?? "";

export function PricingForm({ pricing, openYearIndex }: PricingFormProps) {
  const years = pricing?.years ?? [];
  const hasActiveYear = years.some((year) => year.isActive);

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
            <span>Texte du bouton</span>
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

      <div className="bo-callout">
        <Info aria-hidden="true" size={18} />
        <span>
          Une seule saison peut être affichée sur le site à la fois. Cliquez
          sur une saison ci-dessous pour la déplier et la modifier. Les
          champs laissés vides ne seront pas enregistrés.
        </span>
      </div>

      <div className="bo-section-head">
        <p className="bo-kicker">Saisons tarifaires</p>
        <Modal
          description="Donnez un nom à la saison. Vous pourrez ensuite ajouter ses catégories et ses offres."
          title="Ajouter une saison"
          triggerClassName="bo-button bo-button-primary"
          triggerLabel={
            <>
              <Plus aria-hidden="true" size={17} />
              <span>Ajouter une saison</span>
            </>
          }
        >
          <form action={addPricingYearAction} className="bo-modal-form">
            <label className="bo-form-field">
              <span>Année ou saison</span>
              <input autoFocus name="label" placeholder="2026" required />
            </label>
            <div className="bo-modal-actions">
              <button
                className="bo-button"
                formMethod="dialog"
                formNoValidate
                type="submit"
              >
                Annuler
              </button>
              <button className="bo-button bo-button-primary" type="submit">
                <Save aria-hidden="true" size={17} />
                <span>Créer la saison</span>
              </button>
            </div>
          </form>
        </Modal>
      </div>

      <input name="yearCount" type="hidden" value={years.length} />

      {years.length === 0 ? (
        <p className="bo-empty-state">
          Aucune saison pour le moment. Cliquez sur « Ajouter une saison »
          pour créer la première.
        </p>
      ) : null}

      {years.map((year, yearIndex) => {
        const categories = [...(year.categories ?? []), emptyCategory];
        const isDefaultOpen =
          openYearIndex !== undefined
            ? openYearIndex === yearIndex
            : year.isActive || (!hasActiveYear && yearIndex === 0);

        return (
          <details
            className="bo-season"
            key={yearIndex}
            open={isDefaultOpen || undefined}
          >
            <summary className="bo-season-summary">
              <span className="bo-season-summary-title">
                <ChevronRight
                  aria-hidden="true"
                  className="bo-season-chevron"
                  size={18}
                />
                <span>
                  <p className="bo-kicker">Saison {yearIndex + 1}</p>
                  <strong>{year.label || "Saison sans nom"}</strong>
                </span>
              </span>
              {year.isActive ? (
                <span className="bo-status">Affichée sur le site</span>
              ) : null}
            </summary>

            <div className="bo-season-body">
              <div className="bo-section-head">
                <div className="bo-form-field">
                  <span>Année ou saison</span>
                  <input
                    defaultValue={year.label}
                    name={`year.${yearIndex}.label`}
                    placeholder="2026"
                  />
                </div>
                <label className="bo-switch">
                  <input
                    defaultChecked={Boolean(year.isActive)}
                    name={`year.${yearIndex}.isActive`}
                    type="checkbox"
                  />
                  <span>Afficher cette saison sur le site</span>
                </label>
              </div>

              <input
                name={`year.${yearIndex}.categoryCount`}
                type="hidden"
                value={categories.length}
              />

              <div className="bo-nested-stack">
                {categories.map((category, categoryIndex) => {
                  const isSavedCategory =
                    categoryIndex < (year.categories?.length ?? 0);
                  const offers = category.offers ?? [];
                  const addOfferAction = addPricingOfferAction.bind(
                    null,
                    yearIndex,
                    categoryIndex,
                  );

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

                      {offers.length === 0 ? (
                        <p className="bo-empty-state">
                          Aucune offre dans cette catégorie pour le moment.
                        </p>
                      ) : (
                        <div className="bo-offer-grid">
                          {offers.map((offer, offerIndex) => (
                            <fieldset className="bo-offer-card" key={offerIndex}>
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
                                    placeholder="par personne..."
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
                                <p className="bo-help">
                                  <Info aria-hidden="true" size={14} />
                                  <span>
                                    Un point par ligne. Appuyez sur Entrée
                                    pour en ajouter un nouveau.
                                  </span>
                                </p>
                              </label>
                              <div className="bo-inline-fields">
                                <label className="bo-form-field">
                                  <span>Résumé de secours</span>
                                  <input
                                    defaultValue={offer.tone ?? ""}
                                    name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.tone`}
                                  />
                                </label>
                                <label className="bo-switch">
                                  <input
                                    defaultChecked={Boolean(offer.highlight)}
                                    name={`year.${yearIndex}.category.${categoryIndex}.offer.${offerIndex}.highlight`}
                                    type="checkbox"
                                  />
                                  <span>Mettre en avant</span>
                                </label>
                              </div>
                              <p className="bo-help">
                                <Info aria-hidden="true" size={14} />
                                <span>
                                  Le résumé de secours ne s&apos;affiche que
                                  si le champ Sous-texte est vide.
                                </span>
                              </p>
                            </fieldset>
                          ))}
                        </div>
                      )}

                      {isSavedCategory ? (
                        <Modal
                          description="Remplissez les informations de l'offre. Vous pourrez tout modifier ensuite."
                          title={`Ajouter une offre — ${category.label || "catégorie"}`}
                          triggerLabel={
                            <>
                              <Plus aria-hidden="true" size={16} />
                              <span>Ajouter une offre</span>
                            </>
                          }
                        >
                          <form action={addOfferAction} className="bo-modal-form">
                            <div className="bo-form-grid">
                              <label className="bo-form-field">
                                <span>Nom</span>
                                <input autoFocus name="name" required />
                              </label>
                              <label className="bo-form-field">
                                <span>Prix</span>
                                <input name="price" required />
                              </label>
                              <label className="bo-form-field">
                                <span>Unité</span>
                                <input name="unit" placeholder="par personne..." />
                              </label>
                              <label className="bo-form-field">
                                <span>Sous-texte</span>
                                <input name="sub" />
                              </label>
                            </div>
                            <label className="bo-form-field">
                              <span>Détail</span>
                              <textarea name="detail" rows={2} />
                            </label>
                            <label className="bo-form-field">
                              <span>Points inclus</span>
                              <textarea name="features" rows={4} />
                              <p className="bo-help">
                                <Info aria-hidden="true" size={14} />
                                <span>
                                  Un point par ligne. Appuyez sur Entrée
                                  pour en ajouter un nouveau.
                                </span>
                              </p>
                            </label>
                            <div className="bo-inline-fields">
                              <label className="bo-form-field">
                                <span>Résumé de secours</span>
                                <input name="tone" />
                              </label>
                              <label className="bo-switch">
                                <input name="highlight" type="checkbox" />
                                <span>Mettre en avant</span>
                              </label>
                            </div>
                            <div className="bo-modal-actions">
                              <button
                                className="bo-button"
                                formMethod="dialog"
                                formNoValidate
                                type="submit"
                              >
                                Annuler
                              </button>
                              <button
                                className="bo-button bo-button-primary"
                                type="submit"
                              >
                                <Save aria-hidden="true" size={17} />
                                <span>Créer l&apos;offre</span>
                              </button>
                            </div>
                          </form>
                        </Modal>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        );
      })}
    </form>
  );
}
