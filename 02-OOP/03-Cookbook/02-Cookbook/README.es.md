## Contexto y Objetivos

Ahora vas crear una aplicación que maneja un recetario (Cookbook).

La idea es muy simple: te encanta cocinar pero siempre debes memorizar todas las recetas que te gustan. Bueno ¡este será tu recetario! Tendrá una lista de tus recetas, permitiéndote hacer una lista de ellas (`list`), agregar (`add`) nuevas recetas y borrar (`remove`) otras.

Construirás el código de tu aplicación siguiendo el **patron** Modelo, Vista, COntrolador - MVC que también se usa en Rails:

- Modelo (Model): ¿Cuál es el objeto básico que quieres manipular?
- Vista (View): Aquí es donde le **mostramos la información** al usuario (`puts`) y también le **pedimos información** (`gets`).
- Controlador (Controller): Recuperará y almacenará datos del modelo y le dirá a la vista que le muestre al/a la usuario/a datos o que le pida datos a él/ella.

Por favor empieza con papel y lápiz para identificar tus componentes y sus responsabilidades.

## Especificaciones

### Modelo

Afortunadamente, definimos nuestra clase `Recipe` en el ejercicio anterior. Ahora lo único que debemos hacer es copiarla en la aplicación del recetario. Para ello debes copiar el siguiente comando en tu Terminal:

```bash
cp ../01-Recipe/lib/recipe.rb lib
```

Esto quiere decir que copias el archivo `recipe.rb` del ejercicio anterior en la carpeta `lib` en tu aplicación de recetas (cookbook).

### Repositorio

Ahora necesitamos una estructura para almacenar las recetas del usuario. Aún no tenemos una base de datos propiamente dicha, así que usaremos una clase que actúa como una (como lo vimos en clase). Al usar un programa Ruby perdemos toda la información que almacenamos en las variables. Si queremos recuperar la información la próxima vez que corramos el programa, debemos persistir los datos en el disco duro.

En el contexto de este desafío, el repositorio almacena las recetas que han sido agregadas por el usuario. En otras palabras, **es** el **recetaro**. Nombremos la clase `Cookbook` para escribir código explícito y significativo, pero ¡recuerda que es el **repositorio** del diagrama de esta mañana!

Implementa la clase `Cookbook` con 4 métodos:

- `initialize` que carga los `Recipe` existentes.
- `all` el cual devuelve todas las recetas
- `create(recipe)` que crea una receta y la añade al recetario
- `destroy(recipe_index)` el cual borra una receta del recetario

Nota: Cuando un programa Ruby finaliza, perdemos todos los datos que almacenamos en las variables. Esto significa que tu libro de recetas se va a "borrar" cada vez que el proceso de Terminal se cierre. No te preocupes. Vamos a solver este problema en el próximo ejercicio.

### Controlador

El controlador recopilará datos del recetario para dárselos a la vista. También le pedirá información a la misma para crear nuevas recetas. Acá están los métodos que hay que implementar:

- `initialize(cookbook)` toma una instancia de `Cookbook` como argumento
- `list` para mostrar la lista de todas las recetas
- `add` para crear una nueva receta
- `remove` para borrar una receta actual

### Vista

La vista es responsable de todos los `puts` y `gets` de tu MVC.  ¡Asegúrate de no tener esas palabras en ningún otro lado! (tal vez con la excepción de cuando haces debugging).

### Prueba de todo junto

Cuando estés listo/a, puedes testear tu programa con:

```bash
ruby lib/app.rb
```

Te damos el `app.rb` que requiere el código para iniciar un `Cookbook`, un `Controller` y arrancar la aplicación. El bucle (loop) infinito se da en el `Router` porque el mismo no es parte del MVC. De hecho, cuando trabajes con Rails, todo esto se dará por sentado y se hará por ti, lo que está bien, ¿no? 😉.

## Lectura complementaria

Los conceptos siguientes también son importantes en la arquitectura de software:

- [Principio de responsabilidad unica](http://en.wikipedia.org/wiki/Single_responsibility_principle)
- [Separación de preocupaciones](http://en.wikipedia.org/wiki/Separation_of_concerns)
