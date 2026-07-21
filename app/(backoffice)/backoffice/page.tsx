import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";

import { BackofficeHeader } from "./Header";

export const dynamic = "force-dynamic";

const actions = [
  {
    href: "/backoffice/tarifs",
    label: "Tarifs",
    description: "Saisons, catégories et offres",
  },
  {
    href: "/backoffice/a-propos",
    label: "Présentation",
    description: "Titre, textes, citation et bouton",
  },
  {
    href: "/backoffice/articles",
    label: "Articles",
    description: "Créer, modifier ou publier",
  },
  {
    href: "/backoffice/images",
    label: "Images",
    description: "Photos et descriptions",
  },
  {
    href: "/backoffice/plaquettes",
    label: "Plaquettes",
    description: "Fichiers à télécharger",
  },
];

export default async function BackofficePage() {
  const user = await requireBackofficeUser();

  return (
    <div className="bo-page">
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <h1>Que voulez-vous faire ?</h1>
        </section>

        <section className="bo-dashboard-grid">
          {actions.map((action) => (
            <Link
              className="bo-dashboard-card"
              href={action.href}
              key={action.href}
            >
              <span>{action.label}</span>
              <strong>{action.description}</strong>
              <ArrowRight aria-hidden="true" size={22} />
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
