## Contexto y Objetivos

Cuando creamos una página web, los desarrolladores nos enfocamos en su apariencia, pero realmente, es simplemente nuestro_punto_de_vista. ¡Olvidamos que todos tenemos perspectivas diferentes! La accesibilidad web es el arte de crear páginas web para todos incluyendo personas con discapacidades o algún tipo de impedimento. Muchos las visitan utilizando **tecnologías asistenciales** como lectores de pantalla, sistemas de ampliación de pantalla para visualizar el contenido con un aumento considerable de su tamaño, programas de reconocimiento de voz, dispositivos de entrada de datos alternativos como lectores de control ocular, puntero con seguimiento de cabeza y muchos más …

Las decisiones tomadas durante la escritura del código tienen un gran impacto en el grado en que la tecnología puede reducir las limitaciones físicas o mentales del usuario. Esto no significa que la creación de páginas accesibles sea un campo diferente lleno de misterios ni requiere conocimientos de lenguajes de programación especiales. Al contrario, si escoges el código adecuado podrás crear cosas extraordinarias para todos.

## Especificaciones

Este desafío es más como un tutorial. Vas a mejorar una página que ha sido creada sin haber considerado los fundamentos de la accesibilidad web. Descubrirás sus pilares fundamentales: **Estilo**, **Semántica** y **Enfoque**

![Main topics](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/main-topics.png)

**Configuración**

Empieza por correr el servidor:

```ruby
cd accessibility-guidelines
serve
```

Te recomendamos usar Chrome. Usarás mucho los paneles de **Herramientas de Desarrollador** donde Chrome tiene muchas opciones de accesibilidad web integradas. Abre el panel y colócalo del lado derecho:

![CConfiguración de Chrome](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/chrome-setup.png)

## Estilos

![Estilos](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/styling-topic.png)..

Los detalles sutiles de diseño pueden traer como consecuencia que sea más difícil leer el contenido. Las discapacidades visuales son muy comunes. Por ejemplo, una gran parte de la población usa anteojos y los daltónicos ven colores en espectros diferentes. El objetivo del diseño de una aplicación web es encontrar el equilibrio entre buenos gráficos y la legibilidad.

### Incorporación de texto a las advertencias UI

![Visión](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/vision.png)

1. Abre el panel de renderizado (**Rendering**) a través del menú **More tools**.
2. Encuentra el último menú **Emulate Vision Deficiencies** y testea todas las diferencias de renderizado.
El área (`textarea`) para comentarios en la página está delineada con un borde rosa para señalar un error. Es difícil de distinguir cuando se selecciona si tienes Protanopia o Deuteranopia, ¿verdad?
3. Abre `index.html` y agrega el mensaje de error debajo del área de texto (`textarea`).
<details>
<summary markdown='span'>View solution</summary>

```html
<p class="error-message">Comment can't be blank</p>
```
</details>

### Aumento del contraste

![Contraste](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/contrast.png)

1. Abre el panel de estilos (**Styles**) en la pestaña (tab) **Elements**.
2. Inspecciona el título principal `<h1>` y fíjate que el puntaje de contraste aparece como insuficiente. Los colores que son muy parecidos suelen mezclarse y reducir la legibilidad.
3. Escoge colores para los títulos que tengan el contraste adecuado. Testealos directamente desde el panel de selección de colores (**color picker**) para ver la diferencia en tiempo real.
![Escoge un color](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/color.png)
4. Actualiza tus cambios de selección de colores en `style.css`.

### Mejorar el tamaño de fuente por comodidad

![Contraste](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/font-size.png).

1. Abre los parámetros de Chrome (`cmd ,` or `ctrl ,`).
2. Selecciona el menú **Appearance**.
3. Cambia el tamaño de fuente (font-size) de mediano (`Medium`) a muy grande (`Very Large`) y vuelve a [localhost:8000](http://localhost:8000). Tal vez esperabas ver el texto mucho más grande pero desafortunadamente no es el caso porque algunos tamaños de fuente están configurados en pixeles. Solo las [unidades](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) relativas cambian proporcionalmente a los parámetros del navegador.
4. Reemplaza los tamaños de fuente con unidades relativas (`rem`) en `styles.css`. Aumenta el tamaño de fuente de `<p>` para hacer que sea más fácil leerlo. Utiliza el simulador de discapacidades visuales (Blurred vision emulator) para testear tus cambios.


### Hacer que la página sea receptiva

![Viewport](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/viewport.png).

1. Haz clic en el botón de la barra de herramientas desplegable de dispositivos (**Toggle device toolbar**) que se encuentra en el panel de herramientas de desarrollador (developers tools).
1. Selecciona la vista de móvil. Tu página se verá más pequeña de lo normal. Así es cómo los dispositivos móviles muestran contenido web: ellos renderizan una pantalla más ancha y con zoom de pantalla alejado. Esto es intencional porque la mayoría de las páginas web están optimizadas para pantallas horizontales.
1. En `index.html`, forza el [viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) para que se considere que el tamaño del dispositivo sea el mismo que el del la pantalla de tu página. Agrega las metaetiquetas (metatags) necesarias en el `<head>`.
<details>
<summary markdown='span'>View solution</summary>

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
</details>

## Semántica

![Semántica](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/semantics-topic.png).

![Semántica](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/semantics.svg?sanitize=true).

Esas dos páginas web parecen ser similares pero en realidad son muy diferentes. La primera usa CSS para organizar su distribución mientras que la segunda usa los roles naturales de los elementos HTML. ¿Crees que el resultado final sea igual? **No. Porque las tecnologías de asertividad web no son capaces de describir la primera página con precisión**.

Las tecnologías de asertividad web dependen del código para renderizar la página, de forma parecida a lo que hacen los buscadores. Pero se necesita superponer información semántica (**semantic**) para poder nombrarle y describirle elementos al/a la usuario/a. Las descripciones de audio inteligibles de etiquetas `<a>` son un ejemplo de ello:

![Audio](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/audio.png).

La información semántica se infiere de:
- Native [elementos HTML5](https://developer.mozilla.org/en-US/docs/Glossary/semantics) como títulos, navegación, etc. Ellos tienen roles implícitos que un gran número de herramientas de asertividad web entienden.
- [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) es un conjunto completo de atributos que parchean la información que falte. Por cierto, puedes encontrar herramientas de ejemplos de atributos aria en los componentes de Bootstrap. Bootstrap [cumple bien con los estándares de accesibilidad](https://getbootstrap.com/docs/4.5/getting-started/accessibility/). ¡Asegúrate de mantener esos atributos ya que son muy útiles!

![Interfaz de Usuario](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/user-interface.svg?sanitize=true)

### Uso de etiquetas HTML adecuadas

Es importante sacarle el mejor provecho posible a los roles natos de las etiquetas HTML así como a su comportamiento. Por ejemplo, siempre usa un `<a>` o un `<button>` para elementos cliqueables. Agregar una regla css como un cursor (`cursor: pointer;`) es muestra de deficiencias conocidas como código que apesta ([code smell])(https://en.wikipedia.org/wiki/Code_smell)!

![Panel accesibildad](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/accessibility.png).

1. Abre el panel de accesibilidad (**Accessibility**).
2. Con la herramienta de inspección (**Inspect tool**), inspecciona la etiqueta `<h1>` y un `<div>`.
3. Siempre échale un vistazo a las propiedades de accesibilidad en el panel. El atributo `role` es uno de los más importantes.
Explora la página para descubrir más cosas. Encontrarás diferencias entre elementos no semánticos (**non-semantic**) como `<div>` o `<span>`, los cuales son simples contenedores genéricos, y elementos semánticos (**semantics**) como `<h1>` y `<nav>` que tienen roles (`role`) específicos.
4. Reemplaza los `<div>` genéricos por las etiquetas HTML5 adecuadas:
  - `<header>`, `<main>` y `<footer>` para la estructura
  - `<h2>` y `<h3>` para los títulos
  - `<p>` paral los parágrafos.

### Conexión de elementos interactivos

Los elementos de entrada tienen muchas propiedades específicas para transmitir sus comportamientos complejos. ¿Ves la propiedad `name`? Está llena de texto de otro elemento: la etiqueta ([`label`])(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label). Las etiquetas (labels) siempre van de la mano con las entradas de datos.

1. Cuando haces clic en la palabra "Styling", la misma selecciona la casilla de verificación (checkbox) correspondiente. Cuando intentas hacer clic en "Yes", parece que se ha roto en comparación con el test anterior. Es porque el "Yes" no está identificado como `label` en el HTML.
1. Abre `index.html` y agrega las etiquetas que le faltan a los botones de radio "Yes" y "No" con el atributo `for` apuntando al `id` de la entrada de datos.
1. La entrada "zoom scale" está preparada para que se llene con un número pero está declarada como tipo `text`. Encuentra una tipo de entrada ([input type])(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input) más apropiada para tener la descripción correcta.

<details>
<summary markdown='span'>View solution</summary>

```html
<input type="radio" name="explanations" id="yes">
<label for="yes">Yes</label>
<input type="radio" name="explanations" id="no">
<label for="no">No</label>
```
</details>

### Incorporación de información faltante

Cuando la información solo es visual y depende del contexto debemos respaldarla con código semántico para darle a todos los usuarios experiencias similares. Los [atributos ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) son útiles cuando ningún elemento HTML nativo es relevante para la situación.

1. Agrega una descripción alternativa a la imagenes con el atributo [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img).
1. El enlace "click here" es muy general. Reemplaza el texto con una intención clara como Principios de Accesibilidad ( "Accessibility Principles").
1. Agregale atributos ARIA a los botones sin texto.
1. Especifíca el lenguaje en la etiqueta `html`: `<html lang="en">`. Si falta este atributo los lectores de pantalla van a volver a sus languages predeterminados.
1. Inserta el `<title>` en la página en `<head>`. Será leído cuando se cambie de una pestaña (tab) a la otra.

<details>
<summary markdown='span'>View nav button solution</summary>

```html
<button class="toggle-nav" aria-label="Toggle menu"></button>
```
</details>

<details>
<summary markdown='span'>View footer link solution</summary>

```html
<a href="#top" class="to-top" aria-label="Back to top"></a>
```
</details>

<details>
<summary markdown='span'>View title solution</summary>

```html
<title>Accessibility Guidelines</title>
```
</details>

## Foco

![Foco](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/focus-topic.png).

¿Alguna vez has notado el borde azul cuando escribes en un formulario web? Algunos programadores lo remueven con CSS porque no combina con sus diseños. ¡No lo hagas! Este borde azul es un aro de enfoque (**focus ring**). Es muy importante para los usuarios que usan teclados.

Solo los elementos interactivos son enfocables. Los ítems de contenido como texto e imágenes no entran en ese grupo. El enfoque salta de un elemento a otro en el mismo orden del HTML. Aunque es posible controlar las órdenes con el atributo [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex), es considerado anti patrón.

![Enlace](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/link.png).

1. Practíca la navegación por medio del teclado:
    - `⇥` TAB para avanzar en la página  / `⇧` Shift + `⇥` TAB para ir hacia atrás
    - Teclas de flechas `↑ ↓ ← →` para seleccionar valores en un formulario
    - Barra de espacio (SPACE bar) para marcar casillas de verificación (checkboxes)
    - `↵` ENTER para enviar

¿Notaste que presionaste TAB tres veces y no tuviste ninguna retroalimentación? Realmente enfocaste los tres enlaces del widget de navegación oculto. Pista: cuando no puedas ver un elemento no quiere decir que también esté oculto para el código.

2. Despliega la visibilidad ([`visibility`])(https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) de la navegación en `focus.css`.
    <details>
    <summary markdown='span'>View solution</summary>

    ```css
    nav.close ul {
      visibility: hidden;
    }
    ```
    </details>

3. Ahora el CSS está fijo. Abre la navegación y trata de enfocarla nuevamente. Tenemos que fijar una última cosa: los enlaces de navegación deben ser los primeros ítems en ser enfocados. Abre `index.html` y mueve el código `<nav>` antes del contenedor principal (`<main>`).


## (Opcional) Test del resultado

### LightHouse (Google)
Lighthouse es una herramienta de auditoría que testea accesibilidad web entre otras cosas. Puedes probarla en la página que fijaste en este desafío.
[Lighthouse explicado](https://developers.google.com/web/tools/lighthouse/). Si tienes dificultades la primera vez que hagas una auditoría, intenta reiniciar Chrome.

### Accessibility Insights (Microsoft)
Instala [Accessibility Insights](https://accessibilityinsights.io) para correr la auditoría.

### Screen readers
- [VoiceOver en Mac](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=7)
- [NVDA para Windows](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=9)

## Más cosas para leer

- ["Accessibility" en developers.google](https://developers.google.com/web/fundamentals/accessibility/)
- ["Accessible to all" en web.dev](https://web.dev/accessible/)
- ["The POUR Methodology" en el blog de Adobe](https://theblog.adobe.com/design-with-accessibility-in-mind-the-pour-methodology/)
- [El proyecto a11y](https://www.a11yproject.com/)
- ["A11ycasts con Rob Dodson" en Youtube](https://www.youtube.com/watch?v=HtTyRajRuyY&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [Cómo las personas con impedimentos visuales navegas la web](https://uxdesign.cc/how-visually-impaired-people-navigate-the-web-7f9eab9d9c37)
- ["Un resumen de aplicaciones web accesibles y widgets" en MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets)
