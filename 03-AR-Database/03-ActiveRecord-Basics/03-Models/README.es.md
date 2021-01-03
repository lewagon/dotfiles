## Contexto y Objetivos

Ahora sabes más sobre el uso de migraciones para actualizar el esquema de la base de datos. Vamos a usar nuestra base de datos para insertar algunas filas y consultarlas. También vamos a seguir trabajando en el clon de Hacker News.

Antes de empezar este ejercicio, asegúrate de leer [la Guía de Inicio de ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html).

## Configuración

Tenemos que crear una nueva base de datos en la carpeta `db` porque estamos en un nuevo ejercicio:

```bash
rake db:create
rake db:migrate
```

Ya te dimos el archivo de migración (ve el archivo `db/migrate` ). ¡Debe coincidir con el que creaste desde cero en el ejercicio anterior!

Asegurate que el esquema esté en el lugar adecuado abriendo el DB con `sqlite3`:

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

## Especificaciones

### 1. Crea la clase modelo

Agrega un modelo de clase para tu tabla `posts` en la carpeta `app/models`.

### 2. Uso del modelo para hacer consultas

Te damos la misma plantilla de aplicación que te dimos el viernes pasado. La puedes correr con el siguiente código:

```bash
ruby app.rb
```

Abre `app/controllers/posts_controller.rb` e implementa los métodos. Recuerda **no** escribir SQL. Solo usa métodos ActiveRecord con tu modelo de clase.
No hay `rake` para testear esta segunda parte del ejercicio, así que tendrás que testear tu aplicación corriendo en la Terminal.

## Puntos clave de aprendizaje

* ¿Qué es un ORM?¿De qué manera te facilita la vida?
* ¿Qué convención de nombre se usa con el mapping de ActiveRecord?¿De dónde sale la magia?
* ¿Te das cuenta de las ventajas de usar ActiveRecord en comparación con escribir todo el SQL tú mismo?
