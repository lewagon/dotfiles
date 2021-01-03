## Contexto y Objetivos

- Entender la diferencia entre un método de clase y un método de instancia.

Cuando uses una gema o un módulo de la librería estándar, tendrás que usar métodos de clase que son **LLAMADOS DIRECTAMENTE SOBRE LA CLASE**, no sobre instancias de clase. Lee las líneas siguientes en IRB:

```ruby
"this is a string object".upcase
["this", "is", "an", "array", "object"].shuffle
Time.now
a_time_object = Time.now
a_time_object.hour
```

¿Puedes identificar el método que se diferencia de los otros? ¡Encuentra al intruso!

## Especificaciones
- Crea una clase `Restaurant` con dos variables de instancia, `@city` y `@name`. Definelas con los dos parámetros de `initialize`.
- Define el método de instancia `#rate(new_rate)` para permitir el rating de un objeto de restaurante. Este método debe recalcular el promedio del rating del restaurante `@average_rating` cada vez que se le llama con un nuevo rating. Este `@average_rating` debe estar expuesto al mundo exterior.
- Define el método de clase `.filter_by_city(restaurants, city)`  que debe devolver todos los restaurantes de una ciudad dada en un arreglo (array) de objetos de restaurantes. Por ejemplo:

```ruby
jules_verne = Restaurant.new("paris", "Jules Verne")
bluebird = Restaurant.new("london", "Bluebird")
daniel = Restaurant.new("new york", "Daniel")
restaurants = [jules_verne, bluebird, daniel]
Restaurant.filter_by_city(restaurants, "london") # => [ #<Restaurant:0x007f9a43bb7eb8 @city="london", @name="Bluebird"> ]
```

## Puntos clave de aprendizaje

¿Puedes responder las siguientes preguntas? (Lee la documentación en caso de ser necesario).

- Entre `#rate` and `.filter_by_city`, ¿cuál de ellos es un método de instancia? ¿Cuál de ellos es un método de clase?
- Cuáles de los métodos a continuación son métodos de instancia y cuáles son métodos de clase?

```ruby
Date.today
Twitter::REST::Client#follow (see https://github.com/sferik/twitter)
String#upcase
Nokogiri::HTML::Document.parse #(see http://www.rubydoc.info/gems/nokogiri/Nokogiri/XML/Document)
Array#shuffle
```

- **opcional**: considerando a los métodos `new` e `initialize` , cuál de ellos es un método de instancia? ¿Cuál de ellos es un método de clase? ¿Cómo se relacionan entre ellos? ¿Cuál de ellos llama al otro?
