## Configuración

Queremos hacer los últimos ajustes en la página de nuestro perfil. Si todavía no has copiado el archivo del ejercicio anterior, hazlo ahora. Copia el perfil en la carpeta de este ejercicio y agregale un archivo CSS.

```bash
cp -r ../03-Finishing-profile-design/profile .
```

## Contexto y Objetivos

## Hacer que la página sea receptiva usando media queries

Tu perfil está completo pero ¿qué pasa si cambias el tamaño de la pantalla y la pones más pequeña? Tu página aún no es **receptiva** 😱.

Si quieres un diseño receptivo debes agregar media queries en tu CSS. Para ello debes tener la línea siguiente en el `<head>` de tu html 👇

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Esto le permite a tu página detectar el ancho del dispositivo que estás usando.

Los media queries funcionan como una declaración condicional `if` en Ruby. Básicamente **puedes definir reglas CSS que solo aplican si la pantalla es más pequeña que un ancho determinado**. Por ejemplo, si quieres un contenedor (conteiner) receptivo, puedes crearlo de la siguiente manera:

```css
@media (max-width: 960px) {
  /* For a screen < 960px, this CSS will be read */
  .container {
    width: 700px;
  }
}
@media (max-width: 720px) {
  /* For a screen < 720px, this CSS will be read */
  .container {
    width: 500px;
  }
}
@media (max-width: 540px) {
  /* For a screen < 540px, this CSS will be read */
  .container {
    width: 300px;
  }
}
```
Ahora intenta cambiar el tamaño de tu pantalla para entender cómo funcionan los media queries.

### ⚠️⚠️⚠️ Cuidado con el orden de los media queries ⚠️⚠️⚠️

¡Tal como con las declaraciones `if`en Ruby, el orden es importante! Si varias condiciones son verdad `true`, las última regla CSS será aplicada.
