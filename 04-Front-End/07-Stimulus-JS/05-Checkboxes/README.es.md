## Contexto y Objetivos

En este ejercicio usaremos el framework [Stimulus](https://stimulus.hotwired.dev/) de JavaScript. Dicho framework fue creado por [Basecamp](https://basecamp.com/), la misma empresa que creó el framework Ruby on Rails.

El eslogan de este framework es ser el "framework modesto para HTML que ya tienes". Es un framework que podrás usar en tus proyectos para organizar tu código JavaScript. Funciona bien con Rails ya que te permitirá generar HTML dinámicamente en el servidor (recuerda MVC, Sinatra, etc.) y agregar comportamiento JS.

La gran ventaja de Stimulus es que al usarlo ¡nunca más tendrás que usar `querySelector` o `addEventListener`! En lugar de eso usarás `data-` HTML attributes convencionales sobre un elemento específico.

Este framework usa [Clases ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) una excelente mejora desde 2015 (el año en que salio ES6) para agregar Programación Orientada a Objetos a JavaScript.

## Boilerplate

Si no lo sabes, el término boilerplate se refiere a secciones de código que se usan una y otra vez con pocos o ningún cambio.

Comienza abriendo tu `index.html` y mira el código.

Es un formulario HTML con casillas de categorías:
- 1x casilla "Check All" que las selecciona todas
- 4x casillas con Categories

Inicia el servidor webpack:

```bash
yarn install
rake webpack
```

y abre [localhost:8080](http://localhost:8080) en tu navegador.

Puedes seleccionar las casillas individualmente pero la "Check all" todavía no selecciona todas las casillas. Este es justamente el comportamiento que debes implementar con la magia de JavaScript y de nuestro nuevo amigo: Stimulus.

### Instalación con Stimulus

Primero, incorpora el paquete Stimulus a tu proyecto:

```bash
yarn add @hotwired/stimulus
yarn add @hotwired/stimulus-webpack-helpers
```

Luego abre el archivo `lib/index.js` y agrega las siguientes líneas al inicio del mismo:

```js
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

window.Stimulus = Application.start()
const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))
```

Estas instrucciones vienen de [la guía de instalación de Stimulus](https://stimulus.hotwired.dev/handbook/installing#using-webpack-helpers) y son necesarias para **cargar** Stimulus en tu app.

## Tu primer controlador Stimulus

Primero, crea la carpeta de los controladores donde agregarás tu código:

```bash
mkdir lib/controllers
```

Ahora, crea tu primer archivo de controlador de Stimulus:

```bash
touch lib/controllers/check_all_checkboxes_controller.js
```

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("The 'check_all_checkboxes' controller is now loaded!")
  }
}
```

Date cuenta que hay un método llamado `connect()`. Este método se activa cuando el controlador se **conecta** al documento e. g. cuando el elemento HTML que tiene el atributo `data-controller` está presente en el DOM.


El método `connect()` es lo que se le llama un **lifecycle callback**. Si quieres leer más sobre Stimulus lifecycles callbacks, [te recomendamos esta documentación]https://stimulus.hotwire.dev/reference/lifecycle-callbacks).

## Unión del controlador al HTML

Ahora haremos algunos ajustes en el HTML para **conectar** el controlador:
- ¿A qué elemento DOM hay que conectar el controlador?
- ¿Qué sintaxis necesitamos para hacer esta conexión?

Importante: sabemos que el controlador deberá interactuar con la casilla "Check all" y también con las otras 4 casillas Categories. En Stimulus, un controlador sólo puede interactuar con elementos dentro de su rango de trabajo - es decir solo con elementos hijos del elemento DOM al cual está conectado. Así que la pregunta es: "¿Qué elemento abarca tanto la casilla 'Check All' como las casillas de las categorías?"

<details>
  <summary markdown='span'>Hint</summary>

  ```html
  <form data-controller='check-all-checkboxes'>
    <!-- ... -->
  </form>
  ```
</details>

Cuando termines de conectar el controlador, regresa al navegador, abre la consola y refresca la página.

Deberías ver el siguiente mensaje: `The 'check-all-checkboxes' controller is now loaded!`. Esto significa que el controlador check-all-checkboxes' se ha cargado en la consola 🎉.

## Escucha un evento

Ahora queremos seleccionar todas las casillas cuando seleccionamos la casilla "Check all". Esto significa que queremos escuchar el evento que ocurre en la casilla "Check all" y luego generar una lógica de código para las demás casillas.

Si lees la documentación de Stimulus, puedes ver [aquí esta la sintaxis](https://stimulus.hotwire.dev/reference/actions) cómo escuchar al evento. En Stimulus, a esto se le llama **Acción**.

Pero ¿qué evento estamos escuchando?

De acuerdo a [esta página de documentación MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), una casilla emite 2 tipos de evento: `change` y `click`.

Usemos `change` (que se entiende como "cambiar" de estado):

```html
<input id="check-all" type="checkbox" class="form-check-input" data-action="change->check-all-checkboxes#checkAll">
```

Aquí estamos diciendo claramente que: "Cuando se emita el evento 'change', se llamará al método 'checkAll' en el controlador de 'check-all-checkboxes'".

## El callback del evento

Ahora que estamos escuchando al evento 'change', escribe el código del método `checkAll`:

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  checkAll(event) {
    console.log(event)
  }
}
```

Date cuenta que este método toma un parámetro `event`. Por defecto, las acciones de Stimulus llaman al método con un objeto `event` que se le pasa como argumento (como [el viejo `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Abre la consola en tu navegador y selecciona o deselecciona la casilla "Check all": deberías ver el evento en pantalla 🎉

Ahora, en este método `checkAll` tendrás que hacer lo siguiente:
- Verificar el estado de la casilla "Check All"
- Si la misma está seleccionada, entonces selecciona todas las otras
- De lo contrario, deseleccionan todas las otras casillas

Pero ¿cómo accedes a las otras casillas en este método? ¡Con Targets!

## Targets

En Stimulus, además de las acciones (las cuales reemplazan al `addEventListener`, puedes usar `targets` para reemplazar todos tus `querySelector` y `getElementById`.

Si lees la documentación de Stimulus [aquí está la sintaxis](https://stimulus.hotwire.dev/reference/targets), puedes ver cómo agregar targets.

Primero debemos hacer una lista de los targets en el controlador. En nuestro caso, solo tenemos un tipo: casillas.
Entonces agrega `static targets = ["checkbox"]`.

Solo agrega `static targets = ["checkbox"]` al inicio de tu controlador:

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox"]

  checkAll(event) {
    console.log(event)
  }
}
```

Luego debes especificar en el HTML qué elemento del DOM será el target como una 'checkbox'.

La sintaxis para esto tiene, adivina …, ¡`data-attributes`! Precisamente lo siguiente: `data-CONTROLLER_NAME-target="TARGET_NAME"`.

Así que agregale el `data-check-all-checkboxes-target='checkbox'` a todo el elemento `<input type="checkbox" ...>` (excepto al "Check All").

Cuando termines, el controlador Stimulus podrá recuperar los targets fácilmente por medio de una sintaxis simple:

```javascript
this.checkboxTarget // -> return the first checkbox target, like querySelector
this.checkboxTargets // -> return all the checkbox targets, like querySelectorAll
```

## Implementación de la lógica

Después de definir los targets, regresa a tu método `#checkAll`.

Haz lo siguiente:
- Verifica el estado de la casilla "Check All".
- Si está seleccionada, itera sobre todos los checkbox targets y cámbiales la propiedad `checked` a `true`
- De lo contrario itera sobre todos los checkbox targets y cámbiales la propiedad `checked` a `false`.

Ya tienes todo lo que necesitas para resolver el resto de este desafío.

Recuerda testear (manualmente) el comportamiento del controlador Stimulus controller en el navegador y si quieres puedes agregar `console.log` para entender lo que ves en el método `checkAll`.

¡Es tu turno!

## Puntos clave de aprendizaje

Échale un último vistazo a tu archivo `lib/controllers/check_all_checkboxes_controller.js`.

- ¿Ves un `querySelector`? No, porque fue reemplazado por el mecanismo del **target** el cual enlaza automáticamente variables `this.$$$Target` con elementos `data-controller-name-target` definidos
- ¿Ves un `addEventListener`? No, porque fue reemplazado por el `data-action` con la sintaxis `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`. ¡Solo tienes que implementar el CALLBACK en tu controlador y listo!

Una vez que se implementa un controlador Stimulus es muy fácil utilizarlo nuevamente en todos lados en una página web con las etiquetas HTML adecuadas.

**De ahora en adelante, siempre escribiremos nuestro código JavaScript dentro de controladores Stimulus**.

## Un paso más lejos

Si quieres aprender más sobre Stimulus, te recomendamos leer lo siguiente:

- [El Origen de Stimulus](https://stimulus.hotwired.dev/handbook/origin)

- Cómo pasar datos desde tu HTML a tu controlador Stimulus usando [Values](https://stimulus.hotwired.dev/reference/values)

- Cómo pasar clases CSS desde tu HTML a tu controlador Stimulus usando [CSS Classes](https://stimulus.hotwired.dev/reference/css-classes)
