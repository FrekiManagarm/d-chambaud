import { revalidatePath } from "next/cache";

const publishedResourcePaths = {
  media: ["/", "/backoffice/images"],
  "service-brochures": ["/", "/backoffice/plaquettes"],
} as const;

export type PublishedResource = keyof typeof publishedResourcePaths;

export const revalidatePublishedResource = (
  resource: PublishedResource,
  revalidate = revalidatePath,
) => {
  for (const path of publishedResourcePaths[resource]) {
    revalidate(path);
  }
};
