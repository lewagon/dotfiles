## Contexto y Objetivos

Al principio es posible que pienses que los  bloques y `yield` son confusos. Todo es cuestión de práctica. Los objetivos son:

- Implementar algunos métodos básicos usando `yield` para entender cómo funciona.
- Aprender la sintaxis que se utiliza para llamar a un método con un bloque.
- Entender lo que pasa cuando le pasas un parámetro al bloque.

En este ejercicio estás a punto de abrir un **restaurante de hamburguesas**. Vas a implementar métodos para preparar hamburguesas para tus primeros clientes, desde la cocina al mostrador.

## Especificaciones

### Paso 1: Hamburguesa básica
Escribe un método `burger` simple que tome 3 parámetros: hamburguesa/medallón, salsa, relleno (patty, sauce, topping) y que devuelva la hamburguesa como un array de strings. Por ejemplo:

```ruby
burger("steak", "ketchup", "onions")
# => ["bread", "steak", "ketchup", "onions", "bread"]
```

Los clientes pueden preparar sus hamburguesas seleccionando uno de cada uno de ellos:

![Menu de un restaurante de hamburguesas](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-menu.svg?sanitize=true)

### Paso 2: Hamburguesa a la demanda

El método `burger` solo puede ser llamado con argumentos que estén incluidos en la lista anterior. Sin embargo, a menudo los clientes especifican requerimientos personalizados sobre la **porción** de carne/pescado/pollo/etc., como el grado de cocción que quieren, si quieren una ración más grande o reemplazar un ingrediente.

Por ahora nuestro método no es capaz de recibir tales cambios de requerimientos, así que debemos modificarlo un poco.

Pero antes de ir al código del método, pensemos en una forma de escribir las instrucciones especiales para la cocina (con la limitación de no pasarle los requerimientos adicionales junto con los argumentos). Es como agregarle una nota a la orden.

![Llamada de un método con una nota](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-method.svg?sanitize=true)

¡Hagámoslo con un bloque de Ruby!

```ruby
burger("steak", "ketchup", "onions") do |patty|
  "grilled #{patty}"
end
```

¡Genial! Hemos encontrado una forma de transformar el medallón sin modificar el argumento. Esta llamada debe devolver:

```ruby
# => ["bread", "grilled steak", "ketchup", "onions", "bread"]
```
¡Así que debemos modificar nuestro método para hacerlo posible!

#### De regreso a la cocina

`yield` es una palabra clave que necesitas para ejecutar el bloque, estará en tu método para aplicarle a la carne/pollo/etc. las instrucciones solicitadas por los clientes.

![Nota de la orden](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-yield.svg?sanitize=true)

Mejora el método `burger` para recibir al bloque:
- Agrega `yield` donde quieras llamar al bloque
- El bloque solo transformara a `patty` (la carne/pollo/etc.)

El método debe funcionar **con o sin bloque**. Utiliza el método [`block_given?`](https://ruby-doc.org/core-2.7.0/Kernel.html#method-i-block_given-3F) para saber si un bloque está listo para ser usado.

### Paso 3: Preparación de las hamburguesas

Hay muchos clientes entrando. Todos quieren probar tus hamburguesas. Abre el archivo `interface.rb`. Hay una lista de órdenes que tomar. Escribe todas las instrucciones para preparar las hamburguesas. Luego puedes mostrar las hamburguesas con `puts` o `p`.

#### Un poco de ayuda con tu primer bloque

Uno/a cliente/a quiere una porción más grande de pescado. Convierte la hamburguesa clásica en una más grande para él/ella y escribe un bloque para transformar el string a mayúscula:

1. Llama al método `burger` con "fish", "mayo" y "salad", **todos en minúscula**, y guarda el resultado en la variable `bigger_burger`.

2. Agrega un bloque (la nota extra) con las instrucciones personalizadas:
  - toma un string como argumento
  - transforma el string en mayúscula

![Escribe un bloque en Ruby](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-syntax.svg?sanitize=true)

¡Acabas de escribir tu primer bloque, ahora sigue practicando por tu cuenta con las otras hamburguesas!
