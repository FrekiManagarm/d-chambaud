import {
  ArrowUpRight,
  Download,
  FileText,
  Home,
  Images,
  LayoutDashboard,
  PanelsTopLeft,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { LogoutButton } from "./LogoutButton";

type HeaderProps = {
  userEmail?: string | null;
};

const navigation = [
  {
    href: "/backoffice",
    label: "Tableau de bord",
    icon: LayoutDashboard,
  },
  {
    href: "/backoffice/tarifs",
    label: "Tarifs",
    icon: Home,
  },
  {
    href: "/backoffice/a-propos",
    label: "À propos",
    icon: UserRound,
  },
  {
    href: "/backoffice/cms",
    label: "Studio CMS",
    icon: PanelsTopLeft,
  },
  {
    href: "/backoffice/articles",
    label: "Articles",
    icon: FileText,
  },
  {
    href: "/backoffice/images",
    label: "Images",
    icon: Images,
  },
  {
    href: "/backoffice/plaquettes",
    label: "Plaquettes",
    icon: Download,
  },
];

export function BackofficeHeader({ userEmail }: HeaderProps) {
  return (
    <header className="bo-header">
      <div className="bo-header-inner">
        <Link className="bo-brand" href="/backoffice">
          <span className="bo-brand-mark">DC</span>
          <span>
            <strong>Back office</strong>
            <small>David Chambaud</small>
          </span>
        </Link>

        <nav aria-label="Back office" className="bo-nav">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link className="bo-nav-link" href={item.href} key={item.href}>
                <Icon aria-hidden="true" size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="bo-header-actions">
          <Link
            className="bo-icon-button"
            href="/"
            target="_blank"
            title="Voir le site"
          >
            <ArrowUpRight aria-hidden="true" size={18} />
            <span className="sr-only">Voir le site</span>
          </Link>
          <span className="bo-user-email">{userEmail}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
