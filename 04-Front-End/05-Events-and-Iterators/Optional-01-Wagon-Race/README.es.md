## Contexto y Objetivos

Vamos a crear un juego en JavaScript: the Wagon Race 🏎. Es un juego simple donde usas tu teclado para mover un vehículo (el logo de Le Wagon) hacia adelante. Cada jugador mueve su vehículo presionando una tecla (e.g. `Q` para el jugador número uno, `P` para el jugador número dos)

El objetivo es aprender más JavaScript, sobre el DOM y sobre la gestión de eventos asíncronos.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/wagon_race.gif)

## Especificaciones
Inicia tu servidor web local con:

```bash
rake webpack
```
Y ve a http://localhost:8080

#### HTML

Comenzarás con la creación con HTML de un tablero simple para dos jugadores. Hay varias maneras de hacer esto pero aquí hay una de ellas:

```html
<table class="racer-table">
  <tr id="player1-race">
    <td></td>
    <td class="active"></td>
    <td></td>
    <td></td>
    etc.
  </tr>
  <tr id="player2-race">
    <td></td>
    <td></td>
    <td></td>
    <td class="active"></td>
    etc.
  </tr>
</table>
```
#### CSS

Una vez que hayas terminado el HTML, trabaja en el CSS y diseña una pista de carreras! Ejemplo:

```css
.racer-table td {
  height: 40px;
  width: 40px;
}
.racer-table td.active {
  background-repeat: no-repeat;
  background-size: 100%;
}
#player1-race td.active {
  background-image: url("images/player_1.png");
}
#player2-race td.active {
  background-image: url("images/player_2.png");
}
```

Actualizamos la posición de un jugador moviendo la clase `active` de un `td` al siguiente. Por supuesto que hay otras maneras de hacer este juego. Usando una tabla y una clase CSS es una opción. Solo asegúrate de que puedes producir “manualmente” todas las vistas del tablero que puedas llegar a necesitar.

Siempre es buena idea hacer lo más que se pueda en markup HTML y clases CSS antes de pasar a JavaScript. Los programadores malos de frontend pasan tiempo escribiendo largos códigos JavaScript que cambian los valores CSS en lugar de algo corto que trabaje bien con las clases CSS.

#### JavaScript

Escribe todo el código en `lib/wagon_race.js`. Necesitamos una manera para que JavaScript actualice el estado del tablero. Crea funciones JavaScript simples que actualicen la posición de un jugador. Nuevamente hay varias maneras de hacer esto. Aquí hay un ejemplo:

- Remueve la clase `active` del `td` del jugador actual y agrega una clase en el próximo `td`.
- Hazle seguimiento al "index" de cada jugador en la tabla e incrementalo.

#### Enlace al teclado

¡Hacer clic en un botón no es lo suficientemente rápido y ni siquiera puedes jugar con alguien más! Échale un vistazo el evento `keyup`:

```js
document.addEventListener("keyup", event => console.log(event));
```

_¿Entiendes por qué usamos `keyup` en lugar de `keydown`?_

##### Inicio y Final 🏁

Dos últimos detalles:

- Encuentra la manera de anunciar al ganador
- Encuentra la manera de reiniciar el juego
