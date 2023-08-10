## Antecedentes y objetivos

El objetivo de este ejercicio es que manipules el DOM con JavaScript, pero usando _Stimulus_ en lugar de otra herramienta. Esto es una demostración muy sencilla para que comiences con Stimulus. Seguramente lo reconocerás de la conferencia 😉. Intenta hacerlo por ti mismo.

## Configuración

Ejecuta el servidor desde tu terminal con:

```bash
serve
```

Y visita `localhost:8000`. Verás que estamos utilizando Bootstrap. Además, hay un botón grande dentro del `<body>`. Hablaremos de él en un momento.

Para instalar [`Stimulus`](https://stimulus.hotwired.dev/handbook/installing), comencemos con tu `index.html`. Como se mencionó en la conferencia sobre AJAX, vamos a importar `Stimulus` con `importmap`.

A modo de recordatorio, ¿qué es `importmap`? Cuando importamos muchos complementos JS en nuestro código, agregar muchas etiquetas `<script>` puede volverse confuso rápidamente. `importmap` nos permite crear una biblioteca para anclar e importar todos los complementos JS que necesitamos. Es algo similar a un `Gemfile` en Ruby.

En primer lugar, debes empezar importando `es-module-shims` para asegurarte de que `importmap` pueda funcionar con navegadores antiguos. Luego, puedes importar la biblioteca Stimulus. Básicamente, copia y pega esto en el `<head>` de tu `index.html`:

```html
<script
  async
  src="https://ga.jspm.io/npm:es-module-shims@1.6.3/dist/es-module-shims.js"
></script>
<script type="importmap">
  {
    "imports": {
      "@hotwired/stimulus": "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
    }
  }
</script>
```

Una vez hecho esto, vayamos a nuestro archivo `index.js`. Debes importar la biblioteca `Stimulus` y registrar un controlador. El controlador se encargará de reaccionar al clic en el botón. En este caso, llamaremos a nuestro controlador `EventListenerController`:

```javascript
import { Application } from "@hotwired/stimulus";

import EventListenerController from "./controllers/event_listener_controller.js";

window.Stimulus = Application.start();
window.Stimulus.register("event-listener", EventListenerController);
```

Luego, en la carpeta vacía `controllers`, crea un archivo `event_listener_controller.js`. Aquí es donde escribiremos el código para reaccionar al clic en el botón. Copia y pega esto en el archivo como punto de partida:

```javascript
// lib/controllers/event_listener_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // TODO: ¡Imprime algo en la consola!
  }
}
```

Intenta `console.log` algo desde el método `connect`. Si lo ves en la consola, ¡estás listo para continuar! Si no ves nada, verifica que hayas adjuntado correctamente tu controlador de Stimulus al DOM. Por ejemplo, puedes hacerlo agregando el atributo `data-controller="event-listener"` al `<button>` en el archivo `index.html`.

## Especificaciones

Tu objetivo es implementar algo de JavaScript en el archivo `lib/controllers/event_listener_controller.js`. **Debes reaccionar al clic en el botón azul.** Al hacer clic, el controlador activará una función `disable()` que deberá:

- Deshabilitar el botón. Esto se puede hacer agregando la clase `.disabled`.
- Cambiar el texto dentro del botón de "¡Haz clic!" a "¡Bingo!"
- Opcional: el archivo `sound.mp3` [se reproduce en el navegador](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript) al hacer clic en el botón.

Es posible que el sonido no funcione en algunos navegadores que se ejecutan en **Ubuntu**. Para solucionarlo, simplemente ejecuta:

```bash
sudo apt-get install ubuntu-restricted-extras
```
