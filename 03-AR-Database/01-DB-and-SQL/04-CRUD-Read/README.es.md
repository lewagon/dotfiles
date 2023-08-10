## Antecedentes y objetivos

El objetivo de este y el siguiente ejercicio es implementar cada una de las operaciones CRUD y construir una réplica de [Hacker News](https://news.ycombinator.com). Para aquellos que no lo conozcan, Hacker News es un sitio web de noticias sociales muy mínimo (con un enfoque en ciencias de la computación y tecnología), donde los usuarios pueden enviar enlaces a artículos y otros usuarios pueden elegir "votar positivamente" esos enlaces a artículos.

**Nota**: En este ejercicio, al igual que en el ejercicio anterior, nosotros te proporcionamos la variable global `DB`, por lo que no necesitas instanciar una nueva `SQLite3::Database` tú mismo. La diferencia con el ejercicio anterior es que esta vez `DB` es una **variable global**, lo que significa que es accesible desde cualquier parte de tu código, por lo que no es necesario pasar la base de datos como argumento como lo hicimos en el último desafío. Simplemente utiliza `DB.execute` en cualquier parte de tu código y funcionará (pero siéntete libre de echar un vistazo a `spec/models/post_spec.rb` para ver cómo se crea la variable `DB`).

### Pruebas

También hemos preparado un archivo `test.rb` para ti, donde la variable global `DB` se crea de la misma manera que en `spec/models/post_spec.rb`. Siéntete libre de usar este archivo para llamar y probar tus métodos a medida que avanzas.

## Especificaciones

### Parte 1: Configuración de nuestro modelo

Te hemos dado un archivo `post.rb` con una clase `Post` definida en su interior para manejar la tabla `posts`, definida en la base de datos de la siguiente manera:

```sql
SQL
CREATE TABLE `posts` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes` INTEGER
);
```

#### `#initialize`

Como siempre, lo primero que debemos hacer al crear un modelo es definir qué atributos debe tener el modelo. Por lo tanto, utilizando la definición de la tabla anterior, agrega el método `initialize` dentro de tu clase `Post` y guarda las columnas de la tabla como variables de instancia.

#### Getters and Setters

A continuación, definamos qué atributos (si los hay) son legibles y cuáles son modificables. Para nuestro clon de HackerNews:

- el `id` se puede revelar pero no se debe editar
- el `title` y el `url` se pueden ver y editar
- se puede ver y aumentar el número de `votes` a través de los votos positivos, pero no se puede editar directamente

### Part 2: READ

En esta parte del ejercicio, nos centraremos en implementar las operaciones de **Lectura** (la 'R' en `CRUD`).

Hay dos escenarios en los que puede ser necesario leer desde nuestra base de datos:

1. Para encontrar una publicación específica
2. O para obtener todas las publicaciones que tenemos

Implementemos estos escenarios con los siguientes métodos:

#### `#find`

Implementa un método de **clase** `find(id)` en la clase `Post` que tome un entero como argumento (la id de la publicación) y devuelva una instancia de `Post`.

Utilicemos **pseudocódigo** para ayudarnos a descomponer los pasos que necesitaremos:

```ruby
#TODO: Escribir la consulta SQL para obtener la publicación con la id dada.
#TODO: Utilizar DB.execute para ejecutar la consulta SQL.
#TODO: Devolver la publicación encontrada: ¡como una instancia de Post!
```

☝️ Asegúrate de utilizar la variable global `DB` definida en el programa, no es necesario que la instancies tú mismo.

💡 CONSEJO: asegúrate de prestar atención al tipo de dato que obtienes del método `DB.execute` en comparación con el tipo de dato que necesitas tener dentro de tu modelo. ¿Cómo podemos asegurarnos de obtener una instancia de `Post`?

##### Inyecciones de SQL

Como aprendimos en la clase, también necesitamos proteger nuestro método `find` contra **inyecciones de SQL**. Como recordatorio, una inyección de SQL es un problema grave de seguridad, donde un atacante puede interferir con tu aplicación mediante consultas maliciosas a la base de datos. Los efectos potenciales incluyen, por ejemplo, permitir que un usuario malintencionado acceda a datos restringidos, como números de seguridad social, tarjetas de crédito o contraseñas 😱. En algunos casos, el atacante incluso puede cambiar o eliminar datos, dañando permanentemente la aplicación. Si deseas leer más sobre las inyecciones de SQL y ver algunos ejemplos, consulta la sección de **Recursos adicionales** al final de este ejercicio.

Para proteger tu base de datos contra las inyecciones de SQL, nunca debes interpolar consultas de SQL con datos de usuario, sino usar `?` [**placeholders**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) en su lugar.

ℹ️ En este ejercicio, para prevenir las inyecciones de SQL, deberás pasar _varios argumentos_ al método `.execute`. Recuerda revisar las diapositivas de la clase para recordar cómo se hace esto.

#### `#all`

A continuación, implementemos un método de **clase** `all` en la clase `Post` que no reciba argumentos y devuelva un array que contenga todas las instancias de `Post` que tenemos en nuestra base de datos.

Nuevamente, usemos **pseudocódigo** para ayudarnos a desglosar nuestros pasos:

```ruby
# TODO: Escribir la consulta SQL para obtener todos los posts de la base de datos
# TODO: Usar DB.execute para ejecutar la consulta SQL
# TODO: Devolver un array con todos los posts - todos como instancias de Post!
```

Justo como en el método `#find`, debemos prestar atención a los **tipos de datos** que obtenemos de `DB.execute` en comparación con los tipos de datos **que necesitamos** tener en nuestro modelo.

**Opcional: Refactorización**

Puede que notes que terminamos repitiéndonos en los métodos `#find` y `#all` cuando necesitamos convertir nuestros datos de respuesta desde la base de datos en instancias de `Post`. Si lo deseas, intenta refactorizar este código en un método privado llamado `build_record(row)`, que tome una fila de datos de la base de datos y lo convierta en una instancia de `Post`. Luego, utiliza este método `#build_record` donde sea necesario convertir tus datos.

## Recursos adicionales

Una inyección de SQL es un tipo de ataque en el que la persona que utilice tu aplicación no solo pasará un entero regular `id` al método `find`, sino que añadirá una cadena maliciosa para dañar tus datos. Si observas la consulta SQL en la especificación, entenderás a qué nos referimos.

Puedes leer [este artículo de Medium](https://medium.com/@yelstinfernandes/cómo-agregar-elementos-a-una-tabla-de-base-de-datos-usando-ruby-sqlite3-74dcd8f931f9) y [esta respuesta de StackOverflow](https://stackoverflow.com/questions/13462112/inserting-ruby-string-into-sqlite#answer-13462218) para entender mejor las inyecciones de SQL 👌

Si deseas ver inyecciones de SQL en acción, [hackea este banco](https://www.hacksplaining.com/exercises/sql-injection#/start) ¡y verás de qué se trata!

**Nunca confíes en los datos del usuario**.
