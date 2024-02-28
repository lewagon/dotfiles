## Antecedentes y objetivos

Nuestro objetivo en este ejercicio es mejorar nuestro libro de recetas existentes, que codificamos en el ejercicio anterior, guardando nuestras recetas en un archivo CSV. De esta manera, cuando salgamos y reiniciemos nuestra aplicación en la Terminal, nuestras recetas seguirán guardadas en nuestra computadora.

Si deseas recordar la sintaxis sobre cómo analizar y almacenar datos en un archivo CSV, echa un vistazo a [la lectura](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data#/2/3)

Recuerda que un archivo CSV es básicamente una hoja de cálculo de Excel con un formato muy sencillo en el que las filas se separan por saltos de línea `↵` y las columnas se separan por comas `,`. Aquí tienes un ejemplo del archivo CSV que se utiliza para las pruebas de `rake` en este ejercicio:

```csv
Crumpets,Descripción de los crumpets
Desayuno de frijoles y tocino,Descripción de los frijoles
Pudín de ciruela,Descripción del pudín
Pastel de manzana,Descripción del pastel de manzana
Crumble de Navidad,Descripción del crumble
```

¿En qué archivo deberíamos cargar y guardar el CSV? 🤔 Nuestro archivo CSV necesita almacenar una hoja de cálculo que enumere _todas_ las recetas de nuestra aplicación. Y, ya hay un archivo cuya responsabilidad es almacenar todas nuestras instancias de `Recipe`. Sí, es el `Cookbook`, nuestro **repositorio**. Así que el único archivo que cambiaremos en este ejercicio es `lib/cookbook.rb`.

## Configuración

Primero, copiemos el código de tu libro de recetas en la carpeta `lib` de este ejercicio:

```bash
# asegúrate de que estás en el directorio correcto
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/03-Cookbook/03-Cookbook-With-CSV

# copia tu código del Ejercicio del Cookbook 2
cp -r ../02-Cookbook/lib .
```

¡Antes de empezar, ejecuta el código que acabas de importar para asegurarte de que las acciones del usuario ya implementadas (listar/agregar/eliminar) siguen funcionando!

```bash
ruby lib/app.rb
```

## Especificaciones

### Carga

Cuando un programa de Ruby se cierra, perdemos todos los datos que almacenamos en variables. Si queremos recuperar los datos la próxima vez que ejecutemos el programa, necesitamos persistirlos, en el disco duro. ¡Utilizaremos un archivo CSV para hacerlo! El archivo CSV está vacío en este momento del ejercicio, más tarde añadirás tus propias recetas a través de la aplicación.

Primero, empecemos cargando el CSV. ¿Cuándo necesitamos cargar los datos que están almacenados en él? ¡Cuando inicias la aplicación! 🚀 Y, ¿ya tienes un lugar en nuestro `Cookbook` que se ejecuta cuando se inicia la aplicación? Así es, el método `#initialize`.

Actualmente nuestro método `#initialize` no toma argumentos. Actualicémoslo para que tome un argumento, una cadena de texto (`String`) que indique la ruta del archivo CSV que abrirá. Así que debería verse así: `initialize(csv_file_path)`. Esto significa que, para inicializar una nueva instancia de `Cookbook`, deberás pasar una ruta de archivo válida como: `my_cookbook = Cookbook.new('lib/recipes.csv')`.

***

**Importante**: Como hemos cambiado el número de argumentos que toma `#initialize`, esto afectará a nuestro archivo `app.rb`. Actualmente, este archivo debería tener una línea así:

```rb
cookbook   = Cookbook.new
```

Por favor, cambia esta línea (puedes copiar y pegar) por:

```rb
csv_file   = File.join(__dir__, 'recipes.csv')
cookbook   = Cookbook.new(csv_file)
```

Ahora, la instancia de `Cookbook` recibirá la ruta del archivo `lib/recipes.csv` como argumento 📊

***

A continuación, actualicemos el `#initialize` para cargar las recetas desde el archivo CSV. Por ejemplo, si el archivo CSV tiene 5 líneas, el array `@recipes` debería tener 5 instancias de `Recipe`.

Luego, refactoricemos. Este código puede ocupar varias líneas, por lo que sería conveniente escribirlo en un método privado `#load_csv` y luego usar ese método en el `#initialize`.

### Almacenamiento

¿Cuándo necesitamos guardar los cambios en nuestro archivo CSV? Cuando las recetas en el `Cookbook` cambian 🌈 Y esto significa que:

1. se agrega una nueva receta; O
2. se elimina una receta

Así que escribamos un nuevo método privado `#save_csv` que guarde todas las instancias de `Recipe` en el array `@recipes` en nuestro archivo CSV. Por lo tanto, si hay 6 instancias de `Recipe` en `@recipes`, el archivo CSV deberá tener 6 líneas cuando se actualice.

_Nota: cuando almacenas el archivo CSV, sobrescribes todo el archivo. Así que incluso si una receta ya estaba almacenada previamente en el archivo CSV, tendrás que almacenarla de nuevo cada vez que se sobrescriba el archivo._

A continuación, revisa el `Cookbook` para encontrar cualquier lugar donde se agregue o elimine una receta y llamarás al método `#save_csv` en esos lugares.

#### Resumen

Actualiza el método existente del `Cookbook`:
-  `initialize(csv_file_path)` que carga las `Recipe` existentes desde el CSV.

Para cargar y almacenar los datos en el CSV, implementaremos 2 métodos **privados**:
-  `load_csv`, que carga los datos existentes desde el archivo CSV en nuestra aplicación. Llamaremos a este dentro del `#initialize`.
-  `save_csv`, que agrega las recetas nuevas como **nuevas filas** en nuestro archivo CSV. Llamaremos a esto cada vez que agreguemos o eliminemos una receta del `Cookbook`.

## Pruebas

Para ver si funciona, ejecuta:

```bash
ruby lib/app.rb
```

Luego intenta agregar una nueva receta al libro de recetas y salir de la aplicación. Después ejecuta `ruby lib/app.rb` de nuevo. Esa receta debería aparecer nuevamente (porque se almacenó cuando la agregaste y se cargó cuando reabriste la aplicación) 💾

