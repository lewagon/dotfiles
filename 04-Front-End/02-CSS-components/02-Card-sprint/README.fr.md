## Contexte et objectifs

On va maintenant créer un composant un peu plus complexe et travailler sur la création de trois designs de card (carte) différents, que l'on a vus pendant le cours. Voici l'[objectif à atteindre](http://lewagon.github.io/html-css-challenges/14-card-sprint/). Le code est déjà dans `index.html`

```html
<div class="card-category">
  <!-- [ ... ] -->
</div>
<div class="card-product">
  <!-- [ ... ] -->
</div>
<div class="card-trip">
  <!-- [ ... ] -->
</div>
```

Tu dois maintenant ajouter du HTML dans chaque card (carte), et le CSS associé dans `cards.css` (le CSS des trois cartes peut aller dans le même fichier).

**REMARQUE** : Essaie de créer le `card-trip` sans l'avatar de l'utilisateur dans le coin inférieur droit pour le moment. On l'ajoutera une fois qu'on aura terminé les cartes.

N'oublie pas de **forcer le rafraîchissement** de ton navigateur (`Cmd + Shift + R`) pour vider le cache si ta page n'affiche pas le code le plus récent !

## Organiser ton CSS avec des fichiers de composants

Comme dans l'exercice précédent, on va utiliser la nouvelle structure professionnelle pour nos feuilles de style. On peut mettre tout le CSS de nos différentes classes dans un fichier CSS `cards.css` :

```
.
├── css
│   ├── components
│   │   └── cards.css
│   └── style.css
└── index.html
```

Puis dans `style.css`:

```css
/* Importer les polices depuis Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Raleway:wght@300;400;500;700");

/* Importer tous les fichiers de composants */
@import url("components/cards.css");

/* Général pour les polices et les couleurs */
body {
  margin: 100px;
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
a {
  text-decoration: none;
}
.text-center {
  text-align: center;
}

```

Ensuite, tu as seulement besoin d'**un lien unique vers `style.css`** dans ton fichier HTML :

```html
<head>
  <link rel="stylesheet" href="css/style.css">
</head>
```

## Suggestions et ressources supplémentaires

Maintenant que tu as créé tes trois cartes, on va mettre à jour ta dernière carte `card-trip` avec l'avatar d'un utilisateur dans le coin inférieur droit. Pour épingler un élément à un endroit précis au sein d'un autre élément, on va utiliser le [motif Relatif > Absolu](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/). Voici les étapes à suivre pour positionner un élément en utilisant ce motif :

### Définir la div principale comme `position: relative` :

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-relative.png)

### Épingler une div à l'intérieur avec `position: absolute` (relative à l'élément parent)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-top.png)

On va ainsi pouvoir positionner l'élément enfant (`.child`) par rapport à l'élément parent (`.parent`) avec la propriété `position: relative;`. Tu peux ensuite utiliser les attributs directionnels `top` (haut), `bottom` (bas), `left` (gauche) et `right` (droite) pour déplacer l'élément enfant (`.child`) 📐.

Fais attention : si tu ajoutes une valeur négative du type `right: -20px`, la div intérieure sera déplacée 20px **à l'extérieur** de la div parente.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-bottom.png)

Tu peux maintenant utiliser cette technique pour ajouter un avatar en superposition sur ta `.card-trip`, comme ci-dessous.

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/card-position.png" alt="" width="400">
</div>
