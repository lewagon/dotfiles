## Antecedentes y Objetivos

¡Bienvenido a tu primer ejercicio de plantillas! En este desafío, practicarás la renderización de HTML con JavaScript creando una lista de tareas estática.

**🛑 No uses la etiqueta `<template>` en este ejercicio. Ese es el próximo ejercicio. Sin embargo, puedes utilizar la interpolación de cadenas de texto aquí.**

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-static.png)

### Configuración

Iniciemos un servidor web local ejecutando:

```bash
serve
```

Luego, abre [`localhost:8000`](http://localhost:8000) en tu navegador.

### Datos y HTML

En tu archivo `lib/to-do-list.js`, deberías encontrar los siguientes dos fragmentos de código.

1. Datos: un array de elementos de tareas

```js
const todos = [
  { title: "Programar una lista de tareas", done: false },
  { title: "Desayunar", done: true },
  { title: "Hacer ejercicio", done: false },
  { title: "Regar las plantas", done: true },
];
```

- `title`: una `string` que contiene la descripción de la tarea.
- `done`: un `booleano` que indica si la tarea está completada o no.

2. Plantilla: un fragmento de código HTML para cada tarea

```html
<div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
  <input class="d-flex form-check-input me-1" type="checkbox" />
  <div>Título de la tarea...</div>
</div>
```

### Genera HTML dinámicamente

¡Ahora te toca mostrar las tareas! Piensa en cómo puedes generar dinámicamente el HTML basándote en el array `todos`.

#### Cómo renderizar el checkbox dinámicamente

Un [casilla de verificación](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/input/checkbox) se marca o no según si está pres:quejuente el atributo `checked`.

```html
<!-- esta casilla de verificación está marcada -->
<input type="checkbox" name="Casilla 1" checked />

<!-- esta casilla de verificación no está marcada -->
<input type="checkbox" name="Casilla 2" />
```

En JavaScript, puedes establecer el atributo `checked` del elemento de entrada a `true` o `false`.

```js
const checkbox = document.querySelector("input[type=checkbox]");
checkbox.checked = true; // muestra una casilla de verificación marcada
checkbox.checked = false; // muestra una casilla de verificación desmarcada
```

Ahora te toca establecer el valor del atributo `checked` según el valor `done` de cada tarea pendiente.
