## Contexte et objectifs

Créer une [page de résultats avec une carte sticky](https://lewagon.github.io/layouts-demo/flexbox-grid-layout.html) comme dans le cours. Pour cet exercice, tu remarqueras que Bootstrap n'est importé nulle part dans le fichier `index.html` ! Tu devras coder cette mise en page dans le fichier `pages/map.css` sans utiliser Bootstrap :

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/map-example.png)

## Démarrer le challenge

1. Assure-toi de bien comprendre le code dans `index.html` et le design qu'on te donne pour la barre de navigation et les cards (cartes) dans `components/navbar.css` et `components/card.css`. Si tu n'es pas sûr de toi, crée un ticket et un prof te l'expliquera !
2. Vérifie dans le cours comment créer une mise en page avec `flexbox` et `position: sticky`.
3. **Ne triche pas en inspectant le code ! 🔎** L'objectif de ce challenge est d'apprendre à créer une mise en page par toi-même. Prends le temps de réfléchir, pose des questions au prof, mais ne triche pas 😉!

Pour afficher la carte MapBox, tu auras besoin d'[obtenir une clé API de MapBox](https://www.mapbox.com/account/access-tokens/) et d'ajouter ta propre clé à l'URL dans l'attribut `src` de l'élément image de `#map`.

Pour tester ton code et visualiser ta page dans le navigateur, lance un serveur Web (ne te contente pas d'ouvrir le fichier HTML dans ton navigateur) en utilisant la commande ci-dessous :

```
serve
```

Tu remarqueras que le composant `card` a déjà été codé pour toi. Tu n'as plus qu'à :

- créer une grid (grille) de `.cards` autour de `.card`s ;
- créer une mise en page horizontale pour avoir `.cards` à gauche et `#map` à droite.

**[Conseil]** Dessine la structure HTML avant de te lancer !

N.B. : N'oublie pas de **forcer le rafraîchissement** de ton navigateur (`cmd + shift + r`) pour vider le cache si ta page n'affiche pas le code le plus récent !

## Nouvelle organisation CSS

Tu remarqueras qu'il y a maintenant **deux dossiers** dans le CSS :

- `components` pour coder tous les composants graphiques.
- `pages` pour coder la mise en page des différentes pages du site Web.

Comme d'habitude, `style.css` importe toutes les autres feuilles de style avant d'être associé dans le HTML.

