## Contexto y Objetivos

Para entender mejor el `yield`, intentemos implementar nuevamente el método [`Enumerable#map`](https://ruby-doc.org/core-2.5.3/Enumerable.html#method-i-map) sin realmente usarlo.


## Especificaciones

### Mapa personalizado

En este ejercicio necesitas implementar el método `#my_map`  el cual será llamado con un bloque como el método habitual `Enumerable#map`. Puedes usar  `Enumerable#each` en tu código para iterar a través de elementos.

Acá hay dos ejemplos que deben funcionar en tu código:

```ruby
beatles = ["john", "paul", "george", "ringo"]
my_map(beatles) do |name|
  name.upcase
end
#=> ["JOHN", "PAUL", "GEORGE", RINGO"]
```

```ruby
numbers = [2, 4, 6, 8]
my_map(numbers) do |number|
  number * number
end
#=> [4, 16, 36, 64]
```


## Puntos clave de aprendizaje

- Considera nuevamente a todos los iteradores que usaste `#each_with_index`, `#select`, `#find`... ¿Está 100% claro que son métodos llamados con un bloque?
