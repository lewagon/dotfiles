## Contexto y Objetivos

Es hora de usar código Ruby para interactuar con la base de datos `jukebox`. Para ello necesitamos la gema [sqlite3](http://rubygems.org/gems/sqlite3).

Corre el siguiente código en tu Terminal  para instalarla en tu computadora:

```bash
gem install sqlite3
```

El objetivo de este desafío es hablar con la base de datos **por medio de código Ruby**.

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

👉 Para probar tu código con `irb` (o en el archivo  `lib/queries.rb`) deberás crear `db` tú mismo/a.

```ruby
# ➜ 03-Interacting-with-code git:(master) ✗  irb
require "sqlite3"
db = SQLite3::Database.new("lib/db/jukebox.sqlite")
rows = db.execute("SELECT * FROM artists LIMIT 3")
# => [[1, "AC/DC"], [2, "Accept"], [3, "Aerosmith"]]
```

Abre el archivo  `lib/queries.rb` para responder las siguientes preguntas:

No olvides que puedes ver el interior de la base de datos corriendo`sqlite3 lib/db/jukebox.sqlite` en la Terminal o usando algunas de las herramientas que se mencionaron en el ejercicio anterior (SQLite Pro, SQLStudio o SQLite Browser).

Estos son los cinco métodos que hay que implementar:

-¿Cuántas filas contiene la tabla `artists`?
-¿Cuántas filas contiene cada tabla (método genérico)?
- Devuelve la lista de todos los artistas y ordenarlos por nombre (alfabéticamente). **Pista:** Usa el filtro SQL `ORDER BY`.
- Encuentra todas las canciones de amor (e.g. las canciones que contienen la palabra "love" **en algun lado** de sus nombres. **Pista:** Usa las palabras SQL clave `WHERE` y `LIKE`.
- Devuelve todas las canciones cuyas duraciones son mayores a un número dado y ordenalas. **Pista:** puedes usar el operador de comparación `>` en SQL.

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

¡Te darás cuenta que Sublime Text entiende Heredoc y la sintaxis resaltada es realmente SQL dentro del archivo Ruby!

## Recursos

* [Comandos SQL](http://www.sqlcommands.net/)
* [Curso en 🇫🇷 sobre `SELECT`](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)

## Herramientas

Ya las conociste en el ejercicio anterior.¡Usalas!

- [SQLite Pro (solo para macOS. Es paga pero parece que no hay restricciones para probarlo](https://www.sqlitepro.com/)
- [SQLStudio (Gratis)](http://sqlitestudio.pl/)
- [SQLite Browser (Gratis)](http://sqlitebrowser.org/)
