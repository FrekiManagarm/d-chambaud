import { Edit3, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { deletePostAction } from "../actions";
import { ConfirmSubmitButton } from "../ConfirmSubmitButton";
import { BackofficeHeader } from "../Header";

export const dynamic = "force-dynamic";

type ArticlesPageProps = {
  searchParams: Promise<{
    deleted?: string;
    saved?: string;
  }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const user = await requireBackofficeUser();
  const { deleted, saved } = await searchParams;
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
        {deleted ? <p className="bo-success">Article supprimé.</p> : null}

        <section className="bo-card">
          <div className="bo-table">
            <div className="bo-table-row bo-table-head">
              <span>Titre</span>
              <span>Statut</span>
              <span>Publication</span>
              <span />
            </div>
            {posts.docs.map((post) => {
              const deleteAction = deletePostAction.bind(null, post.id);

              return (
                <div className="bo-table-row" key={post.id}>
                  <span>
                    <strong>{post.title}</strong>
                    <small>{post.excerpt}</small>
                  </span>
                  <span className="bo-status">
                    {post._status === "published" ? "Publié" : "Brouillon"}
                  </span>
                  <span>
                    {post.publishedAt
                      ? new Intl.DateTimeFormat("fr-FR").format(
                          new Date(post.publishedAt),
                        )
                      : "-"}
                  </span>
                  <span className="bo-media-actions">
                    <Link
                      className="bo-icon-button"
                      href={`/backoffice/articles/${post.id}`}
                      title="Modifier"
                    >
                      <Edit3 aria-hidden="true" size={17} />
                      <span className="sr-only">Modifier</span>
                    </Link>
                    <form action={deleteAction}>
                      <ConfirmSubmitButton
                        className="bo-icon-button bo-danger-button"
                        confirmation={`Supprimer définitivement l’article « ${post.title} » ?`}
                        title="Supprimer"
                        type="submit"
                      >
                        <Trash2 aria-hidden="true" size={17} />
                        <span className="sr-only">Supprimer</span>
                      </ConfirmSubmitButton>
                    </form>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
