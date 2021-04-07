## Contexto y Objetivos

Trabajar con tres diseños de botones diferentes (dos que te damos nosotros y uno que crearás tú). Aqui está [tu objetivo](http://lewagon.github.io/html-css-challenges/08-button-sprint/). Ya nosotros pusimos el código HTML en el `index.html`.

```html
<a href="#" class="btn-medium">Write a story</a>
<a href="#" class="btn-treehouse">Start now</a>
<a href="#" class="btn-yours">Your call</a>
```

Ahora tu trabajo es crear el código CSS correspondiente en `button.css`.

¡No olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r`) para limpiar el caché en caso de que tu página no muestre el código más reciente!

## Organización de tu CSS con archivos de componentes

A partir de ahora empezamos a organizar tu código CSS con **un archivo CSS para cada componente**. Un botón es un componente estándar, tal como un avatar, una card, una lista, una barra de navegación (navbar), un tab, un formulario, etc. Cada uno de estos componentes merece su propio archivo CSS. La arquitectura de tu proyecto debe lucir de la siguiente manera:

```
.
├── css
│   ├── components
│   │   ├── avatar.css
│   │   ├── banner.css
│   │   └── button.css
│   └── style.css
└── index.html
```

Luego en el `style.css`:

```css
/* Importing all components file */
@import url("components/avatar.css");
@import url("components/banner.css");
@import url("components/button.css");

/* General style rules for fonts and colors */
body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
```
Luego solo necesitas **un enlace único para `style.css`** en tu archivo HTML:

```html
<head>
  <link rel="stylesheet" href="css/style.css">
</head>
```

## No te olvides del hover

Recuerda diseñar el estado `.btn:hover` para cada uno de tus botones.

## Espacio alrededor de un enlace

Tal vez hayas notado que `margin-top` o `margin-bottom` no se aplica a tus enlaces por defecto.  Esto es porque la etiqueta `<a>` es un elemento alineado. Si quieres agregar espacio vertical a tus enlaces debes cambiar la propiedad `display` a `inline-block` o `block`.
