## Antecedentes y objetivos

En este ejercicio, practicaremos nuestras habilidades con las API. Comencemos de manera sencilla con una solicitud `GET`. Aquí utilizaremos la [API de geocodificación de MapBox](https://www.mapbox.com/search/). ¡Queremos construir una herramienta donde podamos ingresar una dirección, hacer clic en un botón y obtener las **coordenadas GPS** a cambio! Como guinda del pastel, también mostraremos el mapa.

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/mapbox_ajax_geocoder.gif" alt="Demostración de geocodificación de MapBox" width="100%">
</div>

## Especificaciones

Inicia tu servidor web local con:

```bash
serve
```

Abre [`localhost:8000`](http://localhost:8000) en tu navegador.

### Geocodificación

Primero, deberás crear una cuenta en MapBox y obtener una clave de API (¡es gratis registrarse!). Luego, lee la [documentación de la API de geocodificación de MapBox](https://docs.mapbox.com/api/search/geocoding/). Se resume en hacer una solicitud `GET` HTTP con una dirección como parámetro en la cadena de consulta.

```javascript
"https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=TU-CLAVE-DE-API";
```

NOTA: La solicitud a la API de MapBox requerirá tu clave de API como uno de los parámetros en tu solicitud. Puedes encontrar tu clave en tu [página de cuenta](https://www.mapbox.com/account/) una vez que hayas creado una cuenta e iniciado sesión.

Ve y revisa el formulario ya presente en el esqueleto del desafío `index.html`. Contiene un `input` de tipo `"text"` donde el usuario puede escribir una dirección, y un `input` de tipo `"submit"` para mostrar un botón.

Utiliza el evento `submit` para detectar el momento en que el formulario es enviado por el usuario. Ahí es cuando querrás desencadenar la solicitud a la API para consultar el servicio de geocodificación de MapBox utilizando `fetch` (más información en la próxima lección).

Cuando obtengas los datos de una API, comienza imprimiéndolos en la consola con `console.log()`. ¡Es un JSON enorme! Ahora que tienes eso, descubre dónde están enterradas las coordenadas GPS y muéstralas en pantalla.

Pista: ¡Mapbox devuelve las coordenadas con la longitud primero y la latitud después!

### (OPCIONAL) Mostrando un mapa

Para mostrar un mapa de MapBox con un marcador en la dirección especificada, utilizaremos una segunda API, la [API de JavaScript de MapBox](https://www.mapbox.com/mapbox-gl-js/api/).

Para usarla, agrega esta línea en la `head` de tu archivo HTML, para que puedas usar la hoja de estilos de MapBox para tu mapa:

```html
<link
  href="https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
  rel="stylesheet"
/>
```

Para agregar un mapa, necesitarás un elemento HTML de soporte vacío. Por ejemplo:

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

Para crear fácilmente el mapa y agregarle un marcador, agregaremos [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/install/).

Para mostrar un mapa en tu elemento HTML `#map` con Mapbox GL JS, deberás agregar estas líneas en tu `index.html`.

```html
<script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
<link
  href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css"
  rel="stylesheet"
/>
```

Y luego muestra un mapa:

```javascript
mapboxgl.accessToken = "tuClaveDeAPI";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [-0.077, 51.533],
  zoom: 12,
});
```

Para agregar un marcador al mapa, si la variable `map` contiene el objeto `mapboxgl`, puedes ejecutar:

```js
new mapboxgl.Marker().setLngLat([-0.077, 51.533]).addTo(map);
```

¡Feliz geocodificación! 🌎 🌍 🌏
