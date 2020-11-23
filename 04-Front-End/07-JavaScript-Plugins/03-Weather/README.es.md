## Contexto y Objetivos

¡En este desafío vamos a practicar con la [API OpenWeatherMap](https://openweathermap.org/)!¡Seguiremos practicando AJAX y descubriremos cómo podemos preguntarle a los/las usuarios/as sus localizaciones actuales!

## Especificaciones

Puedes iniciar tu servidor local con:

```bash
rake webpack
```

Ve a [`localhost:8080`](http://localhost:8080/) y abre la consola.

### Obten tu clave API (1 para ti y otra para tu compañero/a (buddy))

Primero ve a la [API OpenWeatherMap](https://home.openweathermap.org/users/sign_up) y crea una cuenta para poder obtener tu clave API. La puedes encontrar [aquí](https://home.openweathermap.org/api_keys). Pueden haber algunas demoras en la activación de claves en Open Weather debido a que todos estarán creando cuentas al mismo tiempo. Para evitar este problema te recomendamos **compartir tu clave API con tu compañero/a (buddy)** y así reducir el número de claves.

Tienes autorización para ejecutar 60 llamadas / minuto gratis lo que debe ser suficiente para este desafío.

### Current weather

Lee la [documentacion de la API Current Weather](https://openweathermap.org/current) para encontrar el endpoint que queremos llamar con `fetch`. ¿Ya lo encontraste? **No olvides que una url empieza con `http://`** (o `https://`).

Antes de escribir código, trata de abrir la url en tu navegador para ver si obtienes una respuesta.¡Si obtienes un error `401` significa que olvidaste pasar tu clave API! Se la puedes agregar a la **cadena de consulta** de la url con el parámetro `appid`:

```bash
&appid=YOUR_API_KEY
```

Una vez que hayas logrado mostrar la respuesta de la API en tu navegador, sigue avanzando y escribe tu petición `fetch` en el archivo `lib/index.js`.

¿Recuerdas la sintaxis? Muestra lo que obtienes de la API usando `console.log()` para asegurarte de que todo funciona bien antes de dar un paso más.

### Muestra los datos en tu página

Crea la página siguiente usando los datos que devuelve la API:

![Estado actual del Tiempo](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png).

**No te apresures** en el código:

- empieza por diseñar tu HTML con papel y lápiz ✏️
- escribe el código del HTML con los atributos relevantes (más que todo `id`s)
- escribe el código JS para inyectar datos en los lugares adecuados
- escribe el código CSS para agregar estilo ✨

**Pista:** Para obtener la temperatura en Celsius puedes agregar `&units=metric` en la url de tu petición.

### ¿Cuál es el estado del tiempo en Kuala Lumpur?

¡Agrega un formulario (`<form>`) con una entrada (`<input>`) de tipo `type="text"` para pedir el estado del tiempo en cualquier ciudad! Agrega un botón `submit` y escucha el evento `submit` del formulario para hacer una nueva llamada API.

¡En teoría tu página debe actualizarse y mostrar los datos correctos sin recargarse! Si tu HTML se vuelve a cargar significa que olvidaste hacer que algo **no se aplicara** ...

![El estado del tiempo en Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png).

### Agrega el paquete Select2 de NPM

En la clase de esta mañana viste como agregar [select2](https://select2.org/):

1. Descarga `jquery` y `select2` con yarn

    ```bash
    yarn add jquery select2
    ```

2. Agrega select en tu archivo `index.html` (remueve la entrada):

    ```html
    <select id="city-input" class="select2"></select>
    ```

3. Activa `select2` con:

    ```js
    import $ from 'jquery';
    import 'select2';

    $('#city-input').select2();
    ```

Ahora queremos inyectar una lista de ciudades sin tocar el archivo HTML. ¡Afortunadamente, select2 [tiene una opción para eso](https://select2.org/data-sources/arrays)!

Copia/pega este arreglo (array) en tu código para pasárselo a tu `select2`:

```js
const cities = ["Amsterdam","Bali","Barcelona","Belo Horizonte","Berlin","Bordeaux","Brussels","Buenos Aires","Casablanca","Chengdu","Copenhagen","Kyoto","Lausanne","Lille","Lisbon","London","Lyon","Madrid","Marseille","Melbourne","Mexico","Milan","Montréal","Nantes","Oslo","Paris","Rio de Janeiro","Rennes","Rome","São Paulo","Seoul","Shanghai","Shenzhen","Singapore","Stockholm","Tel Aviv","Tokyo"];

$('#city-input').select2({ data: cities, width: '100%' }); // <-- add the `data` and `width` options
```

Ahora verás que aparecen las ciudades en el select pero no están bien diseñadas. ¡Esto es normal porque aun no hemos incluido el CSS de select2 en el código! Para hacer eso, agrega lo siguiente en el `<head>` de tu HTML:

```html
<link rel="stylesheet" href="node_modules/select2/dist/css/select2.css">
```

Mucho mejor ¿No?

### Obtén la localización actual

Por último, pero no menos importante, agrega un enlace para obtener el estado del tiempo en la **localización actual**. Eso lo podemos hacer con el [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) de los navegadores..

Agrega una etiqueta `<a>` a tu archivo `index.html` y enlazala a la siguiente retrollamada (también conocida como llamada de vuelta o callback en inglés):

```js
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data);
});
```

¿Ves lo que obtienes del navegador? Son tus coordenadas GPS. Por ahora nuestro código usa los **nombres** de las ciudades para obtener el estado del tiempo. Afortunadamente, también hay un endpoint que toma las **coordenadas** en la url. Baja un poco [en la documentacion](https://openweathermap.org/current) para encontrar el endpoint que toma una latitud y una longitud como parámetros.

Ahora define otra `fetchWeatherByCoordinates` para adaptar la url que pasas a tu petición `fetch`.

### ¡Hora de reorganizar tu código!

Todavia no has terminado. Cuando las funcionalidades (features) funcionan bien, es normal caer en la tentación de dejar el código tal como está. Sin embargo, es primordial reorganizar tu código para hacerlo mantenible a largo plazo si quieres ahorrarte mucho tiempo en el futuro.
¿Recuerdas las reglas?

- Escribe funciones en archivos diferentes
- Importalos (`import`) en `lib/index.js` para llamarlos

¡Que lo disfrutes!
