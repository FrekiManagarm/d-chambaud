import { readFile } from "node:fs/promises";
import path from "node:path";

import { getPayloadClient } from "@/lib/backoffice/payload";
import { createServiceBrochureDownloadHeaders } from "@/lib/service-brochures";

export const dynamic = "force-dynamic";

type DownloadRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: DownloadRouteContext) {
  const { id } = await context.params;
  const payload = await getPayloadClient();
  const brochure = await payload
    .findByID({
      collection: "service-brochures",
      id,
      depth: 0,
      overrideAccess: true,
    })
    .catch(() => null);

  if (!brochure?.filename) {
    return new Response("Plaquette introuvable", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "service-brochures",
    path.basename(brochure.filename),
  );

  try {
    const file = await readFile(filePath);

    return new Response(file, {
      headers: createServiceBrochureDownloadHeaders(brochure),
    });
  } catch {
    return new Response("Fichier introuvable", { status: 404 });
  }
}
