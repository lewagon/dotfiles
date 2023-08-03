## Antecedentes y objetivos

En este ejercicio, utilizarás [Mustache.js](https://github.com/janl/mustache.js) para crear una aplicación en la que los chefes puedan ver diversas recetas.

## Configuración

Empecemos lanzando un servidor web local ejecutando el siguiente comando:

```bash
serve
```

Luego, abre [`localhost:8000`](http://localhost:8000) en tu navegador.

### Datos

En `index.html` ya tenemos:

```html
<script type="importmap">
  {
    "imports": {
      "mustachejs": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"
    }
  }
</script>
```

Eso significa que ya puedes usar Mustache.js.

En `lib/recipes.js` hay una lista de recetas preparadas para tí:

```js
const recipes = [
  {
    name: "Coq au Vin",
    ingredients: [
      "chicken",
      "red wine",
      "bacon",
      "mushrooms",
      "onions",
      "garlic",
    ],
    difficulty: 7,
  },
  {
    name: "Ratatouille",
    ingredients: [
      "eggplant",
      "zucchini",
      "bell peppers",
      "tomatoes",
      "onions",
      "garlic",
    ],
    difficulty: 3,
  },
  {
    name: "Croissant",
    ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
    difficulty: 9,
  },
  {
    name: "Bouillabaisse",
    ingredients: [
      "fish",
      "shellfish",
      "tomatoes",
      "fennel",
      "onions",
      "garlic",
      "saffron",
    ],
    difficulty: 10,
  },
];
```

Por favor, tómate un momento para ver una de las recetas y cómo está estructurada. Por ejemplo:

```js
{
  name: "Croissant",
  ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
  difficulty: 9
}
```

Este es un `Object` (similar a un `Hash` en Ruby), por lo que tiene **claves y valores**. Debes tomar nota de las claves presentes aquí y de los tipos de valores (`String`, `Number`, `Array`, etc.).

El objetivo de este ejercicio es mostrar los datos de este array en el DOM utilizando Mustache.js.

### HTML

Este es un `Object` (similar a un `Hash` en Ruby), por lo que tiene **claves y valores**. Debes tomar nota de las claves presentes aquí y de los tipos de valores (`String`, `Number`, `Array`, etc.).

El objetivo de este ejercicio es mostrar los datos de este array en el DOM utilizando Mustache.js.

### HTML

Aquí tienes el fragmento de HTML para una receta:

```html
<div class="col col-lg-4">
  <div class="card mb-3">
    <div class="card-header">
      <h2>Croissant</h2>
    </div>
    <div class="card-body">
      <h5 class="card-title">Ingredients:</h5>
      <ul class="list-group">
        <li class="list-group-item">Flour</li>
        <li class="list-group-item">Butter</li>
        <li class="list-group-item">Yeast</li>
        <li class="list-group-item">Sugar</li>
        <li class="list-group-item">Salt</li>
      </ul>
      <h5 class="card-title mt-3">Difficulty: 9/10</h5>
    </div>
  </div>
</div>
```

Vamos a colocar este HTML dentro de una etiqueta `<template>` en el archivo `index.html` (esta vez no está allí todavía). Asegúrate de darle un `id` a tu `<template>` para poder acceder fácilmente a él más adelante. 💪

### Haciendo los campos dinámicos

Pero ahora todas nuestras recetas dirán "Croissant", ya que esa parte está codificada de forma estática. 😿 ¡Así que hagámosla dinámica! En una plantilla de Mustache, puedes hacer una parte dinámica de la plantilla utilizando... llaves dobles en el HTML 👨 de esta manera:

```html
<template id="myTemplate">
  <div>{{ message }}</div>
</template>
```

Luego, en JavaScript, puedes pasar la información a estos espacios dinámicos de esta manera:

```js
const template = document.querySelector("#myTemplate").innerHTML;
const output = Mustache.render(template, { message: "Hello World!" });
```

¿Puedes ver cómo el segundo argumento de `Mustache.render` es un objeto JavaScript que contiene todas las piezas de información para rellenar entre las llaves dobles `{{ }}` basado en las claves del objeto?

Ahora te toca a ti. Intenta usar las llaves dobles `{{ }}` en tu plantilla para renderizar dinámicamente el `título`, la `dificultad` y los `ingredientes`.

Nota que si deseas iterar sobre un arreglo en Mustache.js, puedes hacerlo así:

```html
<template id="musicians">
  {{#musicians}}
  <p>{{.}}</p>
  {{/musicians}}
</template>
```

```js
const template = document.querySelector("#musicians").innerHTML;
const output = Mustache.render(template, {
  musicians: ["Britney Spears", "Christina Aguilera", "Backstreet Boys"],
});
```

El marcador `{{.}}` representa cada elemento en el arreglo de `musicos` y será replazado con el valor correspondiente cúando sea renderizado.

¡Qúe disfrutes!
