## Contexto y Objetivos

En Ruby se usa la palabra clave `self` para acceder al contexto dentro del cual el programa esté trabajando en ese momento.

La regla es simple. Al ser usado dentro de un método de instancia, `self` apunta al objeto sobre el cual se llama al  método. Cuando se usa dentro de una clase, módulo o antes del nombre del método al definir un método de clase e.g. `def self.method; end`, `self` representa la primera clase o módulo que lo abarca.

Básicamente hay 3 contextos:

1. El contexto global o “principal” el cual puedes ver al escribir `self.inspect` en la consola IRB (**hazlo**)
2. El contexto de Clase o Módulo donde la palabra clave `self` representa dicha Clase o Módulo.
3. El contexto de objeto donde `self` representa la **instancia** de una clase.

## Especificaciones

### Obtener la combinación ganadora

* Échale un vistazo al siguiente código que tiene anidados un módulo, una clase y algunos métodos. ¡Implementa lo que devuelven cada uno de ellos para que puedas obtener la combinación ganadora! ¡Cuando estés seguro/a de que la tienes, corre el test para verificar!

### Encadenar con `self`

En **animal.rb**, te damos un programa que corre con errores. Tratamos de encadenar los métodos pero fallamos miserablemente...Hace falta un cambio mínimo para hacerlo funcionar. ¡Trata de resolver esto! **Pista:** Necesitarás `self` (obviamente 😊).

Esto es lo que queremos hacer:

```ruby
cat = Animal.new
cat.name("garfield").color("orange")
p cat
```
