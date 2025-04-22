## Tareas como Features

El propósito de los proyectos es que **todos aprendan**. No debemos encasillarnos entre nosotros ni en el front-end ni en el backend, sino asegurarnos de que todos puedan tener una experiencia global. Por esta razón, cuando dividas tus tareas en tu equipo, debes asignarlas como **features** para que el miembro del equipo las vea desde el backend hasta el front-end.

Eso significa que el flujo de features es:
`route > controller action > view WITH initial (if not all) css`

## Dependencias

Una gran parte de decidir cómo asignar tareas es primero averiguar qué features, si las hay, dependen de otras para poder construirlas. Mientras completas tu tablero Kanban, intenta encontrar estas dependencias y haz que sea fácil verlas para que todos los miembros del equipo lo sepan (una buena pista de que habrá una dependencia es una ruta anidada). Considera agregar una etiqueta a la tarjeta de esa feature en el Kanban.

Formas de abordar las dependencias de las features:
- Si tienes suficientes historias de usuario, dale a cada uno una feature que no tenga ninguna dependencia
- O, comienza con una feature principal de la que dependan otras y créala programando en parejas hasta que pueda separarse en tareas individuales
- Divide las tareas entre front-end y backend mientras se realiza la feature dependiente, luego vuelve a la etapa de creación de features.
