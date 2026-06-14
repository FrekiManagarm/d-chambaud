import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import type { User } from "@/payload-types";

type MeResponse = {
  user?: User | null;
};

const getOrigin = async () => {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");

  if (!host) {
    return null;
  }

  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return `${protocol}://${host}`;
};

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

export const getBackofficeUser = async () => {
  const origin = await getOrigin();

  if (!origin) {
    return null;
  }

  const response = await fetch(`${origin}/api/users/me`, {
    cache: "no-store",
    headers: {
      cookie: await getCookieHeader(),
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as MeResponse;

  return data.user ?? null;
};

export const requireBackofficeUser = async () => {
  const user = await getBackofficeUser();

  if (!user) {
    redirect("/backoffice/login");
  }

  return user;
};
