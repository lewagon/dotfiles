## Contexto y Objetivos

Veamos las expresiones regulares enfocándonos en números.
En términos precisos, aprenderemos a manejar números de teléfono en tu aplicación.

## Especificaciones

Escribe el método `french_phone_number?` que tome una cadena de caracteres (string) como parámetro y devuelva el booleano `true` cuando el número de teléfono sea un número francés válido:

- es válido si empieza por `0` y contiene 10 dígitos. El segundo dígito no puede ser 0.
- también es válido cuando comienza con `+33` y tiene 11 dígitos. El dígito que le sigue a `+33` no puede ser 0.

El método debe ignorar espacios y guiones entre dígitos.

```ruby
french_phone_number?("0665363636")
#=> true

french_phone_number?("06 65 36 36 36")
#=> true

french_phone_number?("01 36 65 36 65")
#=> true

french_phone_number?("06 65 36 36")
#=> false
```

## Sugerencias adicionales

Aquí está un excelente recurso para testear tu regex antes de escribir el código: [Rubular](http://rubular.com/).
