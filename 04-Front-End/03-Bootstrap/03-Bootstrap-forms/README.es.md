## Contexto y Objetivos

Crear un [formulario receptivo](https://lewagon.github.io/bootstrap-challenges/10-Login-form/).

**⚠️ Antes de empezar, lee todas las instrucciones detalladamente. ⚠️**.
Los formularios se encuentran entre los componentes más importantes de una página web, así que debes saber cómo crearlos.

## La técnica offset del grid

El mejor truco para hacer que un formulario sea receptivo es inyectarlo en un grid Bootstrap en una fila que tiene la clase de alineación `justify-content-center`. **Recuerda** que cada `.row` es un flexbox y que podemos usar los mismos trucos de alineación que hemos usado cuando hemos trabajado con flexbox para hacer que nuestros formularios sean receptivos.

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 col-sm-4">
      <form action="">
        <!-- Your form content -->
      </form>
    </div>
  </div>
</div>
```

- El formulario se verá en pantalla completa (full screen) en dispositivos móviles (mobile).
- En tablets y dispositivos más grandes, se verá centrado (gracias a la clase de alineación `justify-content-center`) y tomará 33% de la pantalla.
- Puedes hacerlo aún más receptivo si así lo deseas (pantalla completa en dispositivo móvil, media pantalla centrado en tablet y 33% de la pantalla centrado en laptop, etc.).

## Formulario HTML

Un formulario HTML (`<form>`) se compone de líneas de entrada `<input>` e.g. cada campo del formulario. Cada entrada puede tener una etiqueta (`<label>`) asociada o no. El botón (button) para enviar el formulario también es una entrada y es de tipo `type="submit"`. Aquí hay una muestra de cómo se ve un formulario:

```html
<form action="#">
  <label for="your-email">Your email</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="Sign In">
</form>
```

1.- Hay muchos tipos de entradas (`<input>`). Por ejemplo, `type="text"`, `type="email"`, `type="date"`, entre otras.
2.- El marcador (`placeholder`) es un texto de ejemplo que desaparece cuando el/la usuario/a empieza a escribir.
3.- La etiqueta `for="something"` estará enlazada con la entrada que tenga `id="something"`. Enlazar etiquetas y entradas de datos no se hace por ocio. Esto te permite hacer clic en cualquier sitio de una línea dada para hacer que el cursor salte a una entrada de datos asociada (en lugar de hacer clic en el cuadro de texto). ¡Esto ofrece una mejor experiencia de usuario (UX)!
4.- El atributo `value` nos da el texto que se muestra en el botón de envío (submit).

Las listas desplegables (drop-down) son diferentes. **Tienen su propias etiquetas `<select>` y `<option>` para cada opción de la lista**. Su HTML luce de la siguiente manera:

```html
<label for="favorite">What's your favorite language?</label>
<select id="favorite" name="language">
  <option value="ruby">Ruby</option>
  <option value="css">CSS</option>
  <option value="javascript">Javascript</option>
</select>
```

## Clases Bootstrap para formularios

Hablemos de las clases Bootstrap para formularios:

- `.form-control` diseña cada `<input>` o `<select>` excepto el botón de envío (submit button).
- `.form-group` agrupa cada `<input>` o `<select>` con sus etiquetas (`<label>`) asociadas.

Aquí está un ejemplo de un formulario Bootstrap **con etiquetas**:

```html
<form action="#">
  <div class="form-group">
    <label for="email">Your email</label>
    <input type="email" id="email" class="form-control">
  </div>
  <div class="form-group">
    <label for="password">Your password</label>
    <input type="password" id="password" class="form-control">
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Aquí está otro ejemplo. Este **no tiene etiquetas**:

```html
<form action="#">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Ahora, si buscas un [formulario alineado (inline)](https://getbootstrap.com/docs/4.2/components/forms/#inline-forms), puedes  **agregar la clase `.form-inline` al  `<form>`** (igual que la clase `.list-inline` para una lista `<ul>`):

```html
<form action="#" class="form-inline">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

## Inyección de un `.form-row` en un formulario

También se puede inyectar una fila (row) dentro de un formulario usando las clase `.form-row`. Aquí hay un ejemplo para tener 2 entradas (`input`) en la misma fila:

```html
<form>
  <div class="form-row">
    <div class="col-6 form-group">
      <label>First name</label>
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col-6 form-group">
      <label>Last name</label>
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>
  <!-- rest of the form below -->
</form>
```

## Tu turno

- Ahora te toca crear un [formulario receptivo de registro (a signup form)](http://lewagon.github.io/bootstrap-challenges/10-Login-form/).
- Intenta personalizar un poco tu diseño en  `components/form.css`

N.B.: ¡no olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r`) para limpiar el caché en caso de que tu página no muestre el código más reciente!
