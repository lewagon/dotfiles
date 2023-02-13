## Contexto y Objetivos

¡En este primer desafío vamos a seleccionar un elemento del DOM!

### Configuración

Ya debes tener `node` y `yarn` instalados. Compruébalo con:

```bash
node -v
# Debería ver node versión aquí
yarn -v
# Debería ver yarn versión aquí
```

Si no es así, vuelva a la sección dedicada del [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) or [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs) setup.

## Especificaciones

Inicia tu servidor web local corriendo lo siguiente:

```bash
rake webpack
```

Luego abre [`localhost:8080`](http://localhost:8080) en tu navegador favorito.

Deberías ver los países que han ganado las copas mundiales de fútbol FIFA en un lista no ordenada

¡El objetivo del desafío es seleccionar la de Francia `<li>` 🇫🇷!

La manera más fácil y simple es seleccionar un elemento del DOM **con un `id`**.

- Abre el archivo `index.html`. Identifica el elemento que queremos seleccionar y asignale un `id`;
- Abre el archivo `lib/select.js` y escribe el código JavaScript para seleccionar el elemento con id dado y ¡haz que la función lo devuelva (`return`)!

¡Que disfrutes el ejercicio! 🎣

**N.B.:** ¡En este desafío los resultados del test se muestran directamente en el navegador!¡Cuando veas `Congratulations!` puedes hacer el `add`, `commit`, `push` y avanzar al desafío siguiente! También puedes usar `rake` para comprobar tu estilo.
