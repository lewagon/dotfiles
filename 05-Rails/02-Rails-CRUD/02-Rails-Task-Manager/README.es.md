## Contexto y Objetivos

Vamos a crear un To-Do Manager con las funcionalidades CRUD:

1. Como usuario, puedo hacer una lista de tareas
1. Como usuario, puedo ver los detalles de una tarea
1. Como usuario, puedo agregar una nueva tarea
1. Como usuario, puedo editar una tarea (marcarla como completada / actualizar su título y detalles)
1. Como usuario, puedo eliminar una tarea

En este desafío te encontrarás con tu viejo amigo [**Active Record**](http://guides.rubyonrails.org/active_record_basics.html) el cual es el ORM de Rails.

Aquí no hay `rake`. También recuerda no crear tu app Rails en `fullstack-challenges` ⛔️ En lugar de eso, sigue estas instrucciones:

```bash
cd ~/code/<user.github_nickname>
rails new rails-task-manager --skip-active-storage --skip-action-mailbox
cd rails-task-manager
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## Especificaciones

### 1 - Modelo

Genera el modelo `Task` por medio del generador Rails adecuado. Debe tener por lo menos las siguientes columnas:

- `title`, como `string`
- `details`, como `text`
- `completed`, como `boolean` (default: `false`)

### 2 - Controlador

Genera un `TasksController` vacío (sin acciones) usando el generador correcto.

Para este ejercicio, **no uses `resources`** en tu `config/routes.rb`. El objetivo de este ejercicio es crear nuevamente el CRUD regular desde cero.

### 3 - Como usuario, puedo hacer una lista de tareas

Primero, agrega una nueva ruta a la lista de tareas siguiendo la convención vista en clase. Luego, agrega una acción de controlador y su vista. Esta acción debe recuperar **todas** las tareas y una vista debe correr en bucle sobre ellas para mostrarlas como se ve en la captura de pantalla siguiente.

¡Para testear tu vista necesitas algunas tareas en la base de datos! Para crear algunas, corre un `rails console` en otra ventana de Terminal y luego corre lo siguiente:

```ruby
Task.create(title: "Laundry", details: "Do not mix colors!")
Task.create(title: "Studying", details: "A lot of flashcards to do", completed: true)
```

⚠️ En la vista, no trabajes en la parte visual de las casillas de verificación (checkboxes) por ahora. Podremos hacerlo en las preguntas opcionales.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/index.png).

### 4 - Como usuario, puedo ver los detalles de una tarea

Ahora tenemos una lista de tareas y quisiéramos hacer clic en su título y navegar hacia una nueva página que muestre los detalles de dicha tarea. Siguiendo las convenciones vistas en clase, agrega una nueva ruta, una nueva acción de controlador y una nueva vista. Esta acción debe **buscar** una tarea específica gracias a su `id` directamente desde `params`.

Actualiza la vista `index.html.erb` con el helper `link_to` para crear los enlaces.

⚠️ En la vista, no trabajes en la parte visual de las casillas de verificación (checkboxes) por ahora. Podremos hacerlo en las preguntas opcionales.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/index_show.gif).

### 5 - Como usuario, puedo agregar una nueva tarea

Siguiendo las convenciones vistas en clase, agrega dos rutas para manejar la creación de una tarea. Una ruta existe para mostrar el formulario del Task y la otra tiene como función manejar la petición `POST` generada cuando se envía dicho formulario. Intenta usar el helper `form_with` directamente en tu vista.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/new.gif).

### 6 - Como usuario, puedo editar una tarea

Queremos poder editar una tarea, cambiar su título y sus detalles y especialmente **marcarla como completada**. Siguiendo las convenciones vistas en clase, agrega las dos rutas que necesitas para esta funcionalidad.
Implementa las acciones de controlador y las vistas.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/edit.gif).

### 7 - Como usuario, puedo eliminar una tarea

La última funcionalidad. Queremos poder borrar (destroy) tareas directamente desde la lista. Una confirmación JavaScript sería útil.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/destroy.gif).

### 8 - Refactorización (Opcional)

Analiza tu código con ojo crítico e introduce los siguientes cambios:

1. Usa `resources` en tu `config/routes.rb`
1. Usa un `before_action` en el `TasksController`
1. ¿Deberíamos repetirnos (DRY) un poco con las vistas `new` y `edit`?¿Cómo deberíamos manejar el hecho de que el formulario `new` **no** debe mostrar "Completed"? ([pista](http://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-new_record-3F)).

### 9 - Front-End (Opcional)

**Instala las hojas de estilo de Bootstrap**

Sigue las instrucciones de [la documentación](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css) e instala Bootstrap en tu Rails app copiando y pegando el `link` tag en el `head` del layout en `application.html.erb`:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

Ahora puedes usar cualquier clase Bootstrap en cualquier lugar de tus vistas de Rails. 🎉

**Instala Font Awesome**

Agrega el `link` tag de Font Awesome en el `head` de tu layout:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">
```

Ahora puedes usar cualquiera de los [íconos gratuitos de Font Awesome](https://fontawesome.com/search?m=free) 🎉 ¡Trata de encontrar buenos íconos de casilla de verificación!

Usa declaraciones condicionales en tu vista. Si la tarea está completada, muestra la casilla marcada, de lo contrario, muestra la casilla vacia.
