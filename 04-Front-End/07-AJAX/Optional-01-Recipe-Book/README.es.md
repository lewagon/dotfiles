## Antecedentes y objetivos

En este ejercicio, recuperaremos datos de una API y practicaremos mostrarlos con un elemento `template` que vimos durante la clase.

## Especificaciones

Construirás una aplicación de búsqueda para buscar recetas utilizando [The MealDB API](https://www.themealdb.com/api.php) y añadirlas a tus favoritos.

Puedes utilizar [este endpoint](https://www.themealdb.com/api.php#:~:text=Filter%20by%20main%20ingredient) para buscar recetas por ingrediente.

Tu objetivo es implementar en `index.js` la lógica de búsqueda, de modo que podamos filtrar por ingrediente al hacer clic en buscar.

Abre la página HTML en tu navegador con:

```bash
serve
```

Deberías ver un formulario con un campo de búsqueda.

- Cuando ingresamos un ingrediente, la página **no debería recargarse** y mostraremos cada receta en la lista `#recipes-container`, utilizando un elemento `template`.
- Deberíamos ver un mensaje que indique que no hay resultados en caso de que no haya recetas que utilicen ese ingrediente.
- Una vez que la búsqueda funcione, la segunda parte del desafío será marcar como favoritas las recetas que desees haciendo clic en el ícono de marcador de posición.
- Una vez marcadas como favoritas, las recetas aparecerán en la lista `#favourites-container`.

![App Boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-1.png)

## Buscar recetas

### Implementar la solicitud a la API

En primer lugar, implementemos la solicitud a la API para buscar recetas por ingrediente.

Añadamos un escuchador de eventos al campo de entrada `#search-input` y llamemos al endpoint cuando el usuario haga clic en el botón de búsqueda, interpolando el ingrediente en la URL que estás llamando.

Deberías utilizar `fetch` y `console.log(data)` para ver la respuesta de la API.

### Mostrar los resultados

Ahora que tenemos los resultados, vamos a mostrarlos en la lista `#recipes-container`.
Primero, creemos un elemento `template` en el HTML con la siguiente estructura:

```html
<template id="recipe-template">
  <div class="col-5">
    <div class="card my-2 position-relative">
      <i
        class="fa-solid fa-bookmark text-danger ms-2 position-absolute top-0 end-0 p-2 fs-4"
      ></i>
      <img src="" class="card-img-top" alt="" />
      <div class="card-body d-flex">
        <h6 class="card-title">Recipe Title</h6>
      </div>
    </div>
  </div>
</template>
```

Luego, creemos una función `insertRecipes` que insertará los resultados en nuestra lista. ¿Qué parámetro(s) debería recibir?

Creemos la función con dos parámetros: `recipes` y `container`. El primero será el array de recetas que obtenemos de la API, y el segundo será el contenedor donde queremos insertar las recetas.

Utilizaremos el método `forEach` para iterar sobre el array de recetas y, para cada receta, clonaremos el elemento `template` e insertaremos los datos de la receta en el lugar correcto. ¡Es tu turno! (pista: revisa las notas de clase para ver cómo clonamos el elemento `template`)

Deberías ver una lista de recetas utilizando el ingrediente que ingresaste en el campo de búsqueda:

NB: Puedes ir a [este endpoint](https://www.themealdb.com/api/json/v1/1/list.php?i=list) directamente en tu navegador para ver la lista completa de ingredientes por los que puedes buscar.

![App Boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-2.png)

## Recetas favoritas

### Añadir escuchadores de eventos a los iconos de marcador de posición

Ahora que podemos buscar recetas, vamos a agregar la funcionalidad de marcarlas como favoritas.

Seleccionemos todos los iconos `fa-bookmark` y agreguemos un `eventListener` a cada uno de ellos. Cuando hagamos clic en uno, añadiremos la receta a una variable `favourites` y mostraremos todas ellas en la lista `#favourites-container`. ¿Qué tipo de dato debería ser `favourites`?

Solo vemos los íconos de marcador de posición en las tarjetas de receta **después** de haber buscado por ingrediente. Por lo tanto, necesitaremos agregar los escuchadores de eventos a los íconos de marcador de posición **después** de insertar las recetas en la lista, en el mismo método `fetch`.

Para hacerlo, creemos una función `addFavouriteListeners` que agregará los escuchadores de eventos a los íconos de marcador de posición. Seleccionará todos los íconos de marcador de posición y, para cada uno, agregará un escuchador de eventos `click`.

### Añadir la receta a la lista de favoritos

Para esto, creemos una función `addRecipeToFavourites` como la función `callback` de cada escuchador de eventos del marcador de posición.

Una vez que hagamos clic, necesitamos recuperar todos los elementos de una receta (su `idMeal`, `strMeal`, `strMealThumb`) antes de guardarla en la variable `favourites`.

Tendremos que pasar la receta como parámetro de esta función, para que podamos acceder a los datos que necesitamos para mostrarla. A partir del `event`, puedes reconstruir el objeto de la receta para que podamos guardar todos los detalles:

```js
const newRecipeToAdd = { idMeal: ..., strMeal: ..., strMealThumb: ... };
```

A continuación, podemos agregar este objeto de receta a la variable `favourites`.

Clonemos el elemento `template` e insertemos los datos de la receta en el lugar correcto. ¡Espera! ¡Ya tenemos un método que hace exactamente eso!

`insertRecipes` toma una lista de recetas y un contenedor como parámetros, e inserta las recetas en el contenedor. ¡Usemoslo!

![App Boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-3.png)

## Notas

Nuestra aplicación nos permite buscar recetas por ingrediente y añadirlas a nuestros favoritos. Un inconveniente aquí es que perdemos nuestros favoritos cada vez que recargamos la página.

Para solucionar esto, podríamos utilizar la API de [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) para almacenar nuestros favoritos en el navegador. Luego podríamos recuperarlos cuando se cargue la página. ¡Pero no te preocupes, aprenderás más sobre `localStorage` en uno de los desafíos de las próximas lecciones!

NB: Las aplicaciones web suelen estar compuestas en realidad por dos aplicaciones: una del lado del back-end para almacenar los datos y otra del lado del front-end que recupera los datos y los muestra con un framework. En este ejercicio, creamos una aplicación del lado del front-end que maneja la interfaz de usuario, mientras obtenemos los datos de una API.

Veremos en el próximo módulo que Rails maneja ambos al mismo tiempo 💪

## Bonus (opcional)

- Utiliza el método `includes` para comprobar si una receta ya está marcada como favorita.
- Borra el contenido del campo de búsqueda después de una búsqueda.
- Añade un botón para borrar la lista de favoritos.
