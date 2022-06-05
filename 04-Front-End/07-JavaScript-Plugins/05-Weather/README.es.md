## Contexto y Objetivos

¡En este desafío vamos a practicar con la [API OpenWeatherMap](https://openweathermap.org/)!¡Practicaremos con AJAX nuevamente y descubriremos cómo podemos preguntarle a los/las usuarios/as sus localizaciones actuales!

## Especificaciones

Puedes iniciar tu servidor local con:

```bash
rake webpack
```

Ve a [`localhost:8080`](http://localhost:8080/) y abre la consola.

### Obten tu clave API (1 para ti y otra para tu compañero/a (buddy))

Primero ve a la [API OpenWeatherMap](https://home.openweathermap.org/) y crea una cuenta para poder obtener tu clave API. La puedes encontrar [aquí](https://home.openweathermap.org/api_keys). Pueden haber algunas demoras en la activación de claves en Open Weather debido a que todos estarán creando cuentas al mismo tiempo. Para evitar este problema te recomendamos **compartir tu clave API con tu compañero/a (buddy)** y así reducir el número de claves.

Tienes autorización para ejecutar 60 llamadas / minuto gratis lo que debe ser suficiente para este desafío.

### Current weather

Lee la [documentacion de la API Current Weather](https://openweathermap.org/current) para encontrar el endpoint que queremos llamar con `fetch`. ¿Ya lo encontraste? **No olvides que una url empieza con `http://`** (o `https://`).

Antes de escribir código, trata de abrir la url en tu navegador para ver si obtienes una respuesta.¡Si obtienes un error `401` significa que olvidaste pasar tu clave API! Se la puedes agregar a la **cadena de consulta** de la url con el parámetro `appid`:

```bash
&appid=YOUR_API_KEY
```

Una vez que hayas logrado mostrar la respuesta de la API en tu navegador, comienza la implementación de JavaScript.

**Recordatorio: debes escribir tu código JavaScript dentro de un controlador Stimulus**

Regresa al desafío Stimulus y sigue las instrucciones de instalación.

### Muestra los datos en tu página

Crea la página siguiente usando los datos que devuelve la API:

![Estado actual del Tiempo](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png).

Para obtener la temperatura en Celsius, puedes agregarle `&units=metric` a la URL de tu petición.

Para obtener el icon image del icon id, puedes usar esta URL: `https://openweathermap.org/img/w/{iconId}.png`

### ¿Cuál es el estado del tiempo en Kuala Lumpur?

Ahora escucha el evento `submit` en el `<form>` para obtener datos del usuario del `<input>` y personalizar la URL antes de hacer la llamada API.

¡En teoría tu página debe actualizarse y mostrar los datos correctos sin recargarse! Si tu HTML se vuelve a cargar significa que olvidaste **evitar** que pasara algo ...

![El estado del tiempo en Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png).

### Obtención del estado del tiempo de la localización actual

Ahora queremos ser capaces de obtener el estado del tiempo en nuestra localización actual.

Primero, en el HTML, remueve la clase `d-none` del enlace:

```html
<a href="" class="d-none position"><i class="bi bi-geo-alt"></i></a>
```

Notarás que aparece un ícono de localización.

Podemos recuperar la **current location** de un usuario con la posición nativa del navegador [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition):


```javascript
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data)
})
```

¿Ves lo que obtienes del navegador? Tus coordenadas.

Por ahora nuestro código usa los **nombres** de las ciudades para obtener el estado del tiempo. Afortunadamente, también hay un endpoint que toma las **coordenadas** en la url. Baja un poco [en la documentacion](https://openweathermap.org/current) para encontrar el endpoint que toma una latitud y una longitud como parámetros.

Conecta el clic del ícono de localización a una nueva acción en tu controlador Stimulus la cual recuperará la localización actual del usuario y actualizará la página con esa nueva información.

Si tu HTML se vuelve a cargar significa que olvidaste **evitar** que pasara algo ...

### ¡Hora de reorganizar tu código!

Todavia no has terminado. Cuando las features funcionan bien, es normal caer en la tentación de dejar el código tal como está. Sin embargo, es primordial reorganizar tu código para hacerlo mantenible a largo plazo si quieres ahorrarte mucho tiempo en el futuro.

¿Ves algún código común ahí? Tú deberías ser capaz de refactorizar el código actualizando la card en un método `private`. Para definir un [método privado en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields), simplemente agrégale `#` al principio de su nombre.
