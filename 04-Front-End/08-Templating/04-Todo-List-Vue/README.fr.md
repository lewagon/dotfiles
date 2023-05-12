## Contexte et objectifs

Bienvenue à votre premier challenge Vue !

[Vue](https://vuejs.org/guide/introduction.html) (prononcé /vjuː/, comme view) est un framework JavaScript pour la construction d'interfaces utilisateur. Il s'appuie sur le HTML, le CSS et le JavaScript standard et fournit un modèle de programmation déclaratif et basé sur des composants qui permet de développer efficacement des interfaces utilisateur, qu'elles soient simples ou complexes.

Tu vas apprendre les bases de Vue en construisant une liste de tâches APP, avec laquelle tu pourras faire ce qui suit :

- Voir tous vos éléments à faire
- Ajouter une tâche (optionnel)
- Supprimer une tâche (optionnel)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-list-vue-user-flow.gif)

### Installation

#### Vue

Nous allons importer [Vue avec Import Maps](https://vuejs.org/guide/quick-start.html#enabling-import-maps). Assure-toi d'avoir le code suivant dans ton HTML et ton JS.

```html
<!-- index.html -->
<head>
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
      }
    }
  </script>
</head>
```

```js
// lib/to-do-list.js
import { createApp } from 'vue'
// ...
```

Lançons un serveur web local avec :

```bash
serve
```

Ensuite, ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur. Si tu vois un message à propos de Vue, alors ton projet est configuré avec Vue !

#### VSCode Vue Highlighter

Installons le surligneur de syntaxe Vue pour rendre notre code plus agréable à lire 💅

```bash
code --install-extension Vue.volar
```

## L'application To-do

### Echauffement Vue

Jette un coup d'œil au fichier `lib/to-do-list.js`.

```js
createApp({
  data() {
    return {
      message: "If you see this message in your browser, that means Vue is successfully mounted! 🙌"
    }
  }
}).mount('#todosContainer')
```

Une instance Vue est déjà créée avec la fonction `createApp()`. Tu vas coder ton composant à l'intérieur de `createApp()`.

`.mount("#todosContainer")` est appelé sur l'instance Vue. Cela signifie que cette instance Vue sera montée sur l'élément HTML qui a le sélecteur css `#todosContainer`.

[`data`](https://vuejs.org/api/options-state.html#data) est une option de composant. Elle renvoie un objet JavaScript simple. Les propriétés, comme `message`, sont rendues disponibles dans le HTML par `{{}}`.


```html
<div id="app">
  {{message}}
</div>
```

### 1. Voir tous les éléments de to-do

#### Données

<details>
<summary markdown='span'>Dans une instance Vue, où placer les données des to-do ?

Tu as les mêmes éléments de tâches dans un array :

```js
[
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
]
```

Nous pouvons placer cette liste dans l'option `data` comme donnée initiale, et l'assigner à une propriété pertinente, comme `todos` ou `items`. Il est important de nommer les choses de manière pertinente, afin que ton code soit lisible par ton futur utilisateur et par les autres.

```js
createApp({
  data() {
    return {
      todos: [
        { title: "Code a to-do list", done: false },
        { title: "Eat breakfast", done: true },
        { title: "Do some exercise", done: false },
        { title: "Water the plants", done: true }
      ]
    }
  }
}).mount('#todosContainer')
```
</details>

#### Rendu de la liste

<details>
<summary markdown='span'>Comment générer dynamiquement la liste ?

Nous pouvons utiliser une directive intégrée [`v-for`] (https://vuejs.org/api/built-in-directives.html#v-for). C'est comme `.each` en Ruby. Lis la documentation, et écris ton code dans `index.html` pour générer ta liste de to-dos en te basant sur `todos`.

ℹ️ Tu as déjà codé une liste de to-dos dans le premier challenge, alors n'hésite pas à réutiliser une partie du HTML que tu as précédemment écrit.
</details>

#### Lier les attributs (Attribute Binding)

<details>
<summary markdown='span'>Comment lier `done` à la case à cocher ?</summary>

Nous pouvons utiliser [`v-bind`] (https://vuejs.org/api/built-in-directives.html#v-bind) pour rendre dynamiquement les attributs HTML. Dans le cas de la case à cocher, nous pouvons faire ce qui suit :

```html
<input type="checkbox" v-bind:checked="theDoneBooleanGoesHere">
```
</details>

#### v-cloak 🧥

<details>
<summary markdown='span'>As-tu remarqué qu'à chaque fois que tu rafraîchis la page, il y a un flash d'éléments HTML non chargés ?</summary>

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/vue-un-compiled-flash.gif)

C'est parce que le HTML n'est pas encore compilé lorsque nous rafraîchissons la page. Nous pouvons utiliser `v-cloak` pour cacher temporairement le HTML non compilé. Lis [la documentation](https://vuejs.org/api/built-in-directives.html#v-cloak), et applique-la à ton application ! N'oublie pas d'effectuer un **hard refresh** lorsque tu modifies le fichier CSS.

Voilà, c'est fait ! Félicitations pour ta première application Vue ! 🥂 Maintenant passe aux tâches optionnelles pour essayer d'implémenter les actions **Créer** et **Supprimer** !
</details>

### 2. Ajouter une tâche (optionnel)

<details>
<summary markdown='span'>Que se passe-t-il lorsqu'un utilisateur ajoute une tâche ? </summary>

1. L'utilisateur remplit le titre de la tâche
2. L'utilisateur clique sur un bouton
3. la tâche est ajoutée et apparaît dans la liste.

Lorsque l'utilisateur clique sur le bouton, l'instance Vue doit se charger de récupérer les données et de les ajouter à la liste. Nous allons créer une [méthode] (https://vuejs.org/api/options-state.html#methods) appelée `addTodo()` pour s'occuper de tout cela.

Les méthodes sont définies dans l'option `methods` :

```js
createApp({
  data() {
  // ...
  },
  methods : {
    addTodo() {
      console.log("Ajouter une tâche...")
    }
  }
}).mount('#todosContainer')
```
</details>

#### Lier l'événement

`addTodo()` doit être déclenché lorsque le bouton d'ajout est cliqué.

<details>
<summary markdown='span'>Comment pouvons-nous lier l'événement click au bouton ? </summary>

Nous pouvons utiliser [`v-on`](https://vuejs.org/api/built-in-directives.html#v-on) pour écouter l'événement click.

```html
<button v-on:click="addTodo">Add</button>
```

Vérifie dans la console de ton navigateur, peux-tu voir le `console.log` que tu as ajouté dans ta méthode ? Si oui, alors tu as bien lié l'évènement `click` !
</details>

#### Lier les données du form

<details>
<summary markdown='span'>Maintenant, comment passer les données d'du form à l'instance Vue ?</summary>

Tu peux utiliser [`v-model`](https://vuejs.org/guide/essentials/forms.html#form-input-bindings), qui est similaire à `v-bind`. `v-bind` créé un lien **à sens unique** - de l'instance Vue au HTML. `v-model` est à **deux sens**. On l'utilise souvent pour les formulaires, car il permet de synchroniser l'état des inputs du formulaire avec l'état correspondant en JavaScript.

Pour utiliser `v-model`, il nous faut d'abord avoir une propriété que l'on définit dans l'option `data()`.

```js
data() {
  return {
    // ...
    newTodo: null
  }
},
```

On peut utiliser ensuite la lier à l'input dans le HTML.

```html
<input v-model="newTodo" placeholder="Your to-do goes here" />
```

Note que chaque propriété dans `data()` est accessible avec `this.propertyName`. Maintenant tu peux accéder à l'entrée de l'utilisateur avec `this.newTodo` dans l'instance Vue. À ton tour !

##### Pseudo-code pour addTodo()

1. Construire un objet to-do en fonction des données de l'utilisateur.
2. L'ajouter à la liste `todos`.

Une chose intéressante à propos de Vue est sa [**réactivité**] (https://vuejs.org/guide/extras/reactivity-in-depth.html). `data()` est réactif, ce qui signifie que les changements dans `data()` déclenchent une mise à jour dans le DOM. On peut voir comment le changement de `this.todos` met automatiquement à jour le DOM.

Tu peux également remarquer qu'après avoir ajouté une tâche, la saisie de l'utilisateur reste dans le champ de saisie. Considérant que le binding de `v-model` est bidirectionnel, comment réinitialiser l'entrée ?
</details>

### 3. Supprimer une tâche (optionnel)

Tout d'abord, tu dois t'assurer d'ajouter un bouton de suppression à l'élément to-do. Tu peux utiliser [le bouton de fermeture de Boostrap](https://getbootstrap.com/docs/5.0/components/close-button/), ou [l'icône de poubelle de fontawesome](https://fontawesome.com/search?q=trash&o=r).

Le reste est très similaire à l'ajout d'une tâche. Profite de [la documentation de Vue](https://vuejs.org/guide/introduction.html) pour mettre en œuvre les étapes suivantes :

1. Lier un événement au bouton de suppression qui déclenche une méthode
2. La méthode supprime la tâche de `todos`

<details>
<summary markdown='span'>Question et conseil</summary>

❓ Comment cette méthode sait-elle quelle tâche supprimer ?
❓ Quel est l'identifiant unique de chaque tâche ? Vous pouvez l'utiliser pour identifier la tâche à supprimer.

💡 Vous pouvez passer un argument à une méthode.
💡 Vous avez accès à l'index dans `v-for`.
</details>

Good luck!
