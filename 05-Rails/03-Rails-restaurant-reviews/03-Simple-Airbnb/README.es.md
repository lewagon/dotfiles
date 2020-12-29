## Contexto y Objetivos

Queremos crear un clon simple de Airbnb (como [este](https://rails-simple-airbnb.herokuapp.com)). Estas deben ser las únicas user stories de nuestra app:

- Como usuario/a, puedo ver la lista de todos los apartamentos disponibles en nuestra página web.
- Como usuario/a, puedo publicar un apartamento en la página web especificando su nombre y dirección
- Como usuario/a, puedo ver información detallada de un apartamento dado
- Como usuario/a, puedo editar detalles de un apartamento en caso de haber cometido un error
- Como usuario/a, puedo borrar un apartamento si ya no lo quiero ofrecer para la renta.

Aquí no hay `rake`. También recuerda no crear tu app Rails en `fullstack-challenges` ⛔️

```bash
cd ~/code/<user.github_nickname>
rails new rails-simple-airbnb --skip-active-storage --skip-action-mailbox
cd rails-simple-airbnb
git add .
git commit -m "rails new"
gh repo create
git push origin master
```

## Especificaciones

### 1 - Modelo

Genera el modelo `Flat` usando el generador Rails correcto. STiene que tener las siguientes columnas. ¡También puedes agregar las columnas adicionales que desees! 😊

- `name`, como una cadena de caracteres (`string`)
- `address`, como una cadena de caracteres (`string`)
- `description`, como `text`
- `price_per_night`, como un entero (`integer`)
- `number_of_guests`, como un entero (`integer`)

### 2 - Controlador y Rutas

Genera un `FlatsController` vacío (sin acciones)usando el generador Rails correcto

Vamos a empezar agregando nuestras 7 rutas CRUD en nuestro `config/routes.rb` ya que ¡las vamos a crear todas! ¿Qué palabra clave se usa para generarlas todas al mismo tiempo?

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

### 4 - Como usuario/a, puedo ver la lista de todos los apartamentos disponibles.

Agrega la acción adecuada en nuestro `FlatsController` (pista: Es `index` 😉). La acción en el controlador debe recuperar todos los apartamentos en nuestra base de datos (¡para eso tenemos Active Record!) y pasarlos a la vista.

La lista debe hacer un bucle sobre ellas y mostrarlas como se muestra en la captura de pantalla siguiente. Empieza a diseñar desde el principio. Puedes usar [Font Awesome](https://fontawesome.com/icons) o [Materialize](http://materializecss.com/icons.html) para los icons.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index.png).

### 5 - Como usuario/a, puedo publicar un apartamento

Recuerda que para crear un apartamento se necesitan dos rutas. Una de ellas muestra el formulario de creación y la otra maneja la petición `POST` que se genera cuando se envía el formulario. Intenta usar el helper `form_for` directamente en la vista y ¡haz que se vea bien!

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index.png).

### 6 - Como usuario/a, puedo ver información detallada de un apartamento dado

Es hora de agregar la acción adecuada para mostrar toda la información de un apartamento dado. ¿Cómo podemos saber qué apartamento quiere ver el/la usuario/a?

También actualiza la vista `index.html.erb` con el helper `link_to` para crear enlaces (links) dinámicos.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/show.png).

### 7 - Como usuario/a, puedo editar detalles de un apartamento

También podemos hacer que sea posible editar un apartamento para corregir errores ortográficos cometidos durante su creación.¿Qué dices si refactorizamos un poco y ponemos nuestro formulario `new.html.erb` en un partial?

¡No olvides actualizar `index.html.erb` y `show.html.erb` con los nuevos enlaces (links) de edición!

### 9 - Adición de una `picture_url` al modelo flat (Opcional)

Agrega un atributo url de imagen al modelo flat (solo para almacenar una cadena de caracteres (string) de la url de una imagen). Actualiza los formularios de creación y actualización para permitirle al/a la usuario/a especificar una imagen del apartamento que será mostrada en la página web. También puedes actualizar las páginas index y show con la nueva imagen.

Te recomendamos usar [Unsplash](https://unsplash.com/search/photos/house) para alimentar tu seed con buenas imágenes de viviendas.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/show_2.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_3.png).

### 10 - Filtro de apartamentos (Opcional)

¡Intenta agregar una barra de búsqueda para filtrar apartamentos en el index y poder encontrar el apartamento perfecto!

- ¿Cómo podemos encontrar lo que busca el/la usuario/a?
- ¿Qué método ActiceRecord podemos usar para crear un buscador simple? Esto te puede ayudar a comenzar `@flats = Flat.where("name LIKE '%garden%'")`. Asegúrate de que entiendas esa línea de código antes de dar un paso más
- ¿Cómo podemos asegurarnos de que la página siga funcionando como el index tradicional aunque el/la usuario/a no esté buscando nada?
- ¿Cómo podemos asegurarnos de que la entrada (input) se complete parcialmente con la consulta de búsqueda cuando el usuario/a la escriba?

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_4.png).
