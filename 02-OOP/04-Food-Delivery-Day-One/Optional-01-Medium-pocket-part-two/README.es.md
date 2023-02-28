## Contexto y Objetivos

¡Bravo! Pudiste con la primera parte del desafío de Entrega de Comida a Domicilio (Food Delivery).

En este desafío extenderemos el ejercicio DEV Pocket (el primero opcional de Cookbook) con el modelo `Author`. Vamos a modelar la siguiente relación entre `Post` y `Author`:

![Database schema](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/pocket_reader.png)

Queremos extender las acciones de usuario a lo siguiente:

```bash
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. List authors         # NEW
6. List author's posts  # NEW
7. See author info      # NEW
8. Exit
```

Como te debes estar imaginando, la información sobre los autores la obtendremos haciendo scraping cuando se guarde un post. Vamos a tener esto en cuenta cuando pensemos en nuestra arquitectura.

## Especificaciones

Comienza navegando por el desafío opcional DEV Pocket de Cookbook y descarga la solución. Este será tu punto de partida para esta versión extendida.

### Modelos

Primero que nada, tenemos que escribir el código del modelo `Author` con variables de instancia deducidas de nuestro esquema.

**Relacion autor-post**

La relación que queremos modelar entre los posts y los autores es la siguiente:

```
An author can write several posts
A post is written by an author
```

Esto quiere decir que en el código:

- Necesitamos agregar una variable de instancia `@posts` en `Author` (y dejarla expuesta para su lectura).
- `@posts` es un arreglo (array) de **instancias de `Post`**
- Debemos actualizar la variable de instancia `@author` en `Post` para dejar de almacenar el nombre y **comenzar a almacenar la instancia de `Author`** (y dejarla expuesta para su lectura).
- Debemos agregar los `@id` en ambos modelos para persistir la relación en nuestros archivos CSV
- La relación la mantienen los hijos (los posts) lo que significa que necesitamos una columna `author_id` en nuestro `post.csv`.

Considera la información siguiente para asociar un post a su autor:

```ruby
# lib/models/author
class Author
  # [...]
  def add_post(post)
    @posts << post
    post.author = self  # <-- what do you need in your Post class to write this?
  end
end
```

Testea la relación en `irb`, corrige los errores y empieza a trabajar con los repositorios.

### Repositorios

El `Repository` debe convertirse en un `PostRepository` y debemos agregar el `id` y el `author_id` al CSV.

**Como recordatorio: el trabajo del repositorio es asignar números de identificación (id) a las instancias cada vez que las agrega.**

Considera cambiar el nombre de  `find(index)` a `find_by_index(index)`. Mantendremos la denominación `find` para el método que tenga `id` como parámetro.

Debemos escribir el código de un `AuthorRepository` y enlazarlo al archivo `authors.csv`. No hay nada excepcional en este repositorio por ahora.

Ahora que un post está relacionado a un objeto de autor tenemos que actualizar el método `load_csv` en el `PostRepository`.

Cuando leemos el `author_id` de un post en un CSV, tenemos que encontrar la instancia del autor correspondiente para asociarla a nuestro objeto de post. Esto significa lo siguiente:

- El `PostRepository` debe ser instanciado después del `AuthorRepository`
- El `PostRepository` debe tener acceso a una instancia `@author_repo`
- El `AuthorRepository` debe tener un método `find(id)` que devuelva la instancia de `Author` adecuada desde su arreglo (array) `@authors`.

Asegurate de que tus repositorios funcionen bien antes de empezar a trabajar en una nueva funcionalidad de tu programa.

### Controladores

Empieza cambiando el nombre de `Controller` por `PostsController`. Queremos agregar historias de usuario relacionadas con autores y las mismas serán suministradas por un `AuthorsController`.

Antes de escribir el código de nuevas historias de usuario, corre las que tienes actualmente. Verás algunos errores que tendrás que corregir ya que hemos hecho algunos cambios.

**Corrige la funcionalidad guardar post**.

Estamos cerca de la parte más difícil del desafío. Habíamos dicho anteriormente que queríamos hacer scraping de los detalles del autor del post cuando lo guardamos en nuestra aplicación Pocket.

Ya sabemos cómo hacer el scraping de un post. Tenemos que actualizar el script del scraping para obtener el **apodo** del autor en la página del post.
Gracias al apodo podrás abrir la página del autor y hacer el scraping de la información que está detallada en el esquema.

Instancia un `Post.new` cuando tengas toda la data que se necesita para crear un post. Haz lo mismo para el `Author.new`. Hagamos una pausa antes de agregarlos a nuestros repositorios.

Por cuestiones de simplicidad vamos a asumir que nuestro usuario es lo suficientemente inteligente y que no intentará guardar un post que ya ha sido guardado. Sin embargo, si guardas un 2do post del mismo autor, ¡**no querrás duplicar el autor en tu repositorio**! Considera los pasos siguientes en tu acción `PostsController#create`:

```ruby
def create
  # 1. Ask user for a post path (view)
  # 2. Scrape post (?)
  # 3. Scrape author (?)
  # 4. Find corresponding author (author repo)
  # 5. If we don't have it, save it and get it back with its id (author repo)
  # 6. Associate post to its author (model)
  # 7. Save post (post repo)
end
```

Escribe todo el código en `PostsController` hasta que la acción funcione bien. Luego puedes pensar en extraer la parte de scraping a un objeto de servicio. El siguiente es un buen candidato:

```ruby
# lib/services/reader_scraper.rb
class ReaderScraper
  def initialize(post_path)
    @post_path = post_path
  end

  def call
    # Scrape post
    # [...]
    post = Post.new(post_attributes)
    # Scrape author
    # [...]
    author = Author.new(author_attributes)
    return { post: post, author: author }
  end
end
```

Asegurate que todavía funcione y empieza a trabajar en la siguiente historia de usuario.

**Lista de autores**

Bueno, ya hemos hecho lo más difícil. Lo que viene es mucho más fácil. Queremos mostrar la lista de autores, así que escribiremos el código para un `AuthorsController`.

Este tendrá que acceder al repositorio y la vista del autor. La vista debe mostrar los nombres de los autores y los posts asociados no leídos en una lista indexada:

```bash
1. Magnus Skog
2. Molly Struve (2 unread)
```

**Lista de los posts de autores**

El trabajo que hemos hecho en los modelos facilita esta próxima etapa. Podemos acceder a todos los posts de un autor gracias al getter `posts`. Escribe el pseudocódigo para organizar el problema en pasos pequeños, testearlo y continua a la última funcionalidad.

**Ver los detalles de los autores**

Como siempre, empieza organizando el problema en pasos pequeños. Luego traduce línea por línea en Ruby y testea.

Nuestro usuario debe ver lo siguiente cuando selecciona Molly Struve:

```bash
1. Magnus Skog
2. Molly Struve (2 unread)
Index?
> 2

Molly Struve (molly_struve)

Elasticsearch wrangler. Speaker. Runner. Show Jumper. Always Ambitious. Never Satisfied.

54 posts published - 442 comments written
```

¡Que disfrutes el modelado!
