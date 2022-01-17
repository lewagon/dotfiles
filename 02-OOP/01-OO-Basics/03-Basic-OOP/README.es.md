## Contexto y Objetivos

En el módulo `01-Ruby` escribiste muchos programas en Ruby que tenían clases como `String`, `Integer`, `Array`, `Hash`, etc. De hecho manipulaste *instancias* de esas clases.

`String` es una clase, ¿cierto?. Esto significa que `"john lennon"` o `"Hello!"` son instancias de `String`.

Usar clases integradas es bueno pero crear nuestras *propias* clases ¡es aún mejor!

## Especificaciones

Implementa la clase `OrangeTree` la cual modela la vida de un árbol de naranja (su nacimiento, ciclo de vida y muerte).

### Envejecimiento
- Cuando nace un árbol de naranja, su edad es 0.
- Cada año, el árbol debe envejecer 1 año.
- El árbol de naranja **no puede** morir hasta alcanzar la edad de 50 años.
- Luego de los 50 años, la probabilidad de que el árbol muera aumenta cada año.
- Ningún árbol puede vivir más de 100 años.
- Se debe poder saber la edad del árbol.
- Se debe poder saber si el árbol ha muerto utilizando el método de instancia `#dead?`.

### Altura
- Un árbol de naranja crece 1 metro por año hasta los 10 años. Luego deja de crecer.
- Se debe poder medir la altura del árbol.

### Frutas
- Un árbol de naranja da 100 frutas al año a partir de los 5 años.
- El árbol da 200 frutas al año a partir de los 10 años.
- El árbol deja de dar frutas cuando llega a los 15 años.
- Se debe poder seleccionar **una sola fruta** del árbol al llamar al método de instancia `pick_a_fruit!` en el árbol (pero solo si todavía tiene frutas).
- Al final del año las naranjas que no se recogieron caerán del árbol.
- Se debe poder saber cuántas frutas quedan colgando del árbol.


Para simular el transcurso del tiempo, necesitarás implementar el siguiente método de **instancia**:

```ruby
def one_year_passes!
  # TODO: check if the tree has survived
  # TODO: if so, make the tree grow
  # TODO: and produce fruits
end
```

Las instrucciones de este método se traducen en verificar si el árbol está vivo. Si es el caso, hazlo crecer y haz que de frutas.

Para testearlo, abre la interfaz (`ruby lib/interface.rb`) y averigua lo que pasa ;).

### Refactoring

Cuando termines de implementar tu método de **instancia** `#one_year_passes!` y tu `rake` está 100% en verde, haz el refactoring de tu código en los siguientes métodos de instancia **privados**:
- `#may_die!` lo que significa que puede morir
- `#grow!` que significa crecer
- `#produce_fruits!` que significa dar frutos

## Puntos clave de aprendizaje

- ¿Cuáles son las variables de instancia de la clase `OrangeTree`?
- ¿A qué nos referimos con el estado?
- ¿Qué métodos, al ser llamados, modifican al objeto sobre los cuales se les llama? ¿Cómo deben ser llamados estos métodos?
