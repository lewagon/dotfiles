## Contexto y Objetivos

Antes de ir más allá de CRUD, repasemos algunos de los principios que vimos ayer cuando vimos Modelos y CRUD.

## Especificaciones

Ve al archivo `lib/quiz.rb`. Ahí encontrarás un quiz con algunos métodos para poner a prueba los conocimientos que has adquirido hasta ahora.¡Asegúrate de que cada método devuelva la información correcta para pasar el quiz!
⚠️ Intenta hacer el ejercicio antes de correr `rake`.

### Pregunta 1

El arreglo (`Array`) que se muestra tiene las cuatro letras que conforman las siglas `CRUD`. Actualiza cada elemento de dicho arreglo para que escribas los cuatro verbos que describen las acciones CRUD.

### Pregunta 2

Devuelve una cadena de caracteres (`String`) con el comando que usarías en la Terminal para generar un modelo `Restaurant` con dos campos: nombre (name) de tipo cadena de caracteres (`String`) y estrellas (
stars) de tipo entero (`Integer`).

### Pregunta 3

Actualiza el arreglo (`Array`) devuelto con las rutas a los archivos creados para ti al correr el generador de módulos para `Restaurant` (de la pregunta anterior). Usa `YYYYMMDDHHMMSS` para las marcas de tiempo (timestamps).

### Pregunta 4

Hay siete rutas `CRUD` que necesitamos saber bien. Sin embargo, no las queremos crear todas en nuestras rutas. Devuelve una cadena de caracteres (`String`) con la única línea que agregaríamos en `config/routes.rb` para agregar las siete rutas CRUD para nuestro modelo `Restaurant`.

### Pregunta 5

Si tenemos todas las siete rutas CRUD, necesitaremos siete métodos de instancia en nuestro `RestaurantsController`. Devuelve un arreglo (`Array`) con las siete acciones de controlador que van con las rutas CRUD.

## Puntos clave de aprendizaje

- Saber lo básico sobre las rutas CRUD
- ¿Cómo generamos nuevos modelos en nuestras aplicaciones?
