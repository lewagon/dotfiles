## Contexte et objectifs

Bienvenue à votre premier challenge de templating ! Dans ce challenge, tu vas t'entraîner à générer du HTML avec JavaScript en créant une to-do liste.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-static.png)

### Configuration

Lançons un serveur web local avec :

```bash
serve
```

Ensuite, ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

### Données et HTML

Dans ton fichier `lib/to-do-list.js`, tu devrais trouver les deux morceaux de code suivants.

1. Données : un array d'éléments de to-do

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
];
```

- `title` : une `string ` qui contient le sujet de l'élément.
- `done` : un `boolean` qui indique si l'élément est terminé ou non.

1. Template: une portion de code HTML pour une to-do

```html
<div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
  <input class="d-flex form-check-input me-1" type="checkbox">
  <div>To-do title...</div>
</div>
```

### Générer du code HTML dynamiquement

A toi d'afficher les todos ! Réfléchis à la manière dont tu peux générer dynamiquement le HTML en te basant sur l'array `todos`.

#### Comment afficher dynamiquement une checkbox à cocher

Une [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) est cochée en fonction de la présence de l'attribut `checked`.

```html
<!-- cette case est cochée -->
<input type="checkbox" name="Checkbox 1" checked>

<!-- cette case est décochée -->
<input type="checkbox" name="Checkbox 2">
```

En JavaScript, on peut attribuer à l'attribut `checked` de l'élément input la valeur `true` ou `false`.

```js
const checkbox = document.querySelector("input[type=checkbox]")
checkbox.checked = true; // génère une case cochée
checkbox.checked = false // génère une case non cochée
```

Maintenant, c'est à toi de définir la valeur de l'attribut `checked` en fonction de la valeur `done` de chaque to-do.
