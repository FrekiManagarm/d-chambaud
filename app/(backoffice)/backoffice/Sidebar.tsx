"use client";

import {
  ArrowUpRight,
  Download,
  FileText,
  Images,
  LayoutDashboard,
  LayoutTemplate,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoutButton } from "./LogoutButton";

type SidebarProps = {
  userEmail?: string | null;
};

const navigation = [
  {
    href: "/backoffice",
    label: "Accueil",
    icon: LayoutDashboard,
  },
  {
    href: "/backoffice/page-accueil",
    label: "Page d'accueil",
    icon: LayoutTemplate,
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

export function BackofficeSidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="bo-sidebar">
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
          const isActive =
            item.href === "/backoffice"
              ? pathname === item.href
              : pathname?.startsWith(item.href);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={
                isActive ? "bo-nav-link bo-nav-link-active" : "bo-nav-link"
              }
              href={item.href}
              key={item.href}
            >
              <Icon aria-hidden="true" size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="bo-nav-divider" />

      <nav aria-label="Réglages" className="bo-nav">
        <Link
          className="bo-nav-secondary-link"
          href="/backoffice/cms"
          title="Réservé aux réglages techniques avancés"
        >
          <Settings aria-hidden="true" size={16} />
          <span>Réglages avancés</span>
        </Link>
      </nav>

      <div className="bo-sidebar-footer">
        <Link
          className="bo-nav-secondary-link"
          href="/"
          target="_blank"
          title="Voir le site en ligne"
        >
          <ArrowUpRight aria-hidden="true" size={16} />
          <span>Voir le site</span>
        </Link>
        <div className="bo-sidebar-account">
          <span className="bo-user-email">{userEmail}</span>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
