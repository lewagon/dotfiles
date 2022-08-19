## Lineamientos

- Si te queda tiempo antes del almuerzo, empieza a pensar en el pseudocódigo para este desafío con el/la profesor/a.
- El desafío te tomará toda la tarde.
- Valida cada paso con el/la profesor/a con una sesión de live-code 💻 para corregirlos uno por uno.

## Pseudocódigo

¿Cómo debería funcionar el programa cuando lo inicias? **Escribamos el pseudocódigo**

```ruby
# interface.rb

# Pseudo-code
# 1. Print Welcome
# 2. Define your store (what items are for sale?)
# 3. Get items from the user (shopping)
# 4. Print the bill (checkout)
```

**¿Puedes agregar más detalles a ese pseudocódigo?**

## Paso 1 - Compra tonta 🛍

Acá esta la primera versión de nuestro programa:

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> Which item? (or 'quit' to checkout)
> pineapple
> Sorry, we don't have pineapple today.
> Which item? (or 'quit' to checkout)
> mango
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> TOTAL: 5.25€
> --------------------
```

### Modelado de la tienda y del carrito

- ¿Cómo modelamos la tienda y el carrito ( `store` y `cart`)?
- ¿Cuál es la estructura **más adecuada para cada uno de ellos**?
- ¿Deberíamos usar un arreglo (array)? ¿Deberíamos usar un hash (con que llaves (keys) y valores (values))?

**¡Haz una tormenta de ideas con tu profesor/a antes de comenzar!**

## Paso 2 - Incorporación de cantidades 🛍🛍

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> How many?
> 2
> Which item? (or 'quit' to checkout)
> mango
> How many?
> 3
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> kiwi: 2 X 1.25€ = 2.5€
> mango: 3 X 4€ = 12€
> TOTAL: 14.5€
> --------------------
```

### Modelado de la tienda y el carrito

- ¿Cómo modificamos la tienda (`store`) y el carrito (`cart`) para considerar las cantidades?
- ¿Qué cambios debemos hacer en nuestro código con este modelo nuevo?

## Paso 3 - Incorporación de la disponibilidad 🛍🛍🛍

Ahora llevemos el programa al siguiente nivel para manejar inventario (con disponibilidad):

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€ (5 available)
> banana: 0.5€ (4 available)
> mango: 4€ (1 available)
> asparagus: 9€ (5 available)
> --------------------
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 2
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 4
> Sorry, there are only 3 kiwis left.
> [...]
```

### Modelado de la tienda y el carrito

- ¿Cómo modificamos la tienda (`store`) y el carrito (`cart`) para considerar las cantidades?
- ¿Qué cambios debemos hacer en nuestro código con este modelo nuevo?


## Flashcards

Para ayudarte a dominar los objetivos clave de este día de reboot puedes rehacer los 2 mazos de flashcards siguientes: **Flujo, Condiciones, Matrices** así como las de **Iteradores y Bloques**.