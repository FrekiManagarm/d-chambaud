"use client";

import { AlertCircle, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function MediaUploadForm() {
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
    const alt = formData.get("alt");

    if (!(file instanceof File) || file.size === 0) {
      setError("Ajoutez une image avant d’envoyer.");
      setIsLoading(false);
      return;
    }

    payload.append("file", file);
    payload.append(
      "_payload",
      JSON.stringify({
        alt: typeof alt === "string" ? alt : "",
      }),
    );

    const response = await fetch("/api/media?locale=fr", {
      method: "POST",
      credentials: "include",
      body: payload,
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("L’image n’a pas pu être envoyée.");
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
          <h2>Ajouter une image</h2>
        </div>
        <button className="bo-button bo-button-primary" disabled={isLoading} type="submit">
          <Upload aria-hidden="true" size={17} />
          <span>{isLoading ? "Envoi..." : "Envoyer"}</span>
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
        <p className="bo-form-error">
          <AlertCircle aria-hidden="true" size={17} />
          {error}
        </p>
      ) : null}
    </form>
  );
}
