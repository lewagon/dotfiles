## Contexto y Objetivos

¡Es hora de implementar el "Longest-word game" con una interfaz web interesante! A algunos de ustedes les parecerá familiar.

Antes de ir al ejercicio, [lee las reglas](https://github.com/lewagon/fullstack-challenges/tree/master/01-Ruby/06-Parsing/02-Numbers-and-Letters).

⛔️ Si ya trabajaste en este ejercicio, por favor no copies/pegues soluciones de ejercicios anteriores. Trata de reescribirlos desde cero.

## Configuración

Aquí no hay `rake`. Otra cosa, no crees la app Rails en `fullstack-challenges`. Deberías crearla en el siguiente directorio (lamentablemente, Kitt ya no mostrará tu puntaje)

```bash
cd ~/code/<user.github_nickname>
rails new rails-longest-word-game --skip-active-storage --skip-action-mailbox
cd rails-longest-word-game
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## Especificaciones

Pensemos en la interfaz de usuario (UI) de nuestro juego.¿Qué necesitamos?

1. Una página que muestre los parámetros del juego (letras aleatorias) con un formulario para que el/la usuario/a escriba una palabra. Un botón para enviar el formulario.
2. Una página que reciba dicho formulario, que compute el puntaje del usuario y lo muestre.

### 1 - Ruta y Controlador

Usando la línea de comando adecuada, genera el `GamesController` con dos acciones `new` y `score`. La acción `new` será usada para mostrar una nueva cuadrícula (grid) aleatoria y un formulario. El formulario será enviado (con `POST`) a la acción `score`.

Abre tu archivo `routes.rb` y haz pequeños cambios en las rutas que han sido generadas automáticamente por los comandos anteriores. Al final, el `rails routes` debe devolver algo como lo siguiente:

```bash
Prefix Verb URI Pattern      Controller#Action
   new GET  /new(.:format)   games#new
 score POST /score(.:format) games#score
```

### 2 - Generación de un nuevo juego

Échale un vistazo a tu viejo código Ruby.¿Cómo generaste un arreglo (`Array`) de letras aleatorias? En la acción `new` del `GamesController`, crea una nueva variable de instancia `@letters` que almacene estas letras aleatorias del alfabeto. Luego muestrala en la vista. Debes obtener algo como lo siguiente:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/new_game.png).

### 3 - Envío de una palabra

Necesitamos agregar un formulario debajo de las letras para que el/la usuario/a pueda agregar una sugerencia y enviarla.

Agrega un `<form>` en tu vista. Debe hacer el `POST` a la acción `/score` en el `GamesController`.

Tendrás que agregarle la siguiente línea a tu `form`:

```erb
<%= hidden_field_tag :authenticity_token, form_authenticity_token %>
```
Esto agrega un campo de entrada oculto con un `authenticity_token` que asegura que la petición `POST` venga de tu página web y no de otra.¡Lee [este hilo de comentarios en Stack overflow](https://stackoverflow.com/questions/941594/understanding-the-rails-authenticity-token) si quieres saber más sobre [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) y la razón por la cual Rails agrega este nivel de seguridad por defecto!

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/new_game_with_form.png).

### 4 - Del otro lado del formulario

Comprobemos que el formulario haya sido configurado correctamente inspeccionando lo que obtenemos en `params`. Hay dos maneras. La primera es agregando `raise` en el código de tu controlador:

```ruby
# app/controllers/games_controller.rb

# [...]
  def score
    raise
  end
```

Ve a la página `/new`. Agrega una palabra y envía el formulario. Rails te debería arrojar **RuntimeError** con una consola en la parte inferior. Ahí puedes escribir `params` para inspeccionar lo que fue enviado:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/raise.png).

La forma más limpia es agregando la gema `pry-byebug` (puedes deshacerte de la que viene por defecto `byebug` de `rails new`) y agrega `binding.pry` en el código de tu controlador. De esta manera puedes pausar la petición Rails en la Terminal, inspeccionar y escribir `continue` para dejarla ir y terminar de renderizar la vista.

```ruby
# Gemfile

# [...]
group :development, :test do
  # gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-byebug'
end
```

Tienes que hacer `bundle install` y reiniciar `rails s` para que esto haga efecto.

### 5 - Cómputo del puntaje

Es hora de implementar la lógica de `GamesController#score`. ¿Tenemos toda la información a mano?¿Qué necesitamos?¿Tenemos que pasar más información por medio de la petición `POST`? Échale un vistazo a [`hidden_field_tag`](http://api.rubyonrails.org/v5.1/classes/ActionView/Helpers/FormTagHelper.html#method-i-hidden_field_tag).

Queremos manejar tres escenarios:

1. La palabra no puede crearse a partir de la cuadrícula (grid) original
2. La palabra es válida de acuerdo a la cuadrícula (grid) pero no es una palabra en ingles válida
3. La palabra es válida de acuerdo a la cuadrícula (grid) y .es una palabra en inglés válida

(Puedes usar [esta API](https://wagon-dictionary.herokuapp.com/) para comprobar que la palabra sea válida.)

En la parte inferior de los resultados, agrega un `link_to` para regresar a la página New game.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/cant_be_built.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/not_english_word.png).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/congrats.png).

### 6 - Agregando el puntaje (Opcional)

El/la usuario/a jugará muchas partidas, así que tiene sentido almacenar cada puntaje y agregarlo a un gran total. Podemos implementar una regla donde el puntaje para cada partida sea el número de letras de cada palabra válida (pero también puedes tomar el cuadrado del número de letras o hacer otra cosa).

El día de hoy no es sobre base de datos, así que no tienes Active Record para ayudarte a almacenar información y recuperarla entre dos peticiones HTTP. En Rails hay otro mecanismo para persistir información **a través de** peticiones HTTP: la [sesión](http://guides.rubyonrails.org/action_controller_overview.html#session).

Intenta usar una sesión Rails para almacenar, computar y mostrar el puntaje total.

### 7 - Testing (Opcional)

⚠️ Haz caso omiso a esta sección si aún no te sientes cómodo con la parte interna de Rails. Puedes volver a esta parte más adelante el día de hoy después de haber completado el ejercicio del Luego de Palabras más Largo.

Primero borra el archivo `test/controllers/games_controller_test.rb` si fue generado. Vamos a trabajar con [**System Testing**](http://guides.rubyonrails.org/testing.html#system-testing). El objetivo de este tipo de testing es automatizar todo el testeo manual de "editar código / ir al navegador / recargar la página / comprobar que funciona".¡Todo lo que hiciste manualmente puede hacerse _por_medio_de_ código!

Usaremos _Headless Chrome_ para System Testing. Es un navegador sin interfaz de usuario que está bien adaptado a este tipo de tests automatizados. Primero asegúrate de que tienes una versión **reciente** de Chrome en tu sistema (no Chromium). Está disponible tanto para OSX como Ubuntu.

 Después de la instalación, el siguiente archivo y reemplaza **todo** su contenido por:

```ruby
# test/test_helper.rb
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  fixtures :all
end

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new(args: %w[no-sandbox headless disable-gpu window-size=1400,900])
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end
Capybara.save_path = Rails.root.join('tmp/capybara')
Capybara.javascript_driver = :headless_chrome
```

Luego, en el siguiente archivo, **actualiza** esta línea

```ruby
# test/application_system_test_case.rb
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :headless_chrome # Update this line
end
```

¿Listo? Vamos a Rails Testing.

En la Terminal, corre lo siguiente para crear el archivo de test:

```bash
rails g system_test games
```

¡Genial!¡Tenemos un archivo totalmente nuevo en ` test/system/games_test.rb`!¿Qué queremos testear?

1. Que al ir a la página de nueva partida (`/new`) se muestre una cuadrícula (grid) aleatoria
1. Que puedas llenar el formulario con una palabra aleatoria, hacer clic en el botón "play" y obtener un mensaje diciendo que la palabra no está en la cuadrícula (grid)
1. Que puedas llenar el formulario con una palabra de una letra consonante, hacer clic en el botón "play" y obtener un mensaje diciendo que la palabra no es una palabra en inglés válida
1. Que puedas llenar el formulario con una palabra en inglés **válida** (esto es difícil porque hay aleatoriedad!), hacer clic en "play" y obtener el mensaje "Congratulations".

Hagamos el primero juntos:

```ruby
# test/system/games_test.rb
require "application_system_test_case"

class GamesTest < ApplicationSystemTestCase
  test "Going to /new gives us a new random grid to play with" do
    visit new_url
    assert test: "New game"
    assert_selector "li", count: 10
  end
end
```

Ejecuta la prueba en la terminal con:

```bash
rails test:system
```

⚠️ Si obtienes un error `Webdrivers::BrowserNotFound: Failed to find Chrome binary`, necesitas instalar la última versión de Chrome:

```bash
 # macOS
brew install --cask google-chrome

# Ubuntu
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
rm -rf google-chrome-stable_current_amd64.deb
```

Una vez que lo hayas instalado, reinicia las pruebas con `rails test:system`.

En este test, estoy visitando la URL `/new` y asegurándome de que obtenga diez letras con que jugar.

¡Ahora es tu turno! Intenta implementar los otros tres usando los métodos `fill_in` and `click_on` de Capybara.

