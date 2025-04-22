## Contexto y Objetivos

Construir [un panel de actividad reciente (activity feed)](http://lewagon.github.io/html-css-challenges/13-activity-feed/) similar al de Dribbble.

1. Crea el componente CSS de tu `avatar`.
2. Implementa tus pestañas (tabs) en `tabs.css` y tu diseño de notificación en `notification.css`.

Pero primero ¡**lee todas las instrucciones**!

## Diseño de pestañas (tabs)

Las pestañas (tabs) son muy fáciles de diseñar. El código HTML es así:

```html
<div class="tabs">
  <a href="#" class="tab active">Traveling</a>
  <a href="#" class="tab">Hosting</a>
</div>
```

Una vez que esto esté listo:

- Convierte a `.tabs` en un flexbox.
- Agrega algo de espacio de relleno (`padding`) a cada `.tab`.
- Ni siquiera necesitas `space-between` o `align-items` aquí porque las pestañas (tabs) ya tienen la misma altura (`height`).
- También puedes diseñar los estados de las pestañas (tabs) **active** y **hover** usando `.tab:active` y `.tab:hover`. Tal vez debas jugar con la opacidad (`opacity`) y con el borde inferior (`border-bottom`)😬.

## Diseño de notificación

Para el diseño de `.notification` ¡debes **regresar a las diapositivas de la clase!**. Este es un caso clásico de uso de flexbox con el cuerpo de la notificación empujando a los otros items gracias a la propiedad `flex-grow`.

Una vez que esto esté hecho, solo debes hacer ajustes de margen (`margin`) y espacio de relleno (`padding`) y jugar con las fuentes y colores.

Bueno, ¿qué esperas? ¡Es hora de hacer este panel de actividad (activity feed)!🚀🚀

## [Consejo adicional] sobre el uso de imágenes

Para las imágenes de los usuarios de tu panel de actividad (activity feed) puedes usar un servicio de marcador (placeholder) que hemos construido para obtener las imágenes de cualquier usuario de Kitt por medio de su apodo (nickname) en GitHub. Solo usa este URL: `https://kitt.lewagon.com/placeholder/users/<user.github_nickname>` y pruébalo haciendo algunos cambios.

## [Consejo adicional] sobre selectores de primer y último hijo (first & last child)

Puedes seleccionar la primera (o la última notificación) con los siguientes selectores:

```css
.notification:first-child {
  /* CSS code for the first element with class="notification" */
}
.notification:last-child {
  /* CSS code for the last element with class="notification" */
}
```

¡También puede ser útil deshacerse del borde inferior (`border-bottom`) de la última notificación del panel de actividad (activity feed)!

N.B.: ¡no olvides hacer el **hard refresh** (forzar la actualización de la página) en tu navegador (`cmd + shift + r`) para limpiar el caché en caso de que tu página no muestre el código más reciente!
