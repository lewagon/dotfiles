## Contexto y Objetivos

¡Felicitaciones! Ya eres experto en Active Record 😊. Miremos en retrospectiva lo que hemos aprendido desde el primer día.

- Almacenar información en variables
- Definir métodos para implementar comportamientos en argumentos y reusar código
- Usar algo simple como un entero y una cadena de texto (`Integer`, `String`) o complejo como un Hash y un arreglo (`Hash`, `Array`).
- Usar condiciones con `if`
- Hacer bucles (loops) en colecciones con `for`, `while` o `Enumerable#each`

Ahora que sabes todo esto puedes confiar en que sabes las bases de cualquier lenguaje de programación. Si entiendes estos conceptos, puedes considerarte como un programador y serás capaz de aprender cualquier lenguaje de programación orientado a objetos rápidamente. Solo tendrás que descubrir cómo los conceptos descritos anteriormente se aplican en dicho lenguaje. Luego solo tendrás que aprender la sintaxis pero no los conceptos.

A partir de ahora empezarás a trabajar con conceptos más complejos que nos ayudarán a crear programas más grandes y complicados.

- Class: para encapsular **datos** y **comportamientos** en un objeto
- **MVC** para crear programas donde cada clase tenga una sola responsabilidad
- Active Record: una capa sobre la base de datos para consultas SQL (y escribir código Ruby en lugar de SQL).

Ya nos estamos acercando muuuucho a Rails :).
Sin embargo, todavía nos falta algo, y lo sabes. Es la Vista.
¡Estamos acá para crear páginas web, no herramientas de líneas de comando! ¿Dónde está el HTML? y ¿el CSS?

¡Juguemos con la gema [Sinatra](http://www.sinatrarb.com) para tener una previa de lo genial que se verá!

## Configuracion

Instala las gemas que se especifican en tu `Gemfile` con el siguiente comando:

```bash
bundle install
```

Ya te dimos la migración y el seed. Correlos con:

```bash
rake db:drop db:create db:migrate db:seed
```
Corre la aplicación Sinatra.

```bash
ruby lib/app.rb
```

¡Para mirar, puedes ir a [http://localhost:4567](http://localhost:4567)! Estás corriendo un pequeño servidor web y estás accediendo a él desde tu navegador. ¡Dile adiós a las líneas de comando!

## Fundamentos sobre Sinatra

El archivo `app.rb` funciona como un controlador y el ruteo lo maneja Sinatra.
Ya hemos creado un método de controlador para manejar el root de la página web. Sinatra mapea el URL en el navegador con el método adecuado en `app.rb`. Para más información, échale un vistazo a la [documentación de ruteo](http://www.sinatrarb.com/intro.html#Routes).

```ruby
# app.rb
# [...]

get '/' do  # <- Router part

  # [...]   #
  # [...]   # <- Controller part
  # [...]   #

end
```

Antes de empezar a escribir tu código, lee sobre Vistas (Views), Ruteo (Routing) y `params` [aquí](https://github.com/lewagon/sinatra-101#views).

## ERB

¿Has escuchado de **templating**? Es una manera de escribir HTML en la cual puedes inyectar datos **dinámicamente** a través de código.

En un framework Ruby como Sinatra, podemos usar **erb** (embedded Ruby).

La sintaxis es la siguiente:

```erb
<% first_name = "Boris" %>

<h1>Hello, I'm <%= first_name %></h1>
```

Usar  `<% %>` para el código que **no quieres mostrar** y  `<%= %>` cuando quieras **inyectar** un resultado en el HTML.

Normalmente definimos variables en tu controlador:

```ruby
get '/' do
  @first_name = "Boris" # <-- notice the `@` to make it available in the view!
  erb :home
end
```

Y lo usarás en tu vista `home.erb`:

```erb
<h1>Hello, I'm <%= @first_name %></h1>
```

¡Asegúrate de definir **variables de instancia con `@`** en tu controlador para aquellas variables que quieras usar en tus vistas!

**¡Rails también usa erb!**, así que tomate el tiempo de leer detalladamente [esta sección](https://github.com/lewagon/sinatra-101#passing-stuff-to-the-view).

## Especificaciones

Este ejercicio es muy abierto. Estas son algunas de las cosas por donde puedes empezar:

- Muestra todos los posts en la página de inicio (homepage)
- Cada post debe ser un enlace. Al hacer clic se abrirá una nueva pestaña e irás a una página web.
- Muestra los posts en orden de voto descendiente (ve los [`scopes`](http://guides.rubyonrails.org/active_record_querying.html#scopes)).
- [Difícil]: agrega un formulario en la parte superior para subir un post (pista: usa una ruta `post` en `app.rb`).
- [¡Muy dificil!]: agrega una manera de votar por un post.

¡Que lo disfrutes!

## Compartir

Siéntete libre de compartir tu trabajo en Slack con [`ngrok`](https://ngrok.com/). Instala `ngrok` (con `brew install --cask ngrok` o [manualmente en  Ubuntu](https://ngrok.com/download)) y correlo en otra ventana.

```bash
ngrok http 4567
```

¡Asegúrate de que tu url es pública  (`*.ngrok.com`) para que puedas compartirla con todos!
