## Contexto y Objetivos
En este desafío descubriremos cómo es que algunos métodos son más eficientes que otros y ayudan a reducir el tiempo de cálculo. ¿Has pensado en esto cuando utilizas arreglos (arrays)?

Este concepto es muy importante en el campo de la informática. Se le llama **complejidad temporal**.


## Especificaciones

Solo conocemos el nombre del libro que estamos buscando y queremos encontrar su índice en una muestra pequeña de libros y luego en una (mucho) más grande.

### Encuentra un libro en la repisa
![Repisa](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/shelf.png)

Imagina que estás en casa buscando un libro en una repisa que tiene una docena de ellos sin ordenar. Tal vez busques viendo los libros uno por uno de derecha a izquierda hasta encontrar el que buscas ¡Escribamos el código de este comportamiento!

Escribe el método `find_book` para encontrar `book_to_find`  en un arreglo (array) de `books` haciendo bucles (loops) con `each_with_index`.

- el método tiene dos parámetros: un arreglo (array) de libros y el nombre del libro que buscas.
- devuelve el índice (index) del libro en el arreglo (array)
- debes usar  `each_with_index`

```ruby
# books sample you can use to test your method
books = [
  "A Smarter Way to Learn",
  "Advanced Ruby",
  "Component-Based Applications",
  "Computer Science Distilled",
  "Eloquent JavaScript",
  "GitHub Explained",
  "Lead the Way",
  "Learn Ruby On Rails",
  "Markdown Guide",
  "Open Source",
  "Remote",
  "The Foundational Concepts"
]
```

En este ejemplo manipulamos una docena de libros. La iteración correrá 12 veces **como máximo**, lo que toma 0.01 ms. Pero ¿qué pasaría si usáramos el mismo algoritmo para buscar un libro en un millón? ¿Iteraremos un millón de veces?! Tiene que haber una manera más efectiva.

### Encontrar un libro en la librería

![Librería](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/library.png).

Ahora imagina que estás en una librería enorme. Nos tomaría días buscar libros uno por uno hasta encontrar el que buscamos con la técnica anterior. Afortunadamente los libros en una librería están **ordenados alfabéticamente**. Así que en vez de usar la misma técnica podemos comenzar buscando en el medio de la librería, verificar con qué letra comienzan los títulos de los libros ahí y repetir hasta encontrar el que buscamos. ¡Esto reducirá significativamente el número de iteraciones!

Escribe el método `find_book_enhanced`:

1. Escoge el libro en el medio del arreglo (array).
1. Compara este libro con el título que buscas:
  - ¿Es tu libro? Devuelve su índice (index) y ¡ya terminaste!
  - ¿Tu libro está antes o después del libro pivote? ¡Sigue al paso 3!
1. Selecciona la sección del arreglo (array) donde está tu libro.
1. Repite todo el proceso nuevamente.

## Complejidad temporal
La **complejidad temporal** es lo que has descubierto aquí: el número de instrucciones que el algoritmo necesita correr en promedio para encontrar la solución. Básicamente es una ecuación que escala con el número de ítems.

### Notación O Grande
Se anota **O** y se especifica con **n**, donde **n** es el número de ítems.

Ejemplo:

La función `find_book` es O(n): para cada libro, hay una instrucción posible. Mientras más libros más iteraciones. En el peor de los casos tiene n iteraciones. Este método se llama **búsqueda lineal**.

La función `find_book_enhanced` es O(log2 n): cada búsqueda tiene el doble de menos posibilidades que la anterior. En una librería más grande, el número de instrucciones se incrementa lentamente. ¿Qué está pasando aquí? Hemos construido un bucle (loop) en el cual reducimos las posibilidades en dos con cada iteración. Empezamos con un millón de libros, luego había solamente 500 mil, luego 250 mil y así sucesivamente. Cada vez solo verificamos si el libro pivote es el que buscamos. Este proceso se llama **búsqueda binaria** y es una manera bastante optimizada de reducir el tiempo de cálculo.

![Ecuacioness](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/equations.png)

## Sugerencias y recursos complementarios

- Si quieres convertirte en desarrollador/a, es probable que tengas preguntas sobre Complejidad Temporal en las entrevistas.
- Ruby implementa [native binary search](https://ruby-doc.org/core-2.6.5/Array.html#method-i-bsearch)
- Para leer: [WTF is time complexity?](https://remimercier.com/wtf-time-complexity), written by [Rémi Mercier](https://kitt.lewagon.com/alumni/merciremi)
