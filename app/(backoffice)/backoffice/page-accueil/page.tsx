import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { AboutForm } from "../a-propos/AboutForm";
import { BackofficeSidebar } from "../Sidebar";
import { ClientsForm } from "../clients/ClientsForm";
import { ContactCtaForm } from "../contact/ContactCtaForm";
import { GalleryForm } from "../galerie/GalleryForm";
import { HeroForm } from "../hero/HeroForm";
import { PavillonForm } from "../pavillon/PavillonForm";
import { ServicesForm } from "../prestations/ServicesForm";
import { PricingForm } from "../tarifs/PricingForm";
import { TestimonialsForm } from "../temoignages/TestimonialsForm";
import { ValuesStatsForm } from "../valeurs/ValuesStatsForm";

export const dynamic = "force-dynamic";

const TABS = [
  { key: "hero", label: "Hero & bandeau" },
  { key: "a-propos", label: "À propos" },
  { key: "galerie", label: "Galerie" },
  { key: "valeurs", label: "Valeurs & chiffres" },
  { key: "clients", label: "Clients & zones" },
  { key: "prestations", label: "Prestations" },
  { key: "tarifs", label: "Tarifs" },
  { key: "pavillon", label: "Pavillon" },
  { key: "temoignages", label: "Témoignages" },
  { key: "contact", label: "Contact & CTA final" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const isTabKey = (value: string | undefined): value is TabKey =>
  TABS.some((tab) => tab.key === value);

type LandingPageProps = {
  searchParams: Promise<{
    tab?: string;
    saved?: string;
    seasonAdded?: string;
    offerAdded?: string;
    openYear?: string;
  }>;
};

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const user = await requireBackofficeUser();
  const { tab, saved, seasonAdded, offerAdded, openYear } = await searchParams;
  const activeTab: TabKey = isTabKey(tab) ? tab : "hero";
  const activeLabel = TABS.find((item) => item.key === activeTab)?.label ?? "";
  const openYearIndex = openYear ? Number(openYear) : undefined;

  const payload = await getPayloadClient();
  const [homePage, media] = await Promise.all([
    payload.findGlobal({
      slug: "home-page",
      locale: "fr",
      depth: 0,
      overrideAccess: true,
    }),
    payload.find({
      collection: "media",
      locale: "fr",
      depth: 0,
      limit: 200,
      sort: "-updatedAt",
      overrideAccess: true,
    }),
  ]);

  return (
    <div className="bo-page">
      <BackofficeSidebar userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Page d&apos;accueil</p>
            <h1>Tous les textes et images du site</h1>
            <p className="bo-muted">
              Choisissez une section ci-dessous. Chaque section se sauvegarde
              indépendamment, vous ne pouvez rien casser en cliquant.
            </p>
          </div>
          <Link className="bo-button" href="/" target="_blank">
            Voir le site
          </Link>
        </section>

        <nav aria-label="Sections de la page d'accueil" className="bo-tabs">
          {TABS.map((item) => (
            <Link
              className={
                item.key === activeTab ? "bo-tab bo-tab-active" : "bo-tab"
              }
              href={`/backoffice/page-accueil?tab=${item.key}`}
              key={item.key}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {saved ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            {activeLabel} enregistré.
          </p>
        ) : null}
        {seasonAdded ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Saison ajoutée. Complétez ses catégories et offres ci-dessous.
          </p>
        ) : null}
        {offerAdded ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Offre ajoutée.
          </p>
        ) : null}

        {activeTab === "hero" ? (
          <HeroForm hero={homePage.hero} marquee={homePage.marquee} />
        ) : null}
        {activeTab === "a-propos" ? (
          <AboutForm about={homePage.about} />
        ) : null}
        {activeTab === "galerie" ? (
          <GalleryForm
            gallery={homePage.gallery}
            galleryText={homePage.galleryText}
            media={media.docs}
          />
        ) : null}
        {activeTab === "valeurs" ? (
          <ValuesStatsForm stats={homePage.stats} values={homePage.values} />
        ) : null}
        {activeTab === "clients" ? (
          <ClientsForm
            clients={homePage.clients}
            media={media.docs}
            serviceAreasText={homePage.serviceAreasText}
          />
        ) : null}
        {activeTab === "prestations" ? (
          <ServicesForm
            media={media.docs}
            serviceImages={homePage.serviceImages}
            servicesText={homePage.servicesText}
          />
        ) : null}
        {activeTab === "tarifs" ? (
          <PricingForm openYearIndex={openYearIndex} pricing={homePage.pricing} />
        ) : null}
        {activeTab === "pavillon" ? (
          <PavillonForm
            media={media.docs}
            pavillonImages={homePage.pavillonImages}
            pavillonText={homePage.pavillonText}
          />
        ) : null}
        {activeTab === "temoignages" ? (
          <TestimonialsForm testimonials={homePage.testimonials} />
        ) : null}
        {activeTab === "contact" ? (
          <ContactCtaForm
            contact={homePage.contact}
            finalCta={homePage.finalCta}
            footer={homePage.footer}
          />
        ) : null}
      </main>
    </div>
  );
}
