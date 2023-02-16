## Contexto y Objetivos

En este desafío queremos reproducir la experiencia de usuario (UX) que cada vez vemos más a menudo en los formularios de las aplicaciones web modernas en lo que respecta a la selección **multiple** de respuestas a una pregunta dada:

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/highlights.gif)

¡Nuevamente se tratará de **seleccionar** elementos, enlazarlos (**binding**) con un evento y reaccionar (**reacting**) a dicho evento!

## Especificaciones

Inicia tu servidor web local con:

```bash
serve
```

Abre [`localhost:8000`](http://localhost:8000) en tu navegador.

Verás una cuadrícula (grid) de 6 casillas de deportes que parecen cliqueables. Cuando pasas el cursor sobre ellas (hover) fíjate que la interfaz de usuario (UI) cambia y te sugiere que hagas clic. Sin embargo, no pasa nada cuando haces clic... ¡por ahora!¡Arreglemos eso!

- Cuando haces clic en un deporte, tienes que hacer que la cla classe `active` de la clase CSS se active/desactive (toggle) en el elemento (no tienes que escribir nada de CSS en este desafío)
- Tiene que ser posible seleccionar varios deportes (como si fuesen casillas de verificación (checkboxes)).

¡Antes de comenzar a escribir tu código, organiza el problema en partes y escribe el pseudocódigo!

No hay ningún test para este ejercicio pero ¡vamos a testear tu estilo! Así que es buena idea correr `rake`.

## Refactorización (opcional)

Una vez que el sobresaltado funcione como se espera, te recomendamos hacer que el código sea más legible.

Cuando combinas `forEach` y `addEventListener`, te queda un código de **3 niveles** de tabulación lo que lo hace difícil de leer.

¡Buenas noticias, en JavaScript, puedes almacenar **funciones** en variables! De esta manera puedes usar la variable sin llamar a la función por medio de la **omisión del paréntesis**.¡Esto es perfecto para las retrollamadas (**callbacks**)!

Por ejemplo, puedes refactorizar el siguiente código:

```js
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(event.currentTarget);
  });
});
```
Y transformarlo en lo siguiente:

```js
const displayClickedElement = (event) => {
  console.log(event.currentTarget);
};

const bindButtonToClick = (button) => {
  button.addEventListener('click', displayClickedElement);
}

buttons.forEach(bindButtonToClick);
```

Ahora es tu turno. Extrae:

- la lógica de enlace en una función flecha `bindSportToClick`,
- la retrollamada de clic (click callback) en una función flecha `toggleActiveClass`.

¡Al final de todo esto tu cósdigo será más fácil de leer y no tendrá más de 1 nivel de tabulación!
