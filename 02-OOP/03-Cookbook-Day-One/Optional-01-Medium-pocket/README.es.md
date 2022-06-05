## Contexto y Objetivos

¡Felicitaciones!, ¡has superado el desafío del Recetario (Cookbook)!

Empecemos de nuevo. Creemos otra aplicación MVC desde cero. Esta vez crearemos una aplicación para guardar los posts [DEV](https://dev.to) y leerlos luego:

- Como usuario puedo listar todos los posts almacenados.
- Como usuario puedo agregar un post que quiero leer luego.
- Como usuario puedo leer un post que ha sido guardado.
- Como usuario puedo marcar un post como leído.

Una demostración vale más que mil palabras, así que esta es la aplicación que queremos codear:

#### Listar posts

```bash
---------------------------------
Welcome to your DEV Pocket Reader
---------------------------------

----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 1

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
```

#### Guardar un post para más tarde

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 2

Path?
> molly_struve/level-up-your-ruby-skillz-working-with-hashes-4bid

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### Leer un post

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 3

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

[...] # this should display the post's entire content with linebreaks between paragraphs!
```

#### Marcar un post como leído

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 4

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [x] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### Salir sin problemas

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 5

Bye bye!
```

Como te podrás haber dado cuenta, el usuario solo escribe el `path` del artículo DEV. El `path` es el texto que viene después del nombre del dominio en la url.

Por ejemplo, para salvar [este artículo](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc) el camino que los usuarios deben introducir es todo lo que esta después de `https://dev.to/` e.g. `unseenwizzard/learn-git-concepts-not-commands-4gjc`.

Bueno, ¿cómo encontraremos al autor del post, su título y su contenido ...?

¡Así es, vamos a hacer scraping!

**Pregunta:  ¿dónde vamos a codear la parte del scraping?**

Encontrarás la respuesta al final de este readme.

## Especificaciones

Esta vez escribirás el código sin ayuda. El `rake` solo te mostrará las ofensas de estilo 👌.

Siéntete libre de usar TDD en este desafío, apoyándote en las correcciones de las sesiones anteriores de codeo en vivo.

### Modelo

Como ya lo sabes, siempre debes empezar con tu modelo. El modelo es la clase Ruby que necesitamos para manipular los datos en tu programa.

Queremos practicar con los **posts** de DEV, así que creamos una clase `Post`. Antes de empezar a escribir tu código, tomate el tiempo de responder las siguientes preguntas:

Su estado:

- ¿Qué necesitamos almacenar en un `post` **para poder manejar las historias de los usuarios**?

La respuesta te dará las variables de instancia.

Su comportamiento:

- ¿Qué transformaciones deberemos hacer para trabajar sobre un post?
- ¿Qué componentes del estado deberemos exponer a la lectura? y a la escritura?

Las respuestas te darán los métodos de instancia públicos.

No pases mucho tiempo buscando todas las variables de instancia y los métodos. Los encontrarás luego cuando surja la necesidad al crear el repositorio y el controlador. Cuando pienses que ya hayas terminado, testea tu clase en `irb`, corrige los errores y pasa a la clase siguiente.

### Repositorio

Tal como en el recetario (cookbook), necesitamos un repositorio para **almacenar** nuestros posts en memoria y en nuestros discos duros. Esta clase necesita ser creada justo después del modelo. Ambas son parte del mismo bloque de **datos**.

Implementa una clase `Repository` la cual funcionará como una especie de base de datos. Debe estar conectada a un archivo `posts.csv` para hacer que nuestra aplicación sea persistente.

**NB:** si te encuentras con un error `csv invalid byte sequence in us-ascii` al parsear el csv, lo puedes corregir pasandole una opción en la llamada de `CSV.foreach` :

```ruby
CSV.foreach("posts.csv", encoding: 'ISO-8859-1') do |row|
  # [...]
```

### Controlador

El controlador suministra las historias de los usuarios. Echémosle un vistazo:

- Como usuario puedo listar todos los posts guardados
- Como usuario puedo agregar un post que quiero leer más tarde
- Como usuario puedo leer un post que he guardado
- Como usuario puedo marcar un post como leído

Recuerda que el controlador funciona como pivote en el patrón MVC. Es necesario tener acceso al repositorio y la vista desde cada acción (esto debería ayudarte a definir las variables de instancia).

Debes escribir la acción (un método de instancia) en el controlador para cada historia de usuario.

Este es el proceso que debes seguir para cada acción:

- Escribe el pseudocódigo para organizar el problema en varias etapas que puedas traducir a Ruby
- Recuerda que cada instrucción que esté relacionada con los datos será delegada al repositorio y cada `puts` y `gets` será manejado por la vista (nuevamente piensa SRP)
- El escribir las acciones te hará escribir la clase `view` y sus métodos de instancia de manera natural cuando surja la necesidad
- Cada vez que haya una nueva necesidad (que necesitemos un método en el repositorio o en el modelo), sigue el flujo y escribe el código inmediatamente
- Testea tu código regularmente (cada 2 o 3 líneas de código)

Puedes seguir las instrucciones siguientes para testear tus acciones:

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
repo = Repository.new(File.join(__dir__, 'posts.csv'))
controller = Controller.new(repo)

controller.action_name # replace by the real name of the action you want to test
```

Luego testea con:

```bash
ruby lib/test.rb
```

**Indicio**: si te encuentras con un `403 Forbidden Bots (OpenURI::HTTPError)` mientras haces scraping, hay una forma fácil de evitarlo especificando un `User-Agent` en las **cabeceras** de tu solicitud HTTP. Aquí hay un ejemplo usando `open-uri`:

```ruby
USER_AGENT = "Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0"
html_content = URI.open(url, "User-Agent" => USER_AGENT).read
```

### Ruteador

En el Recetario (Cookbook) te dimos el ruteador. Esta vez, ¡intenta crearlo tú mismo/a! Recuerda que al final del día vas a querer llamar a `router.run` en `app.rb` y esto ¡iniciará nuestra aplicación!

### Probando todo junto

Esta vez no te hemos dado el `app.rb`. No te estreses. Solo ve el problema desde el final. Sabemos que el objetivo del archivo `app.rb` es llamar a `router.run`.
Esto significa que necesitas instanciar un `router` que sea una instancia de nuestra clase `Router`. Bueno, eso es un `Router.new(controller)`. Esto significa que necesitamos un `controller` … Solo aplica este razonamiento y verás que podrás escribir todo el código que necesitas.

Cuando estés listo/a, corre tu programa con:

```bash
ruby lib/app.rb
```

### Por cierto …

Bueno, donde deberías escribir la parte de scraping? Reformulemos la pregunta. Nuestro programa debe poder instanciar un `Post` con solo un `path`.

Pero cuando instanciemos el `post`, vamos a querer que sea completado automáticamente con su título, contenido y autor. Un buen lugar sería el método `initialize` de `Post`. Pero no lo pondremos ahí.

Imaginemos que agregamos un modelo `Author` en el proyecto y que queremos obtener información sobre el autor del post al hacer el scraping. El método `Post#initialize` ya no será una buena opinión. Será necesario dejarlo en el **controlador** (donde tenemos acceso a modelos y repositorios), así que ¡pongamoslo ahí y preparémonos para una versión extendida de este desafío!

En la siguiente sesión veremos como se puede conectar una clase `Service` al patrón MVC si queremos extraer este tipo de funcionalidades del mismo.

