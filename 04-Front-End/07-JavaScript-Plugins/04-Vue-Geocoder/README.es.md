## Contexto y Objetivos

En este ejercicio, practicaremos lo que hemos aprendido de AJAX. Empezaremos con algo sencillo, una petición `GET`. Aquí usaremos la [API Geocoding de MapBox](https://www.mapbox.com/search/). ¡Queremos que construyas una herramienta en la que podamos introducir una dirección, pulsar un botón y obtener las **Coordenadas GPS**! Como sorpresa final, queremos que muestres el mapa.


<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/mapbox_ajax_geocoder.gif" alt="MapBox Geocoding demo" width="100%">
</div>

## Especificaciones

Puedes iniciar tu servidor local con:

```bash
rake webpack
```

### Geocoding

En primer lugar, tendrás que crear una cuenta de MapBox y obtener una clave API (¡No te preocupes, es gratis!) Luego, lee la [documentación de la API  Geocoding de MapBox](https://docs.mapbox.com/api/search/geocoding/). Todo se resume en hacer una petición HTTP `GET` con una dirección como parámetro de la cadena de consulta.

```javascript
'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR-API-KEY'
```

NOTA: necesitarás tu contraseña para hacer la solicitud a la API de MapBox. Es uno de los parámetros que pide. Puedes encontrar tu clave en tu [cuenta](https://www.mapbox.com/account/). La verás justo después de que te hayas registrado e iniciado sesión.

Sigue adelante y échale un vistazo al formulario que ya está en el boilerplate `index.html` del desafío. Tiene un `input` de tipo `"text"` donde el usuario puede escribir una dirección, y un `input` de tipo `"submit"` para mostrar un botón.

Utiliza el evento `submit` para captar el momento en que el usuario envía el formulario. Ese es el momento perfecto para iniciar la consulta AJAX al servicio de geocodificación de MapBox usando `fetch` (regresa a las diapositivas de la clase de ayer).

**Recordatorio: debes escribir tu código JavaScript usando Vue**

Regresa a la clase para seguir las instrucciones de instalación.

Como siempre, cuando se hace un fetch de datos de una API, empieza por hacer `console.log()` para ver lo que se obtiene de MapBox. ¡Es un JSON enorme! Ahora que tienes eso, averigua dónde están enterradas las coordenadas del GPS y muéstralas en pantalla.

Pista: ¡Mapbox devuelve las coordenadas con la longitud primero, y la latitud después!

### [OPCIONAL] Visualización de un mapa

Para mostrar un mapa de MapBox con un marcador en la dirección especificada, utilizaremos una segunda API, la [API JavaScript de MapBox](https://www.mapbox.com/mapbox-gl-js/api/).

Para utilizarla, añade esta línea en el `head` de tu archivo HTML, para poder utilizar la hoja de estilos de MapBox para el mapa:

```html
<link href="https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css" rel="stylesheet">
```

Para añadir un mapa, necesitarás un elemento HTML de soporte vacío. Por ejemplo:

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

Para construir el mapa fácilmente y añadirle un marcador, usaremos el [paquete mapbox-gl de npm](https://yarnpkg.com/en/package/mapbox-gl).

Necesitas correr un `yarn add mapbox-gl` para añadirle este paquete a tu proyecto.

Puedes usar el siguiente código para probar cómo funciona `mapbox-gl` antes de añadir la estructura de Vue. Para mostrar un mapa en tu elemento HTML `#map` con el paquete `mapbox-gl`, primero importa el paquete en la parte superior de `index.js`:

```javascript
import mapboxgl from "mapbox-gl"
```

Y luego muestra un mapa:

```javascript
mapboxgl.accessToken = "yourApiKey"
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [ -0.077, 51.533 ],
  zoom: 12
})
```

Para añadir un marcador al mapa, si la variable `map` contiene el objeto `mapboxgl`, puedes ejecutar lo siguiente:

```js
new mapboxgl.Marker()
  .setLngLat([ -0.077, 51.533 ])
  .addTo(map)
```

¡Disfruta el geocoding! 🌎 🌍 🌏
