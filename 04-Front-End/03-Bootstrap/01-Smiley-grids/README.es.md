## Contexto y Objetivos

Practicar el grid de bootstrap. Aprender a crear varios grids con diversos comportamientos receptivos.

## Especificaciones

Aquí están [los grid Smiley](http://lewagon.github.io/bootstrap-challenges/01-New-Bootstrap-grid/) que debes reproducir en este desafío. Todos estos 3 grids tienen el mismo punto de partida:

```html
<div class="container">
  <div class="row">
    <!-- Different variants depending on responsive behavior -->
  </div>
</div>
```

Luego, deberás agregar diversos `.col-??-??` dentro de los `.row` dependiendo del comportamiento que desees.

⚠️ **No rompas el grid**

NO agregues clases del grid de Bootstrap al mismo nivel que el CSS.

```html
<div class="container">
  <div class="row">
    <!-- 👎 -->
    <div class="card bg-light col-6">
      😀
    </div>
  </div>
</div>
```

En lugar de hacer eso puedes crear un grid alrededor del contenido e insertarlo de esta manera:


```html
<div class="container">
  <div class="row">
    <!-- 👍 -->
    <div class="col-6">
      <div class="card bg-light">
        😀
      </div>
    </div>
  </div>
</div>
```

## Sugerencias y recursos adicionales

- Cuando crees grids, siempre empieza con la clase `.col` para la resolución más pequeña. Pregúntate qué proporción quieres en dispositivos móviles. ¿Pantalla completa (full screen: `.col-12`)?¿Media pantalla (half screen: `.col-6`?¿25% de pantalla (`.col-3`)?
- Luego continúa con la siguiente resolución (`sm`) y repite el mismo proceso de reflexión 🤔. Y así sucesivamente hasta que llegues a `xl`.
- No estás obligado/a a escribir todas las clases  `sm/md/lg/xl`. Si no las escribes todas, siempre la clase precedente es la que aplica. Por ejemplo, un `<div class="col-12 col-lg-6">` será pantalla completa (full screen) en dispositivos con tamaños entre móvil (mobile) y laptop/notebook y luego media pantalla en rangos desde laptop/notebook a pantallas más grandes como las de las computadoras de escritorio (desktop).

N.B.: ¡no olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r`) para limpiar el caché en caso de que tu página no muestre el código más reciente!
