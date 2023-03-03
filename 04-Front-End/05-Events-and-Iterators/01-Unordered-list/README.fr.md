## Contexte et objectifs

Dans cet exercice, on va chercher à générer le HTML d'une **liste non ordonnée** à partir de données brutes.

### Mise en place

Pour commencer, lance un serveur local en tapant la commande suivante dans ton terminal :

```bash
serve
```

Puis, ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

Dans cet exercice, on va utiliser deux processus pour tester notre code :
- dans le navigateur
- dans le terminal

Les deux processus testent les mêmes choses mais dans deux interfaces différentes.

Commence par travailler avec les tests dans le navigateur. Quand tu auras fini, utilise `rake` pour tester dans le terminal.

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

### Afficher la liste

Maintenant, appelle ta fonction `unorderedList` pour générer le HTML de la liste de courses et affiche-le dans l'élément `#list` de la page `index.html`.

La liste de courses devrait ressembler à ceci :
```js
const groceries = ['milk', 'butter', 'bread'];
```

### Refactoring avec `Map()`

Si ta solution passe tous les tests avec `forEach()`, essaie de trouver une meilleure solution en utilisant [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)!

Voici un exemple :

```js
const beatles = ["paul", "john", "ringo", "george"];
const upcasedBeatles = beatles.map(beatle => beatle.toUpperCase());
// => ["PAUL", "JOHN", "RINGO", "GEORGE"]
```
