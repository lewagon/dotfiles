## Contexto y Objetivo

Queremos crear un juego clásico: el buscaminas ([Minesweeper])(https://www.google.com/search?tbm=isch&q=minesweeper+windows) en nuestro navegador.

Te hemos suministrado una plantilla para ayudarte a comenzar:

- `index.html`: un grid de 2x2 para el juego. ¡Si quieres lo puedes agrandar!
- `minseweeper.css`: contiene clases que puedes aplicarle a las celdas de tu tabla (`td`) para mostrar el título correspondiente a una imagen. Aquí estamos usando un archivo svg como imagen de fondo (`background-image`). Luego fijamos el tamaño del archivo a 24 pixeles (si quieres lo puedes hacer más grande o más pequeño).
- `lib/minesweeper.js`: ¡aquí es donde deberías poner tu código!

### Configuración

Para lanzar un servidor local, ejecuta:

```bash
serve
```

## Especificaciones

Tomate un tiempo para pensar en las reglas del juego.¿Cómo empezarías?

- El grid de la plantilla es de 2x2.¿Crees que deberías agrandarlo?
- ¿Qué hay detrás de cada título `unopened`?¿Cómo almacenas esta información?
- ¿Qué pasa cuando hacemos clic izquierdo en el título?¿Y cuando hacemos clic derecho?
- ¿Cuándo ganas?¿Cuándo pierdes?

### Un paso más lejos

Si ya terminaste lo básico, podrías hacer lo siguiente:

- Cambiar las imágenes
- Agregar un marco y un pequeño smiley amarillo en la parte superior con anteojos de sol
- ¿Cuándo se gana? o ¿Qué elemento provoca el reinicio del juego al hacer clic en él?
- Agrega un cronómetro
