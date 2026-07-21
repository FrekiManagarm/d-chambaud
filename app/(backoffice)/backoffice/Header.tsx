import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { LogoutButton } from "./LogoutButton";

type HeaderProps = {
  userEmail?: string | null;
};

export function BackofficeHeader({ userEmail }: HeaderProps) {
  return (
    <header className="bo-header">
      <div className="bo-header-inner">
        <Link className="bo-brand" href="/backoffice">
          <span className="bo-brand-mark">DC</span>
          <span>
            <strong>David Chambaud</strong>
            <small>Gestion du site</small>
          </span>
        </Link>

        <div className="bo-header-actions">
          <Link
            className="bo-button"
            href="/"
            rel="noreferrer"
            target="_blank"
          >
            <ArrowUpRight aria-hidden="true" size={18} />
            <span>Voir le site</span>
          </Link>
          <span className="bo-user-email">{userEmail}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
