## Contexto y Objetivos

Entonces ¿por qué necesitamos a la herencia? ¡Porque no queremos tener la misma lógica repetida en varias partes de nuestro código! Si varias clases comparten el mismo comportamiento, entonces tal vez sea hora de incorporar la herencia.

Por ejemplo, quieres codear un `Parser` genérico con las funcionalidades básicas (leer un archivo, almacenar su contenido, etc.). Luego decides que quieres crear parsers más específicos como `XmlParser` o un `JsonParser` para manejar formatos específicos. Al hacer que estas nuevas clases sean **hijos** de la clase `Parser` no tienes que escribir nuevamente todos los métodos del Parser y solo necesitas crear métodos que son **específicos** a las necesidades del XML o JSON. ¡Esto quiere decir que la herencia [evita que te repitas](https://es.wikipedia.org/wiki/No_te_repitas) (DRY, Don't Repeat Yourself)!

Leer más sobre herencia en [Ruby learning]http://rubylearning.com/satishtalim/ruby_inheritance.html).

## Especificaciones

#### La herencia del postre

Completa la clase `Dessert`

- Agrega getters y setters para `name` y `calories`
- El método de instancia `Dessert#healthy?` debe devolver `true` (verdadero) si un postre tiene menos de 200 calorías.
- `Dessert#delicious?` debe devolver `true` (verdadero) para todos los postres 😊

Completa `JellyBean` el cual hereda de `Dessert`

- Agrega un getter para `flavor`
Modifica `delicious?` para que devuelva falso si el sabor es `"black licorice"` (pero verdad para todo lo demás).

#### Super bicicleta

- En `bicycle.rb`, reemplaza todos los `"?"` por el entero (integer) correcto en el método `#quiz`.

#### (Opcional)

- ¿Sabes lo que hace la palabra clave `super`? Si es el caso, utilizala para reescribir tu `JellyBean#initialize`, en `dessert.rb`, usando la palabra clave `super`.

## Puntos clave de aprendizaje

- ¿Por qué hacemos que las clases hereden de otras? ¿Cuál es el objetivo?
- ¿Cuál es la palabra clave para extender el comportamiento de un método heredado?
- Asumamos que tenemos `class Bike < Vehicle` y que hemos definido `Vehicle#drive`. Si se implementa `Bike#drive` ¿qué método aplicará a los objetos `Bike`, `Vehicle#drive` o `Bike#drive`?
- Digresion sobre `nil?` y herencia. Busca en la documentación Ruby la implementación del método `nil?` en la clase `NilClass` y en la clase `Object` la cual es la superclase de todos los objetos Ruby. Ahora trata de averiguar lo que pasa exactamente cuando llamas a `an_example_object.nil?`.
