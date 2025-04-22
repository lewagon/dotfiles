## Contexte et objectifs

Dans ce challenge, tu vas créer la **même liste de to-do**, mais cette fois, en utilisant **la balise `<template>`**.

### Préparation

Lançons un serveur web local avec :

```bash
serve
```

Ensuite, ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

### Données et HTML

Nous t'avons préparé une liste de to-do dans le fichier `lib/to-do-list.js`.

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
];
```

Tu trouveras également dans le fichier `index.html` un élément HTML **dans une balise `<template>`** correspondant à un élement de to-do, stylisé avec Bootstrap.

```html
<template id="todoItemTemplate">
  <div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
    <input class="d-flex form-check-input me-1" type="checkbox">
    <div>To-do title...</div>
  </div>
</template>
```

### Sélectionne le `<template>` pour générer du HTML dynamiquement

A présent, tu dois sélectionner la balise `<template>` et cloner son contenu. Insère ensuite le titre au bon endroit, modifie la propriété `checked` en conséquence, et insère-le dans le conteneur `todosContainer`.

Te souviens-tu comment sélectionner et cloner le contenu à l'intérieur de la balise template ? Voici un exemple rapide.

```js
const template = document.querySelector("#idOfTheTemplate") ;
const clone = template.content.cloneNode(true) ;
```

Consulte les slides du cours si tu as besoin de rafraîchir tes connaissances. Nous te souhaitons bonne chance !
