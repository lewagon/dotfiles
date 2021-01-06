## Contexto y Objetivos

Ya sabes como usar la instancia `SQLite3::Database` para ejecutar (`execute`) consultas SQL en una base de datos SQLite.

```ruby
DB = SQLite3::Database.new("a_file.db")
rows = DB.execute('SELECT * FROM table_name')
# => rows is an Array of records, each record being an Array of columns.
```

Antes de trabajar en el primer objetivo del día, repasemos cómo se hacen consultas a la base de datos. Usaremos la misma base de datos `jukebox` de los ejercicios de ayer.

## Especificaciones

Te hemos preparado un archivo `query.rb` con un método: `all_artists`. Dicho método debe usar el `db` que se pasa como argumento para recuperar todos los registros (todos los campos) de la tabla de artistas.
