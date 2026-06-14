"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("Identifiants incorrects ou accès refusé.");
      return;
    }

    router.push("/backoffice");
    router.refresh();
  };

  return (
    <form className="bo-login-form" onSubmit={onSubmit}>
      <div className="bo-form-field">
        <label htmlFor="email">Email</label>
        <input
          autoComplete="email"
          id="email"
          name="email"
          placeholder="admin@exemple.fr"
          required
          type="email"
        />
      </div>

      <div className="bo-form-field">
        <label htmlFor="password">Mot de passe</label>
        <input
          autoComplete="current-password"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>

      {error ? <p className="bo-form-error">{error}</p> : null}

      <button className="bo-button bo-button-primary" disabled={isLoading} type="submit">
        <LockKeyhole aria-hidden="true" size={17} />
        <span>{isLoading ? "Connexion..." : "Se connecter"}</span>
        <ArrowRight aria-hidden="true" size={17} />
      </button>
    </form>
  );
}
