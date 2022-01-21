## Contexto y Objetivos

- Validar una vez más tu conocimiento sobre métodos y variables.
- Aprender a usar la interpolación de strings.
- Entender la diferencia entre comillas **simples** y **dobles**


## Especificaciones

### Computar un nombre

- Implementa el método `compute_name` que está definido en el archivo `lib/compute_name.rb`. Debe devolver el nombre completo de la persona de acuerdo con su `first_name`, `middle_name` y `last_name`.
- **Limitación**: debes usar la **interpolación de strings (cadenas de texto)** con `#{}` para construir el nombre completo.

## Programa Interactivo

El archivo  `lib/interface.rb` contiene un programa para interactuar con el/la usuario/a. Pruébalo ahora con:

```bash
ruby lib/interface.rb
```

Después, asumiendo que pusiste “Boris” y luego “Alexandre” y finalmente “Papillard”, el programa imprimirá un mensaje personalizado como el siguiente: `Hello, Boris Alexandre Papillard!`.

* **Limitación**: tu programa `interface.rb` deberá usar el método `compute_name` en el otro archivo, por supuesto.
* **Mejora**: puedes perfeccionar tu `custom_message` agregando más información como el número de caracteres en el nombre completo (por ejemplo: `Boris Alexandre Papillard has got 25 characters, including spaces`) u otros detalles importantes …

## Puntos clave de aprendizaje

Hazte las siguientes preguntas nuevamente y asegúrate de que las puedas responder todas:

### Variables

* ¿Qué variables están presentes en tu código?
* ¿Dónde se asignan valores a esas variables? y ¿Dónde las usas?
* ¿Cuál es el alcance de una variable?

### Métodos

* ¿Cuál es el método de tu programa? ¿Dónde lo defines?
* ¿Desde dónde lo llamas? y ¿Con qué argumentos?
* ¿Cuál es el flujo de tu programa cuando intentas leerlo línea por línea?

### Strings

* ¿Qué es una interpolación de strings? ¿Cuál es la sintaxis para “insertar” una expresión Ruby en un string?
* ¿Cuál es la diferencia entre comillas simples `''` y comillas dobles `""` en una interpolación?

## Recomendaciones y recursos adicionales

* Debes usar [gets](http://www.ruby-doc.org/docs/Tutorial/part_02/user_input.html) para obtener un input/respuesta desde la Terminal. También necesitarás [chomp](https://ruby-doc.org/core-2.5.3/String.html#method-i-chomp) para remover elementos que no forman parte del string (cadena de caracteres).
* Debes usar [puts](https://ruby-doc.org/core-2.7.5/IO.html#method-i-puts) para imprimir una pregunta en la Terminal.
