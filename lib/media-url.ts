const payloadFilePrefix = "/api/media/file/";

type MediaLike = {
  filename?: string | null;
  url?: string | null;
};

const toPublicAssetURL = (filename: string) => `/${encodeURI(filename)}`;

export const normalizeMediaURL = (url?: string | null) => {
  if (!url) {
    return null;
  }

  if (!url.startsWith(payloadFilePrefix)) {
    return url;
  }

  const rawFilename = url.slice(payloadFilePrefix.length).split(/[?#]/)[0];

  try {
    return toPublicAssetURL(decodeURIComponent(rawFilename));
  } catch {
    return toPublicAssetURL(rawFilename);
  }
};

export function resolveMediaURL(
  media: MediaLike | number | string | null | undefined,
  fallback: string,
): string;
export function resolveMediaURL(
  media: MediaLike | number | string | null | undefined,
  fallback?: string | null,
): string | null;
export function resolveMediaURL(
  media: MediaLike | number | string | null | undefined,
  fallback: string | null = null,
) {
  if (typeof media === "string") {
    return normalizeMediaURL(media) ?? fallback;
  }

  if (media && typeof media === "object") {
    return (
      normalizeMediaURL(media.url) ??
      (media.filename ? toPublicAssetURL(media.filename) : null) ??
      fallback
    );
  }

  return fallback;
}
