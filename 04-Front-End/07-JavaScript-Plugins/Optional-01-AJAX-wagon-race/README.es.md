## Contexto y Objetivos

Volvamos a nuestra carrera Wagon Race y hagámosla un poco más interesante usando una API para registrar las partidas que jugamos y almacenar los resultados.

**Antes de avanzar:**

Ve a la carpeta del ejercicio.

```bash
bundle install
```

**Para la API:**

* Puedes leer la [documentación de la API](https://github.com/lewagon/fullstack-challenges/blob/master/04-Front-End/07-JavaScript-Plugins/Optional-01-AJAX-wagon-race/API.md)
* Inicia la API llamando al comando `bundle exec rake api` en la carpeta del ejercicio
* La API será accesible en http://localhost:4567

N.B.: Si tienes problemas iniciando la API, intenta correr `bundle exec rake db_reset`.

**Para TU código JavaScript:**

* Usa los archivos localizados en la carpeta `public`
  * Coloca tu código JS en `public/js/game.js`
  * Coloca tu código CSS en `public/css/main.css`
  * Coloca tu código HTML en `public/index.html`

**Acceso al juego**

Una vez que has iniciado la API con el comando `bundle exec rake api`, el juego será accesible en http://localhost:4567/index.html.

## Especificaciones

**¡Comienza por leer la documentación de la API!**

Tu aplicación funcionará de la siguiente manera:

1. Cuando la página cargue, pídele a la API que cree una nueva Sesión de Juego (Game Session)
2. Una vez que la sesión de juego (Game) haya sido creada, tu página mostrará el botón `Start New Game!`
3. Cuando hagas clic en dicho botón, el mismo desaparecerá y será reemplazado por un formulario donde puedes escribir los nombres de los jugadores (Player1 y Player2)
4. Cuando se envíe el formulario le pedirás a la API que cree un juego nuevo de acuerdo a los nombres de los jugadores
5. Cuando obtengas una respuesta, oculta el formulario, muestra el tablero (lo que hiciste en el ejercicio anterior) y escucha las entradas de los usuarios.
6. Cuando la partida termine, envía una petición a la API para_terminar_el_juego. Anuncia el ganador y muestra el tiempo que se tomó para ganar (en segundos)
7. Cuando obtengas la respuesta de la API, muestra la información en un tablero de puntuación y suministra el botón "Play Again!".
