## Contexto y Objetivos

Antes de empezar a ver el desafío Watch list, repasemos algunos de los principios que vimos ayer cuando vimos rutas avanzadas.

## Especificaciones

Ve al archivo `lib/quiz.rb`. Ahí encontrarás algunos métodos para poner a prueba los conocimientos que has adquirido hasta ahora.¡Asegúrate de que cada uno de los métodos devuelva la información adecuada para pasar el quiz!

⚠️ Intenta hacer el ejercicio antes de correr `rake`.

### Pregunta 1

Implementa las 7 rutas convencionales que corresponden a las 7 rutas CRUD generadas por `resources :restaurants`.

Pista: una ruta sigue el siguiente patrón: `verb "url", to: "controller#action"`

### Pregunta 2

Devuelve verdadero (`true`) o falso (`false`) para la siguiente pregunta:
Si tienes una relación uno a muchos (one to many) entre tus modelos como por ejemplo `Restaurant` y `Review` (belongs_to :restaurant), ¿Siempre tienes que anidar todas las rutas de `Review` en `Restaurant`?

### Pregunta 3

Devuelve una cadena de caracteres (`String`) de una validación Active Record para asegurarte de que ningún registro sea creado sin un nombre (`name`).

## Puntos clave de aprendizaje

- Entender lo que `resources` le hace a tus rutas.
- Entender las relaciones muchos a muchos (many to many) y las rutas anidadas.
- Entender cómo agregar validaciones a nuestro modelo para evitar problemas de base de datos (DB).
