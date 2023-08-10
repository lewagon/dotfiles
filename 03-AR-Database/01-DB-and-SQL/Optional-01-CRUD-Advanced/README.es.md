## Antecedentes y objetivos

El objetivo de este ejercicio es implementar las acciones CRUD restantes del ejercicio anterior.

**Nota**: Como recordatorio, en este ejercicio te **entregamos** la variable global `DB`, por lo que no es necesario que instancies una nueva `SQLite3::Database` por tu cuenta. Solo usa `DB.execute` en tu código, y funcionará (pero siéntete libre de revisar `spec/models/post_spec.rb` para ver cómo se crea la variable `DB`).

## Configuración

Primero, copiemos y peguemos tu código del ejercicio anterior en la carpeta de este ejercicio:

```bash
# asegúrate de estar en el directorio correcto:
cd ~/code/<user.github_nickname>/fullstack-challenges/03-AR-Database/01-DB-and-SQL/Optional-01-CRUD-Advanced

# copia tu código del ejercicio CRUD - Read:
cp -r ../04-CRUD-Read/app .
```

## Pruebas

También hemos preparado un archivo `test.rb` para ti, donde se crea la variable global `DB` de la misma manera que en `spec/models/post_spec.rb`. Siéntete libre de usar este archivo para llamar y probar tus métodos a medida que avanzas.

## Especificaciones

### Inyecciones de SQL

Al igual que en el último ejercicio, debemos asegurarnos de proteger nuestras bases de datos contra las inyecciones de SQL. Esto significa que nunca debemos interpolar consultas SQL con datos de usuario, sino usar `?` [**placeholders**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) en su lugar.

ℹ️ Para ambas partes de este ejercicio, para prevenir las inyecciones de SQL deberás pasar _varios argumentos_ al método `.execute`. Recuerda consultar las diapositivas de la clase (o el último ejercicio) para recordar cómo se hace esto.

### Parte 1: DELETE

En la primera parte de este ejercicio, nos enfocaremos en la operación de **DELETE** (la `D` en `CRUD`).

Para hacer esto, necesitaremos el siguiente método:

### `#destroy`

Implementa un método de **instancia** llamado `destroy` que eliminará la fila relevante de la base de datos. ¿Por qué este método es un método de instancia y no un método de clase como `Post.find` o `Post.all`? 🤔 Si no estás seguro, intenta preguntarle a tu compañero o a un TA.

Veamos un ejemplo de cómo se usará este método 👇

```ruby
post = Post.find(42)  # Obtén la fila con el id 42.
post.destroy          # TODO: Elimina esa fila de la base de datos.

# Resultado esperado:
Post.find(42)
# => nil
```

Y nuevamente, escribamos un pseudocódigo para ayudarnos:

```ruby
# TODO: Escribe la consulta SQL para eliminar una publicación específica de la base de datos
# TODO: Usa DB.execute para ejecutar la consulta SQL
```

### Parte 2: CREATE y UPDATE

En la siguiente parte del ejercicio, nos enfocaremos en la **C**reate y **U**pdate de `CRUD`.

¿Por qué estamos haciendo la **C**reación y la **A**ctualización juntas? ¡Porque el proceso es muy similar! En ambos casos, estamos enviando nuevos datos a la base de datos. La única diferencia es si el objeto con el que estamos trabajando ya existe en la base de datos. Si existe, entonces estamos actualizando algunos valores para un registro existente (¿cómo encontramos un registro existente en la base de datos?). Si aún no existe en la base de datos, entonces estamos insertando valores y creando un nuevo registro.

Al manipular instancias de objetos, si llamamos a `save` en algo y aún no existe en nuestra base de datos, se **C**rea. Si ya existe, simplemente se **A**ctualiza. 💡 SUGERENCIA: ¿cuál es la diferencia principal entre un objeto existente y uno nuevo?

### `#save`

Implementa un método de **instancia** llamado `save` que creará o actualizará la fila relevante en la base de datos. Nuevamente, asegúrate de poder responder por qué es un método de instancia al igual que `destroy` en lugar de ser un método de clase como `Post.find`.

Veamos un ejemplo de cómo se usará este método 👇

```ruby
post = Post.new(title: "Artículo impresionante")
post.id
# => nil (el post aún no se ha guardado)
post.save  # Guardará un nuevo registro
post.id
# => 1 (resultado esperado, la base de datos ha insertado una fila, almacenar el id en memoria)

post.title = "Artículo impresionante, actualizado"
post.save   # Actualizará el registro existente en la base de datos
post.title
# => "Artículo impresionante, actualizado"
```

Y escribamos pseudocódigo para ayudarnos con los pasos:

```ruby
# TODO: Determinar si la publicación debe ser *creada* o *actualizada*
# TODO: Si la publicación ya existe:
  # TODO: Escribir la consulta SQL para actualizar la publicación en la base de datos
  # TODO: Usar DB.execute para ejecutar la consulta SQL
# TODO: Si la publicación es nueva,
  # TODO: Escribir la consulta SQL para agregar una nueva publicación a la base de datos
  # TODO: Usar DB.execute para ejecutar la consulta SQL
  # TODO: Actualizar el @id de la publicación utilizando datos de la base de datos
```

💡 SUGERENCIA: Es posible que necesites usar [last_insert_row_id](http://zetcode.com/db/sqliteruby/connect/), como vimos en la clase 😉.
