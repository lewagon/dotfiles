## Contexto y Objetivos

¡En este primer desafío vamos a seleccionar un elemento del DOM!

### Instala yarn

Ya debes tener Node instalado. Compruébalo con `node -v`.

Más tarde durante la semana también usarás `yarn`, un gestor de dependencias de JavaScript.

Para instalarlo corre el código siguiente en tu Terminal:

```bash
# macOS
brew install yarn
```

<br>

```bash
# Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```


## Especificaciones

Asegúrate de que todas las dependencias para este ejercicio estén instaladas corriendo el siguiente código:

```bash
yarn install
```

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
