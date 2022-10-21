## Contexto y Objetivos

Ahora digamos que quieres mejorar tu contador de calorías para que acepte una lista de bebidas, hamburguesas, acompañamientos **y PLATOS**. Agreguemos los siguientes 3 platos al menú:

<table class="table">
  <thead>
    <tr>
      <th>Meal</th>
      <th>Items in Meal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cheesy Combo</td>
      <td>Cheese Burger, Sweet Potatoes, Lemonade</td>
    </tr>
    <tr>
      <td>Veggie Combo</td>
      <td>Veggie Burger, Sweet Potatoes, Iced Tea</td>
    </tr>
    <tr>
      <td>Vegan Combo</td>
      <td>Vegan Burger, Salad, Lemonade</td>
    </tr>
  </tbody>
</table>

## Especificaciones

Tal vez quieras guardar estas comidas en otra constante. Nota: no intentes hacer el cálculo de calorías de cada plato de antemano, solo guarda los platos que compongan tu comida. ¿Cómo crees que podrías representar los platos de cada comida?

Creemos un `#calories_counter` completo que nos permitirá calcular las calorías al correr siguiente código:

```ruby
orders = ["Sweet Potatoes", "Cheesy Combo", "Lemonade", "Vegan Combo"]
puts calories_counter(orders)
# => 1395
```

## Puntos clave de aprendizaje

- ¿Cómo recuperas el valor guardado en un `Array` dentro de un `Hash`?
- ¿Qué estructura de datos usarías para guardar nombres de animales ordenados alfabéticamente?
- ¿Qué estructura de datos usarías para guardar nombres de animales y colores?

