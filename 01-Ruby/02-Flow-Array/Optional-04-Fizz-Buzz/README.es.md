## Contexto y Objetivos

Al reclutar programadores para tu equipo, a menudo SE entrevista gente que tiene dificultades con código básico. Hay un artículo famoso que habla de [¿Por qué los programadores… no pueden programar?](http://blog.codinghorror.com/why-cant-programmers-program/) y del problema “FizzBuzz”.

Vamos a trabajar en este programa básico. Asegúrate de poder hacerlo 😊.

## Especificaciones

Escribe un método `fizz_buzz` el cual toma un `number` como argumento y devuelve un array de elementos `number` del 1 al `number` pero que sustituya alguno de ellos de acuerdo a las reglas siguientes:

- Si el número se puede dividir entre `3`, cambialo por `'Fizz'`
- Si el número se puede dividir entre `5`, cambialo por `'Buzz'`
- Si el número se puede dividir entre  `3` y `5`, cambialo por `'FizzBuzz'`.

e.g.

```ruby
fizz_buzz(7)
# => [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7]
```
