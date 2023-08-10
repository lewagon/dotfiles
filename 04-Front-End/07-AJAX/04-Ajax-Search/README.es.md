## Antecedentes y objetivos

En este ejercicio jugarás con la [API de OMDb](https://www.omdbapi.com/) (The Open Movie Database).
Esta API te permitirá obtener información sobre películas a partir de una palabra clave.

En este ejercicio, deberás implementar una solicitud `GET` a la API de OMDb para obtener información sobre las películas que estás buscando e implementar una devolución de llamada para insertar una tarjeta por cada película en el DOM.

![Gif resaltado](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-search.gif)

## Recursos

La [documentación de la API de OMDb](https://www.omdbapi.com/)

## Especificaciones

Inicia tu servidor local con `serve`. Ve a `localhost:8000`.

### Lógica de visualización

En el archivo `index.html` del ejercicio, encontrarás una página estructurada en dos partes principales:

- Un **formulario** con un campo de texto y un botón de enviar, para ingresar tu búsqueda y enviarla a la API.
- Un **div con el id `movie-cards`** en el que insertarás una tarjeta por cada película.

Aquí tienes la estructura de URL que debes utilizar para hacer una solicitud a la API:

```
http://www.omdbapi.com/?s=TITULO_PELICULA&apikey=TU_CLAVE_API
```

Por ejemplo, esto es lo que buscaríamos para encontrar todas las películas de `Harry Potter`:

```
http://www.omdbapi.com/?s=Harry Potter&apikey=adf1f2d7
```

Aquí tienes 3 claves de API para hacer tus solicitudes (no dudes en cambiarlas si tus solicitudes dejan de funcionar):

```
-  adf1f2d7
-  48727053
-  8691812a
```

Escribe tu JavaScript en `lib/index.js`.

### Captura el título de la película y realiza la solicitud

Añade el evento adecuado para capturar la palabra clave ingresada por el usuario cuando haga clic en el botón `Buscar` o cuando presione la tecla `Enter` del teclado.

Luego, almacena esta palabra clave en una variable y construye la URL que utilizarás en la solicitud `fetch`.

No olvides que esta API devolverá un JSON, por lo que deberás realizar varias operaciones antes de acceder a los resultados.

En cada paso, considera agregar algunos `console.log` para ver el objeto que estás manipulando.

### Inserta una tarjeta por cada película

Tan pronto como puedas mostrar los resultados de la solicitud a la API en la consola, comienza a implementar la devolución de llamada que insertará una tarjeta por cada película en el div con el id `movie-cards`.

Aquí tienes el código HTML de la tarjeta que puedes utilizar (pero siéntete libre de crear la tuya propia):

```html
<div class="col-lg-3 col-md-4 col-sm-6 col-12">
  <div class="card mb-2">
    <img
      src="https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg"
      class="card-img-top"
      alt="Harry Potter and the Half-Blood Prince"
    />
    <div class="card-body">
      <span class="badge bg-primary mb-2">2009</span>
      <h5 class="card-title">Harry Potter and the Half-Blood Prince</h5>
    </div>
  </div>
</div>
```

### Opcional: actualizar los resultados al presionar una tecla (`keyup`)

Ahora que se ha implementado toda la lógica, intenta actualizar tu código para que los resultados se refresquen cada vez que el usuario ingrese una nueva letra.

¡Feliz búsqueda!
