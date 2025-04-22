## Contexto y Objetivos

Un **getter** es un método que **solicita** información desde nuestra variable de instancia.
Un **setter** es un método que **cambia** información en nuestra variable de instancia.

En este ejercicio, implementaremos una máquina dispensadora simple  (`VendingMachine` Ruby class) donde un usuario pueda comprar snacks por un precio dado. El usuario puede acercarse a la máquina, insertar algunas monedas y luego presionar el botón “Buy”.

## Especificaciones

**Aún no corras `rake`**. El objetivo del ejercicio es que **leas** algo de código Ruby e intentes descubrir lo que falta en la clase `VendingMachine`.

### Escenario de compra

Abre `lib/buying_scenario.rb` y leelo línea por línea. Puedes hacer un poco del [Método de Depuración del Patito de Goma](https://rubberduckdebugging.com/) conocido como Rubber Duck Debugging en inglés. En este método explicas línea por línea lo que el código le hace al pato. Una vez que hayas echo eso, corre el siguiente código:

```bash
ruby lib/buying_scenario.rb
```

El código **fallará** y arrojará un mensaje de error. ¡Este es el inicio del ejercicio! ¡Necesitas descubrir qué código debes agregar en `lib/vending_machine.rb` para que hagas que este escenario funcione!

### Escenario de recarga

Este escenario es más simple. ¡Aquí empezamos con una máquina dispensadora vacía, así que un técnico tiene que venir a recargarla de snacks!

```bash
ruby lib/refilling_scenario.rb
```

Aquí tenemos la misma idea, el código fallará. Es tu trabajo descubrir lo que hay que agregarle al archivo  `lib/vending_machine.rb`!

### Finalmente podemos correr el `rake`

Cuando estés satisfecho con la manera en que los dos escenarios funcionen, verifica que tu código esté correcto con lo siguiente:

```bash
rake
```

Tal vez tengas un poco de trabajo adicional en la clase `VendingMachine` 😉

## (Avanzado) Algunas preguntas abiertas 🤔

1. Debes haberte dado cuenta que en ambos archivos de escenarios, hay un método `display`. ¿Cómo podemos refactorizar este código para que esté más "orientado a objetos"? Así mismo, ¿cómo podemos cambiar a nuestros readers para mostrar **menos** información al mundo exterior? El concepto que debes recordar aquí es [**Encapsulación**](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).
2. Usaste un writer para actualizar el número de snacks cuando estabas cargando. ¿Cómo podemos cambiar este código para usar un método de instancia en vez de este writer? ¿Por qué es el método de instancia es mejor?
