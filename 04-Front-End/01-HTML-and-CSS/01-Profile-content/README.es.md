## Contexto y Objetivos

Este es un desafío simple para manipular etiquetas (tags) HTML y crear una card (tarjeta) de tu perfil con títulos, listas e imágenes.

## Configuración

Ve a tu perfil (`profile`) y crea un directorio de imagenes (`images`) para almacenarlas.

```bash
cd profile
mkdir images
code .
```

## Servidor local

Puedes comenzar desde un servidor web local escribiendo el comando siguiente en tu Terminal (simplemente asegúrate que estés en la carpeta de este ejercicio):

```bash
serve
```

(ha sido definido en un [alias](https://github.com/lewagon/dotfiles/blob/f894306fd81502f1fe513dd253e3129f4b56874d/aliases#L7)).

- Ahora puedes ver los archivos en [http://localhost:8000](http://localhost:8000)
- ⚠️ Los navegadores modernos guardan el **archivo** devuelto por un **url** dado en memoria caché. ¡Esto mantiene en memoria caché una versión de tu HTML (`http://localhost:8000`), de tu CSS (`http://localhost:8000/style.css`) e inclusive de tus imágenes (`http://localhost:8000/images/logo.png`)! Sin embargo, algunas veces se mantiene la versión anterior sin que la última sea considerada. Para arreglar esto, presiona `cmd + shift + r` para forzar la actualización (hacer un **hard refresh**) de la página (esto limpia el caché en el proceso)👌.

## Especificaciones

Crea una página simple de tu perfil HTML con los siguientes elementos (utiliza las etiquetas (tags adecuadas):

- Una foto tuya
- Un título/encabezado principal y un subtítulo para tu nombre y tu puesto de trabajo (ya puedes poner que eres programador/a 💻)
- Una descripción personal
- Un botón
- Una lista de enlaces a tus redes sociales

Como una imagen vale más que mil palabras, [aquí está lo que debes crear en este desafío](https://lewagon.github.io/html-css-challenges/01-profile-content-new/).

## Sugerencias y recursos adicionales

### Usar fotos **buenas**

Prepara el archivo de tu foto de perfil antes de comenzar a escribir código. Para este ejercicio puedes usar **tu foto de perfil de Facebook** y guardarla en la carpeta `images`.

### Consejos sobre HTML

- No olvides poner las etiquetas básicas de la estructura: `<html>`, `<body>`, `<head>`.
- Tampoco olvides poner el nombre (`<title>`) de la página en la sección `<head>` ni otras metaetiquetas (metatags) como `<meta charset="utf-8">`.
- Puedes usar [Font Awesome](https://fontawesome.com/icons) para agregar iconos interesantes e.g. redes sociales. Font Awesome es una librería muy interesante porque todos los iconos son **fuentes**. ¡Esto significa que puedes cambiar los tamaños y colores de los iconos fácilmente e inclusive agregarles animaciones! Para importar Font Awesome, solo debes agregar el siguiente enlace a tu `<head>`:

```html
<!-- Fontawesome Stylesheet -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">
```

- Puedes usar el atributo `target="_blank"` para que abran en una nueva página al hacer clic sobre ellos.

## Tabular o morir

**Tomate el tiempo necesario para tabular (también conocido como sangrar o indentar) tu código HTML cuidadosamente**. El código HTML está muy anidado, mucho más que Ruby. ¡Si no lo tabulas tu código será un desastre!

¿Cuál de los dos códigos es más fácil de entender?

¿Este?

```html
<ul>
    <li><a href="#">
        <i class="fab fa-facebook-f"></i> Facebook
  </a>
</li><li>
  <a href="#">
    <i class="fab fa-linkedin-in"></i> Linkedin
      </a></li>
<li>  <a href="#">
  <i class="fab fa-twitter"></i> Twitter
    </a>
  </li>
    </ul>
```

¿O este otro?

```html
<ul>
  <li>
    <a href="#">
      <i class="fab fa-facebook-f"></i> Facebook
    </a>
  </li>
  <li>
    <a href="#">
      <i class="fab fa-linkedin-in"></i> Linkedin
    </a>
  </li>
  <li>
    <a href="#">
      <i class="fab fa-twitter"></i> Twitter
    </a>
  </li>
</ul>
```
¡Tabula tu HTML! Tu código debe verse como una [formación de patos volando en V](https://upload.wikimedia.org/wikipedia/commons/0/0b/Eurasian_Cranes_migrating_to_Meyghan_Salt_Lake.jpg) 🦆🦆🦆!

## ¿Ya terminaste?

Cuando hayas terminado puedes hacer el push del ejercicio y copiar el contenido en la carpeta del próximo ejercicio con el comando siguiente:


```bash
# Push to gihtub
git add .
git commit -m "Added content to my profile page"
git push origin master

# Copy folder into next exercise folder
cp -r ../profile ../../02-Fonts-and-colors
```
