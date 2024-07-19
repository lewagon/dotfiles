## Antecedentes y Objetivos

Ahora que estás familiarizado con las migraciones y los modelos, es hora de un escenario de la vida real. ¿Cómo pruebas si tu base de datos funciona, si no tienes ningún **dato**? Para hacer esto, necesitamos crear un montón de datos que podamos usar para arrancar nuestra base de datos. Se llama una `semilla`.

### Sembrando tu base de datos

Para agregar algunos datos después de crear una base de datos, puedes comenzar llenando el archivo `db/seeds.rb` con algunos comandos de Ruby que te gustaría ejecutar. Por ejemplo, si deseas crear 3 publicaciones:

```ruby
# db/seeds.rb
Post.create(title: "Mi primera publicación", url: "https://www.blog.com/mi-primera-publicacion", votos: 13)
Post.create(title: "Mi segunda publicación", url: "https://www.blog.com/mi-segunda-publicacion", votos: 42)
Post.create(title: "Mi tercera publicación", url: "https://www.blog.com/mi-tercera-publicacion", votos: 128)
```

O si deseas crear 10:

```ruby
# db/seeds.rb
10.times do |i|
  Post.create(title: "Mi publicación número #{i}")
end
```

Luego puedes ejecutar este archivo en tu terminal:

```bash
rake db:seed
```

### Falsificación de datos

Cuando siembras datos en tu base de datos, es posible que desees que parezca datos de usuario reales sin la molestia de encontrar inspiración y escribirlo tú mismo. En este caso, puedes usar la gema [faker](https://github.com/stympy/faker) para generar datos falsos. Vamos a instalarlo:

```bash
gem install faker
```

Luego puedes usarlo en tu archivo `db/seeds.rb`:

```ruby
# db/seeds.rb
require "faker"

Post.create(title: Faker::Music.band, url: Faker::Sports::Football.player, votos: 2)
```

Explora la [documentación de la gema faker](https://github.com/faker-ruby/faker) para encontrar módulos adecuados para generar datos que parezcan reales.

### Restableciendo tu base de datos

Aquí tienes un comando útil para `eliminar` tu base de datos, `recrearla`, `migrar` el esquema y `sembrarla`. Te ahorrará mucho tiempo al construir tu semilla, y lo usarás mucho en las semanas de proyecto, ¡así que acostúmbrate!

```bash
rake db:drop db:create db:migrate db:seed
```

Una vez que hayas restablecido tu base de datos, puedes consultar tu base de datos en una `consola rake`, por ejemplo, con:

```ruby
Post.all
```

## Especificaciones

Abre el archivo `db/seeds.rb` y escribe algo de código para insertar 100 publicaciones, utilizando datos falsos generados por la gema [`faker`](https://github.com/stympy/faker). Hay un montón de divertidas opciones de faker allí, ¡así que sé creativo 😊! Echa un vistazo [aquí](https://github.com/stympy/faker#faker)!
