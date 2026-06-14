import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";

import { BackofficeHeader } from "../../Header";
import { ArticleForm } from "../ArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const user = await requireBackofficeUser();

  return (
    <div className="bo-page">
      <BackofficeHeader userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Blog</p>
            <h1>Nouvel article</h1>
          </div>
          <Link className="bo-button" href="/backoffice/articles">
            Retour
          </Link>
        </section>
        <ArticleForm />
      </main>
    </div>
  );
}
