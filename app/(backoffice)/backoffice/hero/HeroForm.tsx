import { Info, Save } from "lucide-react";

import type { HomePage } from "@/payload-types";

import { saveHeroAction } from "../actions";

type HeroFormProps = {
  hero?: HomePage["hero"] | null;
  marquee?: HomePage["marquee"] | null;
};

export function HeroForm({ hero, marquee }: HeroFormProps) {
  const marqueeText = marquee?.items?.map((item) => item.text).join("\n") ?? "";

  return (
    <form action={saveHeroAction} className="bo-form-stack">
      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Grand titre d&apos;accueil</h2>
          </div>
          <button className="bo-button bo-button-primary" type="submit">
            <Save aria-hidden="true" size={17} />
            <span>Enregistrer</span>
          </button>
        </div>

        <label className="bo-form-field">
          <span>Ligne de localisation</span>
          <input defaultValue={hero?.locationLine ?? ""} name="locationLine" />
        </label>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Titre - début</span>
            <input defaultValue={hero?.titleWords ?? ""} name="titleWords" />
            <p className="bo-help">
              <Info aria-hidden="true" size={14} />
              <span>Chaque mot apparaît un par un à l&apos;écran.</span>
            </p>
          </label>
          <label className="bo-form-field">
            <span>Titre - mot en surbrillance</span>
            <input defaultValue={hero?.titleAccent ?? ""} name="titleAccent" />
          </label>
        </div>

        <label className="bo-form-field">
          <span>Sous-titre</span>
          <input defaultValue={hero?.subtitle ?? ""} name="subtitle" />
        </label>

        <label className="bo-form-field">
          <span>Ligne de prestations</span>
          <input defaultValue={hero?.tagline ?? ""} name="tagline" />
        </label>

        <div className="bo-form-grid">
          <label className="bo-form-field">
            <span>Bouton principal</span>
            <input
              defaultValue={hero?.primaryCtaLabel ?? ""}
              name="primaryCtaLabel"
            />
          </label>
          <label className="bo-form-field">
            <span>Bouton secondaire</span>
            <input
              defaultValue={hero?.secondaryCtaLabel ?? ""}
              name="secondaryCtaLabel"
            />
          </label>
        </div>
      </section>

      <section className="bo-card bo-form-section">
        <div className="bo-section-head">
          <div>
            <p className="bo-kicker">Section publique</p>
            <h2>Bandeau défilant</h2>
          </div>
        </div>

        <label className="bo-form-field">
          <span>Phrases</span>
          <textarea defaultValue={marqueeText} name="marqueeItems" rows={8} />
          <p className="bo-help">
            <Info aria-hidden="true" size={14} />
            <span>Une phrase par ligne. Elles défilent en boucle sur le site.</span>
          </p>
        </label>
      </section>
    </form>
  );
}
