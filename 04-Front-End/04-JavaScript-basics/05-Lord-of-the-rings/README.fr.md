## Spécifications

Dans cet exercice, des Hobbits, des Elfs (Elves), des Nains (Dwarves) et des Aigles (Eagles) vont affronter les maléfiques Orcs (Orcs), Vargs (Wargs), Gobelins (Goblins), Uruk-hai et Trolls. Ouvre le fichier `lib/lord_of_the_rings.js`. Il contient trois fonctions à coder.

La première fonction `isGood` prend un type de soldat (`string`) comme paramètre et doit retourner `true` si ce soldat appartient au camp du Bien.

- `isGood("Hobbits")` doit retourner `true`
- `isGood("Uruk-hai")` doit retourner `false`

La deuxième fonction `buildSoldierObject` prend un champ de bataille ou `battlefield` (`string`) comme paramètre et doit retourner un objet (`object`) JavaScript. L'objet `keys` correspondra au **type de soldat** et l'objet `values` correspondra au **nombre de soldats de ce type sur le champ de bataille**. Voici quelques exemples de strings de champ de bataille à parser (et convertir en objet) :

- `Elves:5,Orcs:4`
- `Hobbits:4,Dwarves:1,Elves:1,Goblins:100,Uruk-hai:1`

On a donc par exemple :

```js
const battlefield = "Elves:3,Orcs:2"
buildSoldierObject(battlefield)  //=> { "Elves": 3, "Orcs": 2 }
```

Voici un rappel de comment utiliser les objets en JavaScript :

```js
const beatles = {}

// Create
beatles.john = "guitar"; // OU beatles["john"] = "guitar"
beatles.paul = "bass";

// Read
console.log(beatles.paul);

// Update
beatles.paul = "bass guitar"; // OU beatles["paul"] = "bass guitar"

// Delete
delete beatles.paul

```

La troisième fonction `whoWinsTheWar` unira tout. À partir d'un paramètre `battlefield` (`string`), elle retournera une `string` dévoilant l'issue de la guerre :

- `Tie` si le champ de bataille est vide ou si le nombre de soldats est le même dans le camp du Bien et le camp du Mal
- `Good` si les soldats du Bien sont plus nombreux que les soldats du Mal
- `Evil` si les soldats du Mal sont plus nombreux que les soldats du Bien

_N.B. : Pour cet exercice, on simplifie la guerre et on ne tient pas compte de la "valeur" de chaque type de soldat._
