¡Por fin llegamos a Rails!

## Primera semana - Rails 101

Esta es la última "semana real" en Kitt con desafíos diarios. A partir de la semana que viene empezaremos a trabajar con proyectos más largos, ya sea un clon de Airbnb o tu proyecto personal. Por ahora vamos a explorar la arquitectura de una App Rails fresca para entender lo que pasa dentro de la misma. **Vamos a crear una app Rails diariamente**.

### `01 Rutas, Controladores y Vistas`

En el primer día verás el flujo estándar de Rails `ruta > controlador > vista` sin agregar el nivel del modelo ni la explicación de los `params`. Durante el transcurso del día transformarás desafíos viejos de Ruby que hiciste en la semana 1 en apps en Rails.

### `02 Modelos y CRUD`

¡Aquí entra nuevamente nuestro viejo amigo Active Record! **Una de las clases (lectures) de Rails más importantes del bootcamp** Tu profesor/a principal va a escribir todo el código de las 7 acciones CRUD desde cero y a introducir la herramienta de ruteo `resources`. ¡Presta mucha atención! 🤓

### `03 Ruteo Avanzado`

Hoy agregaremos un segundo modelo de aplicación Rails creando un clon de dos modelos de Yelp con restaurantes y reviews. La clase matinal es sobre **ir más allá de CRUD** con ruteo avanzado y validaciones en Rails.

### `04 Frontend en Rails`

Aprenderás la mejor forma de implementar Bootstrap SASS + librerías frontend y a pasar de `form_for` a `simple_form_for` usando la configuración de Simple Form de Bootstrap.

Aprenderás sobre el asset pipeline y webpacker.

En cuanto a los ejercicios, comenzarás con la creación de una app de cócteles que tomará dos días. Dicha app tendrá 3 modelos `Cocktail`, `Ingredient` y `Dose`. Tendrás que:
- seguir la configuración frontend detenidamente para poder crear una app que luzca bien.

### `05 Hosting y la Carga de Imágenes`

La clase (lecture) de esta mañana tiene 2 partes:
**Hosting**: El deployment en [Heroku](http://heroku.com/)

**Carga de Imágenes**: Vamos a alojar las imágenes en [Cloudinary](http://cloudinary.com/), usando [ActiveStorage](https://guides.rubyonrails.org/v6.0.1/active_storage_overview.html). El curso también incluye como asegurar tus API keys usando la gema [dotenv](https://github.com/bkeepers/dotenv). **Presta mucha atención si no quieres que te roben datos bancarios en Github.**

El viernes a las 2 p.m. es ¡**el último quiz**! No te pongas triste 😢

Miraremos hacia atrás para comprobar que hayas entendido los fundamentos de Rails.

## Segunda semana - Airbnb

¡**AirBnB**! En la segunda semana trabajarás con tu equipo de proyecto de 3 o 4. El objetivo es empezar desde cero y crear un MVP de AirBnB. Tendrás 5 días para llevar tu clon tan lejos como puedas.

- La primera demo es el miércoles (5 p.m.)
- **¡La demo oficial es el viernes! (5 p.m.)**

**Esta semana no habrá sesión de código en vivo a las 5 p.m.** Sin embargo, tendrás clases matinales a las 9 a.m. sobre temas interesantes, así que ¡levántate temprano! Aquí hay un resumen de lo que viene:

### `06 Devise`

Clase matinal en 2 partes:

- Autenticación (authentication) con la gema [Devise](https://github.com/plataformatec/devise).
- Técnicas de colaboración con git y Github. Descubrirás cómo trabajar en un equipo de desarrollo usando `branches` y `pull requests`. Es un sistema que usarás en cada proyecto de desarrollo que hagas, así que ¡presta atención!

### `07 Pundit`

Después de Devise te enseñaremos cómo manejar la autorización (**authorization**) en tu app Rails y así asegurarnos de que ¡solo el creador del restaurante puede hacer actualizaciones o destruirlo!

### `08 Geocoding`

Hay una clase matinal sobre geocoding (con la gema `geocoder`) y un poco sobre cómo usar la API de Google para agregar autocompletado a los formularios de entrada de direcciones.

Luego a las 5 p.m. cada grupo hará una demostración de su versión/clon de Airbnb en frente de toda la clase.

### `09 Search`

Esta clase es sobre búsquedas. Abarca desde search 101 usando ActiveRecord a soluciones más robustas como ElasticSearch o Algolia.

### `10 Airbnb Ajax en Rails`

Una vez que entiendas CRUD y puedas recrear un scaffold de Rails rápidamente será hora de agregar detalles mágicos usando AJAX. Podrás hablar con el servidor sin recargar la página (agregando nuevos comentarios a los posts / haciendo clic en estrellas de ratings / removiendo cosas de una lista, etc.).

### Preparación de Proyectos (fin de semana)

¡Has hecho cosas increíbles y estamos muy orgullosos!

Es hora del Gran Final, los proyectos. Continúa trabajando en tu proyecto durante el fin de semana:

- Escribe las historias de tus usuarios/as (no más de 15).
- Haz maquetas en papel de tus vistas principales.
- Empieza creando tu esquema de base de datos (DB) en [db.lewagon.com](http://db.lewagon.com).
- Comienza a pensar en tus rutas.

Si puedes terminar la gran parte de todo esto ahorrarás mucho tiempo el lunes y serás más eficaz.
