## Especificaciones

En este ejercicio tenemos Hobbits, Elfos (Elves), Enanos (Dwarves) y Águilas (Eagles) quienes irán a una batalla con los malvados Orcos (Orcs), Wargs, Duendes (Goblins), Uruk-hai y Trolls. Abre el archivo `lib/lord_of_the_rings.js`. Ahí encontrarás tres funciones que debes implementar.

La primera función `isGood` toma como argumento a un soldado de tipo cadena de texto (`String`) y debe devolver verdadero (`true`) si el soldado pertenece al lado de los buenos.

- `isGood("Hobbits")` debe devolver verdadero (`true`)
- `isGood("Uruk-hai")` debe devolver falso (`false`)

La segunda función `buildSoldierObject` toma un `battlefield` (de tipo cadena de texto (`String`)) como parámetro y devuelve un objeto (`object`) JavaScript. Las llaves (`keys`) de dicho objeto serán del tipo soldado (**soldier type**) y los valores (`values`) serán el **número de soldados de este tipo en el campo de batalla**. Aquí hay algunos ejemplos de cadenas de texto del campo de batalla que debes parsear (y convertir en objeto):

- `Elves:5,Orcs:4`
- `Hobbits:4,Dwarves:1,Elves:1,Goblins:100,Uruk-hai:1`

Por ejemplo:

```js
const battlefield = "Elves:3,Orcs:2"
buildSoldierObject(battlefield)  //=> { "Elves" => 3, "Orcs" => 2 }
```

Aquí hay un repaso de como usar objetos en JavaScript:

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

La tercera función `whoWinsTheWar` unirá todo. A partir de un parámetro `battlefield` dado (de tipo cadena de texto (`String`)), dicha función devolverá una cadena de texto (`String`) que revelará el resultado de la guerra:

- Empate (`Tie`): si el campo de batalla está vacío o si los buenos y los malos tienen el mismo número de soldados
- Los buenos (`Good`): si el número de soldados buenos supera el de los malos.
- Los malos (`Evil`): si el número de soldados malos supera el de los buenos.

_N.B.: en este ejercicio simplificamos la guerra si considerar la "valoración" (worth) de cada tipo de soldado._

