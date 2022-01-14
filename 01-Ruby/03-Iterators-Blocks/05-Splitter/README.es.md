## Contexto y Objetivos

Combinemos el poder de enumerables (`#each`, `#map`, etc.) con bloques (and `yield`). Crearemos un método  **separador** (splitter) que tomará un array y lo dividirá en dos grupos de acuerdo con una regla arbitraria. Por ejemplo, nos podría interesar separar por edad si habláramos de un grupo de personas.

## Especificaciones

### Separador por tamaño

Implementa un primer método `size_splitter` el cual toma dos parámetros: un array y un entero (`size` - tamaño). Asumiremos que el array solo tiene palabras e.g. `Strings` y que la regla arbitraria es formar dos grupos: el primero con palabras de un tamaño especificado (segundo parámetro del método) y el otro grupo con todas las demás palabras.

El método `size_splitter` debe devolver un array de dos arrays - los dos grupos definidos anteriormente - con sus contenidos ordenados **alfabéticamente**.

```ruby
words = %w(dog data ask my win two beer as)
result = size_splitter(words, 3)

# result => [["ask", "dog", "two", "win"], ["as", "beer", "data", "my"]]
```

### Avanzado: Separador por bloques (block splitter)

En el ejercicio anterior, se definió la regla arbitraria. ¿Y si quisiéramos permitirle a quien sea que llame al método poder escoger qué regla aplicar? ¡Podemos hacerlo gracias al poder de los bloques y de `yield`!

Escribe un método `block_splitter` para que el siguiente ejemplo aplique:

```ruby
beatles = [ "John", "Paul", "Ringo", "George" ]
result = block_splitter(beatles) { |beatle| beatle.start_with?("P") }

# result => [ [ "Paul" ], [ "John", "Ringo", "George" ] ]
```
