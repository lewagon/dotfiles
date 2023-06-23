## Contexte et objectifs

Dans ce challenge, nous allons récupérer des données depuis une API et s'entraîner à les afficher grâce à un élément `template` que nous avons vu durant la lecture.

## Spécifications

Tu vas créer une application de recherche de recettes de cuisine grâce à l'API [The MealDB API](https://www.themealdb.com/api.php), depuis laquelle tu pourras ajouter des recettes à tes favoris.

Nous allons utiliser ce [`endpoint`](https://www.themealdb.com/api.php#:~:text=Filter%20by%20main%20ingredient) afin de rechercher des recettes par ingrédient.

L'objectif est d'implémenter la logique de recherche dans `index.js`, afin de pouvoir filtrer les recettes par ingrédient lorsque l'on clique sur *Search*.

Lance ton serveur local avec :

```bash
serve
```

Tu devrais voir un formulaire avec un champ de recherche et un bouton *Search*.

- Lorsque l'on choisit un ingrédient et clique sur `Search`, la page ne **doit pas se recharger** et on devrait voir la liste des recettes filtrées dans le `#recipes-container`.
- Un message indiquant qu'il n'y a pas de résultats doit apparaître s'il n'y a pas de recettes pour cet ingrédient.
- Une fois une recette ajoutée dans les favoris, la recette doit apparaître dans la liste des favoris `#favourites-container` à droite.

![App  boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-1.png)

## Search recipes

### Implémente le code de l'API

Pour commencer, nous allons implémenter le code de l'API dans `index.js` pour chercher des recettes par ingrédient.

Ajoute un `eventListener` sur le bouton `#search-button` pour écouter le click et lancer un call API pour filtrer les recettes.

Pour cela, tu vas devoir utiliser la méthode `fetch` pour faire une requête HTTP vers l'API en interpolant l'ingrédient entré dans l'input. Ajoute un `console.log(data)`  afin de voir la réponse de l'API.

### Affiche les recettes

Maintenant que nous avons les résultats, nous allons les afficher dans la liste `#recipes-container`.
Comme dans la lecture, ajoutons d'abord un élément `template ` dans le HTML avec la structure suivante :

```html
<template id="recipe-template">
  <div class="col-5">
    <div class="card my-2 position-relative">
      <i class="fa-solid fa-bookmark text-danger ms-2 position-absolute top-0 end-0 p-2 fs-4"></i>
      <img src="" class="card-img-top" alt="">
      <div class="card-body d-flex">
        <h6 class="card-title">Recipe Title</h6>
      </div>
    </div>
  </div>
</template>
```

Nous allons ensuite créer une fonction `insertRecipes` qui va nous permettre d'insérer les recettes dans le DOM. Quel(s) paramètres devront nous lui passer ?

Crées la fonction avec deux paramètres : `recipes` et `container`. `recipes` sera un array contenant les recettes et `container` sera le container dans lequel nous allons insérer les recettes.

Utilise la méthode `forEach` pour itérer sur la liste des recettes, et pour chacune, tu vas cloner l'élément `template`, et insérer les données de la recette au bon endroit. A toi de jouer ! (indice : n'hésite pas à regarder les notes du cours pour voir comment nous avons utilisé et cloné l'élément `template`!)

Tu devrez maintenant voir une liste de recettes utilisant l'ingrédient que tu as saisi dans l'entrée de recherche :

NB: tu peux voir la liste des ingrédients disponibles en visitant [cette URL](https://www.themealdb.com/api/json/v1/1/list.php?i=list) directement depuis ton navigateur.

![App  boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-2.png)

## Recette favorites

### Ajoute un `eventListener` sur les icônes

Maintenant que nous avons une liste de recettes, nous allons pouvoir ajouter une recette à nos favoris.

Pour cela, séléctionne **toutes** les icônes `fa-bookmark` et ajoute un `eventListener` sur chacune. Lorsque l'on cliquera sur une icône, nous ajouterons la recette à une variable `favourites, et nous mettrons à jour la liste des favoris dans le `#favourites-container`. Quel type de variable devra être `favourites` ?

On ne verra apparaître les icônes de favoris sur les recettes qu'une fois qu'une recherche sera effectuée. Cela veut dire que l'on doit ajouter les `eventListener` **après** avoir inséré les recettes dans le DOM, au sein de la même méthode `fetch`.

Pour ce faire, tu peux créer une fonction `addFavouriteListeners`, dans laquelle tu devras sélectionner toutes les icônes de favoris et y ajouter un *event listener* au click.

### Ajoute la recette aux favoris

Pour cela, créons une fonction `addRecipeToFavourites` comme fonction `callback` de l'`event listener` de chaque icône.

Une fois cliqué, nous devons récupérer tous les éléments d'une recette (son `idMeal`, `strMeal`, `strMealThumb`) avant de la stocker dans la variable `favourites`.

Nous devrons passer la recette comme paramètre de cette fonction, afin d'accéder aux données dont nous avons besoin pour l'afficher. A partir du `event`, vous pouvez reconstruire l'objet recette :

```js
const newRecipeToAdd = { idMeal: ..., strMeal: ..., strMealThumb: ... };
```

Tu peux maintenant ajouter la `newRecipeToAdd` à ton array `favourites`.

Il ne nous reste plus qu'à cloner l'élément `template`, et insérer les données de la recette au bon endroit. Attends ! Nous avons déjà fait ça ! Tu peux réutiliser la fonction `insertRecipes` que nous avons créée précédemment, qui prend en paramètre un array de recettes et un container dans lequel insérer les recettes.

![App  boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-3.png)

## Notes

Notre application nous permet de rechercher des recettes par ingrédient et de les ajouter à nos favoris. Un bémol toutefois : nous perdons nos favoris chaque fois que nous rechargeons la page.

Pour résoudre ce problème, nous pourrions utiliser l'API [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) pour stocker nos favoris. Le `localStorage` est un objet qui permet de stocker des données dans le navigateur. Il est accessible depuis n'importe quelle page de notre application. Mais pas de panique, nous l'utiliserons dans les challenges de la prochaine leçon !

NB: Les Web-apps sont souvent composées de deux applications en réalité : une application back-end qui s'occupe de persister les données, et une application front-end qui s'occupe de l'interface utilisateur. Dans ce challenge, nous avons créé une application front-end qui s'occupe de l'interface utilisateur, et nous utilisons une API pour récupérer les données.

Mais nous verrons dans le prochain module que Rails s'occupe des deux aspects à la fois 💪

## Bonus (facultatif)

- Tu peux utiliser la méthode `includes` pour vérifier si une recette est déjà dans les favoris.
- Vide l'input de recherche après avoir cliqué sur `Search`.
- Ajoute un bouton pour vider la liste de tes favoris.
