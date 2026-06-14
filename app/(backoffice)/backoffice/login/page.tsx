import { redirect } from "next/navigation";

import { getBackofficeUser } from "@/lib/backoffice/auth";

import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function BackofficeLoginPage() {
  const user = await getBackofficeUser();

  if (user) {
    redirect("/backoffice");
  }

  return (
    <main className="bo-login-page">
      <section className="bo-login-panel">
        <div>
          <p className="bo-kicker">Accès privé</p>
          <h1>Back office</h1>
          <p className="bo-muted">
            Connectez-vous pour modifier les tarifs, les offres et les articles
            du site.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
