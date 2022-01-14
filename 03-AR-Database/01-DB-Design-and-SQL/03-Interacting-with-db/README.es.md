## Contexto y Objetivos

`Sqlite` es una base de datos simple que depende de un único archivo. Puedes leer más sobre ello en [en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite).

El objetivo de este primer ejercicio es usar la línea de comando para leer y hacer consultas de una base de datos de muestra que se llama `jukebox.sqlite` que te daremos.

### Configuracion

Primero comprueba que tienes sqlite3 instalado en tu computadora:

```bash
sqlite3 --version
```

Si no es el caso, la puedes instalar corriendo el siguiente código:

- macOS: `brew install sqlite`
- Ubuntu: `sudo apt-get install sqlite3 libsqlite3-dev`

Puedes abrir la base de datos que te hemos suministrado para hacer algunas consultas en ella:

```bash
sqlite3 lib/db/jukebox.sqlite
```

Ahora estás en la consola interactiva de sqlite3 y puedes escribir consultas SQL para la base de datos.
Puedes salir de la consola sqlite3 con `.quit` o `CTRL+D`.

## Herramientas

También puedes usar una aplicación **SQLite viewer** para leer la base de datos SQLite, explorar el esquema e inclusive **correr consultas SQL**.

- [SQLite Pro (solo para macOS. Es paga pero parece que no hay restricciones para probarlo](https://www.sqlitepro.com/)
- [SQLStudio (Gratis)](http://sqlitestudio.pl/)
- [SQLite Browser (Gratis)](http://sqlitebrowser.org/)

### Windows

Copia los siguientes comandos en tu Terminal Ubuntu línea por línea:
```bash
sudo apt update
sudo apt install -y sqlitebrowser
echo "export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0" >> ~/.zshrc
source ~/.zshrc
```

Instala [Xming](https://sourceforge.net/projects/xming/) (Deseleciona `Start Xming` al final de la instalación).

Arranca XLaunch dejando los ajustes predeterminados pero **agrega el siguiente parámetro opcional** `-ac`.

![xlaunch](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/xlaunch.jpg)

Puedes abrir tu base de datos (DB) con lo siguiente:
```bash
cd ~/code/your-github-username/fullstack-challenges/03-AR-Database/01-DB-Design-and-SQL/03-Interacting-with-db
sqlitebrowser lib/db/jukebox.sqlite
```

Si te aparece el error `could no initialize SDL` al abrir tu base de datos (DB) necesitas agregar una excepción para Windows Defender para permitir tráfico público de entrada Xming en protocolos UDP y TCP. Puedes guiarte con las siguiente [documentación](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/create-an-inbound-port-rule).



❓ ¿Debo usar la línea de comando `sqlite3` o alguna de las herramientas visuales anteriores?¡Bueno, ambas son útiles! Es bueno aprender un poco sobre cómo manipular líneas de comando por dos razones. Por un lado, una [CLI](https://en.wikipedia.org/wiki/Command-line_interface) te permite concentrarte en consultas SQL. Por otro lado, una herramienta [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) será util para explorar la estructura del esquema de una base de datos (tablas, columnas, etc.).¡Te recomendamos probar las dos opciones!

## Especificaciones

El objetivo de este ejercicio es explorar la base de datos Jukebox y entender su esquema. Responde las siguientes preguntas:

- ¿Cuál es el esquema de base de datos? (e.g. ¿Qué son las tablas? y ¿Cuáles son las relaciones entre ellas?)
- Usa la herramienta de diseño SQL para dibujar el esquema de esta base de datos.
- ¿Cuántas filas contiene una tabla?¿Cuáles son los nombres de las columnas de cada tabla?

Usa [db.lewagon.com](http://db.lewagon.com/) para dibujar el esquema de Jukebox. Guardalo en formato XML como `jukebox.xml` y compruebalo con `rake`.
