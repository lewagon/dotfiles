## Specs

In this exercise, Hobbits, Elves, Dwarves and Eagles will battle against the evil Orcs, Wargs, Goblins, Uruk-hai and Trolls. Open the `lib/lord_of_the_rings.js` file. You will find three functions to implement.

The first function `isGood` takes a soldier type (`string`) as a parameter and should return `true` if this soldier belongs to the Good side.

- `isGood("Hobbits")` should return `true`
- `isGood("Uruk-hai")` should return `false`

The second function `buildSoldierObject` takes a `battlefield` (`string`) as a parameter and should return a JavaScript `object`. The object `keys` will be the **soldier type**, and the `values` will be the **number of soldiers of this type on the battlefield**. Here are some examples of battlefield strings you need to parse (and convert to an object):

- `Elves:5,Orcs:4`
- `Hobbits:4,Dwarves:1,Elves:1,Goblins:100,Uruk-hai:1`

So for example:

```js
const battlefield = "Elves:3,Orcs:2"
buildSoldierObject(battlefield)  //=> { "Elves": 3, "Orcs": 2 }
```

Here is a reminder on how to use objects in JavaScript:

```js
const beatles = {}

// Create
beatles.john = "guitar"; // OR beatles["john"] = "guitar"
beatles.paul = "bass";

// Read
console.log(beatles.paul);

// Update
beatles.paul = "bass guitar"; // OR beatles["paul"] = "bass guitar"

// Delete
delete beatles.paul

```

The third function `whoWinsTheWar` will tie everything together. Given a `battlefield` parameter (`string`), it will return a `string` revealing the outcome of the war:

- `Tie` if the battlefield is empty or if Good and Evil have the same number of soldiers
- `Good` if Good soldiers outnumber Evil soldiers
- `Evil` if Evil soldiers outnumber Good soldiers

_NB: for this exercise we are simplifying the war and not taking any concept of "worth" of each soldier type into account._
