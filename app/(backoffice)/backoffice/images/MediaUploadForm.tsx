"use client";

import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function MediaUploadForm() {
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
    const alt = formData.get("alt");

    if (!(file instanceof File) || file.size === 0) {
      setError("Ajoutez une image avant d’envoyer.");
      return;
    }

    if (file.type && !file.type.startsWith("image/")) {
      setError("Choisissez un fichier image, par exemple JPG, PNG ou WebP.");
      return;
    }

    if (typeof alt !== "string" || !alt.trim()) {
      setError("Indiquez le texte alternatif de l’image.");
      return;
    }

    setIsLoading(true);
    payload.append("file", file);
    payload.append(
      "_payload",
      JSON.stringify({
        alt: alt.trim(),
      }),
    );

    try {
      const response = await fetch("/api/media?locale=fr", {
        method: "POST",
        credentials: "include",
        body: payload,
      });

      if (!response.ok) {
        setError(
          "L’image n’a pas pu être ajoutée. Vérifiez le fichier et réessayez.",
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
          <h2>Ajouter une image</h2>
        </div>
        <button className="bo-button bo-button-primary" disabled={isLoading} type="submit">
          <Upload aria-hidden="true" size={17} />
          <span>{isLoading ? "Envoi..." : "Ajouter l’image"}</span>
        </button>
      </div>

      <div className="bo-form-grid">
        <label className="bo-form-field">
          <span>Image</span>
          <input accept="image/*" name="file" required type="file" />
        </label>
        <label className="bo-form-field">
          <span>Texte alternatif</span>
          <input name="alt" placeholder="Buffet dressé dans une salle de réception" required />
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
