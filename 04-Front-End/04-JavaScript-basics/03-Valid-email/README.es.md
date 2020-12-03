## Contexto y Objetivos

¡Regresa la [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)! Buenas noticias porque son exactamente las mismas expresiones que descubriste en la semana 2 🙌.

La única diferencia es la manera integrada de testearlas en JavaScript (vs. Ruby).

## Especificaciones

Abre `lib/valid_email.js`. Implementa la función `valid` que toma el parámetro `email` (de tipo cadena de texto (`String`)) y devuelve un `Boolean`: `true` si el email suministrado es válido y `false` si no lo es. Por ejemplo:

- `valid('boris.lewagon.org')` debe devolver falso (`false`)
- `valid('boris@lewagon.org')` debe devolver verdadero (`true`)

¡**Primero** debes encontrar una `RegExp` que pase todos los tests!

Para eso puedes abrir el archivo `spec/valid_email_spec.js` y copiar/pegar los emails testeados en el área de texto `Your test string` en [rubular](http://rubular.com/).

**Luego** necesitas encontrar una forma de testear esta `RegExp` usando JavaScript en la función `valid` y ¡devolver el booleano correcto!

Testea tu código corriendo `rake` regularmente.
