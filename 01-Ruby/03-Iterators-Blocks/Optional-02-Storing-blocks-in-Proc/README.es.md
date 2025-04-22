## Contexto y Objetivos

Hay dos formas principales de recibir bloques en métodos en Ruby. El primero - como ya lo hemos visto - es utilizando la palabra clave `yield`. Sin embargo, a veces necesitamos **guardar** el bloque en un objeto, ya sea porque queremos llamarlo luego o porque el método que toma el bloque como argumento lo delega a otro método y necesita transferirle el bloque a este sub metodo.

Afortunadamente podemos guardar bloques de código Ruby en objetos `Proc`.

## Argumento de bloque ampersand (&)

Al ponerle el prefijo ampersand (&) al último argumento en la firma de un método, se crea un objeto `Proc` a partir de cualquier bloque que se pase. Este objeto luego puede ser ejecutado con el método `call` como se muestra a continuación:

```ruby
def speak(&block)
  puts block.call
end

speak { "Hello" }
# Hello
#  => nil
```

**Un nuevo objeto `Proc` será creado a partir del bloque cada vez que se llame al método.**

## Creación de objetos Proc
Tal vez quieras crear tus objetos `Proc` tú mismo y pasárselos al método como parámetros normales como se muestra a continuación:

```ruby
def speak(block)
  puts block.call
end

message_block = Proc.new { "Hello" }
speak(message_block)
# Hello
#  => nil
```

**El objeto `Proc` es creado una sola vez y puede ser utilizado varias veces si llamamos al método varias veces.**

## Especificaciones

¡Ahora es tu turno! Dile a tu mamá cuánto la amas 😊. Implementa los métodos `#tell`, `#tell_mum`, `#tell_with_proc`, `#tell_mum_with_proc` los cuales utilizan argumentos de bloque ampersand (&) o pásales objetos `Proc` explícitamente.
