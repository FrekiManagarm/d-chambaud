import Link from "next/link";
import { notFound } from "next/navigation";

import { requireBackofficeUser } from "@/lib/backoffice/auth";
import { getPayloadClient } from "@/lib/backoffice/payload";

import { BackofficeSidebar } from "../../Sidebar";
import { ArticleForm } from "../ArticleForm";

export const dynamic = "force-dynamic";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const user = await requireBackofficeUser();
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    notFound();
  }

  const payload = await getPayloadClient();
  const post = await payload.findByID({
    collection: "posts",
    id: numericId,
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="bo-page">
      <BackofficeSidebar userEmail={user.email} />
      <main className="bo-shell">
        <section className="bo-page-head">
          <div>
            <p className="bo-kicker">Blog</p>
            <h1>Modifier l’article</h1>
          </div>
          <Link className="bo-button" href="/backoffice/articles">
            Retour
          </Link>
        </section>
        <ArticleForm post={post} />
      </main>
    </div>
  );
}
