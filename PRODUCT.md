# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primaire (inféré du code, non confirmé par le client).** Des particuliers qui organisent une réception marquante en Gironde et en Nouvelle-Aquitaine — d'abord des couples qui préparent leur mariage. Ils cherchent un traiteur plusieurs mois à l'avance, comparent plusieurs prestataires, et arrivent souvent depuis une recherche locale ("traiteur Bordeaux", "traiteur mariage Bordeaux"). Leur job : s'assurer que le repas tiendra une journée entière sans qu'ils aient à la superviser.

**Secondaire.** Des organisateurs de réceptions professionnelles et privées — séminaires, baptêmes, anniversaires, lancements. Même job, contrainte de lieu et de timing plus forte.

**Tertiaire.** Des particuliers qui veulent une table haut de gamme chez eux, en petit comité (chef à domicile).

Base de l'inférence, à revalider avec le client : 6 pages SEO locales dont 4 orientées traiteur événementiel (`lib/seo.ts`), redirections héritées `/mariages` et `/mariage` conservées dans `next.config.ts` (le trafic mariage préexistait), stat de page d'accueil détaillée en « Mariages, domaines, séminaires », témoignages couvrant « mariages, séjours, baptêmes ou séminaires ».

## Product Purpose

Site vitrine de David Chambaud, traiteur et chef à domicile à Bordeaux et en Nouvelle-Aquitaine. Il doit convertir une recherche locale en prise de contact qualifiée : montrer le niveau de cuisine et de service, couvrir les formats de prestation, et amener au formulaire de contact ou au téléphone.

Le succès se mesure en demandes de devis pertinentes — pas en trafic. Un visiteur qui repart en ayant compris le format, la zone d'intervention et le niveau de prestation a été bien servi, même s'il ne contacte pas.

## Positioning

La promesse répétée dans tout le contenu existant : **rendre la mécanique du service invisible**. Formulée telle quelle sur le site — « rendre la cuisine invisible dans l'effort et évidente dans le plaisir », « les invités profitent sans voir la mécanique », « pas de formule plaquée ».

Concrètement, ce qu'un concurrent ne peut pas copier honnêtement : un interlocuteur unique du devis au service, et une prestation calibrée sur le lieu, la météo et le rythme réel de la journée plutôt que sur un catalogue de formules.

## Operating Context

- Prestations sur site client : domaines, châteaux, lieux de réception, domiciles privés en Gironde et alentour.
- Formats : vin d'honneur, cocktail dînatoire, buffet, repas assis, brunch du lendemain, formats hybrides.
- Cycle de décision long, souvent plusieurs mois avant l'événement, avec comparaison de prestataires.
- Le devis est un échange, pas un tarif en ligne : le site expose des repères de prix, pas un panier.
- Contenu géré par David lui-même via un back-office `/backoffice` conçu pour une personne non technique (voir `docs/superpowers/plans/2026-07-21-backoffice-simplification.md`).

## Capabilities and Constraints

- **Entité.** David Chambaud Traiteur, société DC Restauration. Créée en **2016**.
- **Contact.** contact@david-chambaud.fr · +33 6 50 75 44 06 · Instagram @chambauddavid.
- **Adresse.** 3 Rue de Lincent, 33570 Lussac.
- **Domaine canonique.** `https://david-chambaud.fr` — `www.david-chambaud.fr`, `chambaud.fr` et `www.chambaud.fr` redirigent en 301.
- **Zone d'intervention déclarée.** Bordeaux, Gironde, Saint-Émilion, Arcachon et le Bassin, Libourne, Pessac, Mérignac, Médoc, Nouvelle-Aquitaine.
- **Langue.** Français uniquement (`fr_FR`). Deux témoignages sont en anglais et cités dans leur langue d'origine.
- **Surfaces publiques.** Accueil, 6 pages SEO locales, blog + article, contact, mentions légales, sitemap, robots.
- **Surface d'administration.** `/backoffice` (interface métier) et `/admin` (Payload). Le plan versionné prévoit de retirer complètement `/admin`.
- **Prestations nommées.** Chef à domicile, Mariages, Réceptions, Traiteur — dans cet ordre sur la page d'accueil.
- **Contrainte technique.** Tout le contenu éditorial de la page d'accueil est piloté par Payload avec des valeurs de repli dans `components/landing/cms.ts` ; toute nouvelle zone de texte doit exister dans les deux.

**Non décidé.** La hiérarchie réelle entre mariages, réceptions professionnelles et chef à domicile n'a pas été confirmée par le client. La section Users porte une inférence, pas une décision.

## Brand Commitments

- **Nom d'usage.** « David Chambaud », pas « DC Restauration » (raison sociale, réservée au légal).
- **Voix existante.** Française, sobre, concrète, sensorielle sans lyrisme. Phrases courtes, souvent ternaires — « Dormir sur place, dîner juste, repartir lentement. » Elle décrit des gestes et des effets, jamais des superlatifs creux. À préserver.
- **Vocabulaire du métier à respecter.** Vin d'honneur, cocktail dînatoire, repas assis, brunch, table d'hôtes, dressage, envoi, bistronomique.
- **Le Pavillon des Millésimes.** David y est **chef résident** — le lieu ne lui appartient pas et il ne l'exploite pas. Toute formulation doit rester exacte sur ce point : il y assure la cuisine de façon permanente (table d'hôtes, séjours). Ne jamais le présenter comme son établissement.

## Evidence on Hand

Confirmé réel par le client, utilisable tel quel :

- **Témoignages.** Avis authentiques collectés sur Google, Tripadvisor et retours clients directs. Cités mot pour mot, y compris les deux en anglais. Ne pas réécrire ni lisser.
- **« 500+ prestations servies ».** Chiffre réel, pas un arrondi marketing. Détail : mariages, domaines, séminaires.
- **Photographies.** Toutes issues de ses propres prestations. Aucune banque d'images. Stockées dans `public/` et via Payload Media.

À ne pas inventer : aucun tarif public, aucun label ou distinction, aucun logo client, aucune mention presse, aucun effectif d'équipe n'est établi à ce jour. Le bloc « clients » du site ne doit pas être rempli de logos non autorisés.

**Erreur connue à corriger.** `design-qa.md` mentionne un positionnement « depuis 2008 ». C'est faux : la date qui fait foi est **2016** (`lib/seo.ts`). Toute copie affichant 2008 est à reprendre.

## Product Principles

1. **La prestation se prouve, elle ne s'annonce pas.** Photos réelles, témoignages bruts et formats concrets valent mieux que toute promesse d'excellence. Le site a la matière ; il doit s'en servir plutôt que d'ajouter des adjectifs.
2. **Un seul interlocuteur, un seul chemin.** Le parcours doit toujours mener au même endroit : un contact direct avec David. Pas de tunnel, pas de réservation automatisée, pas de configurateur.
3. **Le format prime sur le plat.** Le visiteur choisit d'abord un type d'événement, pas un menu. L'architecture du contenu suit cette logique.
4. **La recherche locale est la porte d'entrée.** Les pages géographiques ne sont pas du remplissage SEO : ce sont des points d'atterrissage réels qui méritent le même soin que l'accueil.
5. **Le back-office doit rester utilisable par David seul.** Toute évolution de contenu qui exige un développeur pour être modifiée est une régression.

## Accessibility & Inclusion

Site public grand public, consulté majoritairement sur mobile depuis une recherche locale. Un travail de contraste a déjà été mené (`design-qa.md`) : renforcement du texte secondaire, des métadonnées, des liens CTA et des aides de formulaire, plus des garde-fous de taille de titre et de ratio d'image en mobile. Ce niveau est un plancher à ne pas régresser. Aucune exigence de conformité formelle (RGAA, WCAG niveau ciblé) n'a été établie avec le client.
