## Antecedentes y Objetivos

Piensa en la interfaz de la bandeja de entrada de Gmail. ¿Necesitas actualizar la página para que aparezcan nuevos correos? La respuesta es **no**, ¡por supuesto! Sitios como Gmail obtienen periódicamente nuevos correos y los agregan en la parte superior de la lista. Por lo tanto, se agrega nuevo contenido al _DOM_ **después** de la carga inicial de la página.

En este ejercicio, vamos a tener 2 procesos para probar nuestro código:

- En el navegador
- En la terminal

## Especificaciones

Aún no hemos visto AJAX, así que simularemos la obtención de correos por ahora. Te hemos proporcionado una estructura en `lib/inbox.js` para que puedas comenzar.

- Implementa el método `hasNewMessage()` que tiene un 20% de probabilidad de devolver `true` (el resto del tiempo, devuelve `false`).
- Implementa el método `newMessage()` que debe devolver un objeto aleatorio (es decir, un nuevo correo) con las claves `subject` (asunto) y `sender` (remitente). Por ejemplo:

```js
{
  sender: 'GitHub Team',
  subject: 'Bienvenido a GitHub'
}
```

o

```js
{
  sender: 'Arnold Schwarzenegger',
  subject: "Estoy de vuelta"
}
```

Ahora, vamos a trabajar probando el código en el navegador. En otra pestaña de la terminal, ejecuta:

```bash
serve
```

y ve a [localhost:8000](http://localhost:8000).

Si haces un `console.log` en el método `hasNewMessage()`, deberías ver cómo se llama la función 1000 veces. ¿Por qué? ¡Viene de los archivos de prueba en `inbox_examiner.js` línea 43!

## Tareas

- Implementa el método `appendMessageToDom(message)` que toma como parámetro un objeto con las claves `subject` (asunto) y `sender` (remitente), y agrega una nueva línea para este mensaje en el marcado HTML. Inspecciona el archivo `index.html` para encontrar ejemplos de filas `unread` (no leído) y `read` (leído).
- Luego, vamos a unirlo todo. Como puedes ver al final del archivo, el método `refresh` se llama cada `1000` milisegundos. Implementa tu método `hasNewMessage()` y, si hay un nuevo mensaje, agrégalo (`newMessage()`) en la parte superior de la bandeja de entrada (`appendMessageToDom(message)`). Recuerda actualizar el contador en el título `h1`.
- (Opcional) [Actualiza el título del documento](https://developer.mozilla.org/es/docs/Web/API/Document/title) para que el contador de mensajes no leídos aparezca en el título de la pestaña, ¡como en una bandeja de entrada real!

## Rake en tu terminal

El segundo proceso para probar nuestro código es en la terminal. Utilizaremos nuestro amado comando `rake` para ejecutar las pruebas.

Para eso, utilizaremos [Node.js](https://nodejs.org/es/) para ejecutar directamente JavaScript en nuestra terminal.

Ya deberías tener `node` instalado con una versión superior a `10`. Verifícalo con:

```bash
node -v
# Aquí deberías ver tu versión de Node
```

Si no es así, vuelve a la sección correspondiente de la configuración de [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) o [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs).

Si al ejecutar `rake` obtienes un error, debes ejecutar:

```bash
nvm list
```

y luego elige la versión que tienes instalada, por ejemplo:

```bash
nvm use 16.15.1
```

Ahora, asegúrate de que todas tus pruebas en la terminal también están en verde. Luego, **por favor, haz un commit y un push** 🙏.
