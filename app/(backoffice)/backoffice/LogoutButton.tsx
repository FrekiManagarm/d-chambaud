"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);

    await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/backoffice/login");
    router.refresh();
  };

  return (
    <button
      className="bo-icon-button"
      disabled={isLoading}
      onClick={logout}
      title="Se déconnecter"
      type="button"
    >
      <LogOut aria-hidden="true" size={18} />
      <span className="sr-only">Se déconnecter</span>
    </button>
  );
}
