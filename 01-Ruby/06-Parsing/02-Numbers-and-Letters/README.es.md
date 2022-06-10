## Contexto y Objetivos

- Familiarizarse con el formato de parseo JSON
- Aprender cómo separar responsabilidades de tu programa en varios sub-métodos.

## Especificaciones

Si eres fan de la televisión francesa, tal vez hayas visto [_Des chiffres et des lettres_](https://en.wikipedia.org/wiki/Des_chiffres_et_des_lettres). Si eres inglés/inglesa o te gusta la televisión inglesa, tal vez estés más familiarizado/a con [_Countdown_](https://www.youtube.com/watch?v=GvV8aVEJmiU)!

El objetivo de este desafío es escribir una versión simplificada de este juego desde la Terminal donde:

- Se te da un conjunto de letras aleatoriamente.
- Tienes que suministrar la palabra en inglés más larga que puedas encontrar usando solo las letras en la cuadrícula.
- Después de escribir tu respuesta, obtienes un puntaje, ves el tiempo que te tomó y eventualmente ves un mensaje de error cuando fallas.

Así debería funcionar todo al correr `ruby lib/interface.rb`:

```
********* Welcome to the longest word-game! *********
Here is your grid:
Q F M R K L I T P
*****************************************************
What is your longest word?
lift
******** Now your results ********
Your word: lift
Time Taken to answer: 12.07916
Your score: 3.194722666666667
Message: Well Done!
```

¡En este desafío tendrás acceso a una API web y podrás parsear datos JSON devueltos por la misma!

**Limitaciones**:

- Usarás el Diccionario API de Le Wagon. Veamos lo que recibimos de la API cuando suministramos una [palabra inglesa correcta](https://wagon-dictionary.herokuapp.com/apple)  y una [incorrecta](https://wagon-dictionary.herokuapp.com/zzzz). Presta atención a la estructura de la URL.
Tu cuadrícula debe ser aleatoria y también debe poder recibir los mismos caracteres varias veces.
- Asegúrate de validar que **1)** tu palabra realmente sea una palabra inglesa y **2)** que cada letra de tu palabra esté en la cuadrícula (recuerda que sólo puedes usar las letras una sola vez).
- Si la palabra no es válida o no está en la cuadrícula, el puntaje será 0 (y deberá estar acompañado por un mensaje para el/la jugador/a explicando porque no obtuvo ningún puntaje).
- El puntaje depende el tiempo que se tome el/la jugador/a para responder, así como de la longitud de la palabra que suministre ¡Mientras más larga sea la pregunta y más corto sea el tiempo de respuesta, mejor será el puntaje! ¡Siéntete libre inventar tus propias reglas para penalidades!

## Puntos clave de aprendizaje

- ¿Qué es un JSON? ¿En qué se parece a la estructura del hash Ruby?
- ¿Cómo podrías refactorizar tu código para separar las responsabilidades de cada método?

## Sugerencias y recursos adicionales

Este desafío carece premeditadamente de acompañamiento. Acá hay algunos elementos que te ayudarán:

- Escribe el pseudocódigo para descubrir por dónde comenzar  antes de escribir la primera línea de código.
- Puedes instalar la extensión [Json Formatter for Chrome](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) para que te ayude a leer el JSON devuelto por la API (ve a  [JSONView for Mozilla](https://addons.mozilla.org/fr/firefox/addon/jsonview/))
- Usa el paquete `open-uri` de la librería estándar Ruby para hacer peticiones HTTP a la API y obtener un resultado en JSON. Usa el paquete `json` para parsear los archivos JSON devueltos.
- Para testear la inclusión en la cuadrícula, trata de usar el `Enumerable#all?`
