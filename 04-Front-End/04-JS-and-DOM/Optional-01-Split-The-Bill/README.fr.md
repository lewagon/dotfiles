## Contexte et objectifs

Pour la première partie de ce challenge, tu dois passer les tests dans le navigateur. Le but est de comprendre comment manipuler un [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) JavaScript.

Ensuite, tu dois changer le HTML et écrire une nouvelle fonction JavaScript pour afficher les résultats dans le navigateur.

Dans cet exercice, tu peux lancer tes tests :
- dans le navigateur (lance `serve` et suis le flow)
- dans le terminal avec une commande `rake`

## Spécifications

Tu es parti en voyage avec un groupe d'amis. Chacun d'entre vous a payé pour différentes choses (nourriture, voiture, hôtel, etc.), et maintenant il est temps de faire les comptes ! Qui doit de l'argent au groupe, et qui a trop dépensé ? Découvrons-le !

Supposons que le groupe est représenté par l'objet suivant :

```js
const group = {
  "john"  : 120,
  "paul"  :  30,
  "ringo" : 150,
}
```

Cela signifie que John a dépensé 120€, Paul a dépensé 30€ et Ringo a dépensé 150€.

Implémente la méthode `splitTheBill(group)` qui devrait retourner combien d'argent le groupe doit rendre à chaque individu. Dans notre exemple, cela devrait retourner :

```js
{
  "john"  :  20,
  "paul"  : -70,
  "ringo" :  50
}
```

## Indice

Pour itérer sur un objet JavaScript, tu peux utiliser la méthode [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).

Voici un exemple :

```js
const character =  { name: 'Luke Skywalker', type: 'Jedi' };
Object.keys(character).forEach((key) => {
  const value = character[key];
  console.log(`The character ${key} is ${value}`);
});
```

## Afficher les résultats

Une fois que tu as implémenté la fonction `splitTheBill(group)`, tous les tests devraient être verts.

Maintenant, il est temps de mettre à jour le fichier HTML et d'ajouter une liste de qui doit payer combien. Commence par créer une liste avec des valeurs vides dans le fichier `index.html` puis complète la fonction `updatePriceList()` dans ton fichier JS pour afficher les bonnes valeurs.
