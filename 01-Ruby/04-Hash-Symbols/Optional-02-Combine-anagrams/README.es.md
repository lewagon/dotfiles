Un anagrama es una palabra que se obtiene al reordenar las letras de otra palabra. Por ejemplo:  "SPOT", "OPTS", "POTS" and "POST" son un grupo de anagramas porque tienen las mismas letras.

Escribe un método que tome un array de strings dado, los agrupe en grupos de anagramas y devuelva el array de dichos grupos. Las letras mayúsculas y minúsculas no son relevantes cuando se clasifican strings en anagramas (pero se deben mantener para verlos en el resultado). El orden de los anagramas en el grupo tampoco es importante.

## Especificaciones

##### Entrada de datos

```ruby
# input
['cars', 'for', 'POTATOES', 'racs', 'four', 'scar', 'creams', 'SCREAM']

# output
[["cars", "racs", "scar"], ["four"], ["for"], ["POTATOES"], ["creams", "SCREAM"]]
```

### Pista

* ¡Te puedes dar cuenta rápidamente si dos palabras son anagramas al ordenar sus letras, teniendo en cuenta que las mayúsculas y minúsculas no son importantes!
* Si eres curioso/a (y paciente) te recomendamos echarle un vistazo a los siguientes  [Algoritmos de ordenamiento](http://en.wikipedia.org/wiki/Sorting_algorithm) y a sus complejidades de tiempo asociadas. También puedes ver [este artículo](http://www.igvita.com/2009/03/26/ruby-algorithms-sorting-trie-heaps/) para saber qué algoritmos dependen del método Ruby `sort`.
