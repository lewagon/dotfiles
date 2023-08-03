## Antecedentes y objetivos

Agregando a tu biblioteca de componentes de Stimulus, ahora implementarás un componente que cuenta el número de caracteres en un campo de entrada.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-animation.gif)

Los controladores de Stimulus están diseñados para ser reutilizables. Piensa que podrás utilizarlos más adelante en muchas funciones diferentes de tu proyecto. Estos controladores a menudo se llaman "utilidades".

## Configuración

Ejecuta el servidor desde tu terminal usando:

```bash
serve
```

Y visita `localhost:8000`. Verás que estamos usando Bootstrap.

Esta vez, `Stimulus` ya está configurado en la parte superior de `index.html`.

Sin embargo, aún necesitas encargarte de configurar la parte de JavaScript tú mismo. Abre `index.js` e importa el controlador de Stimulus en la parte superior y registra el controlador en la parte inferior. Puedes nombrar al controlador `CharacterCountController`.

Crea un archivo `character_count_controller.js` en la carpeta vacía `controllers` y copia el siguiente código:

```javascript
// lib/controllers/character_count_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // TODO: ¡haz un console.log de algo!
  }
}
```

¡Listos para empezar!

## Especificaciones

Tu objetivo es implementar un contador que cuente el número de caracteres en el área de texto.

### 1. Imagina el concepto

Ahora que tienes una configuración básica, piensa en el concepto del componente. ¿Cuál es el propósito de este componente? ¿Cómo lo programarás? Toma un trozo de papel y dibuja tu componente. Podría verse así:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-mockup.png)

Luego, hazte las siguientes preguntas:

- ¿Necesitaré agregar objetivos de Stimulus al HTML? Por ejemplo, un objetivo `counter` que mostrará el número.
- ¿Necesitaré agregar acciones de Stimulus al HTML?
- ¿Necesitaré agregar valores de Stimulus al HTML?

Cuando tengas una idea aproximada de tu componente, ¡puedes comenzar a programar!

### 2. Prepara tu HTML

Agrega una etiqueta `<textarea>` en tu `index.html`.

Luego agrega una pequeña etiqueta `<div>` que funcionará como contador y mostrará el número de caracteres.

Agrega clases de Bootstrap para que se vea bien si es necesario.

### 3. Implementa el controlador de Stimulus

Asegúrate de vincular tu controlador de Stimulus al DOM.

Necesitaremos implementar un método `updateCounter()` que cuente y vuelva a contar el número de caracteres en el área de texto cada vez. Pero, ¿qué evento desencadena la llamada de ese método? Cuando lo encuentres, agrega la correspondiente `data-action` de Stimulus al área de texto.

En tu controlador de Stimulus, programemos ahora la devolución de llamada del evento. Como siempre, agrega un `console.log` en el método y verifica que funcione cada vez que se llame al evento.

Una vez hecho esto, piensa en el pseudocódigo.

### 4. Implementa el método `updateCounter()`

Cuando un usuario escriba un carácter en el área de texto, necesitamos:

- Obtener el número de caracteres en el área de texto.
- Actualizar el contador con el número de caracteres.

### Yendo más allá: ¡Implementemos un límite de caracteres!

Ahora que tienes un contador funcional, agreguemos un límite de caracteres. Cuando el usuario escriba más de 140 caracteres, el contador deberá ponerse en rojo y mostrar: `Se ha excedido el número de caracteres en X caracteres`.
