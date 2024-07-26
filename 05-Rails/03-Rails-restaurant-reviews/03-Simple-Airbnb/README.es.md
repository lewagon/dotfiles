## Contexto y Objetivos

Queremos crear un clon simple de Airbnb (como [este](https://rails-simple-airbnb.herokuapp.com)). Estas deben ser las únicas user stories de nuestra app:

- Como usuario, puedo ver la lista de todos los apartamentos disponibles en nuestra página web.
- Como usuario, puedo publicar un apartamento en la página web especificando su nombre y dirección
- Como usuario, puedo ver información detallada de un apartamento dado
- Como usuario, puedo editar detalles de un apartamento en caso de haber cometido un error
- Como usuario, puedo borrar un apartamento si ya no lo quiero ofrecer para la renta.

En este desafío no hay `rake`.

## Creación de la Rails app

Crea una nueva Rails app en tu carpeta GitHub:


```bash
cd ~/code/<user.github_nickname>
rails new rails-simple-airbnb --skip-active-storage --skip-action-mailbox
cd rails-simple-airbnb
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
git submodule add git@github.com:lewagon/rails-simple-airbnb-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
rspec # to run the tests
```

## Configuración del Front-end

### Hojas de estilo de Bootstrap

Siguiendo las instrucciones de [la documentación](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css), instala las hojas de estilo de Bootstrap en tu Rails app copiando y pegando el link tag en el `head` del layout en `application.html.erb`:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

Ahora puedes usar cualquier clase Bootstrap en cualquier lugar de tus vistas de Rails 🎉

### Font Awesome

Añade el `link` tag de Font Awesome en el `head` de tu layout:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">
```

Ahora puedes usar cualquiera de los [íconos gratuitos de Font Awesome](https://fontawesome.com/search?m=free) en cualquier lugar de tus vistas de Rails 🎉

### La gema Simple Form

Para agregar [Simple Form](https://github.com/heartcombo/simple_form) a tu aplicación, agrega la gema a tu Gemfile:

```ruby
# Gemfile
# [...]
gem "simple_form"
```

Luego ejecuta esto:

```bash
bundle install
rails generate simple_form:install --bootstrap
```

### Probar tu código

Siempre que añadas migraciones a tu aplicación (por ejemplo, después de ejecutar `rails g model ...`), no olvides ejecutar también las migraciones **en la base de datos de pruebas** que usamos en nuestras especificaciones:

```bash
rails db:migrate RAILS_ENV=test  # Si agregaste una migración
```

Luego prueba tu código con:

```bash
rspec
```

## Especificaciones

### 1 - Modelo

Genera el modelo `Flat` usando el generador Rails correcto. Tiene que tener las siguientes columnas. ¡También puedes agregar las columnas adicionales que desees! 😊

- `name`, como un `string`
- `address`, como un `string`
- `description`, como `text`
- `price_per_night`, como un `integer`
- `number_of_guests`, como un `integer`

### 2 - Controlador y Rutas

Genera un `FlatsController` vacío (sin acciones) usando el generador Rails correcto

¡Vamos a empezar agregando nuestras 7 rutas CRUD en nuestro `config/routes.rb` ya que las vamos a crear todas! ¿Qué palabra clave se usa para generarlas todas al mismo tiempo?

### 3 - Seed

Podemos crear algunos apartamentos en la `rails console` pero aún mejor es crear un seed para nuestra app. Esto nos va a ayudar en el diseño de las vistas aunque realmente no podemos agregar un apartamento a través de nuestra página web. En el archivo `db/seeds.rb`, crea alrededor de 4 apartamentos. Aquí hay uno para ayudarte a comenzar:

```ruby
Flat.create!(
  name: 'Light & Spacious Garden Flat London',
  address: '10 Clifton Gardens London W9 1DT',
  description: 'A lovely summer feel for this spacious garden flat. Two double bedrooms, open plan living area, large kitchen and a beautiful conservatory',
  price_per_night: 75,
  number_of_guests: 3
)
```

¿Recuerdas por qué usamos `.create!` en lugar de simplemente `.create`? Pregunta por ahí si lo olvidaste. 😊

### 4 - Como usuario, puedo ver la lista de todos los apartamentos disponibles.

Agrega la acción adecuada en nuestro `FlatsController` (pista: Es `index` 😉). La acción en el controlador debe recuperar todos los apartamentos en nuestra base de datos (¡para eso tenemos Active Record!) y pasarlos a la vista.

La lista debe hacer un bucle sobre ellas y mostrarlas como se muestra en la captura de pantalla siguiente. Empieza a diseñar desde el principio. Puedes usar [Font Awesome](https://fontawesome.com/icons) para los icons.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index.png).

### 5 - Como usuario, puedo publicar un apartamento

Recuerda que para crear un apartamento se necesitan dos rutas. Una de ellas muestra el formulario de creación y la otra maneja la petición `POST` que se genera cuando se envía el formulario. Intenta usar el helper `form_with` directamente en la vista y ¡haz que se vea bien!

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/new.png).

### 6 - Como usuario, puedo ver información detallada de un apartamento dado

Es hora de agregar la acción adecuada para mostrar toda la información de un apartamento dado. ¿Cómo podemos saber qué apartamento quiere ver el usuario?

También actualiza la vista `index.html.erb` con el helper `link_to` para crear enlaces dinámicos.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/show.png).

### 7 - Como usuario, puedo editar detalles de un apartamento

También podemos hacer que sea posible editar un apartamento para corregir errores ortográficos cometidos durante su creación. ¿Qué dices si refactorizamos un poco y ponemos nuestro formulario `new.html.erb` en un partial?

¡No olvides actualizar `index.html.erb` y `show.html.erb` con los nuevos enlaces de edición!

### 8 - Como usuario, puedo suprimir un apartamento.

Agreguemos la posibilidad de suprimir un apartamento de nuestro website. ¿Cómo podemos crear un `link_to` para destruir este apartamento y qué acción va realizar el controlador?

Una vez más, actualiza toda nuestra vista para poner este enlace de supresión.

### 9 - Agregar una `picture_url` al modelo flat (Opcional)

Agrega un atributo url de imagen al modelo flat (solo para almacenar un string de la url de una imagen). Actualiza los formularios de creación y actualización para permitirle al usuario especificar una imagen del apartamento que será mostrado en la página web. También puedes actualizar las páginas index y show con la nueva imagen.

Te recomendamos usar [Unsplash](https://unsplash.com/search/photos/house) para alimentar tu seed con buenas imágenes de viviendas.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/show_2.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_3.png).

### 10 - Filtro de apartamentos (Opcional)

¡Intenta agregar una barra de búsqueda para filtrar apartamentos en el index y poder encontrar el apartamento perfecto!

- ¿Cómo podemos encontrar lo que busca el usuario?
- ¿Qué método ActiveRecord podemos usar para crear un buscador simple? Esto te puede ayudar a comenzar `@flats = Flat.where("name LIKE '%garden%'")`. Asegúrate de que entiendas esa línea de código antes de dar un paso más
- ¿Cómo podemos asegurarnos de que la página siga funcionando como el index tradicional aunque el usuario no esté buscando nada?
- ¿Cómo podemos asegurarnos de que la entrada (input) se complete parcialmente con la consulta de búsqueda cuando el usuario la escriba?

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_4.png).
