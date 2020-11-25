## Contexto y Objetivos

En el módulo `01-Ruby` escribiste muchos programas en Ruby que tenían clases como `String`, `Integer`, `Array`, `Hash`, etc. De hecho manipulaste *instancias* de esas clases.

`String` es una clase, ¿cierto?. Esto significa que `"john lennon"` o `"Hello!"` son instancias de `String`.

Usar clases integradas es bueno pero crear nuestras *propias* clases ¡es aún mejor!

## Especificaciones

Implementa la clase `OrangeTree` la cual modela la vida de un árbol de naranja (su nacimiento, ciclo de vida y muerte).

Para simular el transcurso del tiempo, necesitarás implementar el siguiente método de **instancia**:

```ruby
def one_year_passes!
  # TODO: age the tree by one year
  # TODO: check if the tree has survived
  # TODO: if so, make the tree height grow
  # TODO: if so, make the tree grow fruits
end
```

- Se debe poder medir la altura del árbol.
- Se debe poder saber si el árbol está muerto.
- Cada año el árbol envejecerá 1 año (envejece, se incrementa su tamaño y eventualmente muere).
- La altura de un árbol incrementa 1 metro anualmente hasta que tiene 10 años y deja de crecer.
- El árbol de naranja **no puede** morir hasta que tenga 50 años.
- Después de los 50, la probabilidad de que muera incrementa cada año.
- Ningún árbol puede vivir más de 100 años.
- Un árbol producirá 100 frutas al año cuando tenga más de 5 años.
- Un árbol producirá 200 frutas al año cuando llegue a los 10 años.
- Un árbol no producirá más frutas cuando alcance los 15 años.
- Se debe poder tomar **una sola fruta** del árbol llamando al método `pick_a_fruit!` sobre el árbol (pero solo si todavía quedan frutas).
- Al final de cada año, aquellas frutas que no hayan sido recogidas **caerán**.
- Se debe poder saber el número de frutas que quedan colgando en el árbol.

Para testearlo, abre la interfaz (`ruby lib/interface.rb`) y averigua lo que pasa ;).

## Puntos clave de aprendizaje

- ¿Cuales son las variables de instancia de la clase `OrangeTree`?
- ¿A qué nos referimos con el estado?
- ¿Qué métodos, al ser llamados, modifican al objeto sobre los cuales se les llama? ¿Cómo deben ser llamados estos métodos?
