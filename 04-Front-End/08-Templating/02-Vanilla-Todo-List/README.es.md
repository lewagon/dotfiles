## Antecedentes y objetivos

En este ejercicio, crearás **la misma lista de tareas**, pero esta vez, **utilizando la etiqueta `<template>`**.

### Configuración

Vamos a lanzar un servidor web local ejecutando:

```bash
serve
```

Luego, abre [`localhost:8000`](http://localhost:8000) en tu navegador.

### Datos y HTML

Hay una lista de tareas preparada para ti en el archivo `lib/to-do-list.js`.

```js
const todos = [
  { title: "Codificar una lista de tareas", done: false },
  { title: "Desayunar", done: true },
  { title: "Hacer ejercicio", done: false },
  { title: "Regar las plantas", done: true },
];
```

También hay un fragmento de HTML para una tarea, esta vez **en una etiqueta `<template>`**, con estilos de Bootstrap en el archivo `index.html`.

```html
<template id="todoItemTemplate">
  <div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
    <input class="d-flex form-check-input me-1" type="checkbox" />
    <div>Título de la tarea...</div>
  </div>
</template>
```

### Seleccionar la etiqueta `<template>` para generar HTML dinámicamente

Ahora tienes que seleccionar la etiqueta `<template>` y clonar su contenido. Luego, inserta el título en el lugar correcto, cambia la propiedad `checked` según corresponda, e inserta el resultado en el contenedor de tareas pendientes.

Recuerda cómo seleccionar y clonar el contenido dentro de la etiqueta `<template>`? Aquí tienes un ejemplo rápido.

```javascript
const template = document.querySelector("#idDelTemplate");
const clone = template.content.cloneNode(true);
```

Si necesitas repasar estos conceptos, consulta las diapositivas del día. ¡Buena suerte!
