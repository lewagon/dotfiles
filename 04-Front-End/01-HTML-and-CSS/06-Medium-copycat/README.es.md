## Contexto y Objetivos

¡Vamos a diseñar un [artículo Medium](https://lewagon.github.io/medium-copycat/) y a subirlo con GitHub pages!

## Configuración

Primero, debemos crear todos los archivo/carpetas que vayamos a necesitar:

```bash
mkdir medium-article
touch medium-article/index.html
touch medium-article/style.css
```

Esta vez no será necesario crear una carpeta de imágenes ya que vamos a usar marcadores (placeholders) de [Unsplash](https://source.unsplash.com/).

## Especificaciones

Un artículo Medium luce [como este](https://medium.com/le-wagon/from-bootstrapping-to-building-a-brand-that-scales-26b0eda92ddb). Vamos a codear una [versión simplificada](https://lewagon.github.io/medium-copycat/).

Antes de que empieces a escribir el código, analiza la estructura de la página y piensa en los diversos elementos que la conforman. Piensa en la variedad de clases que necesitarás y, mejor aún, dibuja un esquema del HTML en papel (te ayudará en la escritura del código). Estos son los elementos que necesitarás:
- Un banner con una imagen de fondo, un título y una descripción.
- Un contenedor (container) centrado (con márgenes izquierdo y derechos automáticos) para el contenido del artículo.
- Dentro de dicho contenedor: títulos (headers), párrafos (paragraphs) y enlaces (links).
- También: contenedor receptivo + efecto hover en los enlaces.

## Sugerencias y recursos adicionales

- Inspecciona los enlaces en el [ejemplo Medium](https://lewagon.github.io/medium-copycat/) => ¿Ves cómo el css cambia con el `hover` (`background-image: linear-gradient ...`)?
- Agrega un `linear-gradient` en `a` y uno más oscuro en `a:hover` para reproducir esos enlaces tan elegantes.

### Contenedor

- Centralo con `width` y `margin: 50px auto`
- El contenedor aún no es receptivo:
  - Reemplaza `width` por `max-width` (solución rápida pero pobre).
  - Agrega media queries (buena solución).

Aquí hay un ejemplo de cómo cambiarías el tamaño de un contenedor en cualquier pantalla de 992px de ancho o inferior:

```css
/* Media queries */
@media(max-width: 992px) {
  .container {
    width: 700px;
  }
}
```

Asegurate de ajustar el tamaño del contenedor para todos los demás tamaños (`576px`, `768px`, `992px` and `1200px`).

## Opcional - Push a GitHub pages

¡Si quieres también puedes pushear el artículo Medium a GitHub Pages! Si decides hacerlo, necesitarás copiar tu trabajo nuevamente en una carpeta **fuera** de fullstack challenges para que podamos hacerle seguimiento con git como un proyecto aparte.

```bash
cp -r ./medium-article ~/code/<user.github_nickname>/medium-article
cd ~/code/<user.github_nickname>/medium-article

git init
git add index.html style.css
git commit -m "My medium copycat"
gh repo create --public --source=.
git push
gh repo view --web
```

Ahora creemos la rama mágica `gh-pages`:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Ve a `http://<user.github_nickname>.github.io/medium-article/` para ver tu copia de un artículo Medium en línea!
