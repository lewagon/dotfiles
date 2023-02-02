## Contexto y Objetivos

Ciertamente las aplicaciones que funcionan en la Terminal son interesantes pero ¿sabes que es aún mejor? ¡las aplicaciones web! Intentemos llevar nuestro Recetario (Cookbook) a una nueva aplicación web usando la gema `sinatra`.

## Fundamentos sobre Sinatra

Sinatra es lo que se le llama un "micro framework", un marco de aplicación web minimalista. Básicamente es un micro Rails y también sigue el patrón **MVC**. El archivo `app.rb` funciona como un controlador y el ruteo lo maneja Sinatra.
Ya hemos creado un método de controlador para manejar el root de la página web. Sinatra mapea el URL en el navegador con el método adecuado en `app.rb`. Para más información, échale un vistazo a la [documentación de ruteo](http://www.sinatrarb.com/intro.html#Routes).

Puedes leer más sobre Sinatra en nuestro [tutorial](https://github.com/lewagon/sinatra-101). Sigue los pasos en [setup](https://github.com/lewagon/sinatra-101#setup), [sinatra app](https://github.com/lewagon/sinatra-101#sinatra-app) y [views](https://github.com/lewagon/sinatra-101#views) detalladamente antes de comenzar a construir tu aplicación web del Recetario (Cookbook).

## Especificaciones

Usaremos nuestras clases `Recipe` y `Cookbook` en nuestra aplicación web tal como las teníamos en el ejercicio anterior. Sin embargo, no necesitamos ni la clase `Router` ni `Controller`.

### Índice

Debes mostrar tus recetas en una lista no numerada en la raíz (root) de tu aplicación web (en la url `/`).

Agregale el enlace de navegación (`<a>`) a la url `/new` que usaremos para la historia del usuario crear (`create`). Esto lo harás debajo de la lista de recetas.

### Crear

Se necesitan dos pasos para crear una receta en el contexto de nuestra aplicación web. Uno de ellos es mostrar el formulario. Usaremos una petición HTTP `GET /new` para eso.

El `<form>` será equivalente a los `gets` en la Terminal. Necesitamos campos para el nombre, la descripción de cada receta y cualquier otro que creas que sea relevante. Al enviar el formulario se generará la siguiente petición HTTP:

```
POST /recipes
```

Esta petición activará algo de código en `app.rb` para agregar la receta al recetario (cookbook).
Al final de este código, encuentra una manera de **redireccionar** al usuario hacia el url `/` de tu aplicación web (el índice (index)).

### Destruir

Agrega un enlace `destroy` en tu índice (index) cerca del nombre y la descripción de la receta.
Al hacer clic en el mismo la receta en cuestión debe ser eliminada y el usuario debe ser**redireccionado** al índice (index).

### Un paso más lejos

Cuando hayas podido escribir el código de estas 3 historias de usuario, ¡continúa trabajando e intenta implementar las siguientes acciones: importar (`import`) y marcar como hecho (`mark as done`)!

¡Que disfrutes Sinatra!
