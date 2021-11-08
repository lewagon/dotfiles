## Contexte et objectifs

Dans cet exercice, on va utiliser le framework JavaScript [Vue](https://vuejs.org/).

Vue est un framework progressif pour créer des interfaces utilisateur. Contrairement aux autres frameworks monolithiques, Vue est conçu dès le départ pour être adopté progressivement. La librairie principale se concentre uniquement sur la couche de vue ; elle est facile à comprendre et intégrer à d'autres librairies ou projets existants.

Le gros avantage si tu utilises Vue, c'est que tu n'auras presque plus jamais besoin d'appeler manuellement la méthode `querySelector` ou `addEventListener` ! Au lieu de cela, tu utiliseras les attributs `v-` conventionnels sur un élément spécifique.

C'est parti pour ton premier challenge avec Vue !

## Texte standard

Ouvre le fichier `index.html` et examine le code à l'intérieur.

Il s'agit d'un formulaire HTML avec des cases à cocher de catégories :
- 1 case à cocher « Tout cocher » ("Check All")
- 4 cases à cocher avec des catégories

Tu peux lancer le serveur Webpack :
```bash
yarn install
rake webpack
```

et ouvrir la page dans ton navigateur :
```bash
open http://localhost:8080
```

Tu peux cocher ces cases une par une, mais la case « Tout cocher » ("Check all") ne permet pas encore de cocher toutes les cases. C'est le comportement que l'on souhaite mettre en place grâce à JavaScript et notre nouvel ami : Vue.js.


## Démarrer : installation de Vue.js

**CDN**
Pour te former ou créer un prototype, tu peux utiliser la dernière version avec :

```js
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

Tu peux copier cette ligne de code dans `index.html` pour utiliser Vue.

**NPM**
NPM est la méthode d'installation recommandée lors de la création d'applications à grande échelle avec Vue. Elle se combine bien avec les module bundlers comme Webpack ou Browserify. Vue fournit également des outils d'accompagnement pour créer des composants Single File.

```bash
# latest stable
npm install vue
```

Tu peux maintenant commencer à travailler avec Vue dans ton code.

## La logique

Voici ce que tu dois faire :
- Vérifier le statut de la case à cocher « Tout cocher » ("Check all").
- Si elle est cochée, modifier l'attribut `checked` à `true` pour toutes les cibles de cases à cocher.
- Si elle n'est pas cochée, modifier l'attribut `checked` à `false` pour toutes les cibles de cases à cocher.

## Sélectionner la `div`

Pour être en mesure d'interagir avec le DOM, tu vas avoir besoin d'une option `el` à l'intérieur de l'instance `new Vue({})` pour sélectionner la div avec laquelle tu veux interagir. Cette fois-ci, tu peux sélectionner tout le conteneur pour interagir avec tous les éléments à l'intérieur.

## Écouter un événement
Afin de gérer l'événement de clic qui se produit sur la case à cocher `check-all`, on va avoir besoin d'un gestionnaire d'événements de sorte que, quand on clique sur la case `check-all`, une méthode (`checkAllBoxes`) se déclenche pour nous aider à exécuter la logique.

Te souviens-tu de comment gérer les événements avec Vue plutôt que `querySelector` et `addEventListener` ?

Ajoute une option `methods` dans ton instance `new Vue({})` et modifie la méthode `checkAllBoxes`.

<details>
  <summary markdown='span'>Hint</summary>

  On peut ajouter `v-on:click` ou `@click` comme raccourci sur la case `check-all` pour écouter son événement `click`.

  ```html
  <input id='check-all' type="checkbox" class="form-check-input" @click="checkAllBoxes">
  ```

  ```js
  let app = new Vue({
    el: '#app',
    methods: {
      checkAllBoxes(event){
        // Code ici
      }
    }
  })
  ```
</details>

## Lier l'attribut

On veut pouvoir modifier l'attribut `checked` pour toutes les cases à cocher ciblées, y compris `check-all` et `checkbox-categoryName`. Dans Vue, _directive expression_ peut nous aider à lier un attribut de sorte que, dès lors que la méthode `checkAllBoxes` se déclenche, on puisse manipuler dynamiquement la valeur de n'importe quel attribut.

<details>
  <summary markdown='span'>Hint</summary>

  On peut ajouter `v-bind:checked` ou le raccourci `:checked` sur les cases à cocher ciblées pour permettre des manipulations dynamiques.

  ```html
  <!-- index.html -->
  <!-- ... -->
  <input id='check-all' type="checkbox" class="form-check-input" :checked="allChecked" @click="checkAllBoxes">
  <!-- ... -->
  <input id='checkbox-appartment' type="checkbox" class="form-check-input" :checked="allChecked">
  <!-- ... -->
  ```

  ```js
  // index.js
  let app = new Vue({
    el: '#app',
    data: {
      // Définis la valeur par défaut à false pour toutes les cases à cocher
      allChecked: false,
    },
    methods: {
      checkAllBoxes(event){
        // Code ici
      }
    }
  })
  ```
</details>

## Manipuler l'attribut

L'étape suivante consiste à ajouter du code à la méthode `checkAllBoxes`. Suis la logique évoquée au début et réfléchis à la façon dont tu souhaites manipuler la propriété `allChecked` dans `data`.

Tu as tout ce qu'il te faut pour résoudre le reste de ce challenge.

Souviens-toi de tester (manuellement) le comportement de ton code dans le navigateur et n'hésite pas à ajouter `console.log` pour comprendre ce à quoi tu as affaire avec les méthodes `checkAllBoxes`.

À toi de jouer !
