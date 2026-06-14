import { Save } from "lucide-react";

import { lexicalToPlainText } from "@/lib/backoffice/rich-text";
import type { Post } from "@/payload-types";

import { createPostAction, updatePostAction } from "../actions";

type ArticleFormProps = {
  post?: Post;
};

const toDateTimeLocal = (date?: string | null) => {
  if (!date) {
    return new Date().toISOString().slice(0, 16);
  }

  return new Date(date).toISOString().slice(0, 16);
};

export function ArticleForm({ post }: ArticleFormProps) {
  const action = post ? updatePostAction.bind(null, post.id) : createPostAction;
  const categories =
    post?.categories?.map((category) => category.label).join(", ") ?? "";

  return (
    <form action={action} className="bo-card bo-form-section">
      <div className="bo-section-head">
        <div>
          <p className="bo-kicker">{post ? "Edition" : "Nouvel article"}</p>
          <h2>{post?.title ?? "Rédiger un article"}</h2>
        </div>
        <button className="bo-button bo-button-primary" type="submit">
          <Save aria-hidden="true" size={17} />
          <span>Enregistrer</span>
        </button>
      </div>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>Titre</span>
          <input defaultValue={post?.title ?? ""} name="title" required />
        </label>
        <label className="bo-form-field">
          <span>Slug</span>
          <input
            defaultValue={post?.slug ?? ""}
            name="slug"
            placeholder="laissez vide pour générer"
          />
        </label>
        <label className="bo-form-field">
          <span>Date de publication</span>
          <input
            defaultValue={toDateTimeLocal(post?.publishedAt)}
            name="publishedAt"
            type="datetime-local"
          />
        </label>
        <label className="bo-form-field">
          <span>Statut</span>
          <select defaultValue={post?._status ?? "draft"} name="status">
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </label>
      </div>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>Auteur</span>
          <input defaultValue={post?.author ?? "David Chambaud"} name="author" />
        </label>
        <label className="bo-form-field">
          <span>Catégories</span>
          <input
            defaultValue={categories}
            name="categories"
            placeholder="Saison, Mariage, Réception"
          />
        </label>
      </div>

      <label className="bo-form-field">
        <span>Extrait</span>
        <textarea defaultValue={post?.excerpt ?? ""} name="excerpt" required rows={4} />
      </label>

      <label className="bo-form-field">
        <span>Contenu</span>
        <textarea
          defaultValue={lexicalToPlainText(post?.content)}
          name="content"
          required
          rows={14}
        />
      </label>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>Titre SEO</span>
          <input defaultValue={post?.seo?.title ?? ""} name="seoTitle" />
        </label>
        <label className="bo-form-field">
          <span>Description SEO</span>
          <textarea
            defaultValue={post?.seo?.description ?? ""}
            name="seoDescription"
            rows={3}
          />
        </label>
      </div>
    </form>
  );
}
