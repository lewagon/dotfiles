## Contexto y Objetivos

Los métodos destructivos modifican sus **receptores** (objetos sobre los cuales se les llama) lo que los torna peligrosos en cierta manera. Por lo tanto es **convención** agregar un signo de exclamación al nombrarlos `!`.

## Especificaciones

- Implementa `#horse_racing_format!` el cual modifica el arreglo (array) que toma como argumento para hacerlo más amigable para el presentador de la carrera.
- **Limitación**: El método debe invertir el array, preparar la posición del caballo. También debe agregar un signo de exclamación al final del nombre del caballo el cual es una cadena de caracteres (string).

e.g.  `["Abricot du Laudot", "Black Caviar", "Brigadier Gerard"]` deben transformarse en `["3-Brigadier Gerard!", "2-Black Caviar!", "1-Abricot du Laudot!"]` luego de ser formateados por el método. ¡Este es el único formato que el presentador entenderá!

**🤔 Recomendación:** No dudes en abrir el archivo en la carpeta `spec` y **leer el test del código** para entender lo que está pasando. Este es el código que se ejecuta al correr `rake` en tu Terminal.

## Recomendaciones y recursos adicionales

- No está de más recordarte que debes usar iteradores destructivos en tu método 😊

## Puntos clave de aprendizaje

Como ya debes haberte dado cuenta, un método no se usa únicamente para devolver el resultado de un cálculo. Un método también puede usarse para ejecutar acciones en objetos que modificará. Asegúrate de dominar las siguientes nociones:

- ¿Qué es el id de un objeto? Escribe `"something".object_id` en IRB para averiguarlo.
- ¿Qué es la igualdad de un objeto? ¿Evalúas la igualdad de un objeto cuando utilizas `a==b` en una declaración condicional? ¿Qué evalúas exactamente?
