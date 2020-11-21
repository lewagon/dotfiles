## Contexto y Objetivos

En este ejercicio nos quedaremos en la Terminal con Node.js. El objetivo es entender cómo manipular [Objetos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) JavaScript.

## Especificaciones

Te fuiste de viaje con un grupo de amigos. Cada uno de ustedes pagó cosas distintas (comida, transporte, alojamiento, etc.) y ¡es hora de hacer cuentas para saber quién debe dinero y quien gastó demasiado!¡Averigüemoslo!

Supongamos que el grupo está representado por el siguiente objeto:

```js
const group = {
  "john"  : 120,
  "paul"  :  30,
  "ringo" : 150,
}
```

Esto significa que John gastó 120€, Paul gastó 30€ y Ringo gastó 150€.

Implementa el método `splitTheBill(group)` el cual debe devolver la cantidad de dinero que debe ser devuelta a cada individuo. En este ejemplo, debe devolver lo siguiente:

```js
{
  "john"  :  20,
  "paul"  : -70,
  "ringo" :  50
}
```

## Sugerencias y recursos adicionales

Para iterar a través de un objeto JavaScript, puedes usar el método [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).

Aquí hay un ejemplo:

```js
const character =  { name: 'Luke Skywalker', type: 'Jedi' };
Object.keys(character).forEach((key) => {
  const value = character[key];
  console.log(`The character ${key} is ${value}`);
});
```
