## Contexto y Objetivos

¡Felicitaciones por haber llegado hasta aquí! Ahora haremos un poco de metaprogramación: código que produce código. Podemos escribir código para generar clases o métodos dentro de clases de forma dinámica. Esto es muy poderoso y muy fácil de hacer en Ruby.

Piensa en tu clase `Post`. Tienes métodos como `save`, `self.find` y `self.all`.
Imagina tener otro modelo. Digamos `User`. Vas a necesitar exactamente los mismo métodos, ¿cierto?

Esto significa que queremos que `Post` y `User` tengan el mismo comportamiento el cual se puede archivar usando el concepto de herencia:

```ruby
class Record
  # The shared code
end

class Post < Record
end

class User < Record
end
```

## Especificaciones

Implementa la clase `Record` para que tenga todo el comportamiento que se espera de un modelo (`save`, `destroy`, `self.find` y `self.all`).

¡**No** escribas ningún código en tus clases `User` y `Post`! Esta limitación te ayudará a descubrir lo maravilloso que es Ruby.

## Sugerencias y recursos adicionales

- Hay un método [`send`](http://stackoverflow.com/questions/3337285/what-does-send-do-in-ruby) en todas las clases.
- Puedes configurar una variable de instancia dinámicamente con [`instance_variable_set`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_set)
- Puedes leer una variable de instancia dinámicamente con [`instance_variable_get`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_get).
