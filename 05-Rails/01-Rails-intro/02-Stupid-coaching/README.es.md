## Setup

Ya deberías tener `rails` instalado. Compruébalo con:

```bash
rails -v
# You should see your rails version here
```

Si no, vuelve a la sección del setup para [macOS](https://github.com/lewagon/setup/blob/master/macos.md#installing-some-gems), [Windows](https://github.com/lewagon/setup/blob/master/windows.md#installing-some-gems) o [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#installing-some-gems).

## Contexto y Objetivos

¿Recuerdas tus primeras semanas en Ruby? Solo teníamos la Terminal para la interfaz programa-usuario. Se terminaron esos días.¡Ahora usaremos Rails! Esto significa lo siguiente:

- La interfaz programa-usuario es ahora tu **navegador**
- La única manera de comunicarte con tu app Rails es por medio de **peticiones HTTP**.

Aquí no hay `rake`. Otra cosa, no crees tu app Rails en  `fullstack-challenges`.

```bash
cd ~/code/<user.github_nickname>
rails new rails-stupid-coaching --skip-active-storage --skip-action-mailbox
cd rails-stupid-coaching
git add .
git commit -m "rails new"
gh repo create --public --source=.
```

```bash
git push origin master
```

Agregamos el flag `--skip-active-storage` & `--skip-action-mailbox` para evitar la instalación de [Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html) & [Action Mailbox](https://guides.rubyonrails.org/action_mailbox_basics.html) que no necesitamos por ahora.

**Objetivo**: Implementaremos una aplicación Rails simple con 2 páginas:

1. La primera página es un formulario con una entrada (input) donde le/la usuario/a puede escribirle una pregunta al Coach
1. Una vez que se envía dicho formulario, el/la usuario/a es redirigido/a hacia otra página donde él/ella verá su pregunta y la respuesta del coach.

¡Eso es todo!

## Especificaciones

Familiarízate con [lo básico de la línea de comandos de Rails](http://guides.rubyonrails.org/command_line.html#command-line-basics). Para este ejercicio por lo menos debes saber hacer lo siguiente:

- Crear una nueva app Rails
- Iniciar un servidor web para abrir tu app localmente
- Generar un nuevo controlador a partir de la línea de comando
- Verificar tus rutas con los comandos `rails` relevantes.

### Inicia un servidor rails

Todos los programadores empiezan a trabajar iniciando un servidor y abriendo el navegador para testear en **vivo** las funcionalidades que van creando. Adelante:
- inicia el servidor en tu Terminal
- abre [localhost:3000](http://localhost:3000) ¡en tu navegador favorito! Deberías ver la página de bienvenida de Rails.

Cada vez que escribas algo de código en un archivo, guárdalo y refresca el navegador. Obtendrás muchos mensajes de error, así que es importante que te familiarices con ellos.¡De esta manera entenderás el flujo de ejecución de Rails y aprenderás cómo resolver los errores!

### Genera el controlador

Primero lo primero, generaremos un `QuestionsController` que usaremos para nuestras dos páginas.¿Recuerdas el comando `rails` para hacerlo?

### Muestra el formulario: `/ask`

Queremos mostrar la página con un `<form>` para nuestros/as usuarios/as en [localhost:3000/ask](http://localhost:3000/ask). En Rails esto se considera una user story, así que necesitamos más que un archivo HTML para hacer que esto suceda. Para cada acción de usuario/a en Rails, necesitamos escribir código para **(i) una ruta, (ii) una acción y (iii) una vista**.¿Recuerdas el patrón MVC?

**Ruta**

Escribe una ruta simple para la petición `GET /ask` HTTP hacia la acción `ask` del questions controller. Como recordatorio, aquí hay un patrón de una ruta escrita en Rails:

```ruby
verb "url", to: "controller#action"
```

**Controlador**

Después de haber establecido la **ruta**, es hora de escribir la **acción**.¡Agrega una acción `ask` en tu `QuestionsController`!¿Crees que debemos definir una variable de instancia aquí? Bueno, averígualo tú mismo/a mientras escribes el código de la vista!

Ah y por cierto,¿Recuerdas cómo mostrar todas la rutas en la Terminal?

<details><summary markdown='span'>View solution
</summary>

```bash
rails routes
```
Deberías ver lo siguiente:

```
Prefix Verb URI Pattern       Controller#Action
   ask GET  /ask(.:format)    questions#ask
```
</details>

**Vista**

La creación de la vista es el último paso para mostrar el formulario.¡Hagámoslo!¿Recuerdas en qué carpeta debe estar y cómo debe nombrarse? Esa es una de las convenciones de Rails, la [convención acción vista](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/rails/rails-intro/index.html?title=Rails+Basics#/6/6). Refresca la página en [localhost:3000/ask](http://localhost:3000/ask). Si nombraste tu archivo correctamente finalmente ¡verás una página sin error! Por ahora está vacía. Terminemos de agregar el  `<form>`.¿Recuerdas la sintaxis?

```html
<form action="???" data-turbo="false">
  <input type="text" name="???">
  <input type="submit" value="Ask!">
</form>
```

El comportamiento de origen de una etiqueta `<form>` es generar la petición HTTP definida por los atributos `method` y `action`.
- el atributo `method` aloja el **verbo** HTTP (`GET` está predeterminado)
- el atributo `action` aloja la **url** de la petición y se dispara con el envío (submit).

En el `<input>`, el atributo `name` te permite configurar el **key** del parámetro correspondiente.

Aquí queremos que el formulario desencadene nuestra **segunda user story**: `answer` la cual tendrá su ruta en `/answer`. Dale, reemplaza el `???` arriba e intenta enviar (submit) el formulario.

Deberías obtener un **routing error**.¡Ahora vamos a escribir el código de la respuesta!

### Muestra la respuesta del Coach: `/answer`

Es hora de implementar la lógica en la acción `answer` (el segundo paso en el user journey). Para esta segunda user story, sigue la misma metodología que en `1. Display the form`:
- escribe el código de la **ruta**
- escribe el código de la **acción** (en el controlador)
- escribe el código de la **vista**

Y asegúrate de refrescar tu página frecuentemente en tu navegador para que el flujo de ejecución de Rails guíe tu desarrollo!

El `answer.html.erb` mostrará la pregunta que le hiciste a tu coach así como su respuesta. El controlador necesitará leer la pregunta desde `params` y computar la variable de instancia `@answer` para que la vista la muestre. Aquí hay dos peticiones que deberías poder ser capaz de manejar:

- [localhost:3000/answer?question=hello](http://localhost:3000/answer?question=hello)
- [localhost:3000/answer?question=what time is it?](http://localhost:3000/answer?question=what time is it?)

Si no recuerdas la lógica (pobre) del coach, aquí está:

1. Si el mensaje es `I am going to work`, el coach responderá `Great!`
2. Si el mensaje tiene un símbolo de pregunta `?` al final, el coach responderá `Silly question, get dressed and go to work!`.
3. En los demás casos el coach responderá `I don't care, get dressed and go to work!`

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/hello_there.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/can_i_go.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/ask.png)

### Enlace en retroceso desde `/answer` a `/ask`

- Agrega un enlace hacia `/ask` en la vista `answer.html.erb` usando el helper `link_to` de Rails.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/bottom_link.png)

### ¡Haz que se vea bien!

Por ahora no hemos cubierto el aspecto del front-end de un proyecto Rails, pero puedes empezar a diseñar tu aplicación.

**Instalar las hojas de estilo de Bootstrap**

Siguiendo [la documentación](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css), instala Bootstrap en tu aplicación Rails copiando y pegando el enlace en el `head` del layout `application.html.erb`:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

Ahora puedes utilizar cualquier clase de Bootstrap en cualquier lugar de tus vistas Rails 🎉

**Escribir un estilo personalizado**

Escribe tu CSS personalizado en el archivo `app/assets/stylesheets/application.css`. Este archivo está vinculado en el `head` del diseño `application.html.erb` con la etiqueta `stylesheet_link_tag`.

Adelante, que el diseño coincida con las capturas de pantalla 🎨

### Testing (Opcional)

⚠️ Por favor salta esta etapa si todavía no te sientes cómodo/a con la parte interna de Rails. Puedes regresar luego durante el día después de haber completado el ejercicio the Longest Word Game.

Primero, borra el archivo `test/controllers/questions_controller_test.rb` si fue generado. Estaremos trabajando con [**System Testing**](http://guides.rubyonrails.org/testing.html#system-testing). El objetivo de este tipo de testing es automatizar todo el testeo manual de "editar código / ir al navegador / recargar la página / comprobar que esté funcionando". Todo lo que hiciste manualmente en el navegador puede hacerse _por_ medio_ de código!

Usaremos _Headless Chrome_ para el System Testing. Es un navegador sin interfaz de usuario que está bien adaptado a este tipo de tests. Antes de correr tus system tests debes asegurarte de que tienes una versión **reciente** de Chrome en tu sistema (no Chromium). Está disponible tanto para OSX como para Ubuntu.

Después de la instalación puedes abrir el siguiente archivo y reemplazar **todo** su contenido con:

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

Después en el siguiente archivo, **actualiza** esta línea:

```ruby
# test/application_system_test_case.rb
require "test_helper"
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :headless_chrome # Update this line
end
```

¿Listo? Vamos a Rails Testing.

En la Terminal, corre lo siguiente para crear el archivo de test:

```bash
rails g system_test questions
```

Abre el archivo generado en tu editor de texto y escribe tu primer test:

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  test "visiting /ask renders the form" do
    visit ask_url
    assert_selector "p", text: "Ask your coach anything"
  end
end
```

Corre el test en la Terminal con:

```bash
rails test:system
```

⚠️ Si obtienes un error `Webdrivers::BrowserNotFound: Failed to find Chrome binary`, debes instalar la última versión de Chrome:

```bash
 # macOS
brew install --cask google-chrome

# Ubuntu
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
rm -rf google-chrome-stable_current_amd64.deb
```

Una vez que lo hayas instalado, reinicia las pruebas con `rails test:system`.

Ahora que se están ejecutando, si prestas atención al detalle del escenario, puedes leer el test de la siguiente manera:

1. Ve a la página `/ask`
2. Asegúrate de que la página haya sido renderizada y que podamos leer `Ask your coach anything`.

¡Genial! Este es nuestro primer test de funcionalidad.¿Qué hacemos ahora? Si piensas en lo que hiciste _manualmente_, te das cuenta de que era escribir algo de texto (con diferentes escenarios) y luego hacer clic en el botón "Ask".¡Hagamos eso con tests!

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  # [...]

  test "saying Hello yields a grumpy response from the coach" do
    visit ask_url
    fill_in "question", with: "Hello"
    click_on "Ask"

    assert_text "I don't care, get dressed and go to work!"
  end
end
```

¿Te intriga la sintaxis?¡Es la gema **capybara**! Es muy útil en este contexto de testing donde debemos automatizar el cliqueo en enlaces y botones o el llenado de formularios. Échale un vistazo a [su DSL](https://github.com/teamcapybara/capybara#the-dsl).

Ahora es tu turno✌️. Intenta implementar otros escenarios en tus system tests.

**Capturas de pantalla**

El equivalente a `binding.pry` en el mundo de los tests es tomar capturas de pantalla. Agrega la gema `launchy` a tu `Gemfile` (en el grupo `:test`):

```ruby
# Gemfile
group :test do
  # [...]
  gem 'launchy'
end
```

Y corre `bundle install`. Solo tienes que escribir lo siguiente en tu código:


```bash
take_screenshot
```

Tomará las capturas de pantalla en el _Headless Chrome_. Dichas capturas irán a la carpeta `tmp/screenshots` folder.
