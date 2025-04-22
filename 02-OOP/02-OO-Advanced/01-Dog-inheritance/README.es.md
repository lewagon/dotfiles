## Contexto y Objetivos

La herencia es un concepto fundamental en la Programación Orientada a Objetos (OOP en inglés). Nos permite “transferir” métodos a través de la definición de subclases (hijos) que heredan de superclases (padres). Una clase hijo heredará de los métodos de sus padres.

Recuerda que la manera en la que le decimos a una clase hijo que herede de su padre es como se muestra a continuación:

```ruby
class ChildClass < ParentClass
end
```

## Especificaciones

#### Herencia del perro

- Hemos creado una clase `Dog` con un método de instancia: `bark`.
- También hemos creado una clase `GermanShepherd` en un archivo separado.
- Cambia la definición de la clase `GermanShepherd`, para que tenga los métodos de instancia y el comportamiento de la clase `Dog`. No te olvides de `require_relative` el archivo correcto.
- Por ejemplo, el código siguiente debe funcionar:

```ruby
german_shepherd = GermanShepherd.new
p german_shepherd.bark # => "woof woof"
```

NOTA: ¡no agregues ningún código al cuerpo de la clase `GermanShepherd`!

## Puntos clave de aprendizaje

- ¿Cuál es la sintaxis cuando queremos que una clase herede de otra?
