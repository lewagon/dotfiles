## Antecedentes y objetivos

En esta unidad, pasarás tiempo programando componentes útiles para tus proyectos futuros. Este es el primer paso para construir tu propia biblioteca de componentes.

En este ejercicio, programarás un componente de Copiar al Portapapeles. Este componente se utilizará para copiar una clave de API como las que se encuentran en muchos servicios en línea.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/copy-to-clipboard.gif)

## Configuración

Ejecuta el servidor desde tu terminal usando:

```bash
serve
```

Y visita `localhost:8000`. Verás un formulario con un campo de solo lectura que contiene una clave de API y un botón que permite copiarla fácilmente.
Tu misión es implementar la función de copiar al portapapeles.

Esta vez, `Stimulus` ya está configurado en la parte superior de `index.html`.

Sin embargo, aún necesitas encargarte de configurar la parte de JavaScript tú mismo. Abre `index.js` e importa el controlador de Stimulus en la parte superior y registra el controlador en la parte inferior. Puedes nombrar al controlador `CopyToClipboardController`.

Crea un archivo `copy_to_clipboard_controller.js` en la carpeta vacía `controllers` y copia el siguiente código:

```javascript
// lib/controllers/copy_to_clipboard_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // TODO: ¡haz un console.log de algo!
  }
}
```

¡Listos para empezar!

## Especificaciones

Tu objetivo es implementar la función de devolución de llamada que copia el texto del valor del campo de entrada al portapapeles.

Una vez que hagas clic en el botón _Copiar al Portapapeles_, podrás usar `ctrl + v` para pegar el texto en otro campo de texto.

### 1. Inspecciona el HTML existente

El HTML proporcionado contiene un campo de entrada con atributos interesantes. El atributo `value` ya está configurado para contener una clave de API de forma predeterminada al cargar la página.
El atributo `readonly` asegura que nadie pueda editar el texto existente ni introducir un error tipográfico.

### 2. Implementa el controlador de Stimulus

Asegúrate de conectar tu controlador de Stimulus al DOM usando `data-controller`.

En tu controlador de Stimulus, deberás implementar el método `copy()`. Este método se llamará cuando el usuario haga clic en el botón (piensa en `data-action`). Como siempre, asegúrate de que el método `copy()` se llame con el contexto correcto. Agrega un `console.log` en el método, haz clic en el botón y verifica que veas el mensaje en la consola del navegador.

Una vez hecho esto, piensa en el pseudocódigo para el método `copy()`. ¿Qué necesitas hacer para copiar el texto del campo de entrada al portapapeles?

### 3. Implementa el método `copy()`

Deberás utilizar la [API de Portapapeles](https://developer.mozilla.org/es/docs/Web/API/Clipboard). Echa un vistazo a la documentación, ¿qué método de la API necesitas utilizar?

¿Qué sucede cuando hacemos clic en el botón (observa el gif de arriba)?

- El texto dentro del campo de entrada se copia al portapapeles (en otras palabras, la cadena de texto se _escribe_ en el portapapeles del sistema). Para obtener el valor del campo de entrada, ¿qué te parece si implementamos un objetivo de datos `input` en tu controlador de Stimulus?
- Cuando se hace clic, el botón se desactiva (`disabled`). Ya no se puede volver a hacer clic.
- El texto dentro del botón cambia a "¡Copiado!". Este texto podría cambiarse de un contexto a otro si se reutilizara este controlador de Stimulus. En lugar de codificarlo directamente en JavaScript, creemos un dato `value` de Stimulus llamado `feedback-text` y úsalo en el controlador de Stimulus. El botón, cuando esté desactivado, mostrará el texto asignado al valor de datos `feedback-text`.
