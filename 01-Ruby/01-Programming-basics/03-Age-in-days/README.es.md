## Contexto y Objetivos

- Familiarizarse con los scripts externos requeridos y la llamada de funciones desde los mismos.
- Entender **muy bien** conceptos como [variables](http://en.wikipedia.org/wiki/Program_variable), asignación de variables, definición y llamada de métodos.

## Especificaciones

## Computar la edad

- Completa el método `age_in_days`definido en el archivo `lib/age_in_days.rb`. Este método requiere 3 argumentos (`day`, `month` y `year`) y debe devolver tu edad en días la cual es un `Integer` (el número de días que has vivido en el planeta tierra).

## Programa Interactivo

- Una vez que el método `age_in_days` esté correcto, lo usaremos en el archivo `lib/interface.rb` el cual corre una herramienta de línea de comandos. Para correr el programa, corre el siguiente código en tu Terminal:

```bash
ruby lib/interface.rb
```

Notarás que el programa te dice que tienes `0 years old`. Debes cambiar el código para que el programa use tu método `age_in_days`. Nota: está disponible en `interface.rb` gracias a que escribimos el comando  `require_relative` al principio del archivo.

- **Mejora**: ¿Ves líneas de código repetidas en `interface.rb`? ¿Puedes refactorizar tu código para que No Te Repitas (del acrónimo DRY en inglés: Don’t Repeat Yourself)?

## Recomendaciones y recursos adicionales

- Tal vez quieras usar la clase [Date](https://ruby-doc.org/stdlib-2.2.10/libdoc/date/rdoc/Date.html), que agregamos al archivo gracias a la línea `require "date"`
- Usa la consola interactiva de Ruby (IRB) para experimentar.
- Notarás que Ruby usa el método `puts` para sacar valores (¡mostrarte cosas!) a la Terminal.

## Puntos clave de aprendizaje

Tal vez las siguientes preguntas les parezcan triviales a la mayoría de ustedes, **pero asegúrate de que puedas responderlas todas con precisión**. Las variables y los métodos son los pilares de la programación en Ruby y por lo tanto debes dominar estos conceptos.


### Variables

- ¿Qué es una variable? ¿Qué variables están presentes en tu programa?
- ¿Qué significa “definir una variable”?¿Cuál es la sintaxis utilizada para definir una variable?
- ¿Podemos usar una variable que aún no ha sido definida?
- ¿Podemos asignarle un nuevo valor a una variable que ya fue definida? ¿Cómo?
- ¿Puedes explicar con palabras **precisas** lo que se debe hacer en las siguientes líneas de código?

```ruby
some_number = 1
some_number = some_number * 2
```

- ¿Cuál es la convención adecuada para nombrar variables en Ruby (puedes Googlear la respuesta)?

### Métodos

- ¿Qué es un método? ¿Qué métodos están presentes en tu programa?
- ¿Qué diferencia hay entre definir un método y llamarlo?
- ¿Dónde se definen los métodos en este programa? ¿Desde dónde los llamamos? ¿Cuál es el valor que retorna un método?
- ¿Cuál es la convención de Ruby para retornar un método?

### Adicional

- ¿Cómo se obtiene en la Terminal data aportada por el/la usuario/a?
- ¿Por qué se usa el método `chomp`?
- ¿Qué hay de `to_i`?¿Qué hace ese método?
