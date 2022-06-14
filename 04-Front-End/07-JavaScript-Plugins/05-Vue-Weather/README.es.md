## Contexto y Objetivos

¡En este desafío, vamos a jugar con la [API OpenWeatherMap](https://openweathermap.org/)! ¡Seguiremos practicando AJAX y descubriremos cómo podemos preguntarle a los usuarios su posición actual!

## Especificaciones

Abre tu servidor local con:

```bash
yarn install
rake webpack
```

Ve a [`localhost:8080`](http://localhost:8080/) y abre tu consola.

### Obtén tu clave API (1 para ti y para tu compañero)

Primero, ve a la [API OpenWeatherMap](https://home.openweathermap.org/) y crea una cuenta para obtener tu clave API. Deberías encontrarla [aquí](https://home.openweathermap.org/api_keys). Es posible que Open Weather se demore un poco en activar las claves ya que todos ustedes crearán cuentas al mismo tiempo. Para evitar este problema, **comparte tu clave API con tu compañero** para limitar el número de claves a activar.

Se te permite realizar 60 llamadas / minuto de forma gratuita, lo que debería ser suficiente para este desafío.

### El estado del tiempo actual

Lee la [doc de la API current weather](https://openweathermap.org/current) para encontrar el endpoint que queremos llamar con `fetch`. ¿Lo tienes? **No olvides que una url siempre empieza por `http://`** (o `https://`).

Antes de escribir cualquier línea de código, intenta abrir la url en tu navegador para ver si obtienes una respuesta. Si obtienes un error `401`, significa que has olvidado pasar tu clave API. Puedes añadirla al **string de la query** de la url con el parámetro `appid`:

```bash
&appid=YOUR_API_KEY
```

Cuando hayas conseguido mostrar la respuesta de la API en tu navegador, pasa a la implementación en JavaScript.

**Recordatorio: debes escribir tu código JavaScript en Vue**

Vuelve a los apuntes del desafío de Vue y de la clase para seguir las instrucciones de instalación.

### Muestra los datos en tu página

Con los datos enviados por la API, continúa y construye la siguiente página:

![Current Weather](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png)

Para obtener la temperatura en Celsius, puedes agregar `&units=metric` en la URL de tu solicitud.

Para obtener la imagen del ícono, desde su id, puedes usar esta URL: `https://openweathermap.org/img/w/{iconId}.png`

### ¿Qué tiempo hace en Kuala Lumpur?

Ahora escuchemos el evento `submit` en el `<form>` para obtener los datos del usuario del `<input>` y personalizar la URL antes de realizar la llamada a la API.

Tu página debe actualizarse y mostrar los datos correctos, ¡sin recargarse! Si se vuelve a cargar, significa que olvidaste **evitar** que pase algo...

![Weather in Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png)

### Estado del tiempo en nuestra ubicación actual

Ahora queremos saber qué tiempo hace en nuestra ubicación actual.

Primero, en el HTML, elimina la clase `d-none` del enlace:

```html
<a href="" class="d-none position"><i class="bi bi-geo-alt"></i></a>
```

Verás que aparece un icono de localización.

Podemos recuperar la **ubicación actual** de un usuario con la función nativa del navegador [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition):

```javascript
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data)
})
```

¿Ves lo que obtienes de tu navegador? Tus coordenadas.

Nuestro código actualmente utiliza los **nombres** de las ciudades para obtener el estado del tiempo. Afortunadamente, también hay un endpoint que toma las **coordenadas** en la URL. Baja un poco [en la documentación](https://openweathermap.org/current) para encontrar el endpoint que toma una latitud y una longitud como parámetros.

Ahora vincula el clic en el icono de ubicación a un nuevo método, `fetchWeatherByCoordinates`, en Vue que recuperará la ubicación actual del usuario y luego actualizará la página automáticamente.

Si tu página HTML se recarga, significa que has olvidado **evitar** que pase algo...

### ¡Es hora de reorganizar tu código!

Todavía no has terminado. Cuando tus features funcionan, es tentador dejar el código tal y como está. Reorganizar tu código para que sea mantenible a largo plazo es clave si quieres ahorrar mucho tiempo en el futuro.

¿Ves algún código que se repita? Deberías ser capaz de refactorizar el código en diferentes métodos.
