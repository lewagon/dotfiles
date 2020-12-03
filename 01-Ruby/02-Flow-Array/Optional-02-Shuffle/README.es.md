## Contexto y Objetivos

Ofrecerte un ejercicio avanzado que te haga escribir un método `shuffle` que tome un array y devuelva una versión organizada de manera aleatoria. ¿Pero cómo te asegurarías  que realmente estés obteniendo un orden aleatorio? ¿Cómo definirías lo que es un buen orden aleatorio?

## Especificaciones

### Base

- Escribe el método `#shuffle` en el archivo `lib/shuffle.rb`.
- Debes usar el método Ruby `rand()`.
- ¡No tienes permiso para usar ninguno de los métodos Ruby de arrays como `sort_by` o `shuffle` para escribir tu algoritmo!

**Pista**: No debes cambiar el array original. Tal vez necesites [`clonar`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-clone) el array a un array A para trabajar en la copia. Uno de los algoritmos pudiese ser la creación de un nuevo array B vacío que seleccione un índice (index)aleatoriamente del array A e introduzca el elemento en B con el mismo índice (index) y luego elimine el índice (index) en el array A. Esto se repetiría hasta que A quede vacío. ¡B deberá tener el nuevo array ordenado aleatoriamente!
