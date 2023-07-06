## Contexte et objectifs


Bienvenue dans ton premier challenge React !

[React](https://reactjs.org/) est une bibliothèque JavaScript pour la création d'interfaces utilisateur. C'est une bibliothèque très populaire, utilisée par Facebook, Instagram, Netflix, Airbnb et de nombreuses autres entreprises. Les applications React sont composées de composants : des éléments d'interface utilisateur ayant leur propre logique et apparence.

Tu vas apprendre les bases de React en construisant une application de liste de tâches (to-do list) avec laquelle tu pourras faire ce qui suit :

- Afficher tous les éléments de to-do
- Ajouter un élément de to-do (facultatif)
- Supprimer un élément de to-do (facultatif)

(Oui, c'est la même fonctionnalité que dans le challenge Vue 💪)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-list-vue-user-flow.gif)

### Configuration

#### React

React utilise une syntaxe spéciale appelée [JSX](https://react.dev/learn/writing-markup-with-jsx), qui est un langage de templating nous permettant d'écrire facilement des expressions JavaScript dans notre HTML. La syntaxe diffère un peu du JavaScript standard (nous le verrons bientôt !). La bonne nouvelle, c'est que la syntaxe est assez simple. La partie un peu plus difficile, c'est que les _navigateurs ne peuvent pas lire directement les fichiers JSX par défault_. Nous devons donc les convertir en fichiers JavaScript normaux avant de pouvoir les exécuter dans le navigateur.

Généralement, les développeurs utilisent ce qu'on appelle un **bundler** comme [Webpack](https://webpack.js.org/) pour traiter tous les fichiers et les convertir en JavaScript "normal" que les navigateurs peuvent lire. Cela nécessite l'installation de beaucoup de choses supplémentaires, nous allons donc éviter cette complexité juste pour les besoins de ce challenge.

À la place, nous allons charger quelques scripts externes qui installeront React et traiteront nos fichiers pour nous :

```html
    <script type="application/javascript" src="https://unpkg.com/react@17.0.0/umd/react.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
```

Les deux premières bibliothèques correspondent à React. La troisième est Babel, qui peut traiter nos fichiers JSX pour nous. Tu remarqueras peut-être cette ligne en bas de notre `index.html` :

```html
<script src="lib/to-do-list.jsx" type="text/babel"></script>
```

Le `type="text/babel"` indique à Babel de traiter notre JavaScript. Donc, nous devrions être prêts à écrire du JSX 💪 Tu remarqueras que nous importons nos scripts légèrement différemment dans ce challenge par rapport aux autres, car cette configuration n'est pas compatible avec les import maps pour le moment. Mais ne t'inquiète pas - cela n'affectera pas le code que tu finiras par écrire.

_[Remarque : Cela signifie que Babel convertit notre JSX en JS à l'intérieur du navigateur de l'utilisateur. C'est ineffic

_[Note: Cela signifie que Babel convertit notre JSX en JS à l'intérieur du navigateur de l'utilisateur. C'est inefficace car idéalement, nous devrions tout convertir à l'avance. En d'autres termes, cette configuration "légère" est parfaite pour les besoins de ce challenge, mais une véritable application de production nécessiterait une configuration supplémentaire.](https://babeljs.io/docs/babel-standalone#when-not-to-use-babelstandalone)_

Lançons un serveur web local en exécutant la commande suivante :

```bash
serve
```

Ensuite, ouvre localhost:8000 dans ton navigateur. Si tu vois un message à propos de React, cela signifie que ton projet est configuré avec React.

## L'application de to-do

### Mise en route avec React

Jette un coup d'œil au fichier `lib/to-do-list.jsx`.

```js
const App = () => {
  const message = "If you see this message in your browser, that means React is successfully mounted! 🙌";

  return (
    <div id="app">
      {message}
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

Une instance React est déjà créée avec la fonction `ReactDOM.render`. Tu vas coder ton composant à l'intérieur de `App()`.

`ReactDOM.render` place en fait les résultats du code React dans le DOM. Tu n'auras pas besoin de changer cette ligne, car elle connecte le code React à l'élément `<div id="root">` qui est déjà inclus pour toi dans le fichier `index.html`.

Notre fonction `App()` est l'endroit où la plupart du code ira. C'est un [component](https://react.dev/learn/your-first-component), qui, dans React, est une fonction qui renvoie du HTML. Remarque le code de mise en forme qui place la variable de chaîne `message` à l'intérieur d'un élément `<div>` comme ceci :

```html
<div id="app">
  {message}
</div>
```

Voici la syntaxe JSX. Il suffit d'insérer des `{}` dans votre HTML chaque fois que vous souhaitez écrire une expression JavaScript. Par exemple, ceci fonctionnerait également :

```html
<div id="app">
  The sum is {2 + 4}
</div>
```

### 1. Voir tous les éléments de to-do

#### Données

<details>
<summary markdown='span'>Dans une application React, où plaçons-nous les données des éléments de to-do ?</summary>

Nous allons avoir les mêmes éléments de to-do dans un tableau :

```js
[
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
]
```

Il s'agit de données qui pourraient potentiellement changer au fil du temps. Par exemple, nous pourrions vouloir ajouter ou supprimer un élément de notre tableau d'éléments à faire à l'avenir. Comment gérons-nous les données changeantes en React ?

Nous utilisons la fonction [`React.useState`](https://react.dev/reference/react/useState). Il s'agit d'une fonction React, ou, comme les personnes travaillant avec React aiment l'appeler, un [hook](https://react.dev/reference/react), qui nous permet de définir des variables dont les valeurs peuvent changer au fil du temps dans notre application.

Modifions notre fonction `App()` de la manière suivante :

```js
const App = () => {
  const [todos, changeTodos] = React.useState(
    [
      { title: "Code a to-do list", done: false },
      { title: "Eat breakfast", done: true },
      { title: "Do some exercise", done: false },
      { title: "Water the plants", done: true }
    ]
  )

  return (
    <div id="app"></div>
  );
}
```

Ce code signifie que nous aurons maintenant accès à deux variables : `todos`, qui est simplement le tableau des tâches à faire, et `changeTodos`, qui est une fonction que nous pourrions appeler lorsque notre tableau devrait changer (par exemple, si nous voulons ajouter ou supprimer un élément). Comme nous nous préoccupons uniquement de _lire_ nos tâches à faire pour le moment, et non de les créer, les modifier ou les supprimer, nous n'utiliserons pas beaucoup `changeTodos` pour le moment 😌
</details>

#### Rendu de liste

<details>
<summary markdown='span'>Comment rendre la liste dynamique ?</summary>

En React, tu peux utiliser `{}` chaque fois que tu veux insérer du JavaScript dans ton HTML. En JavaScript normal, si nous voulions afficher chaque élément d'une liste, nous aurions besoin d'utiliser l'**itération**. Il s'avère qu'en React, tu peux utiliser l'itération de la même manière que dans JavaScript normal ! L'opérateur le plus courant est la fonction `map`. La raison en est que `map` renvoie un tableau (dans ce cas, des éléments JSX), et JSX prend en charge l'ajout d'un tableau d'éléments au DOM.

Voici un exemple :

```js
function App() {
  const [items, changeItems] = React.useState(['apple', 'banana', 'orange']);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default App;
```
</details>

Cela afficherait une liste des 3 fruits 🍎

Tu te demandes peut-être ce que signifie la key. React préfère qu'on lui donne une clé unique pour chaque élément sur lequel on itère. Cela l'aide à suivre les éléments ajoutés/supprimés ou si l'ordre change. C'est similaire à la manière dont nous attribuons un ID unique à chaque enregistrement dans la base de données. Nous ne nous en préoccuperons pas trop aujourd'hui 💆 Si cela t'intéresse, tu peux en apprendre plus sur [pourquoi React a besoin de clés](https://react.dev/learn/rendering-lists#why-does-react-need-keys). Dans cet exemple, nous utiliserons l'index de l'élément dans le tableau.

Peux-tu utiliser ce code d'exemple comme guide pour essayer de trouver comment afficher chaque élément de to-do qui se trouve dans l'array `todos` dans le DOM ?

#### Lier les attributs

<details>
<summary markdown='span'>Comment lier `done` avec la case à cocher ?</summary>

React facilite la définition des attributs HTML en syntaxe JSX :

```js
function App() {
  const shouldBeChecked = true

  return (
    <input type="checkbox" checked={shouldBeChecked} />
  ) ;
}

export default App ;
```

Tout ce que nous avons à faire est d'utiliser `{}` pour écrire du JavaScript comme valeur de `checked` sur notre checkbox.

Peux-tu utiliser ce principe pour que tes cases à cocher correspondent dynamiquement à la valeur de `done` sur chaque case à cocher ?
</details>

### 2. Ajouter une to-do (optionnel)

<details>
<summary markdown='span'>Que se passe-t-il lorsqu'un utilisateur ajoute une tâche ? </summary>

1. L'utilisateur remplit le titre de la tâche.
2. L'utilisateur clique sur un bouton.
3. la tâche est ajoutée et apparaît dans la liste.

Lorsque le bouton est cliqué, l'application React doit se charger de récupérer les données et de les ajouter à la liste. Nous allons créer une fonction JavaScript appelée `addTodo()` pour s'occuper de tout cela.

Pour ce faire, nous allons créer une nouvelle variable `title` en utilisant le hook `useState` qui sera mise à jour à chaque fois que l'utilisateur saisira l'entrée (en utilisant l'événement `onChange`).

```js
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [title, setTitle] = React.useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const addTodo = () => {
    console.log("Adding a todo...");
    // TODO: add a new to-do based on the title to the `todos` array
    setTitle('');
  }

  return (
    <div id="app">
      <h1>To-Do List</h1>
      <form>
        <label htmlFor="todoTitle">Title:</label>
        <input type="text" id="todoTitle" value={title} onChange={handleTitleChange} />
        <button type="button" onClick={addTodo}>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

_Conseil : tu peux éventuellement utiliser le [**"spread operator"** de JavaScript](https://www.educative.io/answers/what-is-the-spread-operator-in-javascript) pour t'aider dans cette partie. Le "spread operator" est utile si tu souhaites prendre un tableau existant et générer un nouveau tableau avec un élément supplémentaire. Voici un exemple de la syntaxe:_

```js
const fruits = ['apple', 'banana', 'orange'];
const fruitsAndVegetables = [...fruits, 'cucumber', 'pepper'];
// the value of fruitsAndVegetables will be ['apple', 'banana', 'orange', 'cucumber', 'pepper']
```
</details>

#### Lier un évènement

`addTodo()` doit être déclenché lorsque le bouton d'ajout est cliqué.

<details>
<summary markdown='span'>Comment peut-on lier le clic au bouton ?</summary>

Nous pouvons utiliser l'attribut `onClick` sur notre `<button>`.

```html
<button type="button" onClick={addTodo}>Add Todo</button>
```

Vérifie dans la console de ton navigateur, peux-tu voir le `console.log` que tu as ajouté dans ta méthode ? Si c'est le cas, c'est que ta liaison d'événement est réussie !
</details>

##### Pseudo-code pour `addTodo()`

1. Construire un objet to-do en fonction de l'input de l'utilisateur.
2. L'ajouter à la liste `todos`.

Dans React, si tu souhaites changer simplement la valeur de `todos` comme `todos = SOMETHING_DIFFERENT`, cela ne fonctionnera pas. Il te faudra utiliser la fonction `changeTodos`.

Par exemple, le code ci-dessous assignerait un tableau vide `[]` à notre `todos` :

```js
changeTodos([]);
```

Maintenant, au lieu de lui assigner un tableau vide, peux-tu le mettre dans un nouveau tableau avec **toutes les todos existantes** ET **le nouveau todos que nous voulons ajouter** ?
</details>

### 3. Supprimer une tâche (optionnel)

Tout d'abord, assure-toi d'ajouter un bouton de suppression à l'élément to-do. Tu peux utiliser [le bouton de fermeture de Boostrap](https://getbootstrap.com/docs/5.0/components/close-button/), ou [l'icône de corbeille de fontawesome](https://fontawesome.com/search?q=trash&o=r).

Le reste est très similaire à l'ajout d'une tâche. Profite de [la documentation de React](https://reactjs.org/docs/getting-started.html) pour mettre en œuvre les étapes suivantes :

1. Lier un événement au bouton de suppression qui déclenche une méthode.
2. La méthode supprime la tâche de `todos`.

<details>
<summary markdown='span'>Question et conseil</summary>

❓ Comment cette méthode sait-elle quelle tâche supprimer ?
❓ Quel est l'identifiant unique de chaque tâche ? Tu peux l'utiliser pour identifier la tâche à supprimer.

💡 Tu peux passer un argument à une méthode.
💡 Tu as accès à l'index dans `map`.
</details>

## Aller plus loin

- [Documentation React](https://reactjs.org/docs/getting-started.html)
- [Official Learn React track](https://beta.reactjs.org/learn) si ce challenge vous a plu et que vous souhaitez aller plus loin après le bootcamp !
