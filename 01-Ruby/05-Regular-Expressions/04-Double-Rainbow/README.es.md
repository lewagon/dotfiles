## Background & Objectives

Durante el curso de Le Wagon, descubrirás muchas herramientas, servicios y lenguajes de programación. Aquí están los logos de los principales, pero por el momento están en blanco y negro. ¡Este desafío es un juego para revelar sus colores usando las expresiones regulares (regular expressions)!

![Logos](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/double-rainbow_logos.png)


## Especificaciones

¿Cuáles son los colores reales de los logos? Pues están ocultos en un **mensaje secreto**. ¡Tu misión (si decides aceptarla 😊) es crear las regex adecuadas para mostrarlos!

### El mensaje secreto

*Revela los colores de los logos:
Algunos logos tienen formas elegantes y han adoptado un estilo muy icónico.
¡Sin duda es una paleta de colores vivos incluyendo naranja y amarillo brillantes, muchas sombras azules que oscilan entre púrpura e índigo! pero con poco verde*

### Escribe el código de las regex
Abre `lib/double_rainbow.rb` donde encontrarás una serie de métodos que han sido diseñados para extraer texto del mensaje:
- Sigue las pistas e instrucciones para crear tu regex.
- Cada método **toma un string** (recuerda que “string” significa cadena de caracteres”) como parámetro y **devuelve un string**


Cuando tu regex es correcta, seleccionará un color y desbloqueará un badge.

Si necesitas ayuda, utiliza [Rubular](http://rubular.com/)


### Testea tu código
Puedes poner a prueba tu código llamando a tus métodos con el mensaje secreto y corriendo lo siguiente `ruby lib/test.rb`:

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
require_relative "double_rainbow"

secret_message = "Reveal the logos' colors:\
 Elegant shapes, some have evolved to a very iconized style.\
 Definitely a vivid color scheme with bright orange and shiny yellow,\
 many shades of blue, oscillating between purple and indigo! but not much green"

puts last_five_letters(secret_message)
```

**NOTA:** Asegúrate de copiar y pegar todo el string incluyendo los backslashes `\` ya que [escapan](https://blog.appsignal.com/2016/12/21/ruby-magic-escaping-in-ruby.html) los saltos de línea para mantener el `mensaje_ecreto` en un string de una línea. Hacer que tus expresiones regulares coincidan con strings de múltiples líneas puede ser más difícil de lo que crees. ¡Esto lo explican en la [respuesta de StackOverflow](https://stackoverflow.com/questions/4257071/ruby-regex-matches-start-of-line-even-without-m-modifier/4257912#4257912)!
