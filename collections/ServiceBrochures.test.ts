import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  ServiceBrochures,
  serviceBrochureCategoryOptions,
  serviceBrochureMimeTypes,
} from "./ServiceBrochures";

describe("ServiceBrochures collection", () => {
  test("accepts PowerPoint files and exposes brochure metadata in Payload", () => {
    assert.equal(ServiceBrochures.slug, "service-brochures");
    assert.deepEqual(ServiceBrochures.labels, {
      singular: "Plaquette de prestation",
      plural: "Plaquettes de prestation",
    });
    assert.deepEqual(ServiceBrochures.admin, {
      defaultColumns: ["title", "filename", "updatedAt"],
      group: "Contenu",
      useAsTitle: "title",
    });
    assert.deepEqual(ServiceBrochures.upload, {
      staticDir: "service-brochures",
      mimeTypes: serviceBrochureMimeTypes,
    });
    assert.deepEqual(serviceBrochureMimeTypes, [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ]);
    assert.equal(ServiceBrochures.access?.read?.({} as never), true);
  });

  test("requires a title field for backoffice and download labels", () => {
    assert.ok(
      ServiceBrochures.fields.some(
        (field) =>
          "name" in field &&
          field.name === "title" &&
          field.type === "text" &&
          field.label === "Titre" &&
          field.required === true,
      ),
    );
    assert.ok(
      ServiceBrochures.fields.some(
        (field) =>
          "name" in field &&
          field.name === "description" &&
          field.type === "textarea" &&
          field.label === "Description",
      ),
    );
  });

  test("requires one visitor-facing service category", () => {
    assert.deepEqual(serviceBrochureCategoryOptions, [
      { label: "Traiteur", value: "traiteur" },
      { label: "Mariages", value: "mariages" },
      { label: "Chef à domicile", value: "chef-a-domicile" },
      { label: "Réceptions", value: "receptions" },
    ]);
    assert.ok(
      ServiceBrochures.fields.some(
        (field) =>
          "name" in field &&
          field.name === "category" &&
          field.type === "select" &&
          field.label === "Catégorie" &&
          field.required === true &&
          field.admin?.position === "sidebar",
      ),
    );
  });
});
