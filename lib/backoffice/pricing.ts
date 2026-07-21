import type { HomePage } from "@/payload-types";

export type Pricing = NonNullable<HomePage["pricing"]>;
export type PricingYear = NonNullable<NonNullable<Pricing["years"]>[number]>;
export type PricingCategory = NonNullable<
  NonNullable<PricingYear["categories"]>[number]
>;
export type PricingOffer = NonNullable<
  NonNullable<PricingCategory["offers"]>[number]
>;

type PricingItemError = Error & { message: "Élément tarifaire introuvable." };

const missingPricingItem = (): PricingItemError =>
  new Error("Élément tarifaire introuvable.") as PricingItemError;

const pricingYears = (pricing: Pricing) => pricing.years ?? [];

const pricingCategories = (year: PricingYear) => year.categories ?? [];

const pricingOffers = (category: PricingCategory) => category.offers ?? [];

const findYearIndex = (pricing: Pricing, yearId: string) => {
  const index = pricingYears(pricing).findIndex((year) => year.id === yearId);

  if (index === -1) {
    throw missingPricingItem();
  }

  return index;
};

const findCategoryIndex = (year: PricingYear, categoryId: string) => {
  const index = pricingCategories(year).findIndex(
    (category) => category.id === categoryId,
  );

  if (index === -1) {
    throw missingPricingItem();
  }

  return index;
};

const findOfferIndex = (category: PricingCategory, offerId: string) => {
  const index = pricingOffers(category).findIndex((offer) => offer.id === offerId);

  if (index === -1) {
    throw missingPricingItem();
  }

  return index;
};

const replaceYear = (
  pricing: Pricing,
  yearIndex: number,
  year: PricingYear,
): Pricing => {
  const years = [...pricingYears(pricing)];
  years[yearIndex] = year;

  return { ...pricing, years };
};

const replaceCategory = (
  pricing: Pricing,
  yearId: string,
  categoryId: string,
  category: PricingCategory,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const categoryIndex = findCategoryIndex(year, categoryId);
  const categories = [...pricingCategories(year)];
  categories[categoryIndex] = category;

  return replaceYear(pricing, yearIndex, { ...year, categories });
};

export const emptyPricing = (): Pricing => ({
  eyebrow: "",
  titleLineOne: "",
  titleLineTwo: "",
  intro: "",
  footerNote: "",
  ctaLabel: "",
  years: [],
});

export const addPricingYear = (pricing: Pricing, label: string): Pricing => {
  const years = pricingYears(pricing);

  return {
    ...pricing,
    years: [
      ...years,
      {
        id: crypto.randomUUID(),
        label,
        isActive: !years.some((year) => year.isActive),
        categories: [],
      },
    ],
  };
};

export const updatePricingYear = (
  pricing: Pricing,
  yearId: string,
  updates: Pick<PricingYear, "label">,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;

  return replaceYear(pricing, yearIndex, { ...year, ...updates });
};

export const deletePricingYear = (pricing: Pricing, yearId: string): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const years = pricingYears(pricing).filter((_, index) => index !== yearIndex);

  if (!year.isActive) {
    return { ...pricing, years };
  }

  return {
    ...pricing,
    years: years.map((remainingYear, index) => ({
      ...remainingYear,
      isActive: index === 0,
    })),
  };
};

export const setActivePricingYear = (
  pricing: Pricing,
  yearId: string,
): Pricing => {
  findYearIndex(pricing, yearId);

  return {
    ...pricing,
    years: pricingYears(pricing).map((year) => ({
      ...year,
      isActive: year.id === yearId,
    })),
  };
};

export const addPricingCategory = (
  pricing: Pricing,
  yearId: string,
  label: string,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;

  return replaceYear(pricing, yearIndex, {
    ...year,
    categories: [
      ...pricingCategories(year),
      {
        id: crypto.randomUUID(),
        label,
        summaryLabel: "Sur mesure",
        offers: [],
      },
    ],
  });
};

export const updatePricingCategory = (
  pricing: Pricing,
  yearId: string,
  categoryId: string,
  updates: Pick<PricingCategory, "label" | "summaryLabel">,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const categoryIndex = findCategoryIndex(year, categoryId);
  const category = pricingCategories(year)[categoryIndex]!;

  return replaceCategory(pricing, yearId, categoryId, { ...category, ...updates });
};

export const deletePricingCategory = (
  pricing: Pricing,
  yearId: string,
  categoryId: string,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const categoryIndex = findCategoryIndex(year, categoryId);

  return replaceYear(pricing, yearIndex, {
    ...year,
    categories: pricingCategories(year).filter((_, index) => index !== categoryIndex),
  });
};

export const addOffer = (
  pricing: Pricing,
  yearId: string,
  categoryId: string,
  values: Pick<PricingOffer, "name" | "price">,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const categoryIndex = findCategoryIndex(year, categoryId);
  const category = pricingCategories(year)[categoryIndex]!;

  return replaceCategory(pricing, yearId, categoryId, {
    ...category,
    offers: [
      ...pricingOffers(category),
      {
        id: crypto.randomUUID(),
        name: values.name,
        price: values.price,
        unit: "€ / pers.",
        sub: "",
        tone: "",
        detail: "",
        features: [],
        highlight: false,
      },
    ],
  });
};

export const updateOffer = (
  pricing: Pricing,
  yearId: string,
  categoryId: string,
  offerId: string,
  updates: Pick<
    PricingOffer,
    "name" | "price" | "unit" | "detail" | "features" | "highlight"
  >,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const categoryIndex = findCategoryIndex(year, categoryId);
  const category = pricingCategories(year)[categoryIndex]!;
  const offerIndex = findOfferIndex(category, offerId);
  const offers = [...pricingOffers(category)];
  offers[offerIndex] = { ...offers[offerIndex]!, ...updates };

  return replaceCategory(pricing, yearId, categoryId, { ...category, offers });
};

export const deleteOffer = (
  pricing: Pricing,
  yearId: string,
  categoryId: string,
  offerId: string,
): Pricing => {
  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const categoryIndex = findCategoryIndex(year, categoryId);
  const category = pricingCategories(year)[categoryIndex]!;
  const offerIndex = findOfferIndex(category, offerId);

  return replaceCategory(pricing, yearId, categoryId, {
    ...category,
    offers: pricingOffers(category).filter((_, index) => index !== offerIndex),
  });
};
