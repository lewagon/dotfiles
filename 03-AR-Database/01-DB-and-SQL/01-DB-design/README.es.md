## Antecedentes y objetivos

El objetivo de este primer ejercicio es familiarizarse con el diseño de bases de datos, una habilidad **crucial** para hacer que tu backend sea mantenible, flexible y eficiente. Para crear nuestras bases de datos, utilizaremos [SQL Designer](http://db.lewagon.com), una herramienta que utilizaremos varias veces a lo largo del bootcamp.

## Especificaciones

### Diseñando nuestra primera tabla

Comencemos creando una tabla para almacenar usuarios. La tabla debería tener las siguientes columnas:

- Nombre (First name)
- Apellido (Last name)
- Correo electrónico (Email)

Utiliza [SQL Designer](http://db.lewagon.com) para dibujar la tabla `users` con las columnas especificadas anteriormente. Para verificar tu solución, haz clic en "Save / Load" y luego en "Save XML". Copia y pega el código XML generado en `lib/users.xml`. Luego puedes ejecutar el comando `rake` para comprobar tu solución.

NOTA: Recuerda que cada tabla necesita una columna `id`.

### Diseño de la base de datos para una encuesta

Continuemos desde nuestra tabla `users` y construyamos una base de datos para una encuesta. Hay muchas formas de construir una base de datos para una encuesta, pero comencemos con un sistema básico que incluya usuarios, preguntas, respuestas y encuestas.

Estos son los requisitos de nuestro sistema:

- La aplicación administra varios `usuarios` (que ya tenemos)
- Un usuario puede crear muchas `encuestas`, pero una encuesta es creada por un único usuario
- Una encuesta tiene varias `preguntas`.
- Una pregunta tiene varias `respuestas` posibles.
- Cuando un usuario responde una pregunta, solo puede elegir una respuesta. Estas respuestas se almacenan como `user_answers`.

### Diseña el esquema

Utilicemos otra vez [SQL Designer](http://db.lewagon.com) para diseñar un esquema de base de datos para una aplicación de encuestas que cumpla con los requisitos mencionados anteriormente. Para verificar tu solución, haz clic en "Save / Load" y luego en "Save XML". Copia y pega el código XML generado en `lib/survey.xml`. Luego puedes ejecutar el comando `rake` para comprobar tu solución.

## Puntos clave de aprendizaje

- ¿Sabes qué es un esquema (schema)?
- ¿Cuál es la relación entre las tablas?
- ¿Podrías dibujar el esquema de la base de datos detrás de Facebook? ¿Airbnb? Coge un papel y ¡anímate a intentarlo!
