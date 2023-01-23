## Contexto y Objetivos

El objetivo de este segundo desafío es familiarizarse con el diseño de base de datos,*una* habilidad clave para hacer que tu backend se pueda mantener, sea flexible y eficiente.

## Especificaciones

#### Diseño de la base de datos de una encuesta

Hay muchas formas de construir la base de datos de una encuesta pero vamos a empezar creando un sistema básico con usuarios, preguntas, respuestas y votos.

Aquí están los requerimientos de nuestro sistema:

- La aplicación gestiona varios usuarios (`users`).
- Un `user` puede crear muchas encuestas (`surveys`) pero una encuesta es creada solamente por un usuario.
- Una encuesta tiene varias preguntas (`questions`).
- Una pregunta tiene varias respuestas (`answers`) posibles.
- Cuando un usuario responde una pregunta, solo puede escoger una respuesta. Las respuestas se almacenan como `user_answers`.

#### Diseño del esquema

Diseña el esquema de base de datos para una aplicación de encuesta que cumple con los requisitos descritos anteriormente.
Para ello debes usar el [Diseñador SQL](http://db.lewagon.com).
Para comprobar tu solución, haz clic en "Save / Load", luego en "Save XML". Copia/pega el código XML generado en `lib/survey.xml`. Después usa `rake` para terminar la comprobación.

## Puntos clave de aprendizaje

- ¿Sabes lo que es un esquema?
- ¿Cuál es la relación entre tablas?
- ¿Puedes dibujar un esquema de base de datos de Facebook o Airbnb? ¡Toma una hoja de papel e intentalo!
