## Configuracion

Queremos continuar construyendo tu perfil. Si todavía no has copiado el archivo del ejercicio anterior, hazlo ahora. Copialo en la carpeta de este desafío y agregale un archivo CSS:

```bash
cp -r ../01-Profile-content/profile . # don't forget the trailing dot!
cd profile
touch style.css
```

## Contexto y Objetivos

Agregar reglas CSS simples para diseñar **fuentes** y **colores** para tu perfil.

¡No olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r`) para limpiar el caché en caso de que tu página no muestre el código más reciente!

## Especificaciones

[Lo siguiente es un ejemplo](https://lewagon.github.io/html-css-challenges/02-fonts-colors-new/) de lo que necesitas crear. Aquí hay una lista de reglas CSS a escribir:

### Body

Escoge un color de fondo (`background-color`), un estilo de fuente (`font-family`), un tamaño de fuente (`font-size`) y una altura de línea (`line-height`) que te guste para el `<body>`. **Al configurar estas reglas a nivel del body, las mismas se aplicarán sobre las etiquetas básicas** (`<p>`, `<li>`, etc.).

## Encabezados (Headers)

- Escoge un color (`color`) y un estilo de fuente (`font-family`) que te guste para los encabezados (headers: `<h1>`, `<h2>`, `<h3>`).
- Escoge un tamaño de fuente (`font-size`) y una altura de línea (`line-height`) armónicos para los encabezados (headers).
- Pista: los **títulos pequeños** son más elegantes. Si ves cualquier página web ([Medium](https://medium.com/), [Airbnb](https://www.airbnb.com), etc.) notarás que los tamaños de fuente (`font-size`) son bastante pequeños.

### Enlaces (links)

- Cambia el `color` y la decoración de texto (`text-decoration`) de todos los enlaces.
- Agrega efectos hover (la alteración del aspecto de un componente de la interfaz gráfica una vez que se posa el ratón sobre él, aunque no haya sido seleccionado) a los enlaces usando la pseudoclase `a:hover`.

## Sugerencias y recursos adicionales

- Busca inspiración en [Coolors](http://coolors.co/) o [Color hunt](http://colorhunt.co/) para que selecciones una gama de colores genial.
- Escoge tus estilos de fuente en [Google Fonts](https://www.google.com/fonts).
-  **Open Sans** es la opción estándar de Google Fonts para el `body`. **Raleway**, **Varela**, **Poppins**, **Roboto** son algunas de las otras opciones que puedes usar para `h1`, `h2`, `h3`.

Por ejemplo, si quisieras usar Open-Sans y Poppins (con grosores (font-weights) distintos), podrias agregar lo siguiente en la parte superior de tu `style.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Poppins:wght@300;400;500;700");
```

Luego puedes aplicarlo al resto de tu CSS:

```css
body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300; /* if you want the light version */
}
```

Siéntete libre de dejar volar tu creatividad y escoger otras fuentes en Google Fonts 😎🌈!**

## ¿Ya terminaste?

Cuando hayas terminado, haz el push del ejercicio y copia el contenido en la carpeta del próximo ejercicio con el siguiente comando:

```bash
# Push to gihtub
git add .
git commit -m "Added fonts & colors to my profile page"
git push origin master

# Copy folder into next exercise folder
cp -r profile ../03-Finishing-profile-design
```
