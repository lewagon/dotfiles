## Antecedentes y objetivos

¡Juguemos con Flexbox y repasemos el tema de este módulo: Eventos e Iteradores!

Se te proporciona una plantilla inicial que contiene:

- `index.html` con todo el código HTML que necesitas
- `application.css` donde deberás utilizar Flexbox para terminar de estilizar la página
- `src/panels.js` donde eventualmente programarás tu solución en JavaScript

### Configuración

Vamos a lanzar un servidor web local ejecutando:

```bash
serve
```

Luego, abre [`localhost:8000`](http://localhost:8000) en tu navegador.

### Especificaciones

El objetivo es codificar un efecto JavaScript ordenado para tu página. Para hacer eso, deberás utilizar iteradores de JavaScript y eventos del DOM, junto con un poco de estilizado en CSS. También necesitarás estilizar la página utilizando Flexbox y luego agregar un comportamiento agradable en JavaScript para que podamos hacer clic en cada panel y revelar la imagen completa y el mensaje correspondiente.

Cada vez que hagamos clic en un panel, debería expandirse y revelar el texto completo de esta manera:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-reference.gif)

### Estilizado con Flexbox

Tenemos una estructura HTML simple con paneles. Cada panel tiene una imagen de fondo y algo de texto separado en 3 elementos de párrafo.

Al principio se ve un poco extraño, así que nuestro primer paso es hacerlo más bonito. ¿Cómo colocamos las imágenes una al lado de la otra? [Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox) es tu amigo en esta parte de estilizado del ejercicio. La página debe verse así antes de pasar a la parte de JavaScript del ejercicio:

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-styled.png"  width="600" height="300">

Consejos:

- Piensa por qué las imágenes están todas juntas. ¿Cómo podemos hacer que crezcan para ocupar todo el ancho de la pantalla?
- No olvides hacer que cada panel individual también sea un contenedor flexible para ayudar a estilizar todo. (Considera agregar `display: flex` a los paneles).
- Puede que notes que las palabras superiores e inferiores de cada panel deberían estar fuera de la vista. Necesitamos asegurarnos de que no sean visibles, pero que sigan en la página para poder moverlas a la vista. ¿Quizás [Translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) podría ayudar?

### Desglose del problema en JavaScript

La parte de JavaScript de nuestro problema debería ser más clara después de que hayas estilizado correctamente la página.

Queremos mostrar las palabras ocultas cada vez que se hace clic en el panel correspondiente. El panel también debería crecer al mostrarse más de la imagen.

Recuerda:

- Seleccionar los elementos HTML correctos
- Agregar event listeners a ellos (un lugar perfecto para Iteración) en forma de clic.
- Programar lo que debe suceder cuando se desencadena el evento. ¿Qué tal agregar las clases `.open` y `.closed`?
- El atributo `flex-grow` es proporcional. Un elemento que tenga `flex-grow: 2` crecerá al doble de la velocidad que un elemento que tenga `flex-grow: 1`.
