## Contexto y Objetivos

Hoy tenemos **tres metas**:

1. Hacer el deploy de nuestra Watch List en Heroku
2. Agregar la funcionalidad Image Upload
3. ¡Hacer un Quiz de Rails a las 2pm!

### Configuración

Continuaremos trabajando en el código de ayer así que ya puedes regresar a tu carpeta:

```bash
cd ~/code/<user.github_nickname>/rails-watch-list
```

### Configuración de la Base de Datos

Si seguiste los comandos ayer, tu base de datos ya debería estar configurada correctamente para desplegar en Heroku 🚀

Vamos a verificar para asegurarnos. Por favor abre el `Gemfile`. ¿Tienes esta línea abajo? 

```ruby
# Gemfile
[...]
gem "pg"
```

✅ Si sí, continúa a la siguiente sección (Primer Despliegue).

❌ Si no, necesitaremos cambiar algunos archivos de configuración. Por favor sigue las instrucciones bajo la sección de divulgación "Cambiar DB a Postgres" aquí:

<details>
<summary markdown='span'>Cambiar DB a Postgres</summary>
Abre el archivo `config/database.yml`, **borra** todo y reemplázalo con:

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: 5

development:
  <<: *default
  database: rails-watch-list_development

test:
  <<: *default
  database: rails-watch-list_test

production:
  <<: *default
  database: rails_watch_list_production
  username: rails_watch_list
  password: <%= ENV["RAILS_WATCH_LIST_DATABASE_PASSWORD"] %>
```

Abre tu terminal y ejecuta:

```bash
rails db:create
rails db:migrate
rails db:seed
```
</details>

### Primer Deployment

Regresa a la lecture y sigue los pasos para hacer el deploy de tu app a producción en Heroku. Deberás registrarte y canjea tus Créditos Gratis.

### Image Upload

Nosotros obtenemos los posters de nuestras películas `movies` de nuestro seeds y eso gracias a [la API TMDB ](https://developers.themoviedb.org/3). Sin embargo, un poster no representa a una lista completa. Por lo tanto la meta es **agregar una imágen** al modelo de `List` para que cada lista tenga una mejor representación visual.

El/la usuario/a debe poder subir una imagen que sea mostrada en la vista `index` de `List` como un thumbnail/cover. ¡También se deberá mostrar una versión más grande de esta imagen en la vista `show` de una `List` seguida de las películas que se le han agregado!

Aunque es una app simple, intenta hacer que se vea linda utilizando Bootstrap, una buena fuente y toda tu creatividad 🎨😊🎨

**Pista**: Recuerda que puedes utilizar el [Kit UI de Le Wagon](https://uikit.lewagon.com/) como plantilla.

Para tener una muestra de los helpers de imágenes que suministra rails (`image_tag`, `image_path`, `asset-url`, ...), te sugerimos revisar los siguientes [apuntes](https://kitt.lewagon.com/knowledge/cheatsheets/rails_image_helpers) 👈

### Reviews de las Listas (Opcional)

Si ya terminaste el trabajo de las imágenes, ¡intenta agregar un sistema de review anónimo a las listas de películas para que todos/as puedan dejar comentarios sobre nuestra colección de películas!

## Yendo más lejos
Felicitaciones por haber completado el desafío de la Watch list. ¡Ahora puedes compartir tu gran app con el mundo entero!

Sin embargo tenemos un problema ... Cualquiera puede crear una lista, agregar un bookmark a las listas o borrar las películas a las que les has puesto bookmarks. Además, los reviews son completamente anónimos. 😔

La próxima semana veremos como resolver este problema. Introduciremos los conceptos de autenticación y autorización de usuarios en las próximas dos sesiones. 😉
