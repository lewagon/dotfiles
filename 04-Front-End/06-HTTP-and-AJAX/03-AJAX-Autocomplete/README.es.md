## Contexto y Objetivos

Este es nuestro primer ejercicio AJAX. Vamos a crear una entrada con la capacidad de autocompletarse.¿Quieres saber de qué se trata? Ve a [Google](https://www.google.com/) para tener un ejemplo: tan pronto escribes **un** carácter en el campo de entrada recibes sugerencias debajo para autocompletar el campo.

Queremos crear una entrada que se autocomplete usando **Palabras de diccionario**.

## Especificaciones

Inicia tu servidor web local con:

```bash
rake webpack
```

Ahí verás archivos que debes actualizar::

- `index.html` - la entrada ya está ahí pero hay elementos inútiles en el autocompletado `ul` que puedes remover
- `style.css` - agregale algo de estilo
- `lib/index.js` - ¡aquí empezarás desde cero!

Si quieres algunas sugerencias, puedes usar la API siguiente:

```bash
GET https://wagon-dictionary.herokuapp.com/autocomplete/:stem
```
Aquí reemplazarás `:stem` con los caracteres agregados por  el/la usuario/a. Tan pronto el/la usuario/a introduzca un carácter (pudiese ser un `keyup`), vas a desencadenar una nueva llamada AJAX. Si te fijas en tu pestaña "Network" en el Inspector de Chrome, verás algo como lo siguiente:

```bash
https://wagon-dictionary.herokuapp.com/autocomplete/u
https://wagon-dictionary.herokuapp.com/autocomplete/un
https://wagon-dictionary.herokuapp.com/autocomplete/und
https://wagon-dictionary.herokuapp.com/autocomplete/unde
https://wagon-dictionary.herokuapp.com/autocomplete/under
etc.
```
¡Cuando recibas el JSON desde la API, tu trabajo será actualizar la lista `ul#results` con sugerencias!

Una vez que tengas el comportamiento de básico, no dudes en mejorar el estilo 🎨 de la lista `ul#results` para que se vea muy bien 🎨 😋.
