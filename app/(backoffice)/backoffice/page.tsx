import {
  ArrowRight,
  Download,
  FileText,
  Images,
  LayoutTemplate,
  PanelsTopLeft,
} from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeSidebar } from "./Sidebar";

export const dynamic = "force-dynamic";

export default async function BackofficePage() {
  const user = await requireBackofficeUser();
  const payload = await getPayloadClient();

  const [posts, serviceBrochures] = await Promise.all([
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

  return (
    <div className="bo-page">
      <BackofficeSidebar userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Bienvenue</p>
            <h1>Que souhaitez-vous modifier ?</h1>
            <p className="bo-muted">
              Choisissez une carte ci-dessous. Chaque section se sauvegarde
              indépendamment, vous ne pouvez rien casser en cliquant.
            </p>
          </div>
        </section>

        <section className="bo-dashboard-grid">
          <Link className="bo-dashboard-card" href="/backoffice/page-accueil">
            <span className="bo-dashboard-card-icon">
              <LayoutTemplate aria-hidden="true" size={22} />
            </span>
            <span>Page d&apos;accueil</span>
            <strong>Tous les textes et images</strong>
            <small>
              Hero, prestations, galerie, valeurs, tarifs, pavillon,
              témoignages, clients, contact : tout se modifie au même
              endroit, par onglet.
            </small>
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
