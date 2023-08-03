## Contexte et objectifs

Dans ce challenge, tu vas utiliser [Mustache.js](https://github.com/janl/mustache.js) pour créer une application qui permet à des chefs de partager leurs recettes.

## Mise en place

Comme d'habitude, lance ton serveur avec `serve` depuis ton terminal et va sur `localhost:8000`.

## Données

Dans le fichier `index.html`, tu peux voir :

```html
<script type="importmap">
  {
    "imports": {
      "mustachejs": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"
    }
  }
</script>
```

Cela signifie que nous pouvons d'ores et déjà utiliser Mustache.js 👨

Il y a une liste de recettes prêtes pour toi dans le fichier `lib/recipes.js`.

```js
const recipes = [
  {
    name: "Coq au Vin",
    ingredients: ["chicken", "red wine", "bacon", "mushrooms", "onions", "garlic"],
    difficulty: 7
  },
  {
    name: "Ratatouille",
    ingredients: ["eggplant", "zucchini", "bell peppers", "tomatoes", "onions", "garlic"],
    difficulty: 3
  },
  {
    name: "Croissant",
    ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
    difficulty: 9
  },
  {
    name: "Bouillabaisse",
    ingredients: ["fish", "shellfish", "tomatoes", "fennel", "onions", "garlic", "saffron"],
    difficulty: 10
  }
]
```

Prends le temps de regarder une des recettes pour voir comment sa structure de données est mise en place. Par exemple :

```js
{
  name: "Croissant",
  ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
  difficulty: 9
}
```

C'est un `Object` (comme un `Hash` en Ruby) avec des clés et des valeurs. Tu voudras noter pour toi-même quelles clés sont présentes ici et quels types de valeurs elles ont (`String`, `Number`, `Array`, etc.).

Le but de ce challenge est d'afficher les données de ce tableau dans le DOM en utilisant Mustache.js.

### HTML

Voici le snippet pour le HTML d'une recette :

```html
<div class="col col-lg-4">
  <div class="card mb-3">
    <div class="card-header">
      <h2>Croissant</h2>
    </div>
    <div class="card-body">
      <h5 class="card-title">Ingredients:</h5>
      <ul class="list-group">
        <li class="list-group-item">Flour</li>
        <li class="list-group-item">Butter</li>
        <li class="list-group-item">Yeast</li>
        <li class="list-group-item">Sugar</li>
        <li class="list-group-item">Salt</li>
      </ul>
      <h5 class="card-title mt-3">Difficulty: 9/10</h5>
    </div>
  </div>
</div>
```

Ajoutons ce HTML à l'intérieur d'un tag `<template>` dans le fichier `index.html` (il n'y est pas encore cette fois-ci !). Assure-toi de donner un `id` à ton `<template>` pour pouvoir y accéder facilement plus tard 💪

### Afficher la Liste

Tu dois maintenant itérer sur les `recipes` (comme dans le challenge précédent) et afficher le HTML dans le `<template>` pour chaque recette. Mais, cette fois-ci, utilisons Mustache.js pour le faire. Voici un exemple de comment utiliser Mustache.js pour afficher du HTML (dans le JS) :

```js
// Si nous avons un élément `<template>` sur notre page avec un `id` `#myTemplate` :
const template = document.querySelector("#myTemplate").innerHTML
const output = Mustache.render(template, {});
```

### Rendre les champs dynamiques

Désormais toutes les recettes vont afficher "Croissant" puisque nous avons codé cela en dur 😿 Alors, rendons cela dynamique ! Dans un template Mustache, tu peux rendre une partie du template dynamique en utilisant...des moustaches dans le HTML 👨 comme ceci :

```html
<template id="myTemplate">
  <div>{{ message }}</div>
</template>
```

Ensuite, dans le JavaScript, tu peux passer des données à Mustache pour qu'il les utilise dynamiquement dans le template :

```js
const template = document.querySelector("#myTemplate").innerHTML;
const output = Mustache.render(template, { message: "Hello, world!" });
```

Est-ce que tu as remarqué que le deuxième argument de `Mustache.render` est un `Object` JavaScript qui contient toutes les informations pour remplir les moustaches `{{ }}` en fonction des clés de l'objet ?

Maintenant, c'est à ton tour. Essaie d'utiliser les moustaches `{{ }}` dans ton template pour afficher dynamiquement le `title`, `difficulty`, et `ingredients`.

Note que si tu veux itérer sur un tableau dans Mustache.js, tu peux le faire comme ceci :

```html
<template id="musicians">
  {{#musicians}}
    <p>{{.}}</p>
  {{/musicians}}
</template>
```

```js
const template = document.querySelector("#musicians").innerHTML;
const output = Mustache.render(template, { musicians: ["Britney Spears", "Christina Aguilera", "Backstreet Boys"] });
```

Le placeholder `{{.}}` représente chaque item dans le tableau `musicians`, et il sera remplacé par la valeur correspondante lors du rendu.

Enjoy!
