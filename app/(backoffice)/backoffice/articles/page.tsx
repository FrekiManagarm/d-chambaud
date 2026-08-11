import { CheckCircle2, Edit3, Plus } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeSidebar } from "../Sidebar";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  draft: "Brouillon",
  published: "Publié",
};

type ArticlesPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const user = await requireBackofficeUser();
  const { saved } = await searchParams;
  const payload = await getPayloadClient();
  const posts = await payload.find({
    collection: "posts",
    locale: "fr",
    depth: 0,
    limit: 50,
    sort: "-updatedAt",
    overrideAccess: true,
  });

  return (
    <div className="bo-page">
      <BackofficeSidebar userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Blog</p>
            <h1>Articles</h1>
          </div>
          <Link className="bo-button bo-button-primary" href="/backoffice/articles/new">
            <Plus aria-hidden="true" size={17} />
            <span>Nouvel article</span>
          </Link>
        </section>

        {saved ? (
          <p className="bo-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Article enregistré.
          </p>
        ) : null}

        <section className="bo-card">
          <div className="bo-table">
            <div className="bo-table-row bo-table-head">
              <span>Titre</span>
              <span>Statut</span>
              <span>Publication</span>
              <span />
            </div>
            {posts.docs.map((post) => (
              <div className="bo-table-row" key={post.id}>
                <span>
                  <strong>{post.title}</strong>
                  <small>{post.slug}</small>
                </span>
                <span className="bo-status">
                  {statusLabels[post._status ?? "draft"] ?? "Brouillon"}
                </span>
                <span>
                  {post.publishedAt
                    ? new Intl.DateTimeFormat("fr-FR").format(
                        new Date(post.publishedAt),
                      )
                    : "-"}
                </span>
                <Link
                  className="bo-icon-button"
                  href={`/backoffice/articles/${post.id}`}
                  title="Modifier"
                >
                  <Edit3 aria-hidden="true" size={17} />
                  <span className="sr-only">Modifier</span>
                </Link>
              </div>
            ))}

            {posts.docs.length === 0 ? (
              <p className="bo-empty-state">
                Aucun article pour le moment. Cliquez sur « Nouvel article »
                pour commencer.
              </p>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
