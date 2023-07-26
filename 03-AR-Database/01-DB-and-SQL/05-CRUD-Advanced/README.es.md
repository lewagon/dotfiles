## Antecedentes & Objetivos

El objetivo de este ejercicio es implementar las operaciones CRUD restantes del desafío anterior.

**Nota**: Como recordatorio, en este ejercicio nosotros **proveemos** la variable global `DB`, por lo que no necesitas instanciar tu propia `SQLite3::Database`. Solo usa `DB.execute` en tu código y funcionará (pero siéntete libre de revisar `spec/models/post_spec.rb` para ver cómo se crea la variable `DB`).

## Configuración

Primero, copiemos tu código del ejercicio anterior en la carpeta de este desafío:

```bash
# asegúrate de estar en el directorio correcto:
cd ~/code/<user.github_nickname>/fullstack-challenges/03-AR-Database/01-DB-and-SQL/05-CRUD-Advanced

# copia tu código del desafío CRUD - Read:
cp -r ../04-CRUD-Read/app .
```

## Pruebas

También hemos preparado un archivo `test.rb` para ti donde se crea la variable global `DB` de la misma forma que en `spec/models/post_spec.rb`. Siéntete libre de utilizar este archivo para llamar y probar tus métodos a medida que avanzas.

## Especificaciones

### Inyecciones de SQL

Al igual que en el ejercicio anterior, debemos asegurarnos de proteger nuestras bases de datos contra las inyecciones de SQL. Eso significa que nunca debemos interpolar consultas de SQL con datos de usuario, sino usar `?` [**placeholders**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) en su lugar.

ℹ️ Para ambas partes de este ejercicio, para prevenir las inyecciones de SQL deberás pasar _varios argumentos_ al método `.execute`. Recuerda revisar las diapositivas de la clase (o el último ejercicio) para recordar cómo se hace.

#### Parte 1: DELETE

En la primera parte de este ejercicio, nos enfocaremos en **D**elete (la `D` en `CRUD`).

Para lograr esto, necesitaremos el siguiente método:

### `#destroy`

Implementa un método de **instancia** llamado `destroy` que eliminará la fila relevante de la base de datos. ¿Por qué este método es un método de instancia y no un método de clase como `Post.find` o `Post.all`? 🤔 Si no estás seguro, trata de preguntarle a tu compañero o a un TA.

Veamos un ejemplo de cómo se usará este método:

```ruby
post = Post.find(42)  # Obtén la fila con id 42
post.destroy          # TODO: eliminar esa fila de la base de datos

# Resultado esperado:
Post.find(42)
# => nil
```

Una vez más, escribamos un pseudocódigo para ayudarnos:

```rb
# TODO: Escribir la consulta SQL para eliminar una publicación específica de la base de datos
# TODO: Utilizar DB.execute para ejecutar la consulta SQL
```

### Parte 2: CREATE y UPDATE

En la siguiente parte del ejercicio, nos enfocaremos en **C**reate y en **U**pdate de `CRUD`.

¿Por qué estamos haciendo **C**reate y **U**pdate juntas? ¡Porque el proceso es muy similar! En ambos casos, estamos enviando nuevos datos a la base de datos. La única diferencia es si el objeto con el que estamos trabajando ya existe en la base de datos. Si existe, entonces estamos actualizando algunos valores para un registro existente (¿cómo encontramos un registro existente en la base de datos?). Si no existe en la base de datos todavía, entonces estamos insertando valores y creando un nuevo registro.

Cuando manipulamos instancias de objetos, si llamamos a `save` en algo y aún no existe en nuestra base de datos, se **C**reará. Si ya existe, simplemente se **A**ctualizará. 💡 SUGERENCIA: ¿cuál es la diferencia principal entre un objeto existente y uno nuevo?

### `#save`

Implementa un método de **instancia** `save` que creará o actualizará la fila relevante en la base de datos. Nueva vez, asegúrate de poder responder por qué este método es un método de instancia, como `destroy`, en lugar de ser un método de clase como `Post.find`.

Veamos un ejemplo de cómo se usará este método 👇

```ruby
post = Post.new(title: "Artículo increíble")
post.id
# => nil (el post aún no se ha guardado)
post.save  # ¡Persistirá un nuevo registro!
post.id
# => 1 (resultado esperado, la base de datos ha insertado una fila, almacenar el id en la memoria)

post.title = "Artículo increíble, actualizado"
post.save   # ¡Debería actualizar el registro existente en la base de datos!
post.title
# => "Artículo increíble, actualizado"
```

Y vamos a escribir algo de pseudocódigo para ayudarnos con los pasos:

```ruby
# TODO: Determinar si es necesario *crear* o *actualizar* la publicación
# TODO: Si la publicación ya existe:
  # TODO: Escribir la consulta SQL para actualizar la publicación en la base de datos
  # TODO: Utilizar DB.execute para ejecutar la consulta
# TODO: Si la publicación es nueva,
  # TODO: Escribir la consulta SQL para agregar una nueva publicación a la base de datos
  # TODO: Utilizar DB.execute para ejecutar la consulta
  # TODO: Actualizar la @id de la publicación utilizando los datos de la base de datos
```

💡 SUGERENCIA: Es posible que necesites usar [last_insert_row_id](http://zetcode.com/db/sqliteruby/connect/) como vimos en la clase 😉.
