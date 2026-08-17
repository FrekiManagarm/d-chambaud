# Simplification du back office Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fournir un unique back office `/backoffice`, compréhensible par une personne non technique, et retirer complètement l'interface Payload sur `/admin`.

**Architecture:** Le site conserve Payload comme couche de données et d'authentification, mais seules les routes applicatives du groupe `(backoffice)` exposent des écrans de gestion. Les mutations restent des Server Actions protégées ; la logique de transformation des tarifs et des articles est isolée dans `lib/backoffice` afin de pouvoir la tester sans base de données.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Payload 3, Server Actions, Bun test, Lucide.

---

## File structure

| Fichier | Responsabilité |
| --- | --- |
| `app/(payload)/admin/[[...segments]]/page.tsx` | À supprimer : route `/admin` Payload. |
| `app/(payload)/admin/importMap.js` | À supprimer : carte d'import réservée à l'admin Payload. |
| `app/(payload)/layout.tsx`, `app/(payload)/custom.scss` | À supprimer : layout et styles exclusivement nécessaires à l'admin Payload. Les routes API Payload restent en place. |
| `lib/backoffice/pricing.ts` | Lire et modifier les saisons, catégories et offres stockées dans la structure Payload existante. |
| `lib/backoffice/pricing.test.ts` | Tester les transformations de tarifs sans serveur. |
| `lib/backoffice/post-data.ts` | Construire les données minimales d'un article et générer ses champs techniques. |
| `lib/backoffice/post-data.test.ts` | Tester slug, SEO, auteur, date et statut automatiques. |
| `app/(backoffice)/backoffice/actions.ts` | Server Actions authentifiées pour chaque écriture, revalidation et redirection. |
| `app/(backoffice)/backoffice/ConfirmSubmitButton.tsx` | Bouton client réutilisable qui demande confirmation avant une suppression. |
| `app/(backoffice)/backoffice/Header.tsx` | En-tête réduit à l'identité, la visite du site et la déconnexion. |
| `app/(backoffice)/backoffice/page.tsx` | Accueil « Que voulez-vous faire ? » et cinq actions. |
| `app/(backoffice)/backoffice/tarifs/**` | Listes et fiches séparées pour saisons, catégories et offres. |
| `app/(backoffice)/backoffice/articles/**` | Liste et fiche d'article avec champs non techniques uniquement. |
| `app/(backoffice)/backoffice/images/**` | Ajout, aperçu, édition du texte alternatif et suppression confirmée. |
| `app/(backoffice)/backoffice/plaquettes/**` | Ajout, édition, téléchargement et suppression confirmée des plaquettes. |
| `app/(backoffice)/backoffice/backoffice.css` | Styles cohérents : pages de listes, fiches, retours, états vides et mobile. |

### Task 1: Retirer l'interface Payload sans toucher aux API

**Files:**

- Delete: `app/(payload)/admin/[[...segments]]/page.tsx`
- Delete: `app/(payload)/admin/importMap.js`
- Delete: `app/(payload)/layout.tsx`
- Delete: `app/(payload)/custom.scss`
- Modify: `app/(backoffice)/backoffice/page.tsx`
- Modify: `app/(backoffice)/backoffice/cms/page.tsx` (supprimer la route et le dossier)

- [ ] **Step 1: Confirmer le comportement actuel des routes Payload à conserver**

Run: `rtk find 'app/(payload)' -maxdepth 4 -type f | sort`

Expected: les handlers REST et GraphQL sont présents sous `app/(payload)/api`, séparés de l'interface admin sous `app/(payload)/admin`.

- [ ] **Step 2: Supprimer les fichiers qui construisent l'interface `/admin` et le Studio CMS**

Utiliser `apply_patch` pour supprimer exactement `app/(payload)/admin/[[...segments]]/page.tsx`, `app/(payload)/admin/importMap.js`, `app/(payload)/layout.tsx`, `app/(payload)/custom.scss` et `app/(backoffice)/backoffice/cms/page.tsx`. Ne supprimer aucun handler sous `app/(payload)/api`.

Conserver sans les modifier `app/(payload)/api/[...slug]/route.ts`, `app/(payload)/api/graphql/route.ts` et `app/(payload)/api/graphql-playground/route.ts` : le back office, les uploads et l'authentification en dépendent.

- [ ] **Step 3: Supprimer toutes les références utilisateur à `/admin` et `cms`**

Run: `rtk rg -n '"/admin"|/backoffice/cms|Studio CMS|Payload CMS' app components lib --glob '!**/*.test.ts'`

Expected: aucune occurrence dans l'interface. Les références Payload de type `getPayloadClient` et les routes `/api` restent autorisées.

- [ ] **Step 4: Vérifier la compilation et la disparition de la route**

Run: `rtk bun run build`

Expected: build réussi. Lors d'un serveur local, `rtk curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/admin` renvoie `404` et `rtk curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/api/users/me` ne renvoie pas `404`.

- [ ] **Step 5: Commit**

```bash
rtk git add -u 'app/(payload)' 'app/(backoffice)/backoffice'
rtk git commit -m "refactor: remove payload admin interface"
```

### Task 2: Isoler et tester la logique des tarifs plats

**Files:**

- Create: `lib/backoffice/pricing.ts`
- Create: `lib/backoffice/pricing.test.ts`
- Modify: `app/(backoffice)/backoffice/actions.ts`

- [ ] **Step 1: Écrire les tests purs de transformation tarifaire**

```ts
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  addOffer,
  addPricingCategory,
  addPricingYear,
  deleteOffer,
  setActivePricingYear,
} from "./pricing";

const pricing = {
  years: [{ id: "year-2026", label: "2026", isActive: true, categories: [] }],
};

describe("pricing helpers", () => {
  test("creates an independent season and keeps exactly one active season", () => {
    const withNewYear = addPricingYear(pricing, "2027");
    const newYearId = withNewYear.years?.[1]?.id as string;
    const next = setActivePricingYear(withNewYear, newYearId);
    assert.equal(next.years?.find((year) => year.id === "year-2026")?.isActive, false);
    assert.equal(next.years?.find((year) => year.id === "year-2027")?.isActive, true);
  });

  test("adds and removes an offer by id without changing sibling offers", () => {
    const withCategory = addPricingCategory(pricing, "year-2026", "Mariages");
    const categoryId = withCategory.years?.[0]?.categories?.[0]?.id as string;
    const withOffer = addOffer(withCategory, "year-2026", categoryId, { name: "Cocktail", price: "52 €" });
    const offerId = withOffer.years?.[0]?.categories?.[0]?.offers?.[0]?.id as string;
    assert.equal(deleteOffer(withOffer, "year-2026", categoryId, offerId).years?.[0]?.categories?.[0]?.offers?.length, 0);
  });
});
```

- [ ] **Step 2: Vérifier l'échec avant l'implémentation**

Run: `rtk bun test lib/backoffice/pricing.test.ts`

Expected: échec d'import, car `./pricing` n'existe pas encore.

- [ ] **Step 3: Créer les helpers immuables de tarifs**

```ts
import { randomUUID } from "node:crypto";

import type { HomePage } from "@/payload-types";

export type Pricing = NonNullable<HomePage["pricing"]>;
export type PricingYear = NonNullable<Pricing["years"]>[number];
export type PricingCategory = NonNullable<PricingYear["categories"]>[number];
export type PricingOffer = NonNullable<PricingCategory["offers"]>[number];

export const emptyPricing = (): Pricing => ({ years: [] });
export const newId = () => randomUUID();

export const addPricingYear = (pricing: Pricing, label: string): Pricing => ({
  ...pricing,
  years: [...(pricing.years ?? []), { id: newId(), label, isActive: !(pricing.years?.some((year) => year.isActive)), categories: [] }],
});

export const setActivePricingYear = (pricing: Pricing, yearId: string): Pricing => ({
  ...pricing,
  years: (pricing.years ?? []).map((year) => ({ ...year, isActive: year.id === yearId })),
});
```

Implement `updatePricingYear`, `deletePricingYear`, `addPricingCategory`, `updatePricingCategory`, `deletePricingCategory`, `addOffer`, `updateOffer` and `deleteOffer` with the same immutable rule: locate the given `id`, replace only its parent array, and throw `new Error("Élément tarifaire introuvable.")` when an id is absent. `addPricingCategory` creates `{ id: newId(), label, summaryLabel: "Sur mesure", offers: [] }`; `addOffer` creates `{ id: newId(), name, price, unit: "€ / pers.", sub: "", tone: "", detail: "", features: [], highlight: false }` before applying submitted fields.

- [ ] **Step 4: Exécuter les tests des helpers**

Run: `rtk bun test lib/backoffice/pricing.test.ts`

Expected: tous les scénarios de création, sélection active et suppression passent.

- [ ] **Step 5: Remplacer `parsePricing` par des mutations ciblées**

Dans `actions.ts`, créer une fonction privée qui charge `home-page`, applique un callback `Pricing => Pricing`, appelle `payload.updateGlobal`, puis revalide `/` et la route tarifaire concernée. Chaque action appelle d'abord `requireBackofficeUser()`.

```ts
const updatePricingGlobal = async (
  mutate: (pricing: Pricing) => Pricing,
  redirectTo: string,
) => {
  await requireBackofficeUser();
  const payload = await getPayloadClient();
  const current = await payload.findGlobal({ slug: "home-page", locale: "fr", depth: 0, overrideAccess: true });
  await payload.updateGlobal({
    slug: "home-page",
    locale: "fr",
    overrideAccess: true,
    data: { ...current, pricing: mutate(current.pricing ?? emptyPricing()) },
  });
  revalidatePath("/");
  revalidatePath("/backoffice/tarifs");
  redirect(`${redirectTo}?saved=1`);
};
```

Expose une Server Action par verbe métier : `createPricingYearAction`, `updatePricingYearAction`, `deletePricingYearAction`, `activatePricingYearAction`, `createPricingCategoryAction`, `updatePricingCategoryAction`, `deletePricingCategoryAction`, `createPricingOfferAction`, `updatePricingOfferAction`, `deletePricingOfferAction`. Lire les champs avec la fonction `text` existante et refuser les libellés, noms et prix vides avant la mutation.

- [ ] **Step 6: Commit**

```bash
rtk git add lib/backoffice/pricing.ts lib/backoffice/pricing.test.ts 'app/(backoffice)/backoffice/actions.ts'
rtk git commit -m "feat: add flat pricing mutations"
```

### Task 3: Construire les écrans Tarifs en listes et fiches séparées

**Files:**

- Modify: `app/(backoffice)/backoffice/tarifs/page.tsx`
- Delete: `app/(backoffice)/backoffice/tarifs/PricingForm.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/PricingSectionForm.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/PricingYearForm.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/PricingCategoryForm.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/PricingOfferForm.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/new/page.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/settings/page.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/[yearId]/page.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/[yearId]/categories/page.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/[yearId]/categories/new/page.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/[yearId]/categories/[categoryId]/page.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/[yearId]/offers/new/page.tsx`
- Create: `app/(backoffice)/backoffice/tarifs/[yearId]/offers/[offerId]/page.tsx`

- [ ] **Step 1: Écrire les routes de saisons**

La page `/backoffice/tarifs` charge `home-page`, affiche une ligne par saison (`label`, état « Affichée ») et les actions « Ouvrir », « Modifier », « Afficher sur le site » et « Supprimer ». Elle propose `Ajouter une saison` vers `/backoffice/tarifs/new`.

La fiche de création et la fiche d'édition ne contiennent que le champ requis `Saison` et un bouton `Enregistrer`. Une saison ne peut être supprimée que par le bouton de confirmation réutilisable. À la suppression de la saison active, l'action rend active la première saison restante ou aucune saison si la liste est vide.

Ajouter aussi le lien discret `Modifier le texte visible sur le site` vers `/backoffice/tarifs/settings`. Cette fiche contient les six champs déjà stockés par `pricing` (`eyebrow`, `titleLineOne`, `titleLineTwo`, `intro`, `footerNote`, `ctaLabel`) dans les groupes `Titre`, `Introduction` et `Bouton`. L'action `savePricingSectionAction` remplace uniquement ces six champs et conserve `years` sans les reparser.

- [ ] **Step 2: Écrire la page détaillée d'une saison**

Sur `/backoffice/tarifs/[yearId]`, chercher la saison par son `id` avant le rendu et appeler `notFound()` si elle n'existe pas. Afficher deux listes indépendantes : `Offres` et `Catégories`, sans enfant de formulaire. Les boutons sont `Ajouter une offre`, `Gérer les catégories` et `Retour aux saisons`.

- [ ] **Step 3: Écrire les fiches de catégories et d'offres**

`PricingCategoryForm` ne contient que `Nom de la catégorie` et `Texte d'accompagnement`. `PricingOfferForm` contient exactement : `Nom de l'offre`, `Catégorie` (select requis), `Prix`, `Unité`, `Courte description`, `Prestations incluses` (une ligne par prestation) et `Mettre cette offre en avant`.

```tsx
<label className="bo-form-field">
  <span>Prestations incluses</span>
  <textarea name="features" placeholder="Une prestation par ligne" rows={5} />
</label>
```

Transformer `features` dans l'action avec `split("\n").map((text) => text.trim()).filter(Boolean).map((text) => ({ text }))`. Aucun champ `tone`, `sub`, identifiant ou structure d'array ne doit être affiché.

- [ ] **Step 4: Vérifier les parcours tarifaires**

Run: `rtk bun test lib/backoffice/pricing.test.ts && rtk bun run lint && rtk bun run build`

Expected: tests, lint et build réussissent ; chaque page dynamique rejette un id inconnu avec `notFound()`.

- [ ] **Step 5: Commit**

```bash
rtk git add 'app/(backoffice)/backoffice/tarifs' 'app/(backoffice)/backoffice/actions.ts' lib/backoffice/pricing.ts
rtk git commit -m "feat: simplify pricing management"
```

### Task 4: Réduire l'accueil, l'en-tête et la présentation

**Files:**

- Modify: `app/(backoffice)/backoffice/Header.tsx`
- Modify: `app/(backoffice)/backoffice/page.tsx`
- Modify: `app/(backoffice)/backoffice/a-propos/AboutForm.tsx`
- Modify: `app/(backoffice)/backoffice/a-propos/page.tsx`

- [ ] **Step 1: Réduire l'en-tête**

Remplacer le tableau `navigation` par aucune navigation. Conserver le lien de marque vers `/backoffice`, le lien externe vers `/` avec le texte accessible `Voir le site`, l'e-mail et `LogoutButton`. Retirer les imports `Download`, `FileText`, `Home`, `Images`, `LayoutDashboard`, `PanelsTopLeft` et `UserRound` devenus inutiles.

- [ ] **Step 2: Transformer l'accueil en cinq actions métier**

Remplacer le titre `Contenu du site` et les cartes de tableau de bord par le titre `Que voulez-vous faire ?`. Créer cinq cartes/lignes uniquement :

```ts
const actions = [
  { href: "/backoffice/tarifs", label: "Mettre à jour les tarifs", detail: "Saisons, catégories et offres" },
  { href: "/backoffice/a-propos", label: "Modifier la présentation", detail: "Titre, textes, citation et bouton" },
  { href: "/backoffice/articles", label: "Gérer les articles", detail: "Créer, modifier ou publier" },
  { href: "/backoffice/images", label: "Ajouter ou gérer des images", detail: "Photos et descriptions" },
  { href: "/backoffice/plaquettes", label: "Gérer les plaquettes", detail: "Fichiers à télécharger" },
];
```

Supprimer les compteurs Payload et tout lien « Mode avancé ».

- [ ] **Step 3: Organiser la présentation en groupes lisibles**

Dans `AboutForm.tsx`, conserver les mêmes `name` de champs et la même action, mais rendre quatre `fieldset` : `Titre`, `Textes`, `Citation` et `Bouton`. Remplacer les libellés `Petit titre`, `Titre ligne 1` et `Titre ligne 2` par des formulations orientées résultat : `Surtitre`, `Début du titre` et `Suite du titre`.

- [ ] **Step 4: Vérifier l'absence de navigation technique**

Run: `rtk rg -n 'Studio CMS|Mode avancé|Payload|/admin|/backoffice/cms' 'app/(backoffice)' || true`

Run: `rtk bun run lint`

Expected: la recherche ne retourne aucune occurrence, à l'exception des imports techniques de client Payload hors texte utilisateur ; lint réussi.

- [ ] **Step 5: Commit**

```bash
rtk git add 'app/(backoffice)/backoffice/Header.tsx' 'app/(backoffice)/backoffice/page.tsx' 'app/(backoffice)/backoffice/a-propos'
rtk git commit -m "feat: simplify backoffice navigation"
```

### Task 5: Simplifier et tester l'écriture des articles

**Files:**

- Create: `lib/backoffice/post-data.ts`
- Create: `lib/backoffice/post-data.test.ts`
- Modify: `app/(backoffice)/backoffice/actions.ts`
- Modify: `app/(backoffice)/backoffice/articles/ArticleForm.tsx`
- Modify: `app/(backoffice)/backoffice/articles/page.tsx`

- [ ] **Step 1: Écrire les tests des valeurs automatiques**

```ts
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { buildPostData } from "./post-data";

describe("buildPostData", () => {
  test("generates technical fields from the simple article form", () => {
    const post = buildPostData({
      title: "Un dîner d'été à Bordeaux",
      excerpt: "Un menu de saison.",
      content: "Le récit complet.",
      publishedAt: "2026-07-21T10:00",
      status: "published",
    });

    assert.equal(post.slug, "un-diner-d-ete-a-bordeaux");
    assert.equal(post.author, "David Chambaud");
    assert.deepEqual(post.categories, []);
    assert.deepEqual(post.seo, { title: post.title, description: post.excerpt });
    assert.equal(post._status, "published");
  });
});
```

- [ ] **Step 2: Vérifier l'échec du test**

Run: `rtk bun test lib/backoffice/post-data.test.ts`

Expected: échec d'import, car `./post-data` n'existe pas encore.

- [ ] **Step 3: Implémenter `buildPostData`**

```ts
import { plainTextToLexical } from "@/lib/backoffice/rich-text";
import type { Post } from "@/payload-types";

const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const buildPostData = (fields: {
  title: string; excerpt: string; content: string; publishedAt: string; status: string;
}, existing?: Pick<Post, "slug">): Partial<Post> => ({
  title: fields.title,
  slug: existing?.slug || slugify(fields.title),
  publishedAt: fields.publishedAt ? new Date(fields.publishedAt).toISOString() : new Date().toISOString(),
  author: "David Chambaud",
  categories: [],
  excerpt: fields.excerpt,
  content: plainTextToLexical(fields.content),
  seo: { title: fields.title, description: fields.excerpt },
  _status: fields.status === "published" ? "published" : "draft",
});
```

- [ ] **Step 4: Brancher les Server Actions et la suppression confirmée**

Dans `createPostAction`, appeler `buildPostData` avec les seuls champs simples. Dans `updatePostAction`, charger le post courant pour préserver son slug, puis appeler `buildPostData(formDataFields, current)`. Ajouter `deletePostAction(id)` : authentifier, supprimer la collection `posts`, revalider `/blog` et `/backoffice/articles`, puis rediriger vers `/backoffice/articles?deleted=1`.

- [ ] **Step 5: Réduire le formulaire et la liste**

Supprimer de `ArticleForm.tsx` les entrées `slug`, `author`, `categories`, `seoTitle` et `seoDescription`. Conserver dans cet ordre : titre, date, statut, extrait, contenu. Dans la liste, remplacer le slug secondaire par l'extrait, afficher des libellés français `Brouillon` / `Publié`, puis ajouter le bouton de suppression confirmée à côté de `Modifier`.

- [ ] **Step 6: Vérifier puis commit**

Run: `rtk bun test lib/backoffice/post-data.test.ts && rtk bun run lint && rtk bun run build`

```bash
rtk git add lib/backoffice/post-data.ts lib/backoffice/post-data.test.ts 'app/(backoffice)/backoffice/articles' 'app/(backoffice)/backoffice/actions.ts'
rtk git commit -m "feat: simplify article editing"
```

### Task 6: Unifier les listes Images et Plaquettes avec confirmation de suppression

**Files:**

- Create: `app/(backoffice)/backoffice/ConfirmSubmitButton.tsx`
- Modify: `app/(backoffice)/backoffice/images/page.tsx`
- Modify: `app/(backoffice)/backoffice/images/MediaUploadForm.tsx`
- Modify: `app/(backoffice)/backoffice/plaquettes/page.tsx`
- Modify: `app/(backoffice)/backoffice/plaquettes/ServiceBrochureUploadForm.tsx`

- [ ] **Step 1: Créer le bouton de confirmation client**

```tsx
"use client";

import type { ButtonHTMLAttributes } from "react";

type ConfirmSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  confirmation: string;
};

export function ConfirmSubmitButton({ confirmation, onClick, ...props }: ConfirmSubmitButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        if (!window.confirm(confirmation)) event.preventDefault();
        onClick?.(event);
      }}
      type="submit"
    />
  );
}
```

- [ ] **Step 2: Appliquer la confirmation aux suppressions**

Remplacer les boutons destructifs de `images/page.tsx`, `plaquettes/page.tsx`, `articles/page.tsx` et des listes de tarifs par `ConfirmSubmitButton`. Employer le texte exact : `Supprimer définitivement cet élément ? Cette action est irréversible.`

- [ ] **Step 3: Rendre les listes plus lisibles**

Conserver l'upload au-dessus de la liste, puis n'afficher par élément que l'aperçu ou le nom du fichier, le titre/texte alternatif, la date pertinente et les actions avec texte visible `Modifier`, `Télécharger`, `Supprimer`. Déplacer les champs d'édition complets dans une fiche dédiée seulement si la ligne dépasse ces quatre informations.

- [ ] **Step 4: Vérifier les validations de fichiers existantes**

Run: `rtk bun test collections/ServiceBrochures.test.ts lib/service-brochures.test.ts && rtk bun run lint`

Expected: les types PowerPoint autorisés et les catégories publiques restent couverts ; lint réussi.

- [ ] **Step 5: Commit**

```bash
rtk git add 'app/(backoffice)/backoffice/ConfirmSubmitButton.tsx' 'app/(backoffice)/backoffice/images' 'app/(backoffice)/backoffice/plaquettes' 'app/(backoffice)/backoffice/articles'
rtk git commit -m "feat: clarify media and brochure management"
```

### Task 7: Finaliser l'interface responsive et la vérification globale

**Files:**

- Modify: `app/(backoffice)/backoffice/backoffice.css`

- [ ] **Step 1: Ajuster les styles au parcours liste puis fiche**

Dans `backoffice.css`, supprimer les règles exclusives à `.bo-cms-*` et à l'ancienne navigation multi-liens. Ajouter des règles ciblées pour : `.bo-action-list`, `.bo-list-card`, `.bo-breadcrumb`, `.bo-form-actions`, `.bo-confirm-button` et un état vide. Utiliser les variables et la palette existantes (`#f7f3e8`, `#25231d`, `#2f3a2d`) ; ne pas introduire une seconde identité visuelle.

```css
.bo-action-list { display: grid; gap: 0.75rem; }
.bo-list-card { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.15rem; border: 1px solid rgba(37, 35, 29, 0.12); background: rgba(255, 252, 244, 0.82); }
.bo-breadcrumb { color: rgba(37, 35, 29, 0.58); font-size: 0.82rem; text-decoration: none; }
```

Sous `720px`, empiler les actions de ligne, rendre les boutons accessibles sur toute leur largeur et éviter toute table à colonnes fixes.

- [ ] **Step 2: Lancer toute la suite de contrôles automatisés**

Run: `rtk bun test && rtk bun run lint && rtk bun run build`

Expected: tous les tests Bun, ESLint et le build Next réussissent.

- [ ] **Step 3: Vérifier manuellement les routes importantes**

Avec `rtk bun run dev`, vérifier en navigateur :

1. `/backoffice/login` s'affiche pour une session absente ;
2. `/backoffice` affiche les cinq actions et aucune référence à Payload ;
3. chaque action mène à une liste ou une fiche avec retour évident ;
4. une suppression demande confirmation et l'annulation ne modifie rien ;
5. `/admin` répond 404 ;
6. le site public et les routes `/api` Payload restent accessibles.

- [ ] **Step 4: Examiner le diff final puis commit**

Run: `rtk git diff --check && rtk git status --short`

Expected: aucune erreur d'espacement, aucun fichier `.superpowers/`, `.next/` ou autre artefact local à committer.

```bash
rtk git add 'app/(backoffice)' lib/backoffice
rtk git commit -m "style: polish simplified backoffice"
```
