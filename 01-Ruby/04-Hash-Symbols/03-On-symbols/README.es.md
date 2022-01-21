## Contexto y Objetivos

### Para discutir con tus compañeros/as

- ¿Cuales son las diferencias entre un String y un Symbol?
- ¿Cuándo deberías usar uno o el otro?
- En cuanto a la memoria ¿Cuál es el comportamiento de cada uno?

### Resumen técnico

El uso de símbolos (symbols) puede ser complicado para los/as principiantes de Ruby. Una regla general es que los symbols o los strings son bastante similares pero:

Cuando uses un string más como un identificador único en tu programa que como texto, debes considerar usar un símbolo (symbol).

Es por eso que muchas llaves de Hash (Hash keys) son símbolos (symbols). Su función es más identificar cosas que simplemente ser texto. Aquí hay un ejemplo:

```ruby
fox = { color: "red", species: "mammal" }
```

En este ejemplo `:color` y `:species` se usan como identificadores por lo que usamos símbolos (symbols). El valor de su texto se escogió para que una persona pueda entender rápidamente lo que la llave (key) representa.

Nota: Ocasionalmente también verás esta vieja sintaxis:

```ruby
fox = { :color => "red", :species => "mammal" }
```

Lee [la siguiente respuesta en StackOverflow](http://stackoverflow.com/a/8189435/197944/) si realmente quieres saber cuáles son las diferencias sutiles entre cadenas de texto (Strings) y símbolos (symbols) en detalle. El concepto de **mutabilidad** es importante aquí.

## Especificaciones

Abre el archivo `lib/symbols.rb`. Verás un quiz de verdadero/falso y algunos métodos para evaluar tu capacidad para seleccionar symbols en vez de strings.

## Puntos clave de aprendizaje

Selecciona lo que se debería usar en cada ejemplo:

```ruby
{ "temperature" => "10 deg", "pressure" => "10 bar" }
# or
{ temperature: "10 deg", pressure: "10 bar" }
```

```ruby
user_name = :bob
# or
user_name = "bob"
# or
"user_name" = "bob"
# or
:user_name = :bob
```
