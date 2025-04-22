## Cómo usar los branch

El flujo de trabajo que usamos se llama **Feature Branching**. Esto significa que cada rama (o branch, en inglés) es una feature, o **parte de una feature**. Idealmente, no deberías trabajar en el mismo branch por más de un día. Si el backend y el front-end básico están listos, haz el push y luego crea un nuevo branch para terminar de darle estilo. Tu branch debe tener un nombre claro y descriptivo, como `restaurants-show` or `dashboard-page-front-end` o `animated-menu-items`.

NOTA: Esto también significa que **nunca programamos en el master**. Si te das cuenta de que accidentalmente has estado trabajando en el master, ¡no te preocupes! Simplemente muévete a un branch existente o crea uno nuevo, y los cambios no confirmados se irán contigo. Puedes revisar el flujo de git [aquí](https://kitt.lewagon.com/knowledge/cheatsheets/git_advanced). Si por algún motivo tienes problemas para mudarte a un nuevo branch, abre un ticket.

Cuando creas que hayas terminado tu feature, el proceso debe ser:

1. Push de tu branch: pídele a un miembro del equipo que lo revise
2. Merge al master: si el equipo aprueba tu código
3. Comunicarle al equipo que el master se ha actualizado, para que puedan bajar la última versión
4. Subir a Heroku: crash test/depuración
5. Actualizar el tablero Kanban

Es normal tener conflictos en el merge de vez en cuando. ¡Minimiza el riesgo haciendo push y merge regularmente!

## Implementación continua

El flujo mencionado anteriormente 👆 se llama implementación continua. La idea de la implementación continua es enviar código a tu entorno de producción con la mayor frecuencia posible. Idealmente, cada vez que una pull request se acepta y se hace el merge al `master`, el `master` branch debe pasar a producción. Las ventajas de esto son las siguientes:
- Evitar que se acumule la deuda técnica. Al hacer push con frecuencia y luego hacer un crash test del nuevo código, encontrarás cualquier error de inmediato y sabrás que provienen del código más reciente que se envió. Esto hace que sea mucho más fácil encontrar la fuente y depurar. Si, en cambio, esperas para hacer el push a producción después de que se haya hecho el merge de más de 5 Pull Requests, es mucho más difícil averiguar de dónde provienen los errores.
- El código llega más rápido al usuario. Esto significa que si se hizo el merge del código con el master, entonces se considera "hecho" y se le debe dar al usuario para que realmente lo use. Esto también significa que recibirás feedback de los usuarios antes y podrás implementar ajustes e iterar rápida y fácilmente para ofrecerle el mejor producto posible a tus usuarios. (En tu MVP, tendrás que actuar como desarrollador y usuario 😉).

## Pestañas del navegador

A estas alturas, probablemente ya hayamos aprendido que programar significa tener 100 pestañas del navegador abiertas al mismo tiempo 😂. Así que preparémonos para el éxito fijando (haz clic con el botón derecho en la pestaña y selecciona 'Añadir esta página a marcadores') las siguientes pestañas en tu navegador para acceder fácilmente a ellas mientras programas:
- [Busca en las lectures de Kitt](https://kitt.lewagon.com/knowledge/lectures)
- [Mensajes Errores frecuentes en Rails](https://github.com/Eschults/useful_stuff#pgerror-fatal-myapp_development-does-not-exist)
- [Tutoriales](https://kitt.lewagon.com/knowledge/tutorials)
- [Apuntes](https://kitt.lewagon.com/knowledge/cheatsheets)

## Seeds

Es bueno comenzar con algunos datos básicos con los que todos puedan trabajar, especialmente para aquellos que trabajan en las features de READ. Prioriza la creación de un seed básico para empezar a trabajar.

