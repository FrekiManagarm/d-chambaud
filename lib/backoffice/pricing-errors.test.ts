import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { formatPricingError } from "./pricing-errors";

describe("pricing error messages", () => {
  test("keeps known French validation messages", () => {
    assert.equal(
      formatPricingError(new Error("La saison est obligatoire.")),
      "La saison est obligatoire.",
    );
  });

  test("hides unexpected persistence errors behind a French message", () => {
    assert.equal(
      formatPricingError(new Error("Payload validation failed")),
      "Impossible d’enregistrer les tarifs. Réessayez.",
    );
  });
});
