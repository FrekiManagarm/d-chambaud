import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  addOffer,
  addPricingCategory,
  addPricingYear,
  deleteOffer,
  emptyPricing,
  setActivePricingYear,
  updatePricingYear,
} from "./pricing";

describe("pricing mutations", () => {
  test("keeps exactly one active pricing year", () => {
    const first = addPricingYear(emptyPricing(), "2026-27");
    const second = addPricingYear(first, "2027-28");
    const activeSecond = setActivePricingYear(second, second.years![1]!.id!);

    assert.deepEqual(
      activeSecond.years?.map((year) => year.isActive),
      [false, true],
    );
    assert.deepEqual(
      updatePricingYear(activeSecond, activeSecond.years![0]!.id!, {
        label: "2026-2027",
      }).years?.map((year) => year.isActive),
      [false, true],
    );
  });

  test("adds and deletes an offer by id without changing its siblings", () => {
    const pricing = addPricingYear(emptyPricing(), "2026-27");
    const year = pricing.years![0]!;
    const withCategory = addPricingCategory(pricing, year.id!, "Mariages");
    const category = withCategory.years![0]!.categories![0]!;
    const withFirstOffer = addOffer(withCategory, year.id!, category.id!, {
      name: "Menu dégustation",
      price: "75 €",
    });
    const firstOffer = withFirstOffer.years![0]!.categories![0]!.offers![0]!;
    const withTwoOffers = addOffer(
      withFirstOffer,
      year.id!,
      category.id!,
      { name: "Menu signature", price: "95 €" },
    );

    const result = deleteOffer(
      withTwoOffers,
      year.id!,
      category.id!,
      firstOffer.id!,
    );

    assert.deepEqual(result.years![0]!.categories![0]!.offers, [
      withTwoOffers.years![0]!.categories![0]!.offers![1],
    ]);
    assert.equal(withTwoOffers.years![0]!.categories![0]!.offers?.length, 2);
  });

  test("throws a French error when a requested pricing id is absent", () => {
    assert.throws(
      () => updatePricingYear(emptyPricing(), "missing", { label: "2026-27" }),
      new Error("Élément tarifaire introuvable."),
    );
  });
});
