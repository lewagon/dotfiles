## Contexto y Objetivos

En los ejercicios anteriores construimos métodos directamente en nuestra clase modelo `Post`. Esto significa que no necesitamos una clase `Repositorio` como cuando almacenamos datos en un CSV porque la clase modelo maneja la relación con la base de datos directamente. ¿No te parece genial?

El siguiente paso es agregar nuestro nuevo código en la arquitectura MVC adecuada.

## Especificaciones

Corre tu aplicación Ruby con:

```bash
ruby app.rb
```

Esto creará un ruteador e iniciará la aplicación. Te estamos suministrando el ruteador, así que solo debes crear los métodos de controlador en la clase `PostsController`.
Pero antes debes poner en la clase `Post` todo el código que escribiste en los ejercicios anteriores.

No hay especificaciones para este ejercicio (sin embargo debes usar `rake` para `rubocop`), así que tendrás que testear tus métodos de controlador corriendo la aplicación en tu terminal.
Para asegurarte que todo se esté almacenando correctamente, reinicia tu aplicación y verifica que todo siga ahí. También puedes ver el archivo de base de datos directamente por medio de `sqlite3` desde la Terminal o usando una herramienta como SQLite Browser.

Te damos el script  `reset_db.rb` el cual puedes correr con:

```bash
ruby reset_db.rb
```

Esto hará el drop de los datos en la base de datos y creará el esquema nuevamente. Debes correrlo una vez antes de correr `ruby app.rb` para que tu base de datos sea creada.

