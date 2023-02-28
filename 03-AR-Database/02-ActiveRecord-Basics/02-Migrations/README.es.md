## Contexto y Objetivos

- Entender el concepto de migración de **esquema**
- Aprender cómo ejecutar `migrations` en tu base de datos corriendo tareas `rake`.

## Especificaciones

Este ejercicio se enfoca en **migraciones**. Todavía no nos tenemos que ocupar de modelos, así que tendrás que escribir el código de las migraciones para crear el esquema de tu base de datos (recuerda que el esquema es la **estructura** de la base de datos  (DB), e.g. tablas y columnas, y **no datos**). Queremos crear el esquema de base de datos que tendrá el clon de [Hacker News](https://news.ycombinator.com), una página famosa que publica enlaces sobre tecnología y Startups.
Necesitamos una tabla `post` para almacenar los posts (con un título y una URL).

En `db/migrate` hemos creado un archivo `20141025152200_create_posts.rb` que contiene una clase de migración Active Record. Los archivos de migración siempre tienen el siguiente formato: `yyyymmddhhmmss_migration_task_name.rb`. La marca de tiempo (timestamp) en el archivo es muy importante ya que le permite a `rake db:migrate` identificar las migraciones que aún no han sido corridas.

### 1. Migración para crear una tabla

Escribe el código necesario en `20141025152200_create_posts.rb` para crear una tabla `posts`.

Dicha tabla `posts` debe tener las columnas siguientes:

- título:`title` como una cadena de texto (`String`)
- dirección: `url` como una cadena de texto (`String`)
- marcas de tiempo de creación y actualización: `created_at` y `updated_at`

Luego corre la migración con `rake db:migrate`.

Comprueba que tu tabla haya sido creada:

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

¿Ves algo más que tu tabla `posts`? Son cosas de Active Record 😊. ¿Sabes para qué se necesitan?

### 2. Migración para actualizar la tabla

Vuelve a la clase y lee la [Documentación de Migraciones Active Record](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html). Te mostrará lo fácil que es hacer migraciones en Rails. Sin embargo, todavía no hemos trabajado en Rails ;) , así que tendremos que crear nuestros archivos de migración manualmente.

Usa la tarea `rake db:timestamp` para obtener la marca de tiempo (timestamp) adecuada para el nombre de tu archivo de migración. Escribe una nueva migración en un archivo nuevo `db/migrate/`  para agregar una nueva columna a la tabla `posts`.

Nombrala `votes` y haz que sea de tipo entero (`integer`) con el valor predeterminado `0` porque un post de usuario no tiene ningún voto cuando es creado.

¡Recuerda lo que hemos dicho sobre los nombres de los archivos de migración! El formato es **sumamente** importante.

Luego corre la migración con `rake db:migrate`

## Puntos clave de aprendizaje

Hasta ahora debes tener claro que las migraciones están relacionadas a **cambios en la estructura del esquema** (e.g. las tablas y sus columnas).
