"use client";

import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { serviceBrochureCategoryOptions } from "@/lib/service-brochures";

const powerpointMimeTypes = new Set([
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

export function ServiceBrochureUploadForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = new FormData();
    const file = formData.get("file");
    const category = formData.get("category");
    const title = formData.get("title");
    const description = formData.get("description");

    if (!(file instanceof File) || file.size === 0) {
      setError("Ajoutez un fichier PowerPoint avant d'envoyer.");
      return;
    }

    const hasPowerPointExtension = /\.pptx?$/i.test(file.name);
    if (!powerpointMimeTypes.has(file.type) && !hasPowerPointExtension) {
      setError("Choisissez un fichier PowerPoint au format .ppt ou .pptx.");
      return;
    }

    if (typeof title !== "string" || !title.trim()) {
      setError("Indiquez le titre de la plaquette.");
      return;
    }

    if (
      typeof category !== "string" ||
      !serviceBrochureCategoryOptions.some(
        (option) => option.value === category,
      )
    ) {
      setError("Choisissez la catégorie correspondant à cette plaquette.");
      return;
    }

    setIsLoading(true);
    payload.append("file", file);
    payload.append(
      "_payload",
      JSON.stringify({
        category,
        title: title.trim(),
        description: typeof description === "string" ? description.trim() : "",
      }),
    );

    try {
      const response = await fetch("/api/service-brochures", {
        method: "POST",
        credentials: "include",
        body: payload,
      });

      if (!response.ok) {
        setError(
          "La plaquette n’a pas pu être ajoutée. Vérifiez le fichier PowerPoint et réessayez.",
        );
        return;
      }

      form.reset();
      router.refresh();
    } catch {
      setError("L’envoi a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="bo-card bo-form-section" onSubmit={onSubmit}>
      <div className="bo-section-head">
        <div>
          <h2>Ajouter une plaquette</h2>
        </div>
        <button
          className="bo-button bo-button-primary"
          disabled={isLoading}
          type="submit"
        >
          <Upload aria-hidden="true" size={17} />
          <span>{isLoading ? "Envoi..." : "Ajouter la plaquette"}</span>
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
        <p aria-live="polite" className="bo-form-error">
          {error}
        </p>
      ) : null}
    </form>
  );
}
