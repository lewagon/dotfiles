## Contexto y Objetivos
- Aprender a buscar el método adecuado en la documentación de Ruby.
- Familiarizarse con IRB para experimentar con nuevos métodos y apropiarse de ellos.

IRB es un bucle de Lectura-Evaluación-Impresión [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) para Ruby. Funciona de la siguiente manera:

1. La **R**(primera letra del término en inglés (read) lee la expresión escrita por el usuario la cual puede ser cualquier expresión Ruby válida como `"Hello"`, `2+2`, `"hello".upcase` …
2. La **E**(primera letra del término en inglés (evaluate) evalúa el resultado de la expresión.
3. La **P**(primera letra del término en inglés (print) imprime el resultado.
4. La **L**(primera letra del término en inglés (loop) regresa al punto 1 y espera por una nueva entrada de datos que será ingresada por el/la usuario/a.

* **Experimentar con las siguientes líneas** en IRB:

```ruby
"A string object".class
19.class
[1, 2, 3].class
"A string object".upcase
"A string object".downcase
[1, 2, 3].shuffle
```

En Ruby, todo (texto, entero (integer), número flotante (float), un array, etc.) es un objeto. Podemos llamar métodos sobre estos objetos. Estos tipos de método se conocen como **métodos de instancia** ya que solo pueden llamarse sobre las instancias de una clase. El objeto sobre el cual llamamos el método se llama **receptor**.

## Especificaciones

Encuentra los métodos Ruby adecuados para la [Clase String ](http://ruby-doc.org/core-2.5.3/String.html), la [Clase Integer](http://ruby-doc.org/core-2.5.3/Integer.html), y la [Clase Array](http://ruby-doc.org/core-2.5.3/Array.html) para ejecutar y hacer que pasen las pruebas.

¡Escribir código requiere de astucia para saber cómo y dónde buscar la información que necesitas! A menudo el paso más difícil es saber cómo estructurar una pregunta en Google. Usa lo siguiente para encontrar los métodos necesarios para este desafío:

* Google y [Stack Overflow](http://stackoverflow.com/)
* [La documentación Ruby](http://ruby-doc.org) si ya tienes alguna idea del método que buscas.

Cuando creas que hayas encontrado el método que buscas y creas que sepas cómo usarlo, ¡utiliza IRB para probarlo sobre algo! Experimentar en IRB es un paso crucial para los principiantes.

## Puntos clave de aprendizaje

Estarás listo/a para continuar sólo si respondes estas preguntas correctamente:

- ¿Cuántos objetos integrados Ruby conoces? ¿Cuáles?
- ¿Cuál es la sintaxis para llamar a un método sobre uno de los objetos de estas clases?
- ¿Cuál debería ser el primer paso cuando quieres ejecutar una operación estándar (ordenar un array, cambiar una letra minúscula a mayúscula, etc.)?
- ¿Cuál es el segundo paso para asegurarse de que realmente conoces el método que has encontrado?
