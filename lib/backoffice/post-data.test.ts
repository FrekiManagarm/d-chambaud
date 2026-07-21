import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { buildPostData } from "./post-data";

describe("buildPostData", () => {
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
    assert.match(data.publishedAt, /^\d{4}-\d{2}-\d{2}T/);
  });
});
