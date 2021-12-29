## Contexto y Objetivos

A veces querrás trabajar con la base de datos de un proyecto existente. Para manipular esos datos tendrás que escribir el código Ruby adecuado usando Active Record en lugar de escribir consultas SQL.

## Especificaciones

- Abre la base de datos `db/jukebox.db` con el binario `sqlite3` y crea todos los modelos necesarios en `app/models` navegando por el `.schema` (tal vez no veas los archivos `.db` ya que los parámetros predeterminados de tu editor de texto los mantienen ocultos. Sin embargo, puedes comprobar que el archivo realmente esté ahí usando `ls -l db` en la Terminal). **No** corras los tests antes de haber creado los modelos con las relaciones `has_many` y `belongs_to` considerando las claves foráneas (foreign keys) del esquema. Las especificaciones te darán demasiadas pistas.
- Una vez que los modelos hayan sido creados, agrega algunos métodos y validaciones.
- Abre el archivo `app/queries.rb` y recupera los resultados relevantes de la base de datos con consultas Active Record (¡no se permiten consultas SQL!).

## Sugerencias adicionales

Te recomendamos leer atentamente la guía para recuperar datos de la base de datos usando consultas Active Record [Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html).
