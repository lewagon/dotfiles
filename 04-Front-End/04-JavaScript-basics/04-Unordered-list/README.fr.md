## Contexte et objectifs

Dans cet exercice, on va chercher à générer le HTML d'une **liste non ordonnée** à partir de données brutes.

## Spécifications

### Générateur d'éléments d'une liste

Commence par coder la fonction `listItem` qui prend un paramètre `content` (de type `string`) et retourne la balise `<li>` avec son contenu :

```js
listItem('milk');
// => '<li class="list-group-item">milk</li>'
```

Assure-toi d'utiliser les [template literals ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) au lieu de la concaténation (qui n'est pas la méthode moderne à utiliser en JavaScript).

### Générateur de liste non ordonnée

Une fois que la fonction `listItem` a passé tous les tests, code la fonction `unorderedList` qui prend un paramètre `items` (`array`) et retourne tout le HTML de la liste `<ul>` :

```js
> console.log(unorderedList(['milk', 'butter', 'bread']));
// <ul class="list-group">
//   <li class="list-group-item">milk</li>
//   <li class="list-group-item">butter</li>
//   <li class="list-group-item">bread</li>
// </ul>
```

**Pour cette fois**, ce n'est pas grave si l'indentation n'est pas parfaite !

### Aller plus loin

Si ta solution passe tous les tests avec `forEach()`, essaie de trouver une meilleure solution en utilisant [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)!

Voici un exemple :

```js
const beatles = ["paul", "john", "ringo", "george"];
const upcasedBeatles = beatles.map(beatle => beatle.toUpperCase());
// => ["PAUL", "JOHN", "RINGO", "GEORGE"]
```
