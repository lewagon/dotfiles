## Antecedentes y Objetivos

En el desarrollo web de front-end, los **data attributes** son una forma bastante útil de inyectar y almacenar valores en tu HTML que puedes acceder fácilmente desde JavaScript.

Recuerda que ya has trabajado con atributos, como **id**, **class**, **href**, **style**, etc. Estos son atributos estándares que se utilizan con un propósito específico. Pero a veces necesitamos almacenar otros tipos de datos en el HTML y crear nuestros propios atributos para hacerlo. Aquí es donde entran en juego las **data attributes**.

En este ejercicio aprenderás cómo interactuar con estos data attributes mediante JavaScript.

## Configuración

Comienza ejecutando un servidor e ingresa a [localhost:8000](http://localhost:8000).

```bash
serve
```

## Lo que estamos construyendo

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/scratchcards.gif"  width="800" height="552">

Prepárate para apostar 🎲

Tu tarea es vender tarjetas de rasca y gana de la lotería. Si abres tu [localhost:8000](http://localhost:8000), deberías ver una cuadrícula de tarjetas de rasca y gana. ¡Pero estas tarjetas están en blanco!

Cada tarjeta de rasca y gana tiene un costo de 10€. Sin embargo, el usuario no sabe cuánto ganará con cada tarjeta. Podría ser nada o incluso miles de euros. Debe "rascar" la tarjeta para ver cuánto ha ganado después de comprarla. Es por eso que el precio real no se muestra en la pantalla 😶‍🌫️

## Comprar una tarjeta de rasca y gana

Primero, queremos crearlo que el usuario pueda comprar una tarjeta de rasca y gana por 10€. El usuario lo hará haciendo clic en una de estas tarjetas. Así que vamos a pensar en los pasos para hacer esto:

1. Seleccionar todas las tarjetas de rasca y gana de la página (usando `querySelector` o `querySelectorAll`).
2. Escuchar cuando el usuario haga clic en una de estas tarjetas de rasca y gana.
3. Cuando lo haga, restar `10` de la cantidad de dinero que tiene el usuario. No te preocupes por calcular cuánto ha ganado aún (eso será en la próxima sección).
4. Mostrar su balance en la página.

Notarás en nuestro HTML lo siguiente:

```html
<div id="footer" class="footer">
  Tu balance es: <span id="balance">100</span>€
</div>
```

Entonces, querrás mostrar la cantidad de dinero que tiene el usuario aquí. El usuario comienza con 100€ (como se indica en el HTML). Por supuesto, su balance no puede ser inferior a cero; en ese punto, es "fin del juego" 👾

Podrás comprobar que esto funciona si, en tu navegador, el balance disminuye en 10€ cada vez que haces clic en una tarjeta de rasca y gana hasta llegar a 0€.

## Cálculo de la Cantidad Ganada

¡No sería un juego de azar si el usuario supiera cuánto ganará con cada tarjeta de rasca y gana! Entonces, ¿dónde se encuentra esta información oculta?

Si observas el HTML, notarás que cada tarjeta de rasca y gana se ve así:

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

El detalle clave es `data-amount="5"`. Esta tarjeta nos haría ganar 5€ 🎉

Entonces, ¿cómo podemos acceder a este atributo de datos desde JavaScript? **Deberás utilizar el [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) para hacer esto**. El dataset es una propiedad de JavaScript que nos permite acceder a los atributos de datos de los elementos HTML. Aquí tienes un ejemplo de la sintaxis:

```javascript
// si en nuestro HTML tenemos: <div id="hotel" data-name="Azure Ocean"></div>

const hotel = document.querySelector("#hotel");
console.log(hotel.dataset.name);
// imprimirá Azure Ocean
```

¿En qué te hace pensar la sintaxis `hotel.dataset.name`? ¡Exacto, el `dataset` es un `Object` (como un `Hash` en Ruby) que tiene claves correspondientes a las propiedades `data-` del HTML! Entonces, si tenemos `data-name="Azure Ocean"`, entonces `dataset.name` nos dará `"Azure Ocean"`.

Volviendo a nuestras tarjetas de rasca y gana, apliquemos este principio para agregar la cantidad ganada al total:

1. Encuentra el lugar en tu código donde estás restando `10`. Querrás seguir restando `10` (es el costo de todas las tarjetas de rasca y gana), pero modificarás este código para también _sumar_ la cantidad ganada.
2. Toma el elemento de la tarjeta de rasca y gana que obtuviste del DOM y utiliza el `dataset` para obtener `data-amount`. _Nota: las propiedades del `dataset` siempre son cadenas de texto (strings), por lo que es posible que necesites convertirlas si deseas otro tipo de dato._
3. Añade esta cantidad al balance del usuario.

Sabrás que lo has logrado si, al hacer clic en las tarjetas, en ocasiones el programa suma la cantidad ganada al balance del usuario en lugar de solo restar 10€.

## Raspar las Tarjetas

El único problema es que, en este momento, ¡puedes hacer clic en la misma tarjeta de rasca y ganar más de una vez! Esto significa que si el usuario encuentra una tarjeta ganadora, puede seguir haciendo clic indefinidamente.

Si vuelves a mirar el HTML, notarás:

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

También hay una propiedad `data-scratched="false"` que aún no hemos utilizado. Puedes tener tantos atributos de datos como desees en un elemento HTML (siempre que tengan nombres diferentes), por lo que no hay problema en utilizar tanto `data-amount` como `data-scratched` aquí.

Aquí tienes tus tareas:

1. Cuando el usuario haga clic en una tarjeta de rasca y gana, ¿puedes establecer su atributo `data-scratched` para que sea `data-scratched="true"`? _Pista: Si haces esto correctamente, el CSS ya está configurado para que notes que la tarjeta se aclara cuando haces clic en ella._
2. Si el usuario intenta hacer clic en la misma tarjeta más de una vez, ¿puedes evitar que la compre nuevamente?

## Mostrar la Cantidad Ganada en la Tarjeta

Finalmente, como una mejora adicional a nuestra aplicación, ¿puedes hacer que cuando hagas clic en una tarjeta, esa tarjeta muestre la cantidad que el usuario ganó con esa tarjeta?
