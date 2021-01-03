## Contexto y Objetivos

¿Alguna vez has notado que tus tarjetas de crédito normalmente empiezan en 4 o 5? Es porque hay un patrón. En este ejercicio implementaremos el [Algoritmo Luhn](https://en.wikipedia.org/wiki/Luhn_algorithm) para comprobar que el número de una tarjeta es válido.

## Especificaciones

Implementarás tres métodos en este ejercicio. Primero comenzamos codeando dos métodos, `visa?` y `mastercard?` los cuales devolverán booleanos de acuerdo con el argumento `card` que reciben.

Lo primero que debes saber es que si tu tarjeta de crédito empieza con `5`, quiere decir que es Mastercard. Si empieza en `4` querrá decir que es Visa ¡Compruébalo con tus propias tarjetas!

```ruby
visa?("4242 4242 4242 4242")
# => true

mastercard?("4242 4242 4242 4242")
# => false
```

¿Ya pudiste implementar estos dos simples métodos? ¿Si? ¡Seguimos!

El algoritmo (Wikipedia):
1. A partir del dígito de chequeo incluido, el cual está a la derecha de todo el número, ir de derecha a izquierda duplicando cada segundo dígito. Si al duplicar el número este es mayor a 9 (e.g., 8 × 2 = 16), suma los dígitos del producto (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9). Otra alternativa es restarle 9 al producto (e.g., 16: 16 - 9 = 7, 18: 18 - 9 = 9).
1. Suma de todos los dígitos.
1. Si el total de módulo 10 es igual a 0 (si el total termina en cero), entonces el número es válido de acuerdo con la fórmula Luhn, de lo contrario no es válido.

Si prefieres una representación gráfica, acá hay una:

![](https://i.stack.imgur.com/Cenb3.png)

Deberías obtener lo siguiente:

```ruby
valid_card?("4242 4242 4242 4242")
# => true

valid_card?("4242 4242 4242 4241")
# => false
```

Al correr  `rake` descubrirás que tu código debería funcionar incluso cuando el número de la tarjeta de crédito incluya espacios. Recuerda lo siguiente: La entrada de datos del usuario nunca será perfecta.

