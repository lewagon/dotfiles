## Antecedentes y objetivos

Creemos un nuevo controlador de Stimulus que nos permitirá marcar todas las casillas de verificación a la vez.

## Configuración

Ejecuta el servidor desde tu terminal usando:

```bash
serve
```

Y visita `localhost:8000`. Verás que estamos usando Bootstrap.

Esta vez, `Stimulus` ya está configurado en la parte superior de `index.html`.

Sin embargo, aún necesitas encargarte de configurar la parte de JavaScript tú mismo. Abre `index.js` e importa el controlador de Stimulus en la parte superior y registra el controlador en la parte inferior. Puedes nombrar al controlador `CheckAllCheckboxesController`.

Crea un archivo `check_all_checkboxes_controller.js` en la carpeta vacía `controllers` y copia el siguiente código:

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // TODO: ¡haz un console.log de algo!
  }
}
```

¡Listos para empezar!

## Especificaciones

Tu objetivo es implementar una casilla de verificación que marcará todas las casillas de verificación a la vez.

### 1. Prepara tu HTML

Esta vez el HTML ya está proporcionado para ti.

Ahora, ajustemos nuestro HTML para **conectar** el controlador:

- ¿En qué elemento del DOM vas a conectar el controlador?
- ¿Cuál es la sintaxis para conectarlo?

Sabemos que el controlador tendrá que interactuar con la casilla de verificación "Seleccionar todas" y también con las 4 casillas de verificación de las categorías. En Stimulus, un controlador solo puede interactuar con elementos dentro de su alcance, es decir, solo con elementos secundarios del elemento del DOM al que está conectado. Entonces, la pregunta aquí es: "¿Qué elemento envuelve tanto la casilla de verificación 'Seleccionar todas' como las casillas de verificación de las categorías?"

Una vez que hayas terminado de conectar el controlador, agrega un `console.log` en el método `connect()`. Vuelve a tu navegador, abre la consola y recarga la página. Deberías ver tu mensaje en la consola.

### 2. Escucha un evento

Ahora queremos marcar todas las casillas de verificación cuando marquemos la casilla de "Seleccionar todas". Esto significa que queremos escuchar el evento que ocurre en la casilla de verificación "Seleccionar todas" y luego activar algún código lógico para las otras casillas de verificación.

En Stimulus, escuchar un evento se llama una **Acción**. Pero, ¿a qué evento estamos escuchando?

Según esta [página de documentación de MDN](https://developer.mozilla.org/es/docs/Web/HTML/Element/Input/checkbox), una casilla de verificación emite 2 tipos de eventos: `change` y `click`. Usaremos `change` (como en "cambio" de estado).

Cuando se emita el evento `change`, llamaremos al método `checkAll()` en el controlador `check-all-checkboxes`.

Implementemos esta acción de Stimulus en nuestro HTML.

### 3. Implementa la devolución de llamada del evento

Ahora que estamos escuchando el evento de la casilla de verificación `change`, programemos el método `checkAll` en nuestro controlador de Stimulus.

Observa que este método toma un parámetro `event`. Por defecto, las acciones de Stimulus llaman al método con un objeto `event` pasado como argumento, al igual que el [buen viejo `addEventListener`](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener).

En este método, tendrás que:

- Verificar el estado de la casilla de verificación "Seleccionar todas" que se ha marcado.
- Si está marcada, entonces, marquemos todas las demás casillas de verificación.
- Si no está marcada, entonces, desmarquemos todas las demás casillas de verificación.

Pero, ¿cómo accedes a todas las demás casillas de verificación en este método? ¡Buena pregunta!

### 4. Piensa en los targets

Primero, debemos enumerar los targets en el controlador. ¿Qué elemento del DOM debe ser destinatario como una 'casilla de verificación'? Tengamos en cuenta que nos será útil seleccionar todos ellos y luego iterar en cada uno para marcarlo como verificado.

_Indicación: ¿Recuerdas cómo en JavaScript puro puedes usar `querySelector` o `querySelectorAll`, dependiendo de si quieres obtener solo un elemento o un arreglo de todos los elementos coincidentes respectivamente? ¡Hay una idea similar en Stimulus! Si dices `this.cardTarget`, obtendrás solo un elemento con `data-my-controller-target="card"`. Si dices `this.cardTargets` con una "s" al final, obtendrás un arreglo de todos los elementos que tienen `data-my-controller-target="card"`, ya sean 0 o 50 de ellos. [(fuente)](https://stimulus.hotwired.dev/reference/targets#properties)_

Una vez que hayas identificado tu target, agreguémoslo al HTML.

### 5. Implementando la lógica

Después de implementar los targets, volvamos a nuestro método `#checkAll`.

Esto es lo que tenemos que hacer:

- Verificar el estado de la casilla de verificación "Seleccionar todas" que se ha marcado.
- Si está marcada, entonces, iteremos sobre todos los targets de las casillas de verificación y cambiamos su propiedad `checked` a `true`.
- Si no está marcada, entonces, iteremos sobre todos los targets de las casillas de verificación y cambiamos su propiedad `checked` a `false`.

Tienes todo en tus manos para abordar el resto de este ejercicio.

Recuerda probar el comportamiento de tu controlador de Stimulus en el navegador (prueba manualmente) y siéntete libre de agregar `console.log` para comprender con qué estás trabajando en los métodos `checkAll`.

¡Es tu turno!

### Yendo más allá: Entender los ciclos de vida

Observa el método `connect()`. Los controladores de Stimulus vienen con devoluciones de llamada de ciclos de vida:

- `initialize()` (diferente del constructor de ES6)
- `connect()`
- `disconnect()`

`connect()` se activa cuando el controlador se conecta a un elemento del DOM, con el atributo `data-controller`.

Si quieres leer más sobre los ciclos de vida de los controladores de Stimulus, [lee esta documentación](https://stimulus.hotwire.dev/reference/lifecycle-callbacks)
