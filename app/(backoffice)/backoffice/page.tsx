import {
  ArrowRight,
  Download,
  FileText,
  Images,
  PanelsTopLeft,
  PiggyBank,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeSidebar } from "./Sidebar";

export const dynamic = "force-dynamic";

export default async function BackofficePage() {
  const user = await requireBackofficeUser();
  const payload = await getPayloadClient();

  const [homePage, posts, serviceBrochures] = await Promise.all([
    payload.findGlobal({
      slug: "home-page",
      locale: "fr",
      depth: 0,
      overrideAccess: true,
    }),
    payload.find({
      collection: "posts",
      locale: "fr",
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: true,
    }),
    payload.find({
      collection: "service-brochures",
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: true,
    }),
  ]);

  const activeYear =
    homePage.pricing?.years?.find((year) => year.isActive)?.label ??
    homePage.pricing?.years?.[0]?.label ??
    "Aucune saison";
  const aboutTitle = homePage.about?.titleLineOne || "Présentation";

  return (
    <div className="bo-page">
      <BackofficeSidebar userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Bienvenue</p>
            <h1>Que souhaitez-vous modifier ?</h1>
            <p className="bo-muted">
              Choisissez une carte ci-dessous. Chaque page se sauvegarde
              indépendamment, vous ne pouvez rien casser en cliquant.
            </p>
          </div>
        </section>

        <section className="bo-dashboard-grid">
          <Link className="bo-dashboard-card" href="/backoffice/a-propos">
            <span className="bo-dashboard-card-icon">
              <UserRound aria-hidden="true" size={22} />
            </span>
            <span>À propos</span>
            <strong>{aboutTitle}</strong>
            <small>Le texte de présentation affiché sur la page d&apos;accueil.</small>
            <span className="bo-dashboard-card-arrow">
              Modifier <ArrowRight aria-hidden="true" size={15} />
            </span>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/tarifs">
            <span className="bo-dashboard-card-icon">
              <PiggyBank aria-hidden="true" size={22} />
            </span>
            <span>Tarifs</span>
            <strong>{activeYear}</strong>
            <small>Les offres, les prix et la saison affichée sur le site.</small>
            <span className="bo-dashboard-card-arrow">
              Modifier <ArrowRight aria-hidden="true" size={15} />
            </span>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/articles">
            <span className="bo-dashboard-card-icon">
              <FileText aria-hidden="true" size={22} />
            </span>
            <span>Articles</span>
            <strong>{posts.totalDocs} article{posts.totalDocs > 1 ? "s" : ""}</strong>
            <small>Les articles du blog, publiés ou en brouillon.</small>
            <span className="bo-dashboard-card-arrow">
              Modifier <ArrowRight aria-hidden="true" size={15} />
            </span>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/images">
            <span className="bo-dashboard-card-icon">
              <Images aria-hidden="true" size={22} />
            </span>
            <span>Images</span>
            <strong>Médiathèque</strong>
            <small>Ajoutez ou supprimez les photos utilisées sur le site.</small>
            <span className="bo-dashboard-card-arrow">
              Modifier <ArrowRight aria-hidden="true" size={15} />
            </span>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/plaquettes">
            <span className="bo-dashboard-card-icon">
              <Download aria-hidden="true" size={22} />
            </span>
            <span>Plaquettes</span>
            <strong>
              {serviceBrochures.totalDocs} document
              {serviceBrochures.totalDocs > 1 ? "s" : ""}
            </strong>
            <small>Les documents PowerPoint à télécharger par vos clients.</small>
            <span className="bo-dashboard-card-arrow">
              Modifier <ArrowRight aria-hidden="true" size={15} />
            </span>
          </Link>
        </section>

        <section className="bo-dashboard-secondary">
          <p className="bo-kicker">Pour aller plus loin</p>
          <div className="bo-dashboard-grid">
            <Link
              className="bo-dashboard-card bo-dashboard-card-muted"
              href="/backoffice/cms"
            >
              <span className="bo-dashboard-card-icon">
                <PanelsTopLeft aria-hidden="true" size={22} />
              </span>
              <span>Réglages avancés</span>
              <strong>Studio Payload</strong>
              <small>
                Réservé aux réglages techniques : recadrage d&apos;image,
                champs avancés. À utiliser avec précaution.
              </small>
              <span className="bo-dashboard-card-arrow">
                Ouvrir <ArrowRight aria-hidden="true" size={15} />
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
