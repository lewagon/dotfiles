¡Vamos a construir un programa de entrega de comida a domicilio (Food Delivery) para un restaurante!

Aquí están las primeras **acciones de usuario** de nuestra aplicación:

- Como usuario, puedo agregar un nuevo plato
- Como usuario, puedo mostrar la lista de todos los platos
- Como usuario, puedo agregar a un cliente nuevo
- Como usuario, puedo mostrar la lista de todos los clientes

**ATENCIÓN**

El programa está diseñado para **un solo restaurante** así que no hay necesidad de que entregues (sin intención de jugar con los términos 😉) una aplicación multi restaurante (e.g. no se necesita un modelo `Restaurant`).

El programa está hecho **solamente para los empleados del restaurante** así que no es necesario diseñar una interfaz de usuario para los clientes.

Por ende los primeros elementos de nuestro programa son:
- **Meals**: Platos
- **Customers**: Clientes

## 1 - Platos (Meals)

### 1.1. - Modelo de Platos

Nuestro restaurante vende platos, así que necesitamos una representación de lo es un plato.

Cada plato tiene un número de identidad (id), un nombre (name) y un precio (price).

Escribe el código para implementar esto y haz el crash test de tu modelo. Luego testea tu código corriendo `rake meal`.

¿Tienes todo en verde? ¡Genial! Es hora de hacer `git add`, `commit` y `push`.

### 1.2 Repositorio de platos

Ya que tenemos un modelo de los platos, necesitamos un repositorio para almacenarlos.

El repositorio se inicializa con una ruta a un archivo CSV, lee/escribe los platos de dicho archivo y los almacena como objetos en un arreglo (array). A continuación se muestra el comportamiento que queremos que tenga el repositorio:
- Agregar un nuevo plato
- Recuperar todos los platos
- Buscar un plato específico a través de su número de identidad (id).

Escribe el código para implementar esto y haz el crash test de tu repositorio. Debes crear tu propio archivo CSV `meals.csv` dentro de la carpeta `data`. Luego testea tu código corriendo `rake meal`.

¿Tienes todo en verde? ¡Bien! Es hora de hacer `git add`, `commit` y `push`.

### 1.3 - Ruta y aplicación

 Todavía no hemos corrido la aplicación. Para eso necesitamos un ruteador (router) y también es necesario completar el archivo `app.rb`.

El ruteador es el responsable de la visualización de las tareas que el/la usuario/a puede hacer y de direccionar sus decisiones a la acción en el controlador correspondiente. El archivo `app.rb` es el responsable de pedir los archivos necesarios, de instanciar un ruteador y de ejecutar su método `run` para correr la aplicación.

Para poder implementar esto debes completar los archivos `router.rb` y `app.rb`. Si tienes algún problema y necesitas un poco de inspiración, te recomendamos regresar a [Cookbook](https://kitt.lewagon.com/camps/<user.batch_slug>/challenges?path=02-OOP%2F03-Cookbook%2F02-Cookbook) y descargar la solución. **No tienes que instanciar el ruteador con el controlador** ya que todavía no lo tenemos. Simplemente haz que se muestre el término `TODO` cuando el/la usuario/a selecciona una tarea.

No hay rake en esta parte. Corre la aplicacion ejecutando el siguiente comando en la Terminal:

```bash
ruby app.rb
```

¿Todo funciona bien? ¡Excelente! Es hora de hacer `git add`, `commit` y `push`.

### 1.4 - Controlador para los platos

Ahora vayamos al controlador. Las siguientes son las **acciones de usuario** que queremos implementar:
- `add`: agregar un plato
- `list`: mostrar la lista de todos los platos

¡Recuerda que el papel del controlador es delegar y coordinar el trabajo de los demás elementos de tu aplicación (modelo, repositorio y vista)!

Comienza escribiendo el **pseudocódigo** separando cada acción de usuario en pasos básicos y delegando cada uno de ellos a un componente (modelo, repositorio, vista). Luego escribe el código correspondiente. Crea la vista y escribe su código paso por paso.

Para testear el controlador, conectalo a tu aplicación instanciandolo en `app.rb` y pasándoselo al ruteador. Luego haz el crash test del código corriendo tu aplicación:

```bash
ruby app.rb
```

`rake meal` también te debería ser de utilidad en estos pasos. ¡Sigue la guía!

Asegurate que las dos acciones de usuarios para platos funcionen bien antes de pasar a la siguiente funcionalidad.

¿Todo está en verde? ¡OK! Es hora de hacer `git add`, `commit` y `push`.

## 2 - Clientes

### 2.1 - Modelo del cliente

Nuestro restaurante le vende a sus clientes,  así que necesitamos una representación de lo es un cliente (customer).

Cada cliente tiene un número de identificación (id), un nombre (name) y una dirección (address).

Escribe el código para implementar esto y haz el crash test de tu modelo. Luego testea tu código corriendo `rake customer`.

¿Todo está en verde? ¡Bravo! Es hora de hacer `git add`, `commit` y `push`.

### 2.2 - Repositorio del cliente

Ya que ahora tenemos un modelo que representa a los clientes, necesitamos un repositorio para almacenarlos.

El repositorio se inicializa con una ruta a un archivo CSV, lee/escribe los clientes de dicho archivo y los almacena como objetos en un arreglo (array). A continuación se muestra el comportamiento que queremos que tenga el repositorio:
- Agregar un nuevo cliente
- Recuperar todos los clientes
- Buscar un cliente específico a través de su número de identificación (id).

Escribe el código para implementar esto y haz el crash test del repositorio. Tienes que crear tu propio archivo `customers.csv`  dentro de la carpeta `data`. Luego prueba tu código corriendo `rake customer`.

¿Todo está en verde? ¡Bravo! Es hora de hacer `git add`, `commit` y `push`.

### 2.3 - Controlador del cliente

Vayamos al controlador. Aquí están las **acciones de usuario** que queremos implementar:
- `add`: agregar un nuevo cliente
- `list`: mostrar la lista de todos los clientes

¡Recuerda que el rol del controlador es delegar el trabajo a los otros elementos de tu aplicación (modelo, repositorio y vista)!

Comienza escribiendo el **pseudocodigo** separando cada acción de usuario en pasos básicos y delegando cada uno de ellos a un componente (modelo, repositorio, vista). Luego escribe el código correspondiente. Crea la vista y escribe su código paso por paso.

Para testear el controlador, conectalo a tu aplicación instanciandolo en `app.rb` y pasándoselo al ruteador. Luego haz el crash test del código corriendo tu aplicación:

```bash
ruby app.rb
```

`rake customer` también te debería ser de utilidad en estos pasos. ¡Sigue la guia!

Asegurate que las dos acciones de usuarios para clientes funcionen bien antes de pasar a la siguiente funcionalidad.

¿Todo está en verde? ¡Qué bueno! Es hora de hacer `git add`, `commit` y `push`.

## 3 - Opcionales

### 3.1 - Implementa las acciones `edit` y `destroy` para los platos y los clientes.

Recuerda que hasta ahora los usuarios de tu aplicación no pueden editar o borrar un plato o cliente.

Implementa las siguientes acciones de usuario adicionales:
- Como usuario puedo editar un plato actual
- Como usuario puedo borrar un plato actual
- Como usuario puedo editar un cliente actual
- Como usuario puedo borrar un cliente actual

¿Listo? Es hora de hacer `git add`, `commit` y `push`.

### 3.2 - Refactorización de repositorios con el concepto de  herencia

`MealRepository` y `CustomerRepository` tienen mucho en común, ¿cierto? Para mantener el principio de no repetirse a uno mismo [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) tenemos que definir la clase padre `BaseRepository` la cual tendrá todo el comportamiento compartido que `MealRepository` y `CustomerRepository` heredarán.
Escribe el código para esto. Como es una refactorización no hay un nuevo test. Si tu `rake` estuvo todo verde anteriormente, ¡deberá estarlo después!

¿Listo? Es hora de hacer `git add`, `commit` y `push`.

¡Ya terminaste por hoy!
