"use client";

import { AlertCircle, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { serviceBrochureCategoryOptions } from "@/lib/service-brochures";

export function ServiceBrochureUploadForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = new FormData();
    const file = formData.get("file");
    const category = formData.get("category");
    const title = formData.get("title");
    const description = formData.get("description");

    if (!(file instanceof File) || file.size === 0) {
      setError("Ajoutez un fichier PowerPoint avant d'envoyer.");
      setIsLoading(false);
      return;
    }

    payload.append("file", file);
    payload.append(
      "_payload",
      JSON.stringify({
        category: typeof category === "string" ? category : "",
        title: typeof title === "string" ? title : "",
        description: typeof description === "string" ? description : "",
      }),
    );

    const response = await fetch("/api/service-brochures", {
      method: "POST",
      credentials: "include",
      body: payload,
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("La plaquette n'a pas pu être envoyée.");
      return;
    }

    form.reset();
    router.refresh();
  };

  return (
    <form className="bo-card bo-form-section" onSubmit={onSubmit}>
      <div className="bo-section-head">
        <div>
          <p className="bo-kicker">Upload</p>
          <h2>Ajouter une plaquette</h2>
        </div>
        <button
          className="bo-button bo-button-primary"
          disabled={isLoading}
          type="submit"
        >
          <Upload aria-hidden="true" size={17} />
          <span>{isLoading ? "Envoi..." : "Envoyer"}</span>
        </button>
      </div>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>PowerPoint</span>
          <input
            accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
            name="file"
            required
            type="file"
          />
        </label>
        <label className="bo-form-field">
          <span>Titre</span>
          <input name="title" placeholder="Plaquette traiteur premium" required />
        </label>
        <label className="bo-form-field">
          <span>Catégorie</span>
          <select defaultValue="" name="category" required>
            <option disabled value="">
              Choisir une catégorie
            </option>
            {serviceBrochureCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="bo-form-field bo-form-field-full">
          <span>Description</span>
          <textarea
            name="description"
            placeholder="Usage interne, version commerciale ou saison concernée."
            rows={3}
          />
        </label>
      </div>

      {error ? (
        <p className="bo-form-error">
          <AlertCircle aria-hidden="true" size={17} />
          {error}
        </p>
      ) : null}
    </form>
  );
}
