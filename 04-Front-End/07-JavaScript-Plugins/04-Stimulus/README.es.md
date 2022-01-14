## Contexto y Objetivos

En este ejercicio usaremos el framework [Stimulus](https://stimulusjs.org/) de JavaScript. Dicho framework fue creado por [Basecamp](https://basecamp.com/), la misma empresa que creó el framework Ruby on Rails.

El eslogan de este framework es ser el "framework modesto para HTML que ya tienes". Es un framework que podrás usar en tus proyectos para organizar tu código JavaScript. Funciona bien con Rails ya que te permitirá generar HTML dinámicamente en el servidor (recuerda MVC, Sinatra, etc.) y agregar comportamiento JS.

La gran ventaja de Stimulus es que al usarlo ¡casi nunca más tendrás que hacer `querySelector` o `addEventListener` manualmente! En lugar de eso usarás atributos de datos (`data-` HTML attributes) convencionales sobre un elemento específico.

Este framework usa [Clases ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) una excelente mejora desde 2015 (el año en que salio ES6) para agregar Programación Orientada a Objetos (OPP) a JavaScript.

## Boilerplate

Si no lo sabes, el término boilerplate se refiere a secciones de código que se usan una y otra vez con pocos o ningún cambio.

Comienza abriendo tu `index.html` y mira el código.

Es un formulario HTML con casillas de categorías:
- 1x casilla que las "selecciona todas"
- 4x casillas con Categories

Inicia el servidor webpack:
```bash
yarn install
rake webpack
```

y abre [localhost:8080](http://localhost:8080) en tu navegador.

Puedes seleccionar las casillas individualmente pero la que las "selecciona todas", todavía no lo hace. Este es justamente el comportamiento que queremos implementar con la magia de JavaScript y de nuestro nuevo amigo: Stimulus.


### Comenzamos: Instalación con Stimulus

Antes de ir al código, por favor tómate el tiempo necesario para leer las páginas siguientes del manual (Handbook) para entender la filosofía detrás de este framework.

- [El Origen de Stimulus](https://stimulusjs.org/handbook/origin)
- [Introducción](https://stimulusjs.org/handbook/introduction)
- [Hola Stimulus](https://stimulusjs.org/handbook/hello-stimulus)
- [Creando Algo Real](https://stimulusjs.org/handbook/building-something-real)

Cuando hayas terminado eso, [configura](https://stimulusjs.org/handbook/installing) nuestro proyecto con Stimulus:

```bash
yarn add stimulus
mkdir lib/controllers # Aquí es donde agregaremos nuestro código Stimulus
```

Luego abre el archivo `lib/index.js` y agrega lo siguiente al **inicio** del mismo:

```js
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));
```

Necesitamos estas líneas para **cargar** stimulus en tu app.

¡Ahora vamos a implementar nuestro **primer controlador Stimulus**!

## Nuestro primer controlador Stimulus

```bash
touch lib/controllers/check_all_checkboxes_controller.js
```

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    console.log("The 'check_all_checkboxes' controller is now loaded!");
  }
}
```

Date cuenta que hay un método llamado `connect()`. Los controladores Stimulus vienen con lifecyle callbacks, es decir, métodos (o callbacks) que se ejecutan en alguna de las diferentes etapas por las que pasa una entidad (lifecycle):
- `initialize()` (diferente del ES6 constructor)
- `connect()`
- `disconnect()`

`connect()` se activa cuando el controlador se conecta a un elemento DOM, por medio del atributo `data-controller`.

Si quieres leer más sobre los ciclos de vida del controlador Stimulus, [te recomendamos leer esta documentación](https://stimulus.hotwire.dev/reference/lifecycle-callbacks)

Ahora haremos algunos ajustes en el  HTML para **conectar** el controlador:
- ¿A qué elemento DOM hay que conectar el controlador?
- ¿Qué sintaxis necesitamos para hacer esta conexión?

Importante: sabemos que el controlador deberá interactuar con la casilla que las "Selecciona todas" y también con las otras 4. En Stimulus, un controlador sólo puede interactuar con elementos dentro de su rango de trabajo - es decir solo con elementos hijos del elemento DOM al cual está conectado. Así que la pregunta es: "¿Qué elemento abarca tanto la casilla 'Check All' como las casillas de las categorías?"

<details>
  <summary markdown='span'>Hint</summary>

  ```html
  <form data-controller='check-all-checkboxes'>
    <!-- ... -->
  </form>
  ```
</details>

Cuando termines de conectar el controlador, regresa al navegador, abre la consola y refresca la página.
Deberías ver el siguiente mensaje: `The 'check-all-checkboxes' controller is now loaded!`. Esto significa que el controlador check-all-checkboxes' se ha cargado en la consola.

## Escucha un evento

Ahora queremos seleccionar todas las casillas cuando seleccionamos la que las "selecciona todas".
Esto significa que queremos escuchar el evento que ocurre en la casilla "Check all" y luego generar una lógica de código para las demás casillas.

Lee la documentación de Stimulus para ver [la sintaxis](https://stimulus.hotwire.dev/reference/actions) que nos permite escuchar al evento. En Stimulus, a esto se le llama **Acción**.

Pero ¿qué evento estamos escuchando?

De acuerdo a [esta página de documentación MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), una casilla emite 2 tipos de evento: `change` y `click`.
Usemos `change` (que se entiende como "cambiar" de estado).

```html
<input id='check-all' type="checkbox" class="form-check-input" data-action='change->check-all-checkboxes#checkAll'>
```

Aquí estamos diciendo claramente que: "Cuando se emita el evento 'change', se llamará al método 'checkAll' sobre el controlador de 'check-all-checkboxes'".

## El callback del evento

Ahora que estamos escuchando al evento 'change' checkbox, podemos escribir el código del método `checkAll`. Así que vamos a hacerlo.

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  checkAll(event) {
    // Your code here
  }
}
```

Date cuenta que este método toma un parámetro `event`. Por defecto, las acciones de Stimulus llaman al método con un objeto `event` que se le pasa como argumento (como [el viejo `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

En este método harás lo siguiente:
- Verificar el estado de la casilla "Check All" cuando se haga clic en ella.
- Si la misma se selecciona, entonces se seleccionan las otras
- De lo contrario, se deseleccionan todas las otras casillas

Pero ¿cómo accedes a las otras casillas en este método? ¡Buena pregunta!

## Targets

Además de las acciones (las cuales reemplazan al `addEventListener` en el contexto de un controlador Stimulus), Stimulus introduce `targets` (los cuales reemplazan todos tus `querySelector` o `getElementById` en el contexto de un controlador Stimulus).

Para agregar targets, hay que leer la [documentación de Stimulus](https://stimulus.hotwire.dev/reference/targets).

Primero debemos hacer una lista de los targets en el controlador. En nuestro caso, solo tenemos un tipo: casillas.
Entonces agrega `static targets = ["checkbox"]`.

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["checkbox"]

  checkAll(event) {
    // Escribe tu código aquí
  }
}
```

Luego debemos especificar en el HTML qué elemento del DOM será el target  como una 'checkbox'.

La sintaxis para esto tiene, adivina …, ¡`data-attributes`! Precisamente lo siguiente: `data-CONTROLLER_NAME-target="TARGET_NAME"`.

Así que agregale el `data-check-all-checkboxes-target='checkbox'` a todo el elemento `<input type="checkbox" ...>` (excepto al "Check All").

Cuando termines el controlador Stimulus podrá recuperar los targets fácilmente por medio de una sintaxis Stimulus simple:

```js
this.checkboxTarget // -> return the first checkbox target
this.checkboxTargets // -> return a collection (think Array) of all the checkbox targets
```

## Implementación de la lógica

Después de implementar los targets, regresa a tu método `#checkAll`.

Haz lo siguiente:
- Verifica el estado de la casilla "Check All" seleccionada.
- Si está seleccionada itera sobre todos los checkbox targets y cámbiales la propiedad `checked` a `true`
- De lo contrario itera sobre todos los checkbox targets y cámbiales la propiedad `checked` a `false`.

Ya tienes todo lo que necesitas para resolver el resto de este desafío.

Recuerda testear (manualmente) el comportamiento del controlador Stimulus controller en el navegador y si quieres puedes agregar `console.log` para entender lo que ves en los métodos `checkAll`.

¡Es tu turno!

## Conclusión

Échale un último vistazo a tu archivo `lib/controllers/check_all_checkboxes_controller.js`.

- ¿Ves un `querySelector`? No, porque fue reemplazado por el mecanismo del **target** el cual enlaza automáticamente variables `this.$$$Target` con elementos `data-controller-name-target` definidos
- ¿Ves un `addEventListener`? No, porque fue reemplazado por el `data-action` con la sintaxis `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`. ¡Solo tienes que implementar el CALLBACK en tu controlador y listo!

Una vez que se implementa un controlador Stimulus es muy fácil utilizarlo nuevamente en todos lados en una página web con las etiquetas HTML adecuadas.
