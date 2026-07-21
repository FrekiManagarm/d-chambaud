# Simplification du back office

**Date :** 2026-07-21  
**Statut :** validé pour revue

## Objectif

Remplacer les deux espaces de gestion actuels par un unique back office, accessible uniquement sur `/backoffice`, destiné à une seule personne non technique. Le parcours doit employer des termes concrets, réduire le nombre de décisions et ne jamais révéler la structure technique de Payload.

## Périmètre

Le back office conserve cinq fonctions :

1. Tarifs
2. Présentation
3. Articles
4. Images
5. Plaquettes

La route `/admin`, le Studio CMS, les liens vers eux et l'interface d'administration Payload sont supprimés. Payload reste le moteur de données et d'authentification côté serveur, sans interface utilisateur exposée.

## Navigation

`/backoffice` est le point d'entrée unique après connexion. Il affiche la question « Que voulez-vous faire ? » et cinq actions lisibles :

- Mettre à jour les tarifs
- Modifier la présentation
- Gérer les articles
- Ajouter ou gérer des images
- Gérer les plaquettes

L'en-tête ne contient plus de navigation par rubriques. Il conserve uniquement l'identité du back office, le lien « Voir le site » et la déconnexion. Chaque écran de gestion propose un retour explicite vers l'accueil ou sa liste parente.

## Modèle d'interaction commun

Chaque fonction suit le même cycle :

1. une liste courte avec l'état et les informations essentielles ;
2. un bouton explicite pour ajouter un élément ;
3. une fiche dédiée, courte et rédigée pour l'utilisateur ;
4. une sauvegarde confirmée par un message clair ;
5. une suppression précédée d'une confirmation.

Les interfaces ne présentent ni libellé CMS, ni identifiant, ni champ de structure de données. Les actions techniques sont automatiques ou cachées.

## Écrans

### Tarifs

La gestion des tarifs évite tout formulaire imbriqué.

- La première vue affiche les saisons sous forme de liste, avec une action pour ajouter, modifier, supprimer ou choisir la saison affichée sur le site.
- Une saison ouvre une liste plate de ses offres, avec le nom, la catégorie et le prix.
- Une offre s'édite sur sa propre fiche : nom, catégorie, prix, unité, courte description, prestations incluses et mise en avant.
- Les catégories disposent d'un écran de liste dédié pour être ajoutées, renommées ou supprimées. Elles sont ensuite choisies dans la fiche d'une offre.

La structure existante stockée dans Payload est conservée et adaptée par les actions serveur ; aucune donnée tarifaire existante n'est supprimée au cours de la refonte.

### Présentation

La page est organisée en quatre blocs compréhensibles : titre, textes, citation et bouton. Les libellés décrivent le résultat sur le site plutôt que le modèle de données.

### Articles

La liste affiche le titre, la date et l'état brouillon/publié. La fiche n'expose que le titre, l'extrait, le texte, la date et le statut de publication.

Le slug, l'auteur, les catégories et les métadonnées SEO sont automatiquement générés ou appliqués par défaut. L'utilisateur ne les voit ni ne les renseigne.

### Images

L'écran permet d'ajouter une image avec aperçu et description. La médiathèque affiche les images existantes et fournit une suppression confirmée. Les erreurs de type ou d'envoi de fichier sont formulées en français courant.

### Plaquettes

La liste affiche les plaquettes disponibles. La fiche d'ajout ou de modification contient le fichier, le titre, la catégorie et la description. Chaque élément peut être téléchargé ou supprimé après confirmation.

## Données, sécurité et mises à jour

- L'authentification existante protège toutes les routes et actions de `/backoffice`.
- Les opérations d'écriture sont validées côté serveur ; les valeurs de formulaire seules ne confèrent aucun droit.
- Les suppressions demandent confirmation avant toute écriture.
- Après chaque opération réussie, les vues concernées du back office et du site public sont revalidées.
- `/admin` ne doit plus rendre d'interface : la route doit être retirée, pas seulement masquée dans la navigation.

## Gestion des erreurs

- Les champs nécessaires signalent précisément ce qui manque, en langage simple.
- Les envois d'image et de plaquette refusés affichent une explication utile et conservent la saisie autant que possible.
- Une erreur serveur ne doit pas faire croire à une sauvegarde : le résultat est explicite, avec possibilité de réessayer.
- Les suppressions ne sont exécutées qu'après confirmation explicite.

## Vérification prévue

- Les visiteurs non connectés sont redirigés vers la connexion du back office.
- Les cinq actions de l'accueil mènent aux bonnes listes et fiches.
- Les tarifs permettent d'ajouter, modifier et supprimer saisons, catégories et offres, sans formulaire imbriqué.
- Les articles masquent les champs techniques et conservent les valeurs automatiques nécessaires à la publication.
- Les ajouts, modifications et suppressions d'images et de plaquettes sont protégés et affichent des retours d'état corrects.
- La navigation et l'accès direct à `/admin` ne rendent plus l'interface Payload.
- Les tests existants restent exécutables et de nouveaux tests couvrent les actions et règles ajoutées.
