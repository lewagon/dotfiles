## Contexto y Objetivos

- Usar la división de enteros y módulos.

## Especificaciones

### La vieja escuela

En los primeros días de los números romanos, los romanos no se molestaron con tonterías como la sustracción "IX". Simplemente era una adición directa, de mayor a menor, así que 9 se escribía como VIII, y así sucesivamente.

- Escribe un método donde al pasarle un número entero mayor a `0` devuelva un string que tenga el número romano de la vieja escuela. En otras palabras, `old_roman_numeral(4)` debe devolver `"IIII"`.

Acá está la referencia de los valores de las letras que se usan:
- I = 1
- V = 5
- X = 10
- L = 50
- C = 100
- D = 500
- M = 1000

## El estilo moderno

Un día alguien pensó que sería increíblemente ingenioso que al poner un número pequeño antes de uno grande se tuviese que sustraer el más pequeño de ellos. El resultado de este descubrimiento es que ahora debes sufrir. Escribe nuevamente el método anterior para devolver el número romano con el estilo moderno de tal manera que cuando alguien llame al método `new_roman_numeral(4)`, devuelva  'IV'.

También puedes echarle un vistazo a esta [tabla](http://loudexpose.files.wordpress.com/2011/02/roman-numerals.jpg) para entender mejor el concepto.
