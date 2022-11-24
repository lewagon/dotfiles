## Contexto y Objetivos

La [clase `Array`](https://ruby-doc.org/core-2.7.5/Array.html) es una de las estructuras principales para resguardar y acceder a información en Ruby (la otra es [Hash](https://ruby-doc.org/core-2.7.5/Hash.html), la cual veremos mañana).

Un array se ordena de modo que se pueda acceder por su **index** (índice). Este ejercicio te ayudará a entender cómo crear un array, como guardar datos en él, y finalmente cómo recuperarlos usando el index. Recuerda que los índices de los arrays empiezan en `0`, y no `1`.

A menudo se les pide a los/as programadores/as que ordenen cosas. Por eso debes leer sobre [algoritmos de ordenamiento](http://en.wikipedia.org/wiki/Sorting_algorithm).

Esperemos que la documentación de Ruby te proporcione distintas maneras de ordenar un [Enumerable](http://ruby-doc.org/core-2.5.3/Enumerable.html). `Array` es una forma de `Enumerable`, así que puedes usar todos los métodos referenciados en la página de `Enumerable` en la documentación siempre y cuando uses un `Array`, porque `Array` **incluye** el módulo `Enumerable`.

## Especificaciones

- Implementa el método `wagon_sort` el cual toma un argumento, el array de nombres de estudiantes (los cuales son cadenas de caracteres `String`), y devuelve un array de los mismos nombres de estudiantes ordenados alfabéticamente.
- El método de ordenamiento debe ser sensible a mayúsculas y minúsculas e.g. escribe `bob` antes de `Felix` (revisa la [tabla ASCII](http://www.asciitable.com/)).
- El método debe mantener el deletreo original de los nombres.

### Programa interactivo

Abre el archivo `interface.rb` y asegúrate de usar el método `wagon_sort`. La interfaz debe tener una output estilizada. Los nombres deben estar separados por comas (`, `) excepto los dos últimos que deben estar separados por la palabra `and`. Los nombres también deben estar en una nueva línea.

Debe funcionar de la siguiente manera:

```bash
ruby lib/interface.rb

Type a student name:
felix
Type another student name or press enter to finish:
Cedric
Type another student name or press enter to finish:
bob
Type another student name or press enter to finish:

Congratulations! Your Wagon has 3 students:
bob, Cedric and felix
```

## Puntos clave de aprendizaje

Familiarízate con las operaciones de array básicas. Ya debes conocer la sintaxis para:

- crear un array
- agregar un elemento al array
- acceder a un elemento n
- actualizar un elemento
- borrar un valor en un index específico.
