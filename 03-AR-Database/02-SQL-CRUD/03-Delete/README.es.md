## Contexto y Objetivos

Nuevamente asume que tu clase `Post` tiene acceso a una variable global `DB` definida de la siguiente manera:

```ruby
DB = SQLite3::Database.new("a_file.db")
```

Aún puedes seguir usando el archivo `test.rb`  para testear tus métodos.

## Especificaciones

En este ejercicio nos concentraremos en borrar: **D**elete (la `D` en `CRUD`).

### `destroy`

Implementa el método de **instancia** (responde: ¿por qué un método de instancia y no un método de clase como `Post.find`?) `destroy` que va a borrar una fila dada de la base de datos.

```ruby
post = Post.find(42)  # Get the row with id 42.
post.destroy          # TODO: get rid of that row in the database

# Expected result then
Post.find(42)
# => nil
```

Este ejercicio te debería tomar menos tiempo que el anterior 😊
