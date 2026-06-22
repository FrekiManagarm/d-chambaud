import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  createServiceBrochureDownloadHeaders,
  getServiceBrochureDownloadFilename,
  getServiceBrochureDownloadHref,
  groupServiceBrochuresByCategory,
} from "./service-brochures";

describe("service brochure downloads", () => {
  test("builds an attachment filename from the brochure title and extension", () => {
    assert.equal(
      getServiceBrochureDownloadFilename({
        filename: "offre-traiteur.pptx",
        title: "Plaquette Événementiel 2026",
      }),
      "plaquette-evenementiel-2026.pptx",
    );
  });

  test("sets PowerPoint download headers", () => {
    const headers = createServiceBrochureDownloadHeaders({
      filename: "offre.pptx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      title: "Offre premium",
    });

    assert.equal(
      headers.get("Content-Type"),
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    );
    assert.equal(
      headers.get("Content-Disposition"),
      'attachment; filename="offre-premium.pptx"',
    );
    assert.equal(
      headers.get("Cache-Control"),
      "private, max-age=0, must-revalidate",
    );
  });

  test("creates public download URLs from brochure ids", () => {
    assert.equal(
      getServiceBrochureDownloadHref({ id: 12 }),
      "/api/plaquettes-prestation/12/download",
    );
  });

  test("groups the latest brochure by visitor-facing category", () => {
    const grouped = groupServiceBrochuresByCategory([
      {
        category: "mariages",
        id: 1,
        title: "Ancienne plaquette mariage",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
      {
        category: "mariages",
        id: 2,
        title: "Plaquette mariage",
        updatedAt: "2026-02-01T00:00:00.000Z",
      },
      {
        category: "chef-a-domicile",
        id: 3,
        title: "Chef privé",
        updatedAt: "2026-01-15T00:00:00.000Z",
      },
      {
        category: null,
        id: 4,
        title: "Sans catégorie",
        updatedAt: "2026-03-01T00:00:00.000Z",
      },
    ]);

    assert.equal(grouped.mariages?.id, 2);
    assert.equal(grouped["chef-a-domicile"]?.id, 3);
    assert.equal(grouped.traiteur, undefined);
  });
});
