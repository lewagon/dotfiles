## Contexto y Objetivos

De vez en cuando te encontrarás con una base de datos con nombres de tablas y columnas que **no siguen** las convenciones de Active Record. Esto significa que la misma no podrá mapear los nombres de los modelos a las tablas automáticamente o claves foráneas (foreign keys) a asociaciones `has_many` / `belongs_to`.

## Especificaciones

- Abre la base de datos `db/dirty_jukebox.db` con el binario `sqlite3` y crea los modelos necesarios en `app/models` navegando por el `.schema` (tal vez sigas sin poder ver los archivos `db` en tu editor de texto por la configuración de sus parámetros. Usa `ls -l db` en la Terminal para comprobar que el archivo esté ahí). Esta vez necesitarás esforzarte más para poder mapear correctamente los modelos a las tablas adecuadas.
- Para algunas de las relaciones `has_many` / `belongs_to`, notarás que las claves foráneas (foreign keys) no siguen la convención. Tendrás que sobreescribirlas (override) manualmente para resolver esto.

## Sugerencias adicionales

- Lée cómo [sobreescribir convenciones de nombres](http://guides.rubyonrails.org/active_record_basics.html)
- Investiga sobre el uso de claves foráneas [`foreign_key` usages](http://guides.rubyonrails.org/association_basics.html).
