## Contexto y Objetivos

Hoy tenemos **tres objetivos**

1. Hacer el deploy de Mister Cocktail en Heroku
2. Agregar la funcionalidad de carga de imágenes (Image Upload)
3. ¡Hay un quiz de Rails a las 2 p.m.!

### Configuración

Vamos a seguir trabajando en el código de ayer. Regresa a tu carpeta:

```bash
cd ~/code/<user.github_nickname>/rails-mister-cocktail
```

Si generaste la app Rails **sin** el flag `--database`, debemos hacer la migración manual de esta app Rails a Postgresql para Heroku. Comprueba que la app esté configurada con Postgresql y que tengas la gema `pg` en tu gemfile.

Si tienes que cambiar la app a Postgres, abre tu Gemfile, busca la línea `sqlite` y **reemplazala** con:

```ruby
# Gemfile
gem "pg"
```

Abre el archivo `config/database.yml`, **borra** todo y reemplazalo con:

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: 5

development:
  <<: *default
  database: rails-mister-cocktail_development

test:
  <<: *default
  database: rails-mister-cocktail_test
```

Abre tu Terminal y corre:

```bash
rails db:create
rails db:migrate
rails db:seed
```

### Primer Deployment

Regresa a la clase y lee cómo hacer el deploy de tu app a producción en Heroku paso por paso. Deberás registrarte.

### Carga de imágenes

El objetivo es **agregar una imagen** al modelo `Cocktail`. El/la usuario/a debe poder subir una imagen que se mostrará luego en la vista `index` de `Cocktail` como un thumbnail.¡En la vista `show` de `Cocktail`, se debe mostrar la misma imagen pero más grande!

Aunque es una app simple, haz lo posible para crear algo hermoso usando Bootstrap, algunas fuentes bonitas y toda tu creatividad 🎨😊🎨.

**Pista**: Siempre podrás trabajar sobre el [Kit UI de Le Wagon UI](https://uikit.lewagon.com/)

Si quieres una previa de los helpers de imágenes que Rails siministra (`image_tag`, `image_path`, `asset-url`, ...) revisa la [guía](https://kitt.lewagon.com/knowledge/cheatsheets/rails_image_helpers) 👈

### Reviews de cócteles (Opcional)

Si ya terminaste con las imágenes, intenta agregar un sistema de  reviews anónimos para los cócteles.
