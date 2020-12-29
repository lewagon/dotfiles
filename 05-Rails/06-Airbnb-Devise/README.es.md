## Semana AirBnB

Trabajarás con tu equipo de proyecto en las próximas sesiones para crear un clon de AirBnB (¡no tienes que alquilar **apartamentos**. Sé creativo!)

### Demos

Vas a presentar tu trabajo (en producción.¡Nada de demos en `localhost`!) durante las sesiones de **Geocoding** y **AJAX en Rails**.¡Las fechas de entrega (deadlines) son importantes!

### Parte I

Trabaja en los siguientes pasos y valídalos con un/a profesor/a al inicio de la sesión y antes de crear tu app Rails y seguir a la Parte II. Esto te ahorrará mucho tiempo. ¡Confía en nosotros!

#### 1 - User stories

Duplica esta [hoja de cálculo](https://docs.google.com/spreadsheets/d/1_q-wwWiWUY5VL0gZVtqWIidWEtfwhX8FHEbwaW0LuFI/edit?usp=sharing) (1 por equipo) y trabaja en colaboración con tu equipo.

![Duplica](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/user-stories/duplicate.png).
![Cambia el nombre](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/user-stories/rename.png).

Empieza pensando en los **user journeys** que mostrarás en la demo. Hay muchos casos posibles para productos similares a Airbnb, pero intenta reducirlos a lo mínimo viable para que funcione.

<details><summary markdown='span'>View solution
</summary>

- 1 user journey for the user creating an offer
- 1 user journey for the user booking an offer
- 1 user journey for the owner accepting or declining a booking request

</details>

- 1 user journey para que el/la usuario/a cree una oferta
- 1 user journey para que el/la usuario/a reserve una oferta
- 1 user journey para que el/la dueño/a acepte o rechace la solicitud de reservación.

Cada user journey contiene varias **user stories**. Escríbelas en la hoja de cálculo usando la terminología adecuada. Cuando termines, levanta un ticket para validarlas con un/a profesor/a.

Puedes hacer borradores de las vistas con papel y lápiz para visualizar los elementos de los user journeys.¡No entres en detalles ya que no son necesarios todavía! Esto es un sprint y por ende debes administrar tu tiempo y tus recursos adecuadamente.

#### 2 - Esquema de la base de datos

Dibuja el esquema de tu base de datos usando [nuestra herramienta db](https://kitt.lewagon.com/db/new) y **levanta un ticket para validarlo con un/a profesor/a**. Solo dibuja lo mínimo viable para que tu app funcione. Usa las convenciones adecuadas (plural para nombres de columnas... etc. Ve las notas de la clase de base de datos (DB)).

#### 3 - Rutas

Regresa a tu hoja de cálculo de user stories y agrega la información siguiente:
- Ruta: Verbo + Path
- Acción
- Controlador

Levanta un ticket para validarlos con un/a profesor/a.¿Todo bien? ¡Es hora de hacer el `rails new`!

### Parte II

Antes de decidir quién va a hacer qué, creen el proyecto juntos. El **lead developer** (y solo él/ella) debe:

#### 1. Crear el proyecto Rails con configuración Postgres

Usa la plantilla minimal de Le Wagon la cual ya tiene una buena configuración de frontend:

```bash
cd ~/code/<user.github_nickname>
rails new \
  --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
```

¡Nuevamente, únicamente el **lead developer** hará esto! Nadie mas …

#### 2. Haz el Push del proyecto a Github

```bash
cd rails-airbnb-clone
gh repo create
git push origin master
```

#### 3. Agrega a tus compañeros/as de equipo como colaboradores en el repositorio Github

Ve a [los parámetros de tu repositorio Github](https://github.com/<user.github_nickname>/rails-airbnb-clone/settings/collaboration) y agrega a tus compañeros/as al repositorio como **colaboradores**.

Ahora los/las otros/as compañeros/as pueden **clonar** el proyecto. ⚠️**Ten cuidado. Usa la url `SSH`**⚠️

Luego tus compañeros/as deben correr lo siguiente:

```bash
bundle install
yarn install
rails db:create db:migrate
```

#### 4. El deploy en Heroku

Inclusive si solo es un esqueleto de la app, es importante hacer el deploy en Heroku **desde el primer día** y seguir haciéndolo diariamente al agregar nuevas funcionalidades.

```bash
heroku create airbnb-<user.lower_github_nickname> --region=REPLACE_WITH_REGION # (eu, us, or any region available in `heroku regions` list)
git push heroku master
heroku run rails db:migrate
```

Ahora sí pueden repartirse las tareas en tu equipo. **Tomate tu tiempo en la creación del proyecto todo será más simple si empiezas con buen pie**.

### Algunos lineamientos sobre gestión de proyectos

#### Comienzo

Durante la repartición del trabajo en equipo te darás  cuenta que muchas tareas dependen de otras … ¿Cómo integrar facebook connect sin un modelo `User` ¿Cómo implementar las reservas sin un modelo `Flat`? Aquí hay algunos lineamientos para ayudarte a organizar tu trabajo:

Siempre debes comenzar con los **modelos fundamentales** de tu app de los cuales dependen todas las demás funcionalidades. En el caso de Airbnb tenemos `User` y `Flat`. Una vez que estos modelos sean integrados, es mucho más fácil dividirse las tareas. Como una etapa inicial puedes separar dos tareas principales:

**grupo #1 - Modelo para comenzar**:
- Integra `User` con el registro e inicio de sesión (signin/signup) de  Devise
- Integra `Flat` con la lista (`index`) y la creación (`new/create`)

**grupo #2 - Frontend para comenzar**:
- Trabaja en una distribución (layout) limpia con navbar/footer
- Crea una página de inicio (homepage) simple y atractiva.

Una vez que hayas terminado con estos dos grupos (cada uno debería tomarte ~2h) y que todos hayan hecho el merge en Github de sus trabajos, pueden avanzar y repartirse el trabajo de las demás funcionalidades.

#### Organización de tareas

Aquí hay una lista de las diferentes user stories implementadas en el proyecto Airbnb:

- Como usuario/a, puedo navegar por la página web desde la barra de navegación (navbar) con enlaces funcionales como "signin/signout", "My bookings", "Publish an offer", etc.
- Como usuario/a, puedo ver la página de un apartamento
- Como usuario/a, puedo reservar un apartamento
- Como usuario/a, puedo agregarle fotos a mi apartamento
- Como usuario/a, puedo agregarle reviews a un apartamento donde me he quedado
- Como usuario/a, puedo localizar apartamentos con un mapa
- Como usuario/a, puedo iniciar sesion con mi usuario Facebook
- Como usuario/a, puedo recibir un email cuando alguien reserva mi apartamento
- ...

**Algunas de estas funcionalidades son más importantes que otras**. Es tu trabajo asignar prioridades para terminar el MVP al final de la semana!

#### Ejemplo de funcionalidad: Reservar un apartamento

Cuando trabajes en una funcionalidad, hazlo **desde la base de datos al HTML/CSS**. Tomemos como ejemplo la funcionalidad de la “reserva”:

*Modelo*
- Voy a crear un modelo `Booking` y la migración asociada.
- Luego voy a trabajar con las asociaciones y validaciones del modelo de trabajo.
- luego haré el crash-test de mi modelo desde la `rails console` para asegurarme de que todo funcione en el modelo.

*Rutas*:
- Voy a agregar rutas de bookings en `routes.rb`

*Controlador*:
- Voy a crear un `BookingsController` con acciones `create` e `index`.
- Voy a implementar dichas acciones.

*Modificación de vistas**:
- Voy a incluir el formulario de reserva en el `views/flats/show.html.erb` existente
- Voy a listar todas las reservas del usuario actual en una página nueva `views/bookings/index.html.erb`.

*Enlaces (links)*:
- Voy a agregar un enlace a la página `bookings#index` en la barra de navegación (navbar).

*HTML/CSS*:
- Mi formulario de reserva está limpio y tiene las clases Bootstrap adecuadas para las entradas y los botones.
- Mi pagina de nuevas reservas está limpia con un `container` para centrar el contenido, títulos claros y un diseño limpio para cada reserva.
- Voy a tomarme el tiempo de refactorizar mi HTML usando partials si mi código HTML es muy difícil de leer.

**Escribe el código perfecto desde el modelo a la vista**

- Haz el crash test de todas las asociaciones y validaciones de tus modelos en la consola Rails.
- No descuides la vista. Si agregas un formulario, haz que se vea bien, centrado y receptivo usando Bootstrap. Si escribes el código de una lista de apartamentos, crea una buena cuadrícula (grid) Bootstrap (por ejemplo, con una foto a la izquierda y la información a la derecha).
- Usa partials para refactorizar tu HTML y así hacerlo más legible y mantenible.
