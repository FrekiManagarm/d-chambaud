import {
  ArrowUpRight,
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

import { BackofficeHeader } from "./Header";

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
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Tableau de bord</p>
            <h1>Contenu du site</h1>
          </div>
          <Link className="bo-button" href="/admin" target="_blank">
            <ArrowUpRight aria-hidden="true" size={17} />
            <span>Mode avancé</span>
          </Link>
        </section>

        <section className="bo-dashboard-grid">
          <Link className="bo-dashboard-card" href="/backoffice/a-propos">
            <UserRound aria-hidden="true" size={22} />
            <span>À propos</span>
            <strong>{aboutTitle}</strong>
            <small>Titre, paragraphes, citation et libellé du lien.</small>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/tarifs">
            <PiggyBank aria-hidden="true" size={22} />
            <span>Tarifs</span>
            <strong>{activeYear}</strong>
            <small>Offres, prix, mentions et saison affichée.</small>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/articles">
            <FileText aria-hidden="true" size={22} />
            <span>Articles</span>
            <strong>{posts.totalDocs}</strong>
            <small>Brouillons, articles publiés et contenu SEO.</small>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/images">
            <Images aria-hidden="true" size={22} />
            <span>Images</span>
            <strong>Médiathèque</strong>
            <small>Upload, aperçu et texte alternatif des visuels.</small>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/plaquettes">
            <Download aria-hidden="true" size={22} />
            <span>Plaquettes</span>
            <strong>{serviceBrochures.totalDocs}</strong>
            <small>PowerPoint de prestation, upload et téléchargement.</small>
          </Link>

          <Link className="bo-dashboard-card" href="/backoffice/cms">
            <PanelsTopLeft aria-hidden="true" size={22} />
            <span>Studio CMS</span>
            <strong>Payload</strong>
            <small>
              Interfaces complètes, manipulation d&apos;image, globals et accès
              avancés.
            </small>
          </Link>
        </section>
      </main>
    </div>
  );
}
