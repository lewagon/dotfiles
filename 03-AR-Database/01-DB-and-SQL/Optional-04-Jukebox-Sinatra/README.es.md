## Contexto y Objetivos

Quisiéramos crear una pequeña aplicación web [Sinatra](http://www.sinatrarb.com/) para mostrar toda la información de la base de datos de la Rocola (Jukebox).

Este ejercicio tiene rake para testear tu aplicación Sinatra. Ejecutalo con el comando habitual `rake`.

## Configuración

Instala las gemas que se especifican en tu archivo `Gemfile` con el comando siguiente:

```bash
bundle install
```

Esto creará un archivo `Gemfile.lock` autogenerado que especifica las versiones de cada gema. De hecho las bloquea.

Corre la aplicación Sinatra.

```bash
ruby lib/app.rb
```

Ve [http://localhost:4567](http://localhost:4567) para verla en acción. Ahora estás corriendo un pequeño servidor web y tienes acceso a él por medio de tu buscador. ¡Se acabaron las líneas de comando!

## Fundamentos sobre Sinatra

Sinatra es lo que se le llama un “micro framework”, un marco de aplicación web minimalista. Básicamente es un micro Rails y también sigue el patrón **MVC**. El archivo `app.rb` funciona como un controlador y el ruteo lo maneja Sinatra.
Ya hemos creado un método de controlador para manejar el root de la página web. Sinatra mapea el URL en el navegador con el método adecuado en `app.rb`. Para más información, échale un vistazo a la [documentación de ruteo](http://www.sinatrarb.com/intro.html#Routes).

Puedes leer más sobre Sinatra en nuestro [tutorial](https://github.com/lewagon/sinatra-101)(omite la parte de configuración (**Setup**) porque ya tienes la plantilla en la carpeta `lib`).

## Especificaciones

### Página de inicio

Escribe el código de la página de inicio `/` la cual muestra la lista de todos los artistas de la rocola (jukebox). Deberías poder acceder a la página del artista haciendo clic en el nombre del mismo.

### Página del artista

Escribe el código de la página `/artists/:id` para mostrar todos los álbumes de dicho artista.
Deberías ser redireccionado a la página de un álbum al hacer clic en su nombre.

### Página del album

Escribe el código de la página `/albums/:id` para mostrar las canciones de dicho álbum.
Deberías ser redireccionado a la página de una canción al hacer clic en su nombre.

### Página de la canción
Escribe el código de la página `/tracks/:id` para mostrar toda la información de la canción y si te sobra tiempo puedes usar un servicio API de video como YouTube para agregar un video a la página.

Cuando hayas terminado, usa [`ngrok`](https://github.com/lewagon/sinatra-101/blob/master/README.md#share-with-the-world) para compartir tu trabajo en Slack 👌.
