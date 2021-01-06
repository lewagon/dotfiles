## Contexto y  Objetivos

La ventaja de usar WeChat es la información (datos) de sus usuarios ...¿Por qué no tomaríamos ventaja de eso permitiéndole a los usuarios que inicien sesión **login**?

## Especificaciones

### 1. Obtención de datos que valen oro

Cambia tu **botón de página de inicio** para convertirlo en inicio de sesión (Login)!

- agrega un **open-type** de `getUserInfo` y un handler **bindgetuserinfo**.
- Necesitarás la [documentación](https://developers.weixin.qq.com/miniprogram/en/dev/component/button.html)...

Crea la función `getUserInfo` y haz console.log del parámetro de su evento 😉.

### 2. ¡Úsalo!

**Persiste** estos datos de usuario globalmente usando el globalData de tu App o el almacenamiento caché.

**¡Mejora la experiencia de usuario!** 🏗️

- Muestra el avatar de tu usuario/a en alguna parte de tu app
- Completa parcialmente el nombre de la entrada (input) o inclusive lo puedes ocultar.
