## Contexto y Objetivos
Regresamos a nuestro Farm diary. ¡Después de haber trabajado duro creando las clases, es hora de recompensar el esfuerzo creando un juego encima del mismo! Crea una interfaz donde el jugador/a es un/a granjero/a que se encarga él mismo/ella misma de sus cultivos y animales y ve la granja crecer gracias a una ilustración que nosotros suministramos.

¡Aprenderás cómo construir una interfaz usando un bucle (loop) infinito!

## Configuración

Comienza importando clases de animales y cultivos:

```bash
cp ../02-Farming-Diary-Crops/lib/{crop.rb,corn.rb,rice.rb} lib
cp ../03-Farming-Diary-Animals/lib/{animal.rb,cow.rb,chicken.rb} lib
```

En `lib/interface.rb` ya hemos agregado el `require_relative` adecuado al principio del archivo para cargar tus clases 👌

## Especificaciones

El/La jugador/a puede escoger qué hacer a partir de un conjunto de acciones: sembrar maíz, sembrar arroz, rociar los cultivos, agregar animales, etc.
Cuando el/la jugador/a selecciona una acción nosotros la traducimos en código utilizando nuestras clases y continuamos a la siguiente opción como en un bucle (loop). Vamos a crear esto paso a paso.

![Loop](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/loop.svg?sanitize=true)


No hay `rake` en este desafío.

### Comienza con una Interfaz de Usuario básica

Abre `lib/interface.rb` y escribe el código necesario para crear una interfaz de usuario muy básica que corra una sola vez:
- Invita al/a la jugador/a a seleccionar una palabra de la lista.
- Haz que se muestre una oración simple para cada palabra.

Al correr `ruby lib/interface.rb`, podrás mostrar algo como lo siguiente:

```bash
Pick an action: [corn | rice | quit]
> corn
Let's plant corn crops!
```

o

```bash
Pick an action: [corn | rice | quit]
> rice
Rice crops today!
```

o

```bash
Pick an action: [corn | rice | quit]
> quit
See you next time
```

Cuando el/la jugador/a escribe una palabra aleatoria, se muestra lo siguiente:

```bash
Pick an action: [corn | rice | quit]
> lalala
I don't know what you mean...
```
**Nota:** Puedes escoger una declaración condicional básica `if` / `else`, o escribirla con una declaración [`case` / `when`](https://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-case) la cual es perfecta para listas largas de opciones cerradas.


### Haz que corra en bucle (loop)

El juego no sería muy interesante si se terminara después de una acción así que hazlo correr en bucle hasta que el/la jugador/a escriba la acción `quit` (salir). Correr `lib/interface.rb` debería arrojar el siguiente output:

```bash
Pick an action: [corn | rice | quit]
> corn
Let's plant corn crops!

Pick an action: [corn | rice | quit]
> rice
Rice crops today!

Pick an action: [corn | rice | quit]
> corn
Let's plant corn crops!

Pick an action: [corn | rice | quit]
> quit
See you next time
```

### La siembra de cultivos

Ya que tienes el bucle infinito es hora de incorporar las clases de nuestra granja al juego. Cuando el/la jugador/a seleccione  `corn` o `rice`, debes instanciar objetos de las clases adecuadas y almacenarlos en un arreglo (array) de cultivos llamado `crops`.

Para tener un reporte ilustrado del estado de la granja después de cada acción, incluye `Board.new.display` en el bucle. Si tu código funciona como se espera, tu granja sobrevivirá :)


### Rocio de los cultivos

Agrega una nueva acción a la interfaz de usuario llamada `water`:

```bash
Pick an action: [corn | rice | water | quit]
```

Con esta acción el/la jugador/a puede rociar todos los cultivos (maíz y arroz) que ya han sido sembrados. Recuerda que ambos heredan el método `water!` de `Crop`.

### Animales

¡Felicitaciones por haber creado la parte de los cultivos! ¿No quisieras intentar crear la parte de los animales tu mismo/a? Seguro que sí.

La interfaz de usuario tiene tres entradas nuevas: cow, chicken y feed (vaca, gallinas y alimentar):

```bash
Pick an action: [corn | rice | water | cow | chicken | feed | quit]
```

**Pistas:**
- Las acciones `cow` y `chicken` crean nuevas instancias de las clases correspondientes y las almacenan en un arreglo (array) llamado `animals`
- Las gallinas tienen sexo y es seleccionado aleatoriamente por el código del juego
  <details>
  <summary markdown='span'>View solution</summary>

  ```bash
  when "chicken"
    gender = ["female", "male"].sample
    puts "The chicken is a #{gender}"
    Chicken.new(gender)
  ```
  </details>

¡Buena suerte!
