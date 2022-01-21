## Contexto y Objetivos

Este desafío es una extensión del anterior: ¡la granja le da la bienvenida a sus primeros animales!


## Especificaciones

![Animals](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/animals.svg?sanitize=true)

Responde las siguientes preguntas con tu compañero/a: ¿Cuántas clases crees que necesites? ¿Cómo puedes estructurarlas?

¡Resiste la tentación de utilizar `rake`! ¡Espera hasta el final del desafío, sigue los lineamientos y deja que el farming diary te guíe a lo largo del diseño de tus clases!


### Padre e hijos
Ya que conoces los beneficios de la herencia:
- Crea las tres clases vacías
- Configura la relación de herencia adecuada entre los hijos y las clases padres

A diferencia del desafío anterior, comienza escribiendo el código del comportamiento común en la clase padre:
- Inicializa el animal con cero **energía**
- Puedes **alimentar** al animal: aumentará su **energía** en 1.


### Hacer que los animales hablen
Para entender cómo son las clases, comencemos por el **programa** que queremos correr:
- Abre `lib/farming_diary.rb`, lee la sección _Day Three_ (día tres) y recopila información para escribir el código de las clases.
- Corre el archivo con `ruby lib/farming_diary.rb`. Corrige un error a la vez escribiendo el código del método `talk` que falte en `Cow` y `Chicken`.

Output esperado:

```bash
📝 Day Three: Animals Talk
The cow says moo
The female chicken says cluck cluck
The male chicken says cock-a-doodle-doo
```

### Alimentar a los animales
Vayamos a Day Four (día cuatro) y alimentemos a todos los animales al mismo tiempo con una iteración. ¿Recuerdas que sus animales tienen un método `feed!` (alimentar) compartido? ¡Se puede llamar al mismo método en dos tipos de objetos diferentes! A este concepto se le conoce como [polymorphism](https://thoughtbot.com/blog/back-to-basics-polymorphism-and-ruby) 🤓

Aquí te mostramos lo que debes saber sobre `feed!`:
- `Cow`: además de ganar energía, las vacas producen 2 litros de leche **@milk**
- `Chicken`: además de ganar energía, las gallinas producen 2 huevos **@eggs** (los pollos no producen nada 🤷‍♂️)

**Pista**: el método hijos **extiende** el del padre. ¡No olvides utilizar `super` para llamar a la parte de los padres!

Output esperado:

```bash
📝 Day Four: Feed The Animals
The cow produced 2 liters of milk
The female chicken produced 2 eggs
The male chicken produced 0 eggs
```

## Aprendizaje

¡Felicidades! Ahora puedes correr `rake` para comprobar que tu código esté organizado como se espera.

En las clases hijos hay 4 tipos de métodos:
- métodos que **heredan** de la clase padre: el método solamente está definido en la clase padre
- métodos que **extienden** la definición del método padre: el método es un poco diferente en las clases hijas
- métodos que **anulan** (también se usa el término override) el método del padre: la definición es totalmente diferente a la clase padre
- métodos que son específicos a la clase hija: no están _para nadal_ definidos en la clase padre

Para extender un método se necesita la palabra clave `super`: funciona como si copiaras el cuerpo del método padre y lo copiaras en el lugar donde se llama a `super`.
