## Configuración

Una vez más, si aún no has copiado los archivos del ejercicio anterior, ahora es el momento de hacerlo. Mueve la carpeta del ejercicio anterior al directorio de este ejercicio.

```bash
cp -r ../02-Fonts-and-colors/profile .
```

## Contexto y Objetivos

Juega con el modelo de caja (box model) (`margin/border/padding/width/height`) separando la información de tu perfil en distintas etiquetas `<div>`. Luego usa selectores CSS avanzados (id, class, grouping, selectores descendientes) para afinar detalles de diseño.

¡No olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r` on macOS, `ctrl` + `F5` on Windows) para limpiar el caché en caso de que tu página no muestre el código más reciente!

## Especificaciones

### Paso 1: Modelo de caja (Box Model)

Aquí esta [tu objetivo](https://lewagon.github.io/html-css-challenges/03-box-model-and-selectors/).

- Debes empezar con la siguiente estructura de página

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
</div>
```

- El `<div class="container">` tiene como objetivo centrar el contenido de la página usando el margen izquierdo y el derecho para evitar que tome el 100% de la ventana (porque se vería horrible).
- El  `<div class="card">` se usa para agrupar información en una caja blanca bonita.
- Agrega detalles a tus cards usando propiedades CSS como `background`, `border`, `border-radius` y `box-shadow`. Mantén un diseño simple usando fondo blanco así como radios y sombras sutiles (tal como lo viste en clase).

### Paso 2: Selectores

Cada vez que quieres **nombrar** un elemento de tu página, pregúntate lo siguiente:

- ¿Debo usar una clase (`class`) o un `id`? ¿Estoy trabajando con algo único o reutilizable?
- ¿Qué nombre debo asignarle a la clase? Sigue la convención componente-forma (`component-shape`).
- ¿Debo separar el diseño en varias clases en lugar de tener una sola clase grande?

Aquí hay un ejemplo de un código CSS **mal**:

```css
#home-page-first-image {
  border-radius: 50%;
}
.home-card {
  text-align: center;
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

Y aquí hay una versión **mejorada** de dicho ejemplo:

```css
.img-circle {
  border-radius: 50%;
}
.text-center {
  text-align: center;
}
.card-white {
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

- Convertir una imagen a circular y centrar texto son **tareas de diseño muy comunes** que merecen tener sus propias clases reutilizables ¡para que no se mezclen con otras clases o ids!
- No te repitas. Trata usar **nombres genéricos de clases**. Considera cada clase CSS como un diseño reutilizable que puedes aplicar en todos lados en tu página web. A los principiantes de CSS se les hace difícil adoptar esta mentalidad.

## Sugerencias y recursos adicionales

### Container

Aquí está la técnica de centrado de div para el contenedor principal:

```css
.container {
  width: 500px;   /* This sets the width */
  margin: 0 auto; /* This automatically sets left/right margins */
}
```
### Lista alineada (inline list)

Para diseñar la lista de iconos tendrás que cambiar el comportamiento de bloque (`block`) de los elementos de las listas y **alinearlos horizontalmente**. Aquí está cómo hacerlo:

```css

.list-inline > li {
  display: inline-block;
  padding: 0px 20px;
}
```

Incluso cuando están alineados, la lista no ordenada `<ul>` tiene un espacio de relleno a la izquierda (`padding-left`) y viñetas que tendrás que sacar para que se vea mejor.

```css
.list-inline {
  list-style: none;
  padding-left: 0px;
}
```

A partir de este ejercicio, **es crucial que uses la herramienta de desarrollo (`inspect`)** para jugar con tu CSS en el navegador y probar las cosas antes de escribir el código.

## ¿Ya terminaste?

Cuando hayas terminado, haz el push del ejercicio y copia el contenido en la carpeta del próximo ejercicio con el siguiente comando:

```bash
# Push to Gihtub
git add .
git commit -m "Added div to my profile page"
git push origin master

# Copy folder into next exercise folder
cp -r profile ../04-Responsive-profile
```
