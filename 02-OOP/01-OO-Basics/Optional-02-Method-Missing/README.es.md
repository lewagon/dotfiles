## Contexto y Objetivos

Este ejercicio es bastante  avanzado. Vamos a manejar aspectos internos de Ruby y la forma en la que maneja el `NoMethodError`.

### Especificaciones

Queremos crear una clase `UberHash` la cual sera capaz de almacenar cualquier cosa. El típico hash funciona de la siguiente manera:

```ruby
classic_hash = Hash.new
classic_hash[:color] = "red"
classic_hash[:color]
# => "red"
```

Sin embargo queremos hacer lo siguiente:

```ruby
uber_hash = UberHash.new
uber_hash.color
# => nil

uber_hash.color = "red"
uber_hash.color
# => "red"
```

Tal vez pienses que solo se necesita poner un `attr_accessor :color` en `UberHash`. ¡Pero espera!. Queremos almacenar **cualquier** propiedad que sea posible como esa.

Si intentas llamar a un método de instancia que no fue definido anteriormente en la clase, Ruby llama a un `method_missing` integrado que levanta un `NoMethodError`.

Para evitar que se levante el `NoMethodError` puedes definir **tu propio** método de instancia `method_missing` en tu clase e implementarlo para ¡hacer lo que quieras!

Para entender cómo y cuándo Ruby llama al `method_missing` ([docs here](https://ruby-doc.org/core-2.5.3/BasicObject.html#method-i-method_missing)) te recomendamos leer [este artículo](https://manny.codes/3-practical-uses-of-ruby-method-missing/).

Tal vez también quieras leer sobre como Ruby te deja [get](https://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_get) o [set](https://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_set) una variable de instancia dinámicamente.

¡Buena suerte!
