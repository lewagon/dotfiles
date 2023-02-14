## Contexto y Objetivos

Piensa en la interfaz de la bandeja de entrada de Gmail. ¿Tienes que refrescar la página para que un nuevo email aparezca? La respuesta es **no**, ¡por supuesto! Las páginas como Gmail recuperan nuevos correos periódicamente y los agregan al inicio de la lista. Esto significa que se agrega nuevo contenido al _DOM_ **después** de la carga inicial de la página.

## Especificaciones

Todavía no hemos visto AJAX, así que por ahora simularemos la recuperación de los emails. Te hemos dado un esquema en `lib/inbox.js` para ayudarte a comenzar.

- Implementa el método `hasNewMessage()` que tiene un 20% de probabilidad de devolver verdadero (`true`)(el resto de las veces devuelve falso (`false`)).
- Implementa el método `newMessage()` el cual debe devolver un objeto aleatorio (e.g. un nuevo email) con llaves (keys) de asunto (`subject`) y emisor (`sender`). Por ejemplo:

```js
{
  sender: 'GitHub Team',
  subject: 'Welcome to GitHub'
}
```

o

```js
{
  sender: 'Arnold Schwarzenegger',
  subject: "I'm Back"
}
```

Puedes usar `rake` para los 2 métodos.

Ahora vamos a testear el código usando el navegador (ya no hay más `rake` a disposición). Corre el siguiente código en otra Terminal:

```bash
rake webpack
```
Y ve a [localhost:8080](http://localhost:8080).

## Tareas

- Implementa el método `appendMessageToDom(message)` el cual toma un objeto con las llaves asunto (`subject`) y emisor (`sender`) como parámetros y agrega una nueva línea al markup HTML para este mensaje. Inspecciona el archivo `index.html` para encontrar ejemplos para las filas no leído (`unread`) y leído (`read`).
- Luego juntamos todo. Fíjate que al final del archivo, el método `refresh` se llama cada `1000` milisegundos. Implementa tu método `hasNewMessage()` y si hay un nuevo mensaje, agregalo(`newMessage()`) al inicio de la bandeja de entrada (`appendMessageToDom(message)`). Recuerda actualizar el contador en el título `h1`.
- (Opcional) [Actualiza el título del documento](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) ¡para que el contador de mensajes no leídos eaparezca en tu pestaña como una bandeja de entrada real!
