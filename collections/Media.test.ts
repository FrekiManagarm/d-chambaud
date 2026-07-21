import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { Media } from "./Media";

describe("Media collection", () => {
  test("keeps reads public and only allows authenticated users to mutate media", () => {
    assert.equal(Media.access?.read?.({} as never), true);

    const mutations = [
      Media.access?.create,
      Media.access?.update,
      Media.access?.delete,
    ];

    for (const mutation of mutations) {
      assert.equal(mutation?.({ req: { user: null } } as never), false);
      assert.equal(mutation?.({ req: { user: {} } } as never), true);
    }
  });

  test("revalidates published media after changes and deletions", () => {
    assert.equal(Media.hooks?.afterChange?.length, 1);
    assert.equal(Media.hooks?.afterDelete?.length, 1);
  });
});
