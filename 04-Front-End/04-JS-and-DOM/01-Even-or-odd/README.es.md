## Antecedentes y objetivos

Hoy es tu primer día de JavaScript. El objetivo de este primer día es que te des cuenta de que es un lenguaje de programación, como Ruby. Tiene variables, funciones, condiciones, bucles, etc. Además, también puedes seleccionar y manipular elementos del DOM con JavaScript.

En este ejercicio, tendremos 2 procesos para probar nuestro código:

- En el navegador
- En la terminal

## Programando con tu navegador

JavaScript puede ser un lenguaje Front-End. Esto significa que se ejecuta en el navegador. Utilizaremos la función `console.log` para imprimir algunos valores en la terminal.

Para probar tu código en el navegador, inicia tu programa con el comando `serve` y ve a [http://localhost:8000](http://localhost:8000).

```bash
serve
```

Cuando abras tu navegador, verás una lista de verificaciones en rojo. Tu objetivo es corregir la función `evenOrOdd` para que todas las verificaciones pasen. Cada vez que realices un cambio en tu archivo de JavaScript, debes **actualizar el navegador** para ver reflejado tu código.

Intenta poner `console.log(number)` en tu función `evenOrOdd`, abre la consola de tu navegador y échale un vistazo. Deberías ver 3 resultados: `0`, `1` y `2`. Estos provienen de la función `check` en el archivo `even_or_odd_examiner.js` en la carpeta `spec`.

Mientras la función `evenOrOdd` no esté completa, las pruebas estarán en rojo. Se pondrán verdes una vez que hayas implementado la función correcta.

## Especificaciones

Comencemos con un algoritmo muy simple. Abre el archivo `lib/even_or_odd.js`. Implementa la función `evenOrOdd` que toma un parámetro `number` (de tipo `number`) y devuelve un `string`:

- `"even"` si el número es par (0, 2, 4, etc.).
- `"odd"` si el número es impar (1, 3, 5, etc.).

**⚠️ Advertencia**: En JavaScript, debes escribir **explícitamente** la palabra clave `return`, si no, [la función devolverá `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! La única excepción a esta regla es cuando utilizas una arrow function de una línea con [retorno implícito](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

_Sugerencia: ¿Recuerdas el operador de módulo en Ruby? También existe en JavaScript y puede ser útil._

## Pruebas con la terminal

El segundo proceso para probar nuestro código es en la terminal. Utilizaremos nuestro querido comando `rake` para ejecutar las pruebas.

Para eso, utilizaremos [Node.js](https://nodejs.org/en/) para ejecutar JavaScript directamente en nuestra terminal.

Ya deberías tener `node` instalado con una versión superior a `10`. Verifícalo con:

```bash
node -v
# Deberías ver aquí tu versión de node
```

Si no es así, vuelve a la sección correspondiente de la configuración de [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) o [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs).

Si al ejecutar `rake` obtienes un error, debes ejecutar:

```bash
nvm list
```

y luego elige la versión que tienes instalada, por ejemplo:

```bash
nvm use 16.15.1
```

Ahora, asegúrate de que todas tus pruebas en la terminal también estén en verde. Luego, **realiza un commit y un push** 🙏.

## Consejos para VSCode

En el día de configuración, instalaste la extensión `eslint` en tu editor de texto, la cual verifica el estilo de tu código JavaScript y te avisará cuando falte un punto y coma. Si no ves esta extensión en VSCode, ejecuta:

```bash
code --install-extension dbaeumer.vscode-eslint
```
