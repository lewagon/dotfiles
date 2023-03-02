## Contexto y Objetivos

En este desafío queremos generar el código HTML de una lista no ordenada (**unordered list**) a partir de datos en bruto.

## Configuración

Para empezar, ejecuta el servidor local con el comando:

```bash
serve
```

Luego, abre [`localhost:8000`](http://localhost:8000) en tu navegador.

En este ejercicio, tendremos dos procesos para probar nuestro código:
- en el navegador
- en la terminal

Ambos procesos prueban las mismas cosas pero en diferentes interfaces.

Comenzá trabajando con los tests en el navegador. Cuando termines, usá `rake` para probar en la terminal.

## Especificaciones

### Generador de los ítems de la lista

Implementa la primera función `listItem` la cual toma el parámetro `content` (de tipo cadena de texto (`String`)) y devuelve la etiqueta `<li>` con su contenido:

```js
listItem('milk');
// => '<li class="list-group-item">milk</li>'
```

Asegúrate de usar las plantilla literales ES6 ([ES6 Template literals])(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) en lugar de la concatenación (ya que no es la manera moderna de hacer esto en JavaScript).

### Generador de lista no ordenada

Cuando la función `listItem` pase todos los tests, escribe el código de la función `unorderedList` la cual toma el parámetro `items` (un arreglo (`Array`)) y devuelve todo el HTML de `<ul>`:

```js
> console.log(unorderedList(['milk', 'butter', 'bread']));
// <ul class="list-group">
//   <li class="list-group-item">milk</li>
//   <li class="list-group-item">butter</li>
//   <li class="list-group-item">bread</li>
// </ul>
```

**Solo por esta vez**: ¡no nos importa si la tabulación no es perfecta!

### Mostrar la lista

Ahora, llamá a tu función `unorderedList` para generar el código HTML de la lista de compras y mostralo en el elemento `#list` de la página `index.html`.

La lista de compras debería verse así:
```js
const groceries = ['milk', 'butter', 'bread'];
```

### Refactorizando con `Map()`

Si tu solución pasa los tests `forEach()`, ¡intenta encontrar una mejor solución usando [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)!

Aquí hay un ejemplo:

```js
const beatles = ["paul", "john", "ringo", "george"];
const upcasedBeatles = beatles.map(beatle => beatle.toUpperCase());
// => ["PAUL", "JOHN", "RINGO", "GEORGE"]
```
