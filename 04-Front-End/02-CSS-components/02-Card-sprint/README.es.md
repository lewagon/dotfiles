## Contexto y Objetivos

Ahora vamos a avanzar hacia un componente un poco más complejo. Trabaja en tres los diseños diferentes de las cards que vimos en clase. Aquí esta [tu objetivo](http://lewagon.github.io/html-css-challenges/14-card-sprint/). Ya pusimos el código HTML inicial en el `index.html`

```html
<div class="card-category">
  <!-- [ ... ] -->
</div>
<div class="card-product">
  <!-- [ ... ] -->
</div>
<div class="card-trip">
  <!-- [ ... ] -->
</div>
```

Ahora tu trabajo es agregar HTML dentro de cada card y el CSS asociado en `cards.css` (el código CSS de las tres cards puede estar en el mismo archivo).

**NOTA**: por ahora intenta crear el `card-trip` sin el avatar del usuario en la esquina inferior derecha. Eso lo agregaremos cuando hayamos completado nuestros cards.

¡No olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r`) para limpiar el caché en caso de que tu página no muestre el código más reciente!


## Organiza tu CSS con archivos de componentes

De manera similar a lo que hiciste en el ejercicio anterior, usaremos la nueva estructura profesional para nuestras hojas de estilo. Podemos poner todo el código CSS para nuestras clases de cards en un archivo CSS: `cards.css`:


```
.
├── css
│   ├── components
│   │   └── cards.css
│   └── style.css
└── index.html
```

Luego en `style.css`:

```css
/* Import fonts from Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Raleway:wght@300;400;500;700");

/* Importing all components file */
@import url("components/cards.css");

/* General for fonts and colors */
body {
  margin: 100px;
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
a {
  text-decoration: none;
}
.text-center {
  text-align: center;
}

```

Luego solo necesitas **un enlace único `style.css`** un tu archivo HTML:

```html
<head>
  <link rel="stylesheet" href="css/style.css">
</head>
```

## Sugerencias y recursos adicionales

Ahora que saliste del diseño de tu tres cards, ahora actualiza tu última card `card-trip` con un avatar de usuario en la esquina inferior derecha. Para fijar un elemento a una posición específica dentro de otro elemento, usaremos [el patrón Relative > Absolute](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/). A continuación se listan los pasos para posicionar un elemento usando este patrón:

### Configuración del div principal a `position: relative`:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-relative.png)

### Fijación de un div dentro con `position: absolute` (relativo al padre).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-top.png).

Esto nos permitirá posicionar el hijo (`.child`) en relación al padre (`parent`) con `position: relative;`. Luego puedes usar los atributos direccionales  `top`, `bottom`, `left` and `right` para mover el hijo (`.child` de un lado a otro 📐.

Atención: si agregas un valor negativo como `right: -20px`, esto moverá el div interno 20px **fuera** del div padre.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-bottom.png).

Ahora puedes aplicar esta técnica para agregar un avatar superpuesto en tu `.card-trip` como se muestra a continuación:

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/card-position.png" alt="" width="400">
</div>
