const knownPricingErrors = new Set([
  "La saison est obligatoire.",
  "La catégorie est obligatoire.",
  "Le nom de l’offre est obligatoire.",
  "Le prix est obligatoire.",
  "Élément tarifaire introuvable.",
]);

export const formatPricingError = (error: unknown) => {
  if (error instanceof Error && knownPricingErrors.has(error.message)) {
    return error.message;
  }

  return "Impossible d’enregistrer les tarifs. Réessayez.";
};
