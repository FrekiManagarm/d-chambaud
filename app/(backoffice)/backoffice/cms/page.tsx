import {
  ArrowUpRight,
  Download,
  FileText,
  Home,
  Images,
  LayoutDashboard,
  Users,
} from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";

import { BackofficeHeader } from "../Header";

export const dynamic = "force-dynamic";

const payloadAreas = [
  {
    href: "/admin",
    label: "Dashboard Payload",
    description: "Vue d'ensemble native du CMS.",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/globals/home-page",
    label: "Accueil complet",
    description: "Images principales, galerie, Pavillon, à propos et tarifs.",
    icon: Home,
  },
  {
    href: "/admin/collections/media",
    label: "Médiathèque",
    description: "Upload, focal point, recadrages et textes alternatifs.",
    icon: Images,
  },
  {
    href: "/admin/collections/posts",
    label: "Articles",
    description: "Brouillons, contenu riche, image principale et SEO.",
    icon: FileText,
  },
  {
    href: "/admin/collections/service-brochures",
    label: "Plaquettes",
    description: "PowerPoint de prestation disponibles au téléchargement.",
    icon: Download,
  },
  {
    href: "/admin/collections/users",
    label: "Utilisateurs",
    description: "Comptes et accès au CMS.",
    icon: Users,
  },
];

export default async function CMSStudioPage() {
  const user = await requireBackofficeUser();

  return (
    <div className="bo-page">
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell bo-shell-wide">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Studio CMS</p>
            <h1>Interfaces Payload</h1>
            <p className="bo-muted">
              Retrouvez les écrans complets du CMS, notamment la médiathèque
              avec manipulation d&apos;image et focal point.
            </p>
          </div>
          <Link className="bo-button" href="/admin" target="_blank">
            <ArrowUpRight aria-hidden="true" size={17} />
            <span>Ouvrir Payload</span>
          </Link>
        </section>

        <section className="bo-cms-layout">
          <aside className="bo-card bo-cms-sidebar">
            <div>
              <p className="bo-kicker">Raccourcis</p>
              <h2>Zones Payload</h2>
            </div>

            <div className="bo-cms-links">
              {payloadAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <a
                    className="bo-cms-link"
                    href={area.href}
                    key={area.href}
                    target="payload-cms-frame"
                  >
                    <Icon aria-hidden="true" size={18} />
                    <span>
                      <strong>{area.label}</strong>
                      <small>{area.description}</small>
                    </span>
                  </a>
                );
              })}
            </div>
          </aside>

          <section className="bo-card bo-cms-frame-card">
            <div className="bo-cms-frame-head">
              <div>
                <p className="bo-kicker">Payload CMS</p>
                <h2>Interface native</h2>
              </div>
              <Link className="bo-button" href="/admin" target="_blank">
                <ArrowUpRight aria-hidden="true" size={17} />
                <span>Nouvel onglet</span>
              </Link>
            </div>

            <iframe
              className="bo-cms-frame"
              name="payload-cms-frame"
              src="/admin"
              title="Interface Payload CMS"
            />
          </section>
        </section>
      </main>
    </div>
  );
}
