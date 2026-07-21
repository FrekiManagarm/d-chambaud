import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { revalidatePublishedResource } from "./published-resource-cache";

describe("published resource cache", () => {
  test("revalidates the public home page and media backoffice after media changes", () => {
    const paths: string[] = [];

    revalidatePublishedResource("media", (path) => {
      paths.push(path);
    });

    assert.deepEqual(paths, ["/", "/backoffice/images"]);
  });

  test("revalidates the public home page and brochure backoffice after brochure changes", () => {
    const paths: string[] = [];

    revalidatePublishedResource("service-brochures", (path) => {
      paths.push(path);
    });

    assert.deepEqual(paths, ["/", "/backoffice/plaquettes"]);
  });
});
