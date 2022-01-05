## Contexto y Objetivos

Felicitaciones por haber llegado al primer ejercicio opcional del primer día de Programación Orientada a Objetos (OOP en inglés). Ahora trabajaremos en un ejercicio para mezclar los métodos de ordenamiento (sorting) y comparable con objetos.

Supongamos que tienes estudiantes (definidos por la clase `Student`) quienes tienen una cantidad determinada de dinero cada uno (en billetes de cinco, diez y veinte euros). Queremos compararlos de acuerdo a sus riquezas.

### Especificaciones

- Cuando inicies a un `Student`, debes pasar 4 argumentos que representen al nombre del/de la alumno/a y el número de billetes que posee (de cinco, de diez y de veinte).
- Implementa el método de instancia `wealth` en `Student`
- Implementa [Comparable](https://ruby-doc.org/core-2.7.5/Comparable.html) en este método para que sea posible comparar 2 estudiantes y ordenar un arreglo `Array` de alumnos. Puedes leer más sobre el operador de nave espacial (spaceship operator en inglés) `<=>` y sobre objetos de ordenamiento [aquí](http://stackoverflow.com/a/28014514).
