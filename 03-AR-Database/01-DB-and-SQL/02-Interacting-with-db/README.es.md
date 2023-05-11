## Contexto y Objetivos

`Sqlite` es una base de datos simple que depende de un único archivo. Puedes leer más sobre ello en [en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite).

El objetivo de este ejercicio es usar la línea de comando para leer y hacer consultas de una base de datos de muestra que se llama `jukebox.sqlite` que te daremos.

Para completar el desafío, dibuja el esquema de la base de datos en [db.lewagon.com](http://db.lewagon.com/), guárdalo como archivo XML y ejecuta `rake`!

### Configuracion

Ya deberías tener [SQLite](https://sqlite.org/index.html) instalado en tu computadora. Compruébalo con:

```bash
sqlite3 -version
# You should see your sqlite version here
```

Si no es el caso, vuelve a la sección respectiva de configuración para [macOS](https://github.com/lewagon/setup/blob/master/macos.md#sqlite), [Windows](https://github.com/lewagon/setup/blob/master/windows.md#sqlite) o [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#sqlite).

Puedes abrir la base de datos que te hemos suministrado ejecutando lo siguiente:

```bash
sqlite3 lib/db/jukebox.sqlite
```

Ahora estás en la consola interactiva de sqlite3 y puedes escribir consultas SQL para la base de datos.
Puedes salir de la consola sqlite3 con `.quit` o `CTRL+D`.

## Herramientas

También puedes usar la [extensión SQLite de VS Code](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) para leer la base de datos SQLite, explorar el esquema e incluso **ejecutar consultas SQL**. Debiste haber instalado esta extensión el día de la instalación. Si no la tienes, puedes volver a la sección de configuración para [macOS](https://github.com/lewagon/setup/blob/master/macos.md#vscode_extensions), [Windows](https://github.com/lewagon/setup/blob/master/windows.md#vscode_extensions) o [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#vscode_extensions).

### Extensión SQLite de VS Code - Explorando la base de datos

Existen varios comandos que puedes usar con esta extensión para explorar e interactuar con tu base de datos sqlite. Para comenzar a escribir comandos, recuerda abrir tu paleta de comandos presionando `Cmd / Ctrl` + `Shift` + `p`. Deberías ver un pequeño cuadro de texto en tu editor donde podrás escribir cualquier comando que desees. Para explorar la base de datos, vamos a ejecutar el comando `Open Database` siguiendo estos pasos:

- Abre tu paleta de comandos con `Cmd / Ctrl` + `Shift` + `p`.
- Escribe `SQLite: Open Database`
- Haz clic en la ruta de la base de datos que apunta a tu base de datos

¡Deberías ver la pestaña `SQL EXPLORER` con tu base de datos cargada! ¡Ahora puedes abrir tu base de datos y explorar todas las tablas existentes! También puedes hacer clic en el `triangle icon` para tener una representación más visual de tus tablas 🙌 ¡Pruébalo en la tabla `tracks`!

<iframe src="https://player.vimeo.com/video/690525143?h=75949ff5a2" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Especificaciones

El objetivo de este ejercicio es explorar la base de datos Jukebox y entender su esquema. Responde las siguientes preguntas:

- ¿Cuál es el esquema de base de datos? (e.g. ¿Cuáles son las tablas? y ¿Cuáles son las relaciones entre ellas?)
- Usa la herramienta de diseño SQL para dibujar el esquema de esta base de datos.
- ¿Cuántas filas contiene una tabla? ¿Cuáles son los nombres de las columnas de cada tabla?

Usa [db.lewagon.com](http://db.lewagon.com/) para dibujar el esquema de Jukebox. Guardalo en formato XML como `jukebox.xml` y compruebalo con `rake`.
