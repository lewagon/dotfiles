## Contexto y Objetivos

Tenemos algunos ejercicios cortos para que empieces a manejar arreglos (arrays), hashes y bloques. ¿Estás listo/a para consolidar tus habilidades en Ruby?

## Especificaciones

Escribe un método  `array_to_hash` que tome un arreglo (`Array`)como argumento y devuelva un `Hash`.

- Si no hay un bloque dado, las llaves del hash (hash keys) deben ser índices enteros de elementos en el array convertidos a `Strings`).
- En caso de que haya un bloque, llámalo pasándole el índice del arreglo (array index) y utiliza lo que devuelva como llave de hash (hash key).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/array_to_hash.png)

## Recurso

Tal vez quieras echarle un vistazo a lo siguiente: [`Kernel#block_given?`](http://ruby-doc.org/core/Kernel.html#method-i-block_given-3F)
