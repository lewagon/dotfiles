## Antecedentes y objetivos

En este ejercicio jugarás con la [API de agify](https://agify.io/). Esta API te permitirá predecir tu edad basándose en tu primer nombre.

Para lograrlo, deberás implementar una solicitud `GET` a la API de agify para recuperar la edad predicha y mostrarla en el DOM.

![Gif resaltado](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/your-age-from-your-name.gif)

## Especificaciones

Como de costumbre, inicia tu servidor con `serve` en la terminal y ve a `localhost:8000`.

En el archivo `lib/index.js`, implementa la solicitud `GET` a la API de agify utilizando `fetch` en la función `displayAge()`. La lógica para capturar y almacenar el `firstName` ya está implementada, por lo que puedes centrarte en la solicitud AJAX.

Debes utilizar la siguiente URL para hacer la solicitud a la API:

```
https://api.agify.io?name=EL_PRIMER_NOMBRE
```

Por ejemplo, esta URL predecirá la edad de `michael`:

```
https://api.agify.io?name=michael
```

Una vez que se haya completado la solicitud, actualiza el contenido de la página para mostrar la edad. El resultado debe ir en `<p id="your-age">`. Intenta mostrar un mensaje con una frase como "Tienes 30 años".

¡Feliz agify!
