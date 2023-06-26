Como no todo el mundo será capaz de escribir el código del setup, ahora es el momento perfecto para distribuir el resto de las actividades entre los miembros de tu equipo para que todos tengan algo que hacer.


## Rails New
En primer lugar, decide en equipo quién será el Lead developer de este proyecto. Puede ser la misma persona de tu proyecto Airbnb, o un nuevo miembro del equipo. Esa persona continuará con los siguientes pasos para configurar la aplicación.

Cuando empieces tu proyecto rails, **debes** usar una de las [**Plantillas Wagon Rails**](https://github.com/lewagon/rails-templates/tree/master). ¡Asegúrate de utilizar la [Plantilla de Devise](https://github.com/lewagon/rails-templates/tree/master#devise) si necesitas un modelo `User`!

Una vez creada la app, crea tu repositorio de Github y añade a todos los compañeros de tu equipo como colaboradores. Consulta las [diapisitivas de la lecture de Github](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F06-Airbnb-Devise#/1/3/0) para tener una visión general del proceso.

Luego, crea la Heroku app y haz tu primer deploy. Consulta las [dispositivas de la lecture de Heroku](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F05-Rails-MC-with-images#/0/2/5) si necesitas repasar los pasos.

Consejo: siempre corre `heroku run rails db:migrate` después de hacer el push a Heroku para asegurarte de que tu base de datos de producción esté actualizada con cualquier cambio.

## Programación en pareja
Es difícil dividir el trabajo y que todos empiecen a escribir líneas de código en un proyecto vacío. Comienza generando tus **modelos centrales** en la computadora del Lead developer, [programando en pareja](https://en.wikipedia.org/wiki/Pair_programming). Asegúrate de seguir a fondo el esquema de la base de datos que fue validado por el equipo de profesores. Si quieres, [aquí](https://kitt.lewagon.com/knowledge/cheatsheets/active_record_basics) puedes refrescar tus conocimientos de Active Record antes de empezar a crear tus modelos.

Siempre empieza generando aquellos modelos que no hacen referencia a otros modelos. ¿Recuerdas la sintaxis?


```bash
# Generic syntax
rails g model ModelName column:type

# For instance
rails g model Pet name:string user:references
```

Una vez que hayas generado todos tus modelos, no olvides hacer

```bash
rails db:migrate
```

Nota: Algunos de tus esquemas pueden tener relaciones y foreign keys más avanzadas que las que vimos durante la semana de Airbnb. Por ejemplo, una tabla que puede necesitar almacenar dos instancias (foreign keys) de otra tabla (casi siempre la tabla `User`). En este caso necesitarás utilizar algo llamado `alias`. Aprende a implementarlos con [esta guía](https://kitt.lewagon.com/knowledge/cheatsheets/active_record_advanced) de Active Record avanzado.

Cuando hayas terminado esto, abre tus modelos y sigue con las **asociaciones** y **validaciones** 👌

## Controladores

Antes de dividir el trabajo, también puedes considerar crear los controladores principales (mantenerlos vacíos en este punto).

```bash
# Generic syntax
rails g controller model_name_plural

# For instance
rails g controller pets
```

En este punto deberías estar listo para hacer commits o el merge de este trabajo al `master` y comenzar a distribuir tareas en tu equipo. ¡Los branches son **obligatorios** en esta etapa!


## Figma
Probablemente te diste cuenta durante la Airbnb Week que tener un Figma completo y detallado puede hacer la diferencia en el trabajo de tu equipo. Saber exactamente cómo debe ser cada feature, con un patrón de diseño consistente, es lo que llevará a tu app al siguiente nivel!

A pesar de que ya creaste tu maqueta inicial en el Sprint de Diseño de Producto, ahora es el momento de echarle un nuevo vistazo y actualizarla en base a las decisiones que tomaste anteriormente junto con tu equipo sobre las historias de usuario, las rutas, etc. Figma es una herramienta increíble con un montón de características interesantes que puedes utilizar aquí para hacer un prototipo de alta fidelidad. Asegúrate de crear tu [librería de componentes](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-Components-in-Figma), añadir algunos plugins como [unsplash](https://www.figma.com/community/plugin/738454987945972471/Unsplash), [color palettes](https://www.figma.com/community/search?model_type=public_plugins&q=color%20palettes) y explorar aún más en la sección de la [comunidad](https://www.figma.com/community/explore).

Elige a un miembro del equipo para que trabaje en la mejora del Figma mientras los demás continúan con las tareas restantes.
