## Contexto y Objetivos

JavaScript es realmente útil para validar formularios del lado del cliente.
Cuando el usuario llena tu formulario es mejor darle retroalimentación tan pronto como sea posible en caso de que un campo haya sido completado incorrectamente.

## Especificaciones

Como siempre, inicia Webpack y ve a [localhost:8080](http://localhost:8080).

```bash
rake webpack
```

Queremos validar el formulario al mismo tiempo que el usuario lo llena. El evento [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) puede ser lo que estés buscando…

- Todos los campos son requeridos
- Asegúrate de que la casilla de los Términos y Condiciones sea marcada
- Confirma que el usuario escriba un **código postal francés** válido
- Valida el formato del email
- Valida el número de teléfono. **Solo números móviles franceses**
- Si todos estos campos han sido completados correctamente, habilita el botón de enviar (submit).

Abre el archivo `lib/validation.js`. Ahí es donde escribirás el código de validación.

## Sugerencias adicionales

Para mostrar en una entrada de datos es válida o inválida puedes usar `.is-valid` y `.is-invalid` en tu `input` de las [clases Bootstrap validación de formulario en el lado del cliente](https://getbootstrap.com/docs/5.1/forms/validation/#server-side) como esto:

```html
<input type="text" class="form-control is-valid">
<input type="text" class="form-control is-invalid">
```
