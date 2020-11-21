## Contexto y Objetivos

En este desafío necesitarás escribir bucles (**loops**), **condiciones** y jugar con **números**.

Todo esto es para familiarizarnos con la sintaxis de JavaScript.

## Especificaciones

Abre `lib/sum_of_negative.js`. Implementa la función `sumOfNegative` que toma el parámetro `numbers` (de tipo arreglo (`Array`)) y devuelve un número (`Number`): la suma de los números negativos del arreglo (Array). Por ejemplo:

- `sumOfNegative([-1, 4, -2, 9, 18])` debe devolver `-3`
- `sumOfNegative([15, 16, 17, 1000])` debe devolver `0`

👨‍🏫 ¿Recuerdas cuando uno/a de los asistentes de los profesores/as (TA) te dijo "deja de usar el rake y empieza a testear por tu cuenta" en Ruby? Eso quería decir que debes llamar al método con  tus propios argumentos de testing al final del archivo y luego correr `ruby <file>` en la Terminal. ¡Puedes usar la misma técnica en JavaScript! Simplemente llama a tu método debajo de su definición (antes de la línea `module.exports` line), así:

```js
console.log(sumOfNegative([-4, 5, -2, 9]));
```
Y luego corre esto en la Terminal:

```bash
node lib/sum_of_negative.js
```

Si el código funciona, verás `-6`. Agrega más afirmaciones `console.log` en la función `sumOfNegative` para hacer la depuración (debug) del código.
