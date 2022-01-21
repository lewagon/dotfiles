## Contexte et objectifs

Dans le développement Web front-end, les **attributs de données** sont très utiles pour injecter des valeurs dans ton HMTL auxquelles tu peux facilement accéder dans ton JavaScript.

Dans ce challenge, on va écrire une fonction qui parse une balise HTML et extrait les attributs de données vers un objet (`object`).

## Spécifications

Code la fonction `dataset` qui prend un paramètre `element` (de type `string`) et retourne un objet (`object`) avec les bonnes clés et valeurs :

```js
const burger = `<div class="card" data-id="42" data-price="15" data-category="popular">
  <div class="card-category">Popular</div>
  <div class="card-description">
    <h2>The best burger in town (15€)</h2>
  </div>
</div>`;

dataset(burger);
// => { id: 42, price: 15, category: 'popular' }
```

- La méthode doit uniquement retourner l'ensemble de données de l'élément enveloppant (**wrapping**), indépendamment de ses enfants
- La méthode doit attribuer les valeurs au bon type (dans l'exemple, `42` et `15` doivent être attribuées au type `number`)

### Aide

N'oublie pas d'utiliser les outils de développement (devtools) de ton navigateur web !

Si tu veux détecter **toutes les occurrences correspondantes** dans ta string, jette un œil au [modificateur `g`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters).

### Améliorations

On ne teste pas cela dans les `specs`, mais tu peux coder la traduction des attributs de données "composés" des clés `kebab-case` à `lowerCamelCase` :

```js
const element = `<div class="card" data-meal-id="42">ANY CONTENT</div>`;

dataset(element);
// => { mealId: 42 }
```

### Aller plus loin

Demain, on rédigera du JavaScript à exécuter dans le **navigateur**, dans le contexte du [DOM](https://en.wikipedia.org/wiki/Document_Object_Model). Tu pourras alors appeler `.dataset` sur n'importe quel élément HTML sélectionné à partir du DOM, et cela retournera le même genre d'objets que dans cet exercice !

Cette méthode est très pratique pour passer des données de ton code HTML à ton code JavaScript, pour réagir de façon dynamique à des événements du DOM ou réaliser des appels distants à un serveur.

Tu en apprendras davantage sur ces applications dans les prochains jours. En attendant, tu peux te renseigner sur la [propriété dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
