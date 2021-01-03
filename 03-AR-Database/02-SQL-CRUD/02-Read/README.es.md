## Contexto y Objetivos

El objetivo del día es implementar cada una de las operaciones `CRUD` y construir una imitación del [Hacker News](https://news.ycombinator.com).

**Nota**: en este ejercicio te **damos** la variable global `DB`, así que no tienes que instanciar una base de datos  `SQLite3::Database`. Simplemente usa `DB.execute` en tu código. Verás que funcionará (échale un vistazo a `spec/models/post_spec.rb` para ver cómo se crea la variable `DB`).

## Tests
Te hemos preparado el archivo `test.rb` donde se crea la variable global `DB` de la misma manera que se crea en  `spec/models/post_spec.rb`. Siéntete libre de usar este archivo para testear tu método.

## Especificaciones

En este primer ejercicio nos enfocamos en la lectura: **R**ead (la `R` del `CRUD`). Implementa una clase que manejará una tabla `posts` definida de la siguiente manera:

```sql
CREATE TABLE `posts` (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes`  INTEGER
);
```

### `initialize`

Agrega el método `initialize` para almacenar las columnas anteriores en variables de instancia. También agrega los readers y accessors correspondientes.

### `find`

Implementa un método de **clase** `find(id)` en la clase `Post` que tome un entero (integer) como argumento (el id de post) y devuelva una instancia de `Post`.

(Asume que hay una variable global `DB` que está definida en el programa, así que no tienes que instanciarla).

Queremos que protejas el método `find` contra **inyecciones SQL**. Te debes estar preguntando lo que es una inyección SQL. Bueno, ¡si [hackeas este banco](https://www.hacksplaining.com/exercises/sql-injection#/start), entenderás!
Aquí hay una introducción al ejercicio: tal vez debas pasarle varios argumentos al método  `.execute` usando [placeholders](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem).

### `all`

Implementa un método de **clase** `all` en la clase  `Post` que no tome argumentos y devuelva un arreglo (Array) que contenga cada instancia de `Post`.

## Sugerencias adicionales

Una inyección SQL es un tipo de ataque donde la persona que usa tu aplicación no sólo le pasará un entero (integer) al método `find` sino que agregará una cadena de texto (string) contaminada para dañar tus datos. Si ves la consulta SQL en las especificaciones, verás a lo que nos referimos.

Te invitamos a leer [este artículo en Medium](https://medium.com/@yelstin.fernandes/how-to-add-items-to-a-database-table-using-ruby-sqlite3-74dcd8f931f9) y [esta respuesta en stackOverflow]https://stackoverflow.com/questions/13462112/inserting-ruby-string-into-sqlite#answer-13462218) para entender mejor las inyecciones SQL 👌.

¡**Nunca confíes en los datos suministrados por el usuario**!

