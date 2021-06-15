## Contexto y Objetivos

Hoy es nuestro primer día de JavaScript. El objetivo de este día es que te des cuenta que también es un lenguaje de programación como Ruby. Tiene variables, declaraciones condicionales, bucles, etc.

Hoy, en lugar de usar el navegador, vamos a usar [Node.js](https://nodejs.org/en/) para correr código JavaScript directamente en la Terminal.

Asegúrate que el comando siguiente devuelve una versión mayor a `10`:

```bash
node -v
```

De otra manera Node no se instalará en tu sistema. Échale un vistazo a la sección de configuración en las diapositivas de la clase, por favor.

## Especificaciones

Comencemos con un algoritmo muy simple. Abre el archivo `lib/even_or_odd.js`. Implementa la función `evenOrOdd` que toma el parámetro `number` (de tipo `Number`) y devuelve una cadena de texto (`String`):

- `"even"` si el número es par (0, 2, 4, etc.)
- `"odd"` si el número es impar (1, 3, 5, etc.)

**⚠️ Advertencia**: En JavaScript necesitas escribir **explicitamente** la palabra clave `return`. De lo contrario [la función devolverá `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! La única excepción a esta regla es cuando usas una expresión de función flecha (one-liner arrow function) con retorno implícito ([implicit return])(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Pista: ¿Recuerdas el Ruby modulo orperator?¡También existe en JavaScript y puede ser útil!_

¡Corre `rake` para comprobar tu estilo y la precisión de tu función!

Un vez que el primer ejercicio esté todo verde (estilo + tests), **por favor haz el commit y el push** 🙏

## Acerca de la configuración de los tests

Abre `Rakefile` en tu editor de texto. Ahí encontrarás dos actividades:

- `eslint` es un [linter de JavaScript](http://eslint.org/), el equivalente a Rubocop en el mundo Ruby.
- `mocha` es un [framework de testing de JavaScript](https://mochajs.org), el equivalente a Rspec en el mundo Ruby.

Estos dos comandos se corren desde la carpeta `node_modules`. La misma fue creada corriendo `yarn install` en la carpeta `04-FrontEnd` (`cd ../..`) leyendo el archivo `package.json` (¡Ábrelo!).
