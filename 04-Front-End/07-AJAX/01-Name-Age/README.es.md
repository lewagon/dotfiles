## Antecedentes y Objetivos

En este ejercicio jugarás con la [API del Diccionario Libre](https://dictionaryapi.dev/). Esta API te permitirá obtener definiciones para una palabra en particular.

Para hacer eso, tendrás que implementar una solicitud `GET` a la API para recuperar la definición de la palabra y mostrarla en el DOM.

## Especificaciones

Como de costumbre, inicia tu servidor con `serve` en la terminal y ve a `localhost:8000`.

En el archivo `lib/index.js`, implementa la solicitud `GET` a la API usando `fetch` en la función `displayDefinition()`. La lógica para capturar y almacenar la `word` ya está implementada, por lo que puedes concentrarte en la solicitud AJAX.

Debes utilizar la siguiente URL para hacer la solicitud a la API:

```
https://api.dictionaryapi.dev/api/v2/entries/en/PALABRA
```

Por ejemplo, esta URL obtendrá definiciones para la palabra "gato":

```
https://api.dictionaryapi.dev/api/v2/entries/en/cat
```

La API te dará muchas definiciones diferentes para la palabra. No te preocupes, tu objetivo es **solo mostrar la primera definición**. Para encontrarla, deberás prestar mucha atención a la estructura de los datos que la API te devuelve 🤔 ¿Qué es un `Array`; qué es un `Object`; cuáles son las claves y valores?

Una vez completada la solicitud, actualiza el contenido de la página para mostrar la definición. El resultado debe ir en el `<p id="definition">`.

¡Feliz definición!
