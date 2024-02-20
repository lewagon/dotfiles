## Contexto y Objetivos

Ahora es el momento de utilizar código Ruby para interactuar con la base de datos `jukebox` del ejercicio anterior. El objetivo de este ejercicio es comunicarse con la base de datos **desde nuestro código Ruby**.

En este ejercicio trabajarás en un archivo Ruby llamado `lib/queries.rb`, donde tendrás que completar varios métodos que recopilen datos específicos de la base de datos.

## Especificaciones

👉 **IMPORTANTE**: cada método toma un argumento `db` el cual es una instancia de `SQLite3::Database` de donde puedes llamar al método `execute`. Este `db` es **creado por el test y pasado al método**. No hay necesidad de que crees uno para satisfacer a `rake`. Tu método se vera de la siguiente manera:

```ruby
def the_method(db)
  results = db.execute("YOUR SQL QUERY")
  # results in an Array (rows) of Array (columns)
  p results  # Inspect what you get back! Don't guess!

  # Then you'll need to return something.
  return ?
end
```

👉 Sin embardo, es importante que pruebes tu código. Para probar tu código con `irb` (o en el archivo `lib/queries.rb`) deberás crear la instancia de `db` tú mismo/a/x.

```ruby
# ➜ 03-Interacting-with-code git:(master) ✗  irb
require "sqlite3"
DB = SQLite3::Database.new("lib/db/jukebox.sqlite")
rows = DB.execute("SELECT * FROM artists LIMIT 3")
# => [[1, "AC/DC"], [2, "Accept"], [3, "Aerosmith"]]
```

Si has añadido el código anterior a tu archivo `lib/queries.rb` y ahora quieres probar tu código desde `irb`, puedes importar y llamar a tus métodos de consulta con lo siguiente:

```ruby
require_relative "lib/queries"
artist_count(DB)
# => [...]
```

Si ejecutas tu código solo desde `lib/queries.rb`, puedes llamar a tus métodos y utilizar `puts` o `p` para ver los resultados como de costumbre **después** de instanciar tu variable `DB` según se describe anteriormente.

## Especificaciones

Abre el archivo `lib/queries.rb` para responder las siguientes preguntas. No olvides que puedes ver el interior de la base de datos corriendo `sqlite3 lib/db/jukebox.sqlite` en la Terminal o usando la VS Code SQLite Extension que se menciona en el ejercicio previo.

Estos son los seis métodos que hay que implementar:

-¿Cuántas filas contiene la tabla `artists`?
-¿Cuántas filas contiene cada tabla (método genérico)?

- Devuelve la lista de todos los artistas y ordenarlos por nombre (alfabéticamente). **Pista:** Usa el filtro SQL `ORDER BY`.
- Encuentra todas las canciones de amor (e.g. las canciones que contienen la palabra "love" **en algun lado** de sus nombres. **Pista:** Usa las palabras SQL clave `WHERE` y `LIKE`.
- Devuelve todas las canciones cuyas duraciones son mayores a un número dado y ordenalas. **Pista:** puedes usar el operador de comparación `>` en SQL.
- Devuelve una lista de cada artista con el número de álbumes que tengan, en óden alfabético. **Pista:** tendrás que hacer un `JOIN` a dos tablas y además usar un `GROUP BY` y `ORDER BY`.

## Tips

Las consultas SQL suelen ser bastante largas, particularmente cuando comienzas a usar `WHERE` y `JOIN`. En Ruby, puedes usar la sintaxis [HEREDOC](https://zaiste.net/heredoc_in_ruby/) para escribir cadenas de texto (strings) de **multiples líneas**:

```ruby
# Find the first 3 artists with the letter `Z` in their name.
query = <<-SQL
  SELECT * FROM artists
  WHERE name LIKE "%Z%"
  ORDER BY name
  LIMIT 3
SQL
rows = db.execute(query)
```

¡Te darás cuenta de que tu editor de texto entiende Heredoc y la sintaxis resaltada es realmente SQL dentro del archivo Ruby!

## Recursos

- [Comandos SQL](https://www.codecademy.com/article/sql-commands)
- [Curso en 🇫🇷 sobre `SELECT`](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)

## Extensión SQLite de VS Code - Ejecución de queries

Esta vez ejecutaremos el comando `SQLite: New Query` Para hacerlo, sigue estos pasos:

- Abre tu paleta de comandos con `Cmd / Ctrl` + `Shift` + `p`.
- Escribe `SQLite: New Query`
- Escribe tu consulta en el archivo `.sql` abierto
- Una vez que tu consulta esté lista, abre tu paleta de comandos nuevamente y escribe `SQLite: Run Query`
- Selecciona la base de datos donde desees ejecutar tu consulta

¡Y eso es todo! ¡Deberías poder ver tus resultados!

<iframe src="https://player.vimeo.com/video/690525239?h=ca70e032e8" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

👉 Encontrarás más información sobre la extensión SQLite de VS Code en nuestra [hoja de apuntes respectiva](https://kitt.lewagon.com/knowledge/cheatsheets/vs_code_sqlite_extension).
