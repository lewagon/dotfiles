## Contexto y Objetivos

En este ejercicio usaremos el framework [Stimulus](https://stimulusjs.org/) de JavaScript. Dicho framework fue creado por [Basecamp](https://basecamp.com/), la misma empresa que creó el framework Ruby on Rails.

El eslogan de este framework es ser el “framework modesto para HTML que ya tienes". Es un framework que podrás usar en tus proyectos para organizar tu código JavaScript. Funciona bien con Rails ya que te permitirá generar HTML dinámicamente en el servidor (recuerda MVC, Sinatra, etc.) y agregar comportamiento JS.

La gran ventaja de Stimulus es que al usarlo ¡casi nunca tendrás que hacer `querySelector` o `addEventListener` manualmente! En lugar de eso usarás atributos de datos (`data-` HTML attributes) convencionales sobre un elemento específico

Este framework usa [Clases ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) una excelente mejora desde 2015 (el año en que salio ES6) para agregar Programación Orientada a Objetos (OPP) a JavaScript.

## Punto de partida: Clases JavaScript

Primero vamos a hacer un pequeño ejercicio con Node con el viejo rake:

```bash
rake
```

Hay 3 tests que deben estar en verde. Todo lo que necesitas saber está en [esta página MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). Queremos que implementes la clase `User` en el archivo `lib/user.js` con:

- Una variable de instancia `firstName`
- Una variable de instancia `lastName`
- Ambas variables de instancia son inicializadas por el `constructor`
- Un método de instancia `fullName()` que devuelve el primer y segundo nombre concatenados.


Eso representa 7 líneas de código JS. Recuerda cómo hacías Programación Orientada a Objetos en Ruby. Los conceptos son iguales.

## Mi primer event listener, Parte 2

💡 Este desafío es más como un tutorial para ayudarte a explorar el framework Stimulus. No te saltes ni un paso. Sigue cada etapa y todo estará bien 👌.

¿Recuerdas el ejercicio [Mi primer event listener](?path=04-Front-End/05-DOM-and-Events/03-My-First-Event-Listener)? Hacías clic en un botón y un audio de [Zelda Ocarina of Time](https://www.youtube.com/watch?v=g2wzMZzdNJA) empezaba a sonar!

```html
<button id="clickme" class="btn btn-primary btn-lg">
  Click me!
</button>
```

```js
const button = document.querySelector('#clickme');
const sound = new Audio('secret.mp3');

button.addEventListener('click', (event) => {
  const clickedButton = event.currentTarget;
  clickedButton.setAttribute('disabled', '');
  clickedButton.innerText = 'Bingo!';
  sound.addEventListener("ended", () => {
    clickedButton.removeAttribute('disabled');
    clickedButton.innerText = "Click me!";
  });
  sound.play();
});
```

Sigue avanzando. Abre tu `index.html` y tu `lib/index.js` y copia/pega el código anterior. Cuando termines, inicia el servidor y comprueba en tu navegador que el botón funcione como se espera que lo haga:

```bash
yarn install
rake webpack
```

```bash
open http://localhost:8080
```

Fíjate en cómo hemos mejorado la solución que sugeriste escuchando el evento `ended` en el elemento `audio`. De esa manera, cuando el audio termina de reproducirse reactivamos el botón y ponemos el texto inicial de vuelta.

### Refactorización con Stimulus

Ahora vamos a refactorizar este código con el framework Stimulus. Antes de ir al código, por favor tómate el tiempo necesario para leer las páginas siguientes del manual (Handbook) para entender la filosofía detrás de este framework.

- [El Origen de Stimulus](https://stimulusjs.org/handbook/origin)
- [Introducción](https://stimulusjs.org/handbook/introduction)
- [Hola Stimulus](https://stimulusjs.org/handbook/hello-stimulus)
- [Creando Algo Real](https://stimulusjs.org/handbook/building-something-real)

Cuando hayas terminado eso, [configura](https://stimulusjs.org/handbook/installing) nuestro proyecto con Stimulus:

```bash
yarn add stimulus
mkdir lib/controllers # This is where we will add our Stimulus code
```

Luego abre el archivo `lib/index.js` y agrega lo siguiente al **inicio** del mismo:

```js
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

// The rest of the code with document.querySelector('#clickme');
```

¡Ahora vamos a implementar nuestro **primer controlador Stimulus**!

```bash
touch lib/controllers/zelda_controller.js
```

```js
// lib/controllers/zelda_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    console.log("The Zelda controller is now loaded!");
  }
}
```

Luego vamos a hacer algunos pequeños ajustes en nuestro HTML  para conectarlo al controlador:

```html
<div data-controller="zelda">
  <button class="btn btn-primary btn-lg">
    Click me!
  </button>
</div>
```

¿Ves? Hemos sacado el id del botón lo que significa que el código JS anterior en `lib/index.js` _ya no funciona_. Simplemente remueve ese código y quédate con el código init de Stimulus. En pocas palabras, remueve todo lo que está después de la siguiente línea:

```js
application.load(definitionsFromContext(context));
```

Hagamos una pausa por unos minutos y pensemos en lo que queremos hacer. Queremos poder hacer clic en el botón y ejecutar un método. Esto se puede hacer de la siguiente manera:

```html
<button data-action="click->zelda#play" [...]>
```

Esto cegará al evento `click` para el método `play()` en el `zelda_controller.js` de Stimulus. Ahora podemos definir este método de la siguiente manera:

```js
// [...]

export default class extends Controller {
  // [...]

  play() {
    console.log("Button clicked! TODO: play a sound");
  }
}
```

Haz clic en el botón. ¿Tienes una línea nueva en la consola? ¡Genial! Si no es el caso, vuelve a revisar todo. Pregúntale a tu compañero/a (buddy) y si no levanta un ticket.

El siguiente paso es hacer que se escuche el audio. Agrega la líneas siguientes en el método `play()`:

```js
const sound = new Audio('secret.mp3');
sound.play();
```

¡Testealo!¿Funciona?¡Bien!

¿Cuál es el próximo paso? Queremos hacer lo siguiente:

- Cambiar el texto del botón a `"Bingo !"` mientras el audio se está reproduciendo
- Desactivar el botón mientras el audio se está reproduciendo
- Cambiar el texto del botón nuevamente a `"Click me!"` cuando el audio ha terminado de reproducirse
- Activar el botón nuevamente cuando el audio ha terminado de reproducirse.

Si te fijas en el código anterior donde _no usamos_ Stimulus, verás que usamos el `event.currentTarget` para referenciar el botón. Aquí usaremos otra funcionalidad de Stimulus: **target**.

Abre nuevamente tu HTML y agrega otro atributo de datos (`data-` attribute):

```html
<button data-target="zelda.trigger" [...]>
```

Ahora nuestro botón tiene un target llamado `trigger` el cual podremos referenciar directamente en el controlador de Stimulus:

```js
export default class extends Controller {
  static targets = [ "trigger" ];

  play() {
    // [... Existing code]
    console.log(this.triggerTarget);
  }
}
```

💡 Si usas el linter de Sublime, ESLint se quejará de un error de sintaxis. Este ejercicio no está configurado para soportar el paquete [`babel-eslint`](https://github.com/babel/babel-eslint) el cual permitiría este tipo de sintaxis. Simplemente continúa trabajando en este desafío ignorando este error ...

Haz clic en el botón.¿Ves el `this.triggerTarget` en la consola? ¿Está referenciando el elemento `<button />` en el DOM?

Ahora podemos usar esa variable sin problemas para correr el código que se muestra a continuación y cumplir con las 4 especificaciones que se describieron anteriormente:

```js
play() {
  // [...]
  this.triggerTarget.innerText = "Bingo!";
  this.triggerTarget.setAttribute('disabled', '');
  sound.addEventListener("ended", () => {
    this.triggerTarget.removeAttribute('disabled');
    this.triggerTarget.innerText = "Click me!";
  });
}
```

## Revelación de la magia de Stimulus

Por ahora esta refactorización puede parecer aburrida e inclusive difícil. Vamos a hacer algunos cambios para que veas lo poderoso que puede ser Stimulus.

Digamos que queremos agregar un **segundo** botón el cual hará que se escuche otro audio. También queremos que este segundo botón tenga otro texto que sea más significativo.

En pocas palabras queremos implementar nuestro propio [Parque de Botones](https://www.myinstants.com/).

Bueno, empecemos con algo de HTML:

```html
<div data-controller="zelda">
  <button data-action="click->zelda#play" data-target="zelda.trigger" class="btn btn-success btn-lg">
    Treasure!
  </button>
</div>
```

Vuelve a cargar tu página. Ahora podrás ver el segundo botón. Haz clic en el verde; el que tiene escrito `Treasure`.¿Que pasa?

- ¿Es el mismo audio? Queremos uno nuevo (busca `treasure.mp3` en tu carpeta)
- El texto del botón vuelve a ser `Treasure` cuando el audio termina de reproducirse?¡Eso es lo que queremos!

Comencemos con algo de texto. Por ahora lo que tenemos en JavaScript es un conjunto hardcodeado de `innerText` en la retrollamada (callback) `"ended"`:

```js
this.triggerTarget.innerText = "Click me!";
```

Lo que queremos es_devolverla a su estado inicial_.¡Entonces tenemos que almacenar dicho estado en alguna parte! Para eso podemos usar el método `connect()`:

```js
connect() {
  this.originalTriggerText = this.triggerTarget.innerText;
}
```

De esa manera podemos cambiar el código en la retrollamada (callback) `"ended"` a lo siguiente:

```js
this.triggerTarget.innerText = this.originalTriggerText;
```

Ahora regresa al navegador y haz clic en los dos botones.¿Funciona?

Avancemos al siguiente bug que es que se está reproduciendo el_mismo_audio para los dos botones.¿Por qué está pasando esto? La explicación es que en el controlador de Stimulus tienes la ruta (path) del audio **hardcodeada**:

```js
const sound = new Audio('secret.mp3');
```

Quisiéramos que `"secret.mp3"` fuese una variable. Una forma de hacer esto es usando otro atributo de datos (`data-` attribute) en el HTML:

```html
<div data-controller="zelda" data-zelda-sound="treasure.mp3">
  <button data-action="click->zelda#play" data-target="zelda.trigger" class="btn btn-success btn-lg">
    Treasure!
  </button>
</div>
```

Luego regresa al controlador de Stimulus y actualiza el parámetro del constructor del audio (`Audio()`):

```js
const sound = new Audio(this.data.get('sound'));
```

¿Funciona? Genial. Ahora puedes actualizar el primer botón HTML para hacerlo funcionar con el controlador de Stimulus actualizado.

## Conclusión

Échale un último vistazo a tu archivo `lib/controllers/zelda_controller.js`.

- ¿Ves un `querySelector`? No, porque fue reemplazado por `this.element` en el mecanismo del **target** el cual enlaza automáticamente variables `this.$$$Target` con elementos `data-target` definidos
- ¿Ves un `addEventListener`? No, porque fue reemplazado por el `data-action` con la sintaxis `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`.¡Solo tienes que implementar la retrollamada (CALLBACK) en tu controlador y listo!

Una vez que se implementa un controlador Stimulus es muy fácil utilizarlo nuevamente en todos lados en una página web con las etiquetas HTML adecuadas.
