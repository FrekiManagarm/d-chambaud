import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";

describe("ServicesSection brochure placement", () => {
  test("keeps brochure downloads inside existing service categories", () => {
    const source = readFileSync(
      new URL("./ServicesSection.tsx", import.meta.url),
      "utf8",
    );

    assert.match(source, /Télécharger la plaquette/);
    assert.doesNotMatch(source, /service-brochures-shell/);
    assert.doesNotMatch(source, /Télécharger par prestation/);
  });
});
