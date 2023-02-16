## Contexto y Objetivos

Los **atributos de datos** son muy útiles en el desarrollo front-end para inyectar valores en tu HTML los cuales puedes acceder fácilmente en tu JS.

En este desafío vamos a escribir una función que parsee una etiqueta HTML y extraiga los atributos de datos hacia un objeto (`Object`).

## Especificaciones

Implementa la función `dataset` la cual tome como parámetro un elemento (`element`)(de tipo cadena de texto (`String`)) y devuelva un objeto (`Object`) con las llaves (keys) y valores (values) adecuados:

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

- Solo debe devolver un conjunto del elemento a envolver (**wrapping** element) independientemente de sus hijos.
- Debe arrojar los valores que correspondan al tipo de dato (en este ejemplo, `42` y `15` deben ser números (`number`)).

### Ayuda

¡No olvides usar Chrome DevTools para depurar (hacer debug)!

Cuándo quieras encontrar **todas las ocurrencias** de tu cadena de texto (string), te recomendamos investigar sobre el [modificador `g`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters).

### Mejoras

Esto no lo testeamos en `specs` pero puedes implementar la traducción de atributos de datos "compuestos" desde nomenclaturas como `kebab-case` hasta `lowerCamelCase`:

```js
const element = `<div class="card" data-meal-id="42">ANY CONTENT</div>`;

dataset(element);
// => { mealId: 42 }
```

### Un paso más lejos

A partir de mañana escribiremos JavaScript que corre en el **navegador** en el contexto de un [DOM](https://en.wikipedia.org/wiki/Document_Object_Model). ¡En dicho contexto podrás llamar al `.dataset` sobre cualquier elemento HTML seleccionado desde el DOM y devolverá el mismo tipo de objetos como en este desafío!

Esta manera es muy útil para pasar datos desde tu código HTML hacia tu JavaScript para reaccionar dinámicamente a eventos DOM o hacer llamadas remotas a un servidor.

Aprenderás más sobre estas aplicaciones en los próximos días. Mientras tanto puedes leer más sobre [la propiedad dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
