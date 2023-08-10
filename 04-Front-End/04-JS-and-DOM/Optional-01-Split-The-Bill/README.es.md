## Antecedentes y objetivos

Para la primera parte de este ejercicio, debes hacer pasar las pruebas en el navegador. El objetivo es entender cómo manipular un [Objeto](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object) en JavaScript.

Después, debes cambiar el HTML y escribir una nueva función en JavaScript para mostrar los resultados en el navegador.

En este ejercicio, puedes ejecutar tus pruebas:

- en el navegador (ejecuta `serve` y sigue el flujo)
- en la terminal con un comando `rake`

## Especificaciones

Fuiste de viaje con un grupo de amigos. Cada uno de ustedes pagó por diferentes cosas (comida, coche, hotel, etc.), ¡y ahora es hora de equilibrar las cuentas! ¿Quién le debe dinero al grupo y quién gastó demasiado? ¡Descubrámoslo!

Supongamos que el grupo está representado por el siguiente objeto:

```js
const grupo = {
  john: 120,
  paul: 30,
  ringo: 150,
};
```

Esto significa que John gastó 120€, Paul gastó 30€ y Ringo gastó 150€.

Implementa el método `splitTheBill(grupo)` que debería devolver cuánto dinero el grupo
debe devolver a cada individuo. En nuestro ejemplo, debería devolver:

```js
{
  "john"  :  20,
  "paul"  : -70,
  "ringo" :  50
}
```

## Sugerencia

Para iterar sobre un objeto JavaScript, puedes utilizar el método [\`Object.keys()\`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).

Aquí tienes un ejemplo:

```js
const personaje = { nombre: "Luke Skywalker", tipo: "Jedi" };
Object.keys(personaje).forEach((clave) => {
  const valor = personaje[clave];
  console.log(`El personaje ${clave} es ${valor}`);
});
```

## Mostrar los resultados

Una vez que hayas implementado la función `splitTheBill(grupo)`, todas las pruebas deberían pasar correctamente.

Ahora es momento de actualizar el archivo HTML y agregar una lista que indique quién tiene que pagar cuánto. Primero crea una lista con valores vacíos en el archivo `index.html` y luego completa la función `updatePriceList()` en tu archivo JS para mostrar los valores correctos.
