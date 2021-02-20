## Contexto y Objetivos

Entender los conceptos básicos de la programación orientada a objetos (OPP en inglés) mientras escribes tu primera clase.

## Especificaciones

Antes de crear tu clase, crea un archivo en el directorio `lib` para testear la clase mientras la creas (crear nuevas instancias, llamar métodos de instancia, mostrar resultados en la Terminal). Pongámosle `interface.rb` a este archivo.

Luego escoge algo del mundo real que quisieras modelar. Restaurantes, vehículos, usuarios, juegos, recetas… *¡Es tu decisión!*

Una vez que hayas tomado la decisión, crea un archivo en el directorio `lib` con el nombre de tu objeto. Por ejemplo, si decides modelar Restaurantes, crea el archivo `restaurant.rb`:

```bash
touch lib/restaurant.rb
```
Ahora es seguro borrar el archivo `.gitkeep`. Este archivo está ahí para que git vea la carpeta que de otra forma estaría vacía.

## Convención

**Presta atención** a los nombres de tu archivo y de tu clase. Recuerda usar `lower_snake_case(.rb)` para el nombre de tu archivo, `UpperCamelCase` para el nombre de tu clase en su definición.
**¡Ambos deben ser singulares!**, recuerda que la clase es la estructura que te permite crear muchos restaurantes distintos (con `.new`).

### ¿Cuáles son las propiedades internas de tus objetos?

¿Cuáles son las características de un restaurante, de un/a usuario/a o de un juego?
Escoge algunas características de tu clase que quisieras modelar. Serán tus **variables de instancia**, a quienes algunas veces se les llama **propiedades**.

### Define el constructor

`initialize` es el método de instancia que se invoca cuando se llama a `new` sobre una clase. Por ejemplo:

```ruby
# lib/car.rb
class Car
  def initialize(model, brand, kilometers)
    @model = model
    @brand = brand
    @kilometers = kilometers
  end
end
```
¡Ahora define el método `initialize` en la clase que escojas!

Tal vez sea buena idea crear un archivo `lib/interface.rb` para testearlo y llamar al constructor `.new` sobre tu clase con los argumentos relevantes. Por ejemplo:

```ruby
# lib/interface.rb
require_relative "car"

second_hand_panda = Car.new("Panda 4x4", "Renault", 30_000)
new_testarossa    = Car.new("Testarossa", "Ferrari", 0)
```

### Definición de un método de instancia

Es tiempo de agregar **comportamiento** a tu clase con un **método de instancia**.

El siguiente ejemplo muestra la utilización del método de  instancia `start` sobre la clase `Car`:

```ruby
# lib/interface.rb
require_relative "car"

car = Car.new("T", "Ford", 0)
car.start
```

