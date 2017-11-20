## Background & Objectives

Moving off the Browser world, let's do more algorithmics with JavaScript!

## Specs

In this exercise, Hobbits, Elves, Dwarves and Eagles will battle against the evil Orcs, Wargs, Goblins, Uruk Hai and Trolls. Open the `lib/lord_of_the_rings.js` file. You will find three functions to implement.

The first function `isGood` takes a soldier type (`String`) as a parameter and should return `true` if this soldier belongs to the Good side.

- `isGood("Hobbits")` should return `true`
- `isGood("Uruk Hai")` should return `false`

The second function `buildSoldierMap` takes a `battlefield` (`String`) as a parameter and should return a `Map`. The map `keys` will be the **soldier type**, and the `values` will be the **number of soldiers of this type on the battlefield**. Here are some examples of battlefield strings you need to parse (and convert to a Map):

- `Elves:5,Orcs:4`
- `Hobbits:4,Dwarves:1,Elves:1,Goblins:100,Uruk Hai:1`

So for example:

```js
const battlefield = "Elves:3,Orcs:2"
buildSoldierMap(battlefield)  //=> { "Elves" => 3, "Orcs" => 2 }
```

Here is how to use a JavaScript [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map):

```js
const beatles = new Map();

// Create
beatles.set("john", "guitar");
beatles.set("paul", "bass");

// Read
console.log(beatles.get("paul"));

// Update
beatles.set("paul", "bass guitar");

// Delete
beatles.delete("paul");

// Loop
beatles.forEach((value, key) => {
  console.log(`${key} played the ${value}`);
});
```

The third function `whoWinsTheWar` will tie everything together. Given a `battlefield` parameter (`String`), it will return a `String` revealing the outcome of the war:

- `Tie` if the battlefield is empty or if Good and Evil have the same number of soldiers
- `Good` if Good soldiers outnumber Evil soldiers
- `Evil` if Evil soldiers outnumber Good soldiers

_NB: for this exercise we are simplifying the war and not taking any concept of "worth" of each soldier type into account._
