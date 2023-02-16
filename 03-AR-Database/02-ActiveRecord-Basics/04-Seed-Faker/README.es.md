## Contexto y Objetivos

Ya que estás familiarizado con migraciones y modelos, es hora de un escenario realista.
¿Cómo compruebas que tu base de datos funciona si no tienes **datos**?
Para hacer eso debemos crear un montón de datos que podamos usar para arrancar nuestra base de datos. Esto se llama `seed`.

## Configuracion

Usaremos la gema [faker](https://github.com/stympy/faker) para generar atributos `Post`.
Pero primero debes instalarla:

```bash
gem install faker
```

Acá está un comando útil para eliminar (`drop`) tu base de datos, crearla (`recreate`) nuevamente, correr la migración (`migrate`) del esquema y alimentarlo con datos (`seed`).
¡Te ahorrará mucho tiempo al construir el `seed` y lo usarás mucho en la semana de proyectos, así que acostúmbrate a él!

```bash
rake db:drop db:create db:migrate db:seed
```
Una vez que hayas terminado con el seed, puedes ver las filas que agregaste con `rake db:seed` usando las consultas SQL que ya conoces:

```bash
sqlite3 db/development.sqlite3
sqlite> .mode columns
sqlite> .headers on
sqlite> SELECT * FROM posts;
```

## Especificaciones

Abre el archivo `db/seeds.rb` y escribe el código necesario para insertar 100 posts usando datos falsos generados por la gema [`faker`](https://github.com/stympy/faker).
Hay un montón de opciones interesantes en Faker, así que deja volar tu imaginación 😊.
¡Puedes verlos [aquí](https://github.com/stympy/faker#contents)!
