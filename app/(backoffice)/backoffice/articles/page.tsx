import { Edit3, Plus } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeHeader } from "../Header";

export const dynamic = "force-dynamic";

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
      <BackofficeHeader userEmail={user.email} />
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

        {saved ? <p className="bo-success">Article enregistré.</p> : null}

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
                <span className="bo-status">{post._status ?? "draft"}</span>
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
          </div>
        </section>
      </main>
    </div>
  );
}
