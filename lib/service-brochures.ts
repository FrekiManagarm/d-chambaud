const powerpointContentType =
  "application/vnd.openxmlformats-officedocument.presentationml.presentation";

export const serviceBrochureMimeTypes = [
  "application/vnd.ms-powerpoint",
  powerpointContentType,
];

export const serviceBrochureCategoryOptions = [
  { label: "Traiteur", value: "traiteur" },
  { label: "Mariages", value: "mariages" },
  { label: "Chef à domicile", value: "chef-a-domicile" },
  { label: "Réceptions", value: "receptions" },
];

export type ServiceBrochureCategory =
  (typeof serviceBrochureCategoryOptions)[number]["value"];

type ServiceBrochureFile = {
  filename?: string | null;
  mimeType?: string | null;
  title?: string | null;
};

export type ServiceBrochureSummary = {
  category?: ServiceBrochureCategory | null;
  description?: string | null;
  filename?: string | null;
  id: number | string;
  title?: string | null;
  updatedAt?: string | null;
};

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const extensionFromFilename = (filename?: string | null) => {
  const extension = filename?.match(/\.[a-z0-9]+$/i)?.[0];

  return extension?.toLowerCase() ?? ".pptx";
};

export const getServiceBrochureDownloadFilename = ({
  filename,
  title,
}: ServiceBrochureFile) => {
  const basename = title ? slugify(title) : "";

  return `${basename || "plaquette-de-prestation"}${extensionFromFilename(filename)}`;
};

export const getServiceBrochureDownloadHref = ({
  id,
}: Pick<ServiceBrochureSummary, "id">) =>
  `/api/plaquettes-prestation/${id}/download`;

export const groupServiceBrochuresByCategory = (
  brochures: ServiceBrochureSummary[],
) =>
  brochures.reduce<Partial<Record<ServiceBrochureCategory, ServiceBrochureSummary>>>(
    (grouped, brochure) => {
      if (!brochure.category) {
        return grouped;
      }

      const current = grouped[brochure.category];
      const brochureDate = Date.parse(brochure.updatedAt ?? "");
      const currentDate = Date.parse(current?.updatedAt ?? "");

      if (!current || brochureDate > currentDate) {
        grouped[brochure.category] = brochure;
      }

      return grouped;
    },
    {},
  );

export const createServiceBrochureDownloadHeaders = (
  brochure: ServiceBrochureFile,
) => {
  const headers = new Headers();
  const downloadFilename = getServiceBrochureDownloadFilename(brochure);

  headers.set("Content-Type", brochure.mimeType || powerpointContentType);
  headers.set(
    "Content-Disposition",
    `attachment; filename="${downloadFilename}"`,
  );
  headers.set("Cache-Control", "private, max-age=0, must-revalidate");

  return headers;
};
