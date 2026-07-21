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

const normalizePricingYears = (years: PricingYear[]) => {
  if (years.length === 0) {
    return years;
  }

  const firstActiveIndex = years.findIndex((year) => year.isActive);
  const activeIndex = firstActiveIndex === -1 ? 0 : firstActiveIndex;

  return years.map((year, index) => ({
    ...year,
    isActive: index === activeIndex,
  }));
};

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

  return { ...pricing, years: normalizePricingYears(years) };
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
    years: normalizePricingYears([
      ...years,
      {
        id: crypto.randomUUID(),
        label,
        isActive: false,
        categories: [],
      },
    ]),
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

  return {
    ...pricing,
    years: normalizePricingYears(
      year.isActive
        ? years.map((remainingYear) => ({
            ...remainingYear,
            isActive: false,
          }))
        : years,
    ),
  };
};

export const setActivePricingYear = (
  pricing: Pricing,
  yearId: string,
): Pricing => {
  findYearIndex(pricing, yearId);

  return {
    ...pricing,
    years: normalizePricingYears(
      pricingYears(pricing).map((year) => ({
        ...year,
        isActive: year.id === yearId,
      })),
    ),
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
  values: Pick<PricingOffer, "name" | "price"> &
    Partial<
      Pick<
        PricingOffer,
        "unit" | "detail" | "features" | "highlight"
      >
    >,
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
        unit: values.unit ?? "€ / pers.",
        sub: "",
        tone: "",
        detail: values.detail ?? "",
        features: values.features ?? [],
        highlight: values.highlight ?? false,
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

export const moveOffer = (
  pricing: Pricing,
  yearId: string,
  sourceCategoryId: string,
  targetCategoryId: string,
  offerId: string,
  updates: Pick<
    PricingOffer,
    "name" | "price" | "unit" | "detail" | "features" | "highlight"
  >,
): Pricing => {
  if (sourceCategoryId === targetCategoryId) {
    return updateOffer(pricing, yearId, sourceCategoryId, offerId, updates);
  }

  const yearIndex = findYearIndex(pricing, yearId);
  const year = pricingYears(pricing)[yearIndex]!;
  const sourceCategoryIndex = findCategoryIndex(year, sourceCategoryId);
  const targetCategoryIndex = findCategoryIndex(year, targetCategoryId);
  const sourceCategory = pricingCategories(year)[sourceCategoryIndex]!;
  const offerIndex = findOfferIndex(sourceCategory, offerId);
  const offer = pricingOffers(sourceCategory)[offerIndex]!;
  const categories = [...pricingCategories(year)];

  categories[sourceCategoryIndex] = {
    ...sourceCategory,
    offers: pricingOffers(sourceCategory).filter((_, index) => index !== offerIndex),
  };
  const targetCategory = categories[targetCategoryIndex]!;
  categories[targetCategoryIndex] = {
    ...targetCategory,
    offers: [...pricingOffers(targetCategory), { ...offer, ...updates }],
  };

  return replaceYear(pricing, yearIndex, { ...year, categories });
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
