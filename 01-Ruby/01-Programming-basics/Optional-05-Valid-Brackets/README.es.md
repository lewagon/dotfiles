## Contexto y Objetivos

¡Felicitaciones por llegar hasta el último desafío opcional! Probablemente hayas notado durante la sesión que los paréntesis `()`, los corchetes `[]` y las llaves `{}` pueden romper tu código si olvidas uno de ellos ya que se usan en pares. Imagína si tuviéramos una forma de revisar el código y verificar si, por ejemplo, no nos falta un paréntesis de cierre. Bueno, ¡hagámoslo ahora!

## Especificaciones

El objetivo de este desafío es escribir un método que tome un string de corchetes y determine si el orden de los corchetes es válido. El método debe devolver `true` si el string es válido, y `false` si es inválido.

Junto con la apertura `(` y cierre `)` de corchetes, los datos de entrada pueden contener cualquier carácter ASCII válido. Además, el string puede estar vacío o no tener corchetes.

No consideres otras formas de paréntesis (por ejemplo `[]`, `{}`) todavía. ¡Los manejaremos en la segunda parte del desafío!

Después de terminar esta parte del desafío, deberías poder pasar la primera parte del `rake`.

## Ejemplos

```ruby
"()"              =>  true
")(()))"          =>  false
"("               =>  false
"(())((()())())"  =>  true
```

## Diferentes corchetes

Vayamos un paso más allá añadiendo más complejidad.

El string de entrada constará de paréntesis, corchetes y llaves: `()` `[]` `{}`.

Actualiza tu método `valid_brackets?` como corresponda para poder pasar todos los tests.

## Ejemplos

```ruby
"(){}[]"   =>  true
"([{}])"   =>  true
"(}"       =>  false
"[(])"     =>  false
"[({})](]" =>  false
```
