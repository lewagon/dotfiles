## Contexto y Objetivos

El objetivo de este desafío es crear una app Rails de dos modelos con un restaurante y reviews anónimos.
Puedes ver la [guía Rails](http://guides.rubyonrails.org/getting_started.html#adding-a-second-model) para ver un ejemplo similar usando artículos y comentarios.

## Generación de la app Rails

Vas a usar especificaciones externas que fueron escritas por los profesores para testear tu app Rails. Por eso especificamos `-T` lo que significa "no generes los tests integrados de Rails". Aquí está la configuración que necesitamos:

```bash
cd ~/code/<user.github_nickname>
rails new rails-yelp-mvp --skip-active-storage --skip-action-mailbox -T
cd rails-yelp-mvp
git add .
git commit -m "rails new"
gh repo create
git push origin master
echo "gem 'rspec-rails', '4.0.0.beta3', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
git submodule add git@github.com:lewagon/fullstack-challenges-03-Rails-restaurant-reviews-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

Antes de empezar a escribir el código de tu app, sigue [nuestra guía Rails de Frontend](https://github.com/lewagon/rails-stylesheets/blob/master/README.md) para asegurarte de que puedas usar simple form, Bootstrap y también tengas una buena carpeta de hojas de estilo (stylesheets) (⚠️ solo haz la sección de **configuracion**. No intentes implementar **Bootstrap JS**.¡Eso lo cubriremos mañana!).

### Testeo de tu código

Siempre que agregues migraciones a tu app (e.g. después de un `rails g model ...`), no olvides también correr las migraciones **en la base de datos de testeo** que usamos en nuestras especificaciones:

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
```

Luego verás que testear tu codigo sera tan simple como siempre con el viejo'

```bash
rake

# [...]
# Failed examples:
#
# rspec ./spec/controllers/restaurants_controller_spec.rb:84 # RestaurantsController should exist
# rspec ./spec/controllers/reviews_controller_spec.rb:77 # ReviewsController should exist
# rspec ./spec/models/restaurant_spec.rb:13 # Restaurant has a name
# rspec ./spec/models/restaurant_spec.rb:18 # Restaurant has an address
# rspec ./spec/models/restaurant_spec.rb:23 # Restaurant has a phone number
# rspec ./spec/models/restaurant_spec.rb:28 # Restaurant has a category
# rspec ./spec/models/restaurant_spec.rb:33 # Restaurant name cannot be blank
# rspec ./spec/models/restaurant_spec.rb:40 # Restaurant address cannot be blank
# rspec ./spec/models/restaurant_spec.rb:47 # Restaurant category cannot be blank
# rspec ./spec/models/restaurant_spec.rb:54 # Restaurant neptunian is not a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant chinese is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant italian is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant japanese is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant french is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant belgian is a valid category
# rspec ./spec/models/restaurant_spec.rb:70 # Restaurant has many reviews
# rspec ./spec/models/restaurant_spec.rb:75 # Restaurant should destroy child reviews when destroying self
# rspec ./spec/models/review_spec.rb:20 # Review has a content
# rspec ./spec/models/review_spec.rb:25 # Review has a rating (stored as integer)
# rspec ./spec/models/review_spec.rb:30 # Review content cannot be blank
# rspec ./spec/models/review_spec.rb:37 # Review rating cannot be blank
# rspec ./spec/models/review_spec.rb:44 # Review parent restaurant cannot be nil
# rspec ./spec/models/review_spec.rb:51 # Review rating should be an integer
# rspec ./spec/models/review_spec.rb:58 # Review rating should be a number between 0 and 5
```

Si tienes problemas corriendo `rake`, tal vez tengas que correr `bin/rake`. Eso significa que tu `$PATH` no contiene la carpeta `./bin`. Esto lo puedes arreglar en los zshrc de tus dotfiles (lee [nuestra configuracion por defecto](https://github.com/lewagon/dotfiles/blob/master/zshrc#L16-L18)).

## Especificaciones

### Modelos

#### Esquema

- Un restaurante tiene un nombre (`name`), una dirección (`address`), un úmero de teléfono (`phone_number`), una categoría (`category`) y puede tener muchos reviews.
- Un review tiene una calificación (`rating`), un contenido (`content`) y pertenece al restaurante.

Asegúrate de pensarlo dos veces antes de seleccionar el tipo de datos.¡No siempre resulta ser la primera selección!

**Pregunta**:¿Puedes dibujar este esquema simple en [db.lewagon.com](http://db.lewagon.com)? Háblalo con tu compañero/a (buddy).

#### Validación

- Un restaurante tiene que tener un nombre (name), una dirección (address) y una categoría (category).
- La categoría de un restaurante debe pertenecer a esta lista fija: `["chinese", "italian", "japanese", "french", "belgian"]`.
- Cuando un restaurante es eliminado, todos sus reviews también deben ser eliminados
- Un review debe pertenecer a un restaurante.
- Un review debe tener un contenido (content) y una calificación (rating).
- La calificación de un review debe ser un número entre 0 y 5.

Valida todos los tests de los modelos antes de empezar a trabajar con las rutas. Puedes usar el siguiente comando:

```bash
rspec spec/models
```
Para correr tests selectivamente en la carpeta `spec/models`.

También puedes testear tu código manualmente con la `rails console`.¡No olvides `¡recargar!` entre cada cambio que hagas en el código!

```bash
rails c
> bristol = Restaurant.new(name: "Epicure", category: "french")
> bristol.valid?              # Should return false
> bristol.address = "75008 Paris"
> bristol.valid?              # Should return true
> bristol.save                # Insert into DB and set id
> yummy = Review.new(content: "yummy yummy", rating: 4)
> yummy.restaurant = bristol  # Set foreign key restaurant_id
> yummy.save
> bristol.reviews             # Should contain the yummy review
> yummy.restaurant            # Should return the bristol restaurant
```

### Seed

- Alimenta tu base de datos de restaurante en `db/seeds.rb` con al menos 5 registros de restaurantes válidos.
- Corre `rails db:seed` para iniciar el script del seed.

### Rutas / Controladores

Pregntarse a uno mismo/a qué rutas necesitamos es un paso muy importante en el proceso de creación de la app. **Las rutas deben reflejar exactamente los user stories de tus productos**. Así que vamos a definir lo mínimo que tiene nuestro producto aquí:

- Un visitante puede ver la lista de todos los restaurantes.

```
GET "restaurants"
```
- Un visitante puede agregar un nuevo restaurante y ser redireccionado a la vista `show` de ese nuevo restaurante.

```
GET "restaurants/new"
POST "restaurants"
```

- Un visitante puede ver los detalles de un restaurante con todos sus reviews.

```
GET "restaurants/38"
```

- Un visitante puede agregar un review a un restaurante.

```
GET "restaurants/38/reviews/new"
POST "restaurants/38/reviews"
```
- ¡Y eso es todo!


En nuestro MVP, un visitante no puede actualizar / borrar un restaurante ni un review. Este es el papel del administrador (e.g. **tú**). Como programador tienes el poder de manipular la base de datos (DB) desde la `rails console` si quisieras actualizar / borrar algún registro.

Sabemos que es un MVC muy básico pero solo debemos entender que **cada ruta es un la representación de una user story**. No escribas las 7 rutas CRUD ciegamente para cada modelo de tu app. Esa es la mejor manera de confundirse con tu propio producto y olvidar lo que el MVP realmente es.

¡Es hora de implementar todas las rutas que necesites para crear este producto!

**Pista:** para manejar la ruta `GET "restaurants/38/reviews/new"`, tendrás que usar recursos anidados ([nested resources])(http://guides.rubyonrails.org/routing.html#nested-resources).

### Vistas

¡Prestemos atención al frontend ya que eso es lo que los/las usuarios/as van a ver! Sigue [esta guía](https://github.com/lewagon/rails-stylesheets/blob/master/README.md) para configurar el frontend de tu app Rails si no lo hiciste al inicio de este desafío (⚠️ solo haz la sección de **configuracion**.¡No intentes implementar **Bootstrap JS**. Eso lo veremos mañana!).

#### Distribución (layouts) / partials

Recuerda refactorizar tus vistas usando distribuciones y partials. Por ejemplo:

- La distribución de la aplicación puede incluir una barra de navegación Bootstrap con enlaces a la lista de restaurantes y al formulario de creación de un restaurante.
- Los formularios pueden colocarse en un `partial` para hacer que tu código HTML sea más legible.

#### Helpers

Cuando uses helpers de Rails como `link_to`, puedes pasarle un hash de atributos HTML. Esto te permite agregarle clases CSS de Bootstrap a tus enlaces. Por ejemplo:

##### [link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)

```erb
<%= link_to "See details", restaurant_path(restaurant), class: "btn btn-primary"%>
```

Esto genera el siguiente HTML:

```html
<a href="/restaurants/3" class="btn btn-primary">See details</a>
```

##### [form_for](http://guides.rubyonrails.org/form_helpers.html)

Pero ten cuidado. Las URL de tus reviews ahora están anidadas en `/restaurants/:restaurant_id`. Esto significa que no puedes usar `form_for` de la misma manera que lo hiciste con elementos no anidados (non-nested resources). Si escribes:

```erb
<%= form_for(@review) do |f| %>
  <!-- [...] -->
<% end %>
```
Generará este HTML:

```html
<form action="/reviews">
  <!-- [...] -->
</form>
```

Eso no es lo que queremos porque **no tenemos una ruta para hacer `POST de "reviews"`**. En cambio, tendrás que usar la sintaxis de recursos anidados para el `form_for`:

```erb
<%= form_for [@restaurant, @review] do |f| %>
  <!-- [...] -->
<% end %>
```

Eso generará el siguiente formulario HTML:

```html
<form action="/restaurants/42/reviews">
  <!-- [...] -->
</form>
```

Ahora esta URL es consistente con la ruta `POST "restaurants/:restaurant_id/reviews"` que definiste en `routes.rb`.¡Siii! Para obtener más información al respecto, lee  [este post](http://stackoverflow.com/questions/2034700/form-for-with-nested-resources).

**Pista:** Instala la gema [simple_form](https://github.com/plataformatec/simple_form) para obtener formularios compatibles con Bootstrap con sintaxis más ligeras.

### Mejora tu app

**Una vez que hayas terminado tu primera version de tu resto-review app**, intenta mejorarla metiendo tu formulario de reviews dentro de cada vista show de "restaurant". Esto quiere decir que tus nuevas rutas serán:

```
GET "restaurants"
GET "restaurants/new"
GET "restaurants/38"
POST "restaurants"
POST "restaurants/38/reviews"
```
