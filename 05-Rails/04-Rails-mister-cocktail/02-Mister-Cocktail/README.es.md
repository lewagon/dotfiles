## Contexto y Objetivos

¡Es hora de hacer una app de 3 modelos! Y si. Vamos a introducir las relaciones muchos a muchos (many to many `n:n`). Bueno y ¿qué es lo que vamos a crear? Un gestor de cócteles (cocktail manager) para almacenar nuestras recetas de cócteles favoritas.

## Generación de la app Rails

¡Instala `yarn` si todavía no lo has hecho!

```bash
# macOS
brew install yarn

# Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

**Nota**: ¡Ya deberías ser capaz de seguir estos pasos sin esta guía! No olvides `--database=postgresql` (hablaremos de eso mañana). 😉

```bash
cd ~/code/<user.github_nickname>
rails new rails-mister-cocktail --database=postgresql --skip-action-mailbox -T
cd rails-mister-cocktail
```

Ahora necesitamos crear la base de datos postgresql para esta nueva app Rails.

```bash
rails db:create
```

Configura git, crea un repositorio en GitHub y haz el push de nuestra estructura.

```bash
git add .
git commit -m "rails new"
gh repo create
git push origin master
```

Importa las especificaciones del/la profesor/a para poder hacer `rake` de lo que creamos.

```bash
echo "gem 'rspec-rails', '4.0.0.beta3', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
rails db:migrate
rails db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-mister-cocktail-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

Podrás testear tu código con:

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
rspec spec/models                # Launch tests
```

Antes de empezar a escribir código, no olvides configurar el Front en tu app Rails. Agrega las dependencias de Bootstrap y JavaScript como viste en la clase de esta mañana.

```bash
yarn add bootstrap jquery popper.js
```

Y también las gemas que vamos a necesitar:

```ruby
# Gemfile
gem 'autoprefixer-rails'
gem 'font-awesome-sass', '~> 5.12.0'
gem 'simple_form'
```

```bash
bundle install
rails generate simple_form:install --bootstrap
```

Ahora descarga las hojas de estilo (stylesheets) de Le Wagon:

```bash
rm -rf app/assets/stylesheets
curl -L https://github.com/lewagon/stylesheets/archive/master.zip > stylesheets.zip
unzip stylesheets.zip -d app/assets && rm stylesheets.zip && mv app/assets/rails-stylesheets-master app/assets/stylesheets
```

Para tener la receptividad de Bootstrap también necesitarás agregar lo siguiente a tu `<head>`:

```html
<!-- app/views/layouts/application.html.erb -->

<!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <!-- [...] -->
```

Finalmente agrega la librería de Bootstrap JS usando webpack:

```js
// config/webpack/environment.js
const { environment } = require('@rails/webpacker')

// Bootstrap 4 has a dependency over jQuery & Popper.js:
const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

module.exports = environment
```
```js
// app/javascript/packs/application.js
import 'bootstrap';
```

No olvides hacer el `commit` y el `push` de tu trabajo frecuentemente.

## Especificaciones

### 1 - Modelos

Ve a [db.lewagon.com](http://db.lewagon.com) y dibuja el esquema con tu compañero/a (buddy). Las tablas que necesitamos son las siguientes: `cocktails`, `ingredients` y `doses`. Piensa en las relaciones que hay entre las tablas y en cuál de ellas almacena las referencias (*references*). 😉

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/db.png).

**Importante**
No uses `rake` sino:

```bash
rspec spec/models
```

Para solo correr tests en la carpeta `spec/models`. Asegúrate de que todas estén en verde antes de dar un paso más.

#### Atributos

- Un cóctel (**cocktail**) tiene un nombre (name) e.g. `"Mint Julep"`, `"Whiskey Sour"`, `"Mojito"`
- Un ingrediente (**ingredient**) tiene un nombre (name) e.g. `"lemon"`, `"ice"`, `"mint leaves"`
- Una dosis (**dose**) es la cantidad que se necesita de cada ingrediente en un cóctel (e.g. el Mojito necesita **6cl** de limón). Así que cada dosis hace referencia a un cóctel, un ingrediente y una descripción.

#### Validación

- Un cóctel debe tener un nombre (name) único.
- Un ingrediente debe tener un nombre (name) único.
- Una dosis debe tener una descripción, un cóctel y un ingrediente. También debe tener pares de cóctel et ingrediente ([cocktail, ingredient]) únicos.

#### Asociaciones

- Un cóctel tiene muchas dosis
- Un cóctel tiene muchos ingredientes a través de dosis
- Un ingrediente tiene muchas dosis
- Una dosis pertenece a un ingrediente
- Una dosis pertenece a un cóctel
- No puedes eliminar un ingrediente si es utilizado en al menos un cóctel.
- Cuando eliminas un cóctel, también debes eliminar las dosis asociadas (pero no los ingredientes ya que pueden estar enlazados a otros cócteles).

### 2 - Seed de ingredientes

**Nuestra app no le permitirá a los/las usuarios/as crear ingredientes**.
En lugar de ello generaremos un seed estático de ingredientes que se podrán seleccionar.
Por ejemplo, escribe este código de seed

```ruby
# db/seeds.rb
Ingredient.create(name: "lemon")
Ingredient.create(name: "ice")
Ingredient.create(name: "mint leaves")
```

**Opcional**: diviértete y agrega ingredientes reales usando [esta lista JSON](http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list) (con las librerías Ruby `open-uri` y `json`).

### 3 - Ruta, Controlador y Vistas de cócteles

**Importante**
No uses `rake` en la escritura del código aplicado. Es hora de usar un `rails s` en tu Terminal y abrir un navegador en [http://localhost:3000/](http://localhost:3000/). Siempre escribe código en silo:

- empieza con la **ruta**,
- luego empieza a escribir el código del **controlador**,
- comienza a escribir el código de la **vista** y refresca tu navegador.

¡Cuando tu funcionalidad esté lista (y se vea bien), avanza a la siguiente y repite este proceso!

Cuando pienses que ya has terminado **todo** el desafío, usa `rake` para asegurarte de que cumple con todas las especificaciones.

**Funcionalidades (features)**
Una vez más, debes tener una idea precisa de las funcionalidades de tu app para poder crear las rutas. Aquí hay una lista de funcionalidades:

- Un/a usuario/a puede ver la lista de todos los cócteles

```
GET "cocktails"
```

- Un/a usuario/a puede ver los detalles de un cóctel determinado con la dosis necesaria de cada ingrediente

```
GET "cocktails/42"
```

- Un/a usuario/a puede crear un nuevo cóctel

```
GET "cocktails/new"
POST "cocktails"
```

### 4 - Ruta, Controlador y Vistas de las Dosis

- Un/a usuario/a puede agregar una nueva dosis (el par ingrediente/descripción) a un cóctel existente
- Revisa la [documentación](https://github.com/heartcombo/simple_form#associations) de `simple_form` y lee sobre `f.association` para poder crear fácilmente una lista de selección desplegable (dropdown) para nuestros ingredientes.

```
GET "cocktails/42/doses/new"
POST "cocktails/42/doses"
```

- Un/a usuario/a puede borrar una dosis que pertenezca a un cóctel existente.¿Cómo es que hacemos el enlace de eliminar (delete link)?

```
DELETE "doses/25"
```

¿Necesitamos un `IngredientsController`?

### 5 - Diseño sobre la marcha

¡Es hora de hacer un buen front-end!¡Juega un poco con CSS! 😊¿Puedes crear un diseño digno del Salón de la Fama? Ve a [dribbble](https://dribbble.com/) o [onepagelove](https://onepagelove.com/) para buscar un poco de inspiración.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_1.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_2.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_3.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_4.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_1.png).

No olvides que puedes tener imágenes locales en la carpeta `app/assets/images`. O mejor aún, puedes pedirle al/a la usuario/s una `image_url` cuando cree un cóctel.

### 6 - Formulario de nueva dosis en la página show del cóctel (Opcional)

Intenta poner el formulario de nueva dosis ("New dose form") en la página del cóctel en lugar de tenerlo en una página diferente.¿Qué cambia en las rutas y en los controladores?

### 7 - Select2 en la lista desplegable (dropdown) de ingredientes (Opcional)

¡Intenta agregar un paquete npm a tu app Rails! Sigue las diapositivas para averiguar cómo se agrega `select2` a nuestra lista desplegable (dropdown) de ingredientes.

### 8 - ¡Agrégale reviews a esos cócteles increíbles! (Opcional)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_2.png).

### 9 - Un paso más lejos

- Agrega la posibilidad de buscar cócteles y también agrégale `typed.js` al campo de búsqueda
- Agrega algo de [animación mientras se hace scroll](https://michalsnik.github.io/aos/) en nuestra lista en el index.
