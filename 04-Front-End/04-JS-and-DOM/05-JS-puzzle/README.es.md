## Antecedentes y Objetivos

Construyamos un juego de rompecabezas 🧩
Una vez que hayas movido todos los números dentro del rompecabezas en el orden correcto, recibirás una notificación de que has ganado el juego.

![js-puzzle](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/js_puzzle.gif)

## Configuración

Como de costumbre, puedes probar tu código ejecutando el siguiente comando:

```bash
serve
```

Luego abre [`localhost:8000`](http://localhost:8000) en tu navegador.

## Especificaciones

En este ejercicio, usaremos un nuevo concepto de JavaScript: un "event listener" (escuchador de eventos). Aprenderás más sobre ellos en la siguiente lección, por lo que ya hemos escrito el código para ti en el ejercicio.
¿Cómo funciona esto? Queremos ejecutar nuestro código JavaScript solo cuando ocurra un evento específico, no directamente al cargar la página (lo cual hemos hecho hasta ahora). En nuestro caso, queremos mover nuestra casilla vacía solo cuando hagamos clic en otra casilla; de lo contrario, no debería suceder nada. Podemos lograr esto agregando el siguiente código:

```js
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (canMove(tile)) {
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
```

No modifiques este código al final de tu archivo, solo debes codificar las funciones que están dentro.

## Comprobar si la casilla puede moverse

El código que se ejecuta dentro de un "event listener" se llama **callback** (devolución de llamada).
Queremos mover la casilla en el callback, pero primero debemos verificar si la casilla puede moverse en absoluto. Una casilla solo puede moverse si tiene una vecina vacía (en posición vertical u horizontal).

Implementemos la función `canMove` para verificar si una casilla tiene un espacio vacío junto a ella.
Esta función debería tomar 1 parámetro: la casilla en sí.

Para verificar si una casilla tiene un espacio vacío junto a ella, puede que desees consultas las propiedades [cellIndex](http://help.dottoro.com/ljputote.php) y [rowIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/rowIndex) para calcular la posición de la casilla.
¡Ten cuidado si necesitas llamar a estos métodos en un elemento `tr` o `td`!

## Mover la casilla

Si puedes mover la casilla, entonces vamos a hacerlo. Implementemos la función `moveTile`, que debería intercambiar la casilla vacía con la que se acaba de hacer clic. Debes intercambiar la clase `.empty` de la casilla vacía a la que se hizo clic y cambiar el número de la casilla a la casilla vacía.

## Alertar al jugador cuando gane el juego

Por último, debemos verificar después de cada movimiento si el jugador ha ganado el juego. Ganar en este juego significa que las casillas están ordenadas en orden ascendente.

Programemos la función `checkIfPlayerWins`, que debería mostrar una alerta si las casillas están en el orden correcto.

Ahora puedes intentar resolver el rompecabezas.
