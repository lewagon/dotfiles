## Contexto y Objetivos

Nuevamente asume que tu clase `Post` tiene acceso a una variable global `DB` definida de la siguiente manera:

```ruby
DB = SQLite3::Database.new("a_file.db")
```

Aún puedes seguir usando el archivo `test.rb`  para testear tus métodos.

## Especificaciones

En este ejercicio nos concentraremos en crear: **C**reate y actualizar: **U**pdate (la `C` y la `U` en `CRUD`)¿Por qué estamos haciendo la `C` y la `U` al mismo tiempo? La razón es la semejanza entre los dos procesos. Por ejemplo. si llamamos a `save` sobre algo que no existe aún en nuestra base de datos (DB), ese algo será creado (**C**reated). Y si ya existe, pues simplemente será actualizado (**U**pdated).

### `save`

Implementa un método de **instancia** (responde: ¿por qué un método de instancia y no un método de clase como `Post.find`?) `save` el cual creará o actualizará una fila dada en la base de datos.

```ruby
post = Post.new(title: "Awesome article")
post.id
# => nil (the post is not persisted yet)
post.save  # TODO: persist the record!
post.id
# => 1 (expected result, the database has inserted a row, store the id in memory)

post.title = "Awesome article, updated"
post.save   # TODO: should update the record in the database
```

Tal vez necesites usar [last\_insert\_row\_id](http://zetcode.com/db/sqliteruby/connect/).
