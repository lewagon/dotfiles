## Contexto y Objetivos

En este desafío jugarás con una API que te suministramos: el chat de Le WAGON (**wagon-chat**).
Esta API te permitirá chatear y chismear con tus compañeros de bootcamp 😉

Durante este ejercicio tendrás que hacer peticiones `GET` y `POST` a un código API. Usarás llamadas AJAX para implementar salas de chat (chat-room) dinámicos donde podrás ver instantáneamente los mensajes más recientes y también publicar nuevos mensajes.


![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/chat-room.gif)

## Recursos
La [documentación de la API del wagon-chat](https://github.com/lewagon/wagon-chat-api/blob/master/README.md)

## Especificaciones

Inicia tu servidor local con `serve`. Ve a `localhost:8000`.

### Lógica de la vista

En el archivo `index.html` del desafío encontrarás una página estructurada en dos partes principales:

* Un botón para enviar (**send button**) con un formulario para hacer el push de tus mensajes al chat de la API.
* Un botón para refrescar (**refresh button**) con un marcador (placeholder) donde mostrarás todos los mensajes nuevos.

Empieza por leer la [documentación de la API](https://github.com/lewagon/wagon-chat-api/blob/master/README.md).¿Cuántos endpoints ves?¿Puedes identificar al endpoint está relacionado con el formulario?¿Y cuál está relacionado con el botón para refrescar?

Escribe tu código JavaScript en `lib/index.js`.

### Botón para refrescar: recuperación de mensajes recientes

Verás que en el markup se encuentra el botón `#refresh`.¡Queremos que, cuando se haga clic en él, se muestren todos los comentarios más recientes de los participantes de la promoción!

Tendrás que hacer una petición `GET` a la API en JS usando `fetch`. Para eso lee la [documentación](https://github.com/lewagon/wagon-chat-api/blob/master/README.md). Ahí verás cómo está petición está estructurada y lo que la API devolverá. Encuentra los mensajes en los datos que recibes y muestra cada uno de ellos el DOM.

Aquí hay un mensaje de muestra:

```html
<li>A sample message (posted <span class="date">10 minutes ago</span>) by John</li>
```

### Botón para enviar: el push de tus mensajes a la API

¡Es hora de participar en el chat y enviar tus propios mensajes!

El formulario `#comment-form` tiene dos entradas (`#your-message` y `#your-name`). Empieza por escribir el código de dos scripts simples para recuperar los valores de entrada. Al principio si quieres usa `console.log()` para ver los valores y asegurarte de que todo funciona correctamente.¡Este es un ejercicio de DOM básico donde todavía no hay AJAX!

**Pista**: Tendrás que evitar que se considere el comportamiento predeterminado del envío del formulario (usando el método `preventDefault()`).

Tu código aún no envía ningunos datos al servidor. Para hacer eso tendrás que mejorar tu código JavaScript agregando una petición `POST` y así poder hacer que se envíen y almacenen datos en la base de datos de la API. Lee la [documentacion](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) para averiguar cómo crear una petición usando `fetch`.

Aquí hay un ejemplo de como usar el `fetch` en un [marcador JSON de API](https://jsonplaceholder.typicode.com/):

```js
const message = { name: "George", body: "Hello from Kitt" };
const url = "https://jsonplaceholder.typicode.com/comments";

fetch(url, {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(message)
})
.then(response => response.json())
.then((data) => {
  console.log(data);
});
```

### Auto-refrescamiento

¡Es hora de hacer que tu aplicación se actualice automáticamente. Desaste de ese botón de actualización ("Refresh Chat")!

¡Que disfrutes el chat!
