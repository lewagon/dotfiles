## Introducción

Un buen diseño orientado a objetos depende de cuanto se **exponga** al objeto.

Exponer un objeto implica darle al “público” acceso a sus propiedades (datos internos). Por ejemplo: a otros objetos en el programa o inclusive a otros programas. Los métodos de libre acceso conforman la **interfaz pública** de un objeto. Los métodos que son privados (accesibles solamente dentro del objeto en cuestión) forman su **interfaz privada**.

La regla general sostiene que solo se debe exponer cierta parte de un objeto necesaria para que otros objetos interactúen con él. **No diseñes objetos permeables si no necesitan serlo**.

## Objetivos

- Crear una clase con una interfaz pública
- Practicar los getters
- Escribir tu propio método `to_s`
- Usar argumentos por defecto para los métodos
- Aprender más sobre Excepciones personalizadas

Practiquemos con una clase `BankAccount` la cual almacena información sobre una cuenta bancaria y le permite al usuario hacer transacciones.

## Especificaciones

### El contrato `BankAccount` en `bank_account.rb`

La interfaz pública de la clase, e.g. el conjunto de sus métodos públicos, se llama el contrato de la clase (ver noción sobre [DbC](http://en.wikipedia.org/wiki/Design_by_contract)). Es como un tipo de promesa que la clase le hace a otros objetos u otros programas Ruby. A continuación se especifica el contrato de nuestra clase `BankAccount`. Queremos hacer lo siguiente con nuestros objetos BankAccount **desde el mundo exterior**.

* Acceder al nombre completo y el balance del titular
* Acceder únicamente al IBAN **parcial** e.g. IBAN: FR14**************606
* Mostrar información parcial de la cuenta fácilmente.
* Retirar o depositar dinero
* Mostrar el historial de transacciones si se proporciona una contraseña.

### El método  `to_s`

Este método literalmente significa “to string” (a cadena de caracteres) y se utiliza para darle al usuario información sobre un objeto. Con un método `to_s` personalizado puedes definir el comportamiento que quieras. Esto lo verás mucho en Ruby.

Podemos usar este método para nuestra cuenta bancaria. Una vez implementado, se verá así:

```ruby
account = BankAccount.new("John Lennon", "FR14-2004-1010-0505-0001-3M02-606", 200, "yoko")

puts account
# the puts will call the `to_s` method on the object
# =>  Owner: John Lennon - IBAN: FR14**************606 - Balance: 200 euros
```

Implementa tu método `#to_s` el cual también debe llamar a tu  método IBAN parcial.

### Retirar y Depositar

Implementa `#withdraw` y `#deposit`. Estos dos métodos deben llamar al método privado `#add_transaction` (el cual también es llamado en `#initialize`). Cada uno de estos métodos debe devolver un mensaje como "You've just withdrawn/deposited XXX euros". Recuerda que un retiro de dinero es simplemente un depósito negativo 😉.

### Historial de transacciones

Ahora tienes que implementar el método `#transactions_history`. Este método toma un hash como parámetro (por ejemplo:  `{ password: 'yoko' }`), el cual es un parámetro opcional y está configurado con un hash vacío en caso de que el hash no se proporcione (este es el significado de la notación `args = {}`). Tu método de historial de transacciones debe:

1. devolver una cadena de caracteres (string) que muestre las transacciones si la contraseña proporcionada es válida.
2. devolver `"wrong password"` si la contraseña no es válida
3. devolver  `"no password given"` si el método es llamado sin argumentos.

## (Opcional) Añade una clase `Transaction`

¿Y si mejoramos nuestra cuenta bancaria agregando información sobre la fecha de la transacción? Cambia el método de historial de transacciones para que muestre transacciones como las siguientes:

```bash
+ 200 euros on 22/10/13 at 8:30am
- 120 euros on 30/11/13 at 2:30pm
+ 1050 euros on 30/11/13 at 2:30pm
```

Lee sobre el [principio de responsabilidad única](http://en.wikipedia.org/wiki/Single_responsibility_principle) y preguntate lo siguiente:
- ¿Cuál es la responsabilidad de la clase `BankAccount`? Su deber principal es mostrar información básica de la cuenta bancaria y permitir retiros/depósitos de efectivo, ¿cierto?
- Es responsabilidad de la cuenta bancaria mantener un registro de la fecha de cada transacción o mostrar cada transacción de manera adecuada?

Ha llegado el momento en que tal vez delegues estas responsabilidades a otra clase `Transaction` la cual deberá:
- Mantener un registro de la fecha de cada depósito o retiro así como de sus montos.
- Mostrar la información de una manera amigable.
- Inclusive puedes pensar en datos adicionales para esta cuenta como la variable de instancia `@message` para almacenar la cadena de caracteres (string) de referencia para cada retiro/depósito ("car rental", "ibiza weekend", "christmas shopping", etc.).

Después de haber implementado la clase `Transaction`, tendrás que cambiar tu clase `BankAccount` para que su arreglo (array) de transacciones almacene objetos `Transaction` en lugar de números. Tambien debera cargar el archivo *transaction.rb* en *account.rb* con

```ruby
require_relative 'transaction'
```

## Puntos clave de aprendizaje

- ¿Qué es la interfaz pública de una clase?
- ¿Cuál es la diferencia entre un getter y un setter?
- ¿Para qué se usa el método `to_s`?
- ¿ Cuales son los argumentos predeterminados? ¿Cómo los usas?
- En `bank_account.rb`, que sucede en las líneas 2-3 y 19?

## Sugerencias y recursos suplementarios

- Puedes usar el método `Time#strftime` para definir el formato de tu fecha en `Transaction#to_s`.
