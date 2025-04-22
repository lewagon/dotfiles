## Contexto y Objetivos

Crea una [página de resultados con un mapa fijo (sticky map)](https://lewagon.github.io/layouts-demo/campuses-with-map.html) como el que viste en clase. Fíjate que no hemos importado Bootstrap. ¡No está en ninguna parte del archivo `index.html`! Vas a tener que implementar este diseño de página (layout) en el archivo `pages/cities.css` sin usar Bootstrap:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/map-example.png)

## Inicio del desafío

1. Asegúrate de entender bien el código que está en el archivo `index.html`, así como el diseño que te damos para la barra de navegación (navbar) y las cards en `components/navbar.css` y `components/card.css`. Si crees que no lo entiendes bien, ¡levanta un ticket y uno/a de los/las profesores/as te lo explicará!
2.- Regresa a la clase y repasa cómo diseñar la distribución de una página (layout) usando  `flexbox` y `position: sticky`.
3.- **¡No hagas trampa inspeccionando el código! 🔎** El objetivo de este desafío es enseñarte cómo construir un layout de manera autónoma. Tómate tu tiempo para pensar y hazle preguntas a los/las profesores/as cuando estés bloqueado/a, ¡pero no hagas trampa 😉!


Para poder mostrar el mapa de Mapbox, necesitarás [obtener una clave API de MapBox](https://www.mapbox.com/account/access-tokens/) y asegurarte de agregarle tu propia clave a la url en el atributo `src` del elemento de la imagen del `#map`.

Para testear tu código y ver la página en el navegador, no solo abras el archivo HTML en tu navegador. También corre el servidor web usando el comando siguiente:

```
serve
```
Como te podrás dar cuenta, ya te hemos creado el código para el componente `card`, así que todo lo que debes hacer es:

- Crear un grid de `.cards` alrededor de `.card`s.
- Crear una distribución de página (layout) horizontal para poder tener los `.cards` a la izquierda y el `#map` a la derecha.

**[Recomendación]**: ¡Dibuja la estructura HTML antes de comenzar!

N.B.: ¡no olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r`) para limpiar el caché en caso de que tu página no muestre el código más reciente!

## Nueva organización CSS

Fíjate que ahora tenemos **dos carpetas** en nuestro CSS.

-  `components`: para el código de todos nuestros componentes gráficos.
-  `pages`: para el código de la distribución (layout) de las diferentes páginas de nuestro sitio web.

Como siempre, `style.css` importa todas las demás páginas de estilo (stylesheets) y está enlazado en el HTML.

