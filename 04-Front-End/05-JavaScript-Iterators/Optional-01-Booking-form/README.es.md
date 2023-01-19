## Contexto y Objetivos

Esto es lo que crearás en este desafío:

![Gif de Formulario Dinámico ](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/booking-form.gif).

No usaremos AJAX en este desafío. Solo queremos **actualizar la interfaz de usuario (UI) del formulario** cuando el/la usuario/a haga clic en los botones `-` / `+`.

No se espera que el envío de formulario tenga algún tipo de efecto.

Es hora de jugar con los [`dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)!

## Especificaciones

Inicia tu servidor web local con::

```bash
rake webpack
```

Abre [`localhost:8080`](http://localhost:8080) en tu navegador.

### Agregar participantes

Esta página muestra un formulario de reservación que queremos que sea **dinámico**. Cuando el/la usuario/a haga clic en los botones `-` / `+` queremos que pase lo siguiente:

- Que se actualice el contador
- Que se actualice el precio que se muestra en el botón de envío
- Que se actualice el valor de la entrada de solo lectura (en céntimos).

¡Para eso debes echarle un buen vistazo al archivo `index.html`, especialmente a los atributos de datos (**the `data-` attributes**) que tienen valores muy importantes!

### Activa el signo menos (`-`)

¡El botón `-` no debe permitir el uso de `0` o valores negativos! Cuando quieras "deshabilitar" un enlace puedes hacer que su comportamiento predeterminado no se aplique. Eso es posible haciendo lo siguiente:

```js
button.addEventListener('click', (event) => {
  event.preventDefault();
});

```

Mejora la experiencia de usuario (UX) de tu formulario con lo siguiente:

- Un enlace `-` de activación/desactivación (toggle): **activa** el enlace cuando el número de participantes sea **`>= 2`** y de lo contrario **desactívalo** (¡el contador nunca debe llegar a `0` o tener valores negativos)!
- Oculta la entrada (te recomendamos investigar sobre [tipos de entrada](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)).¡Dicha entrada no puede estar visible para los usuarios en la versión final de tu formulario!

Este desafio es **dificil**. Trabaja con tu compañero (buddy) paso por paso con pseudocódigo!

No hay ningún test para este ejercicio pero debes comprobar tu estilo corriendo `rake`.

## Recuros

- Para agregar / remover un atributo HTML a / de un elemento te recomendamos leer sobre [`removeAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute) y  [`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- Puedes obtener todos los atributos de un elemento HTML llamando a las [propiedades de los `.attributes`](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) sobre el elemento.
