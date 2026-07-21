import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  buildPostData,
  isDuplicateSlugError,
  nextAvailableSlug,
} from "./post-data";

describe("buildPostData", () => {
  test("keeps a free slug unchanged", () => {
    assert.equal(nextAvailableSlug("repas-de-mariage", []), "repas-de-mariage");
  });

  test("increments a slug suffix until it is available", () => {
    assert.equal(
      nextAvailableSlug("repas-de-mariage", [
        "repas-de-mariage",
        "repas-de-mariage-2",
        "repas-de-mariage-3",
      ]),
      "repas-de-mariage-4",
    );
  });

  test("recognizes duplicate slug errors that can be retried", () => {
    assert.equal(
      isDuplicateSlugError({
        cause: { code: "23505" },
        message: "duplicate key value violates unique constraint posts_slug_key",
      }),
      true,
    );
    assert.equal(isDuplicateSlugError(new Error("Validation failed")), false);
  });

  test("builds automatic post data when creating an article", () => {
    const data = buildPostData({
      title: "Été 2026 : l’art de recevoir !",
      publishedAt: "2026-06-21T10:30",
      status: "published",
      excerpt: "Une réception estivale.",
      content: "Premier paragraphe.\n\nSecond paragraphe.",
    });

    assert.equal(data.slug, "ete-2026-l-art-de-recevoir");
    assert.equal(data.author, "David Chambaud");
    assert.deepEqual(data.categories, []);
    assert.deepEqual(data.seo, {
      title: "Été 2026 : l’art de recevoir !",
      description: "Une réception estivale.",
    });
    assert.equal(data._status, "published");
    assert.equal(data.publishedAt, "2026-06-21T10:30:00.000Z");
  });

  test("keeps the existing slug when editing an article", () => {
    const data = buildPostData(
      {
        title: "Un titre entièrement nouveau",
        publishedAt: "",
        status: "draft",
        excerpt: "Un nouvel extrait.",
        content: "Un contenu.",
      },
      { slug: "slug-a-conserver" },
    );

    assert.equal(data.slug, "slug-a-conserver");
    assert.equal(data.author, "David Chambaud");
    assert.deepEqual(data.categories, []);
    assert.deepEqual(data.seo, {
      title: "Un titre entièrement nouveau",
      description: "Un nouvel extrait.",
    });
    assert.equal(data._status, "draft");
    assert.equal(typeof data.publishedAt, "string");
    if (typeof data.publishedAt === "string") {
      assert.match(data.publishedAt, /^\d{4}-\d{2}-\d{2}T/);
    }
  });
});
