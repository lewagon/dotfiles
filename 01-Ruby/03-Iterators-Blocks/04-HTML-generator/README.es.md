## Contexto y Objetivos

Sigamos practicando con los bloques. En este desafío vamos a escribir otro método que se llamará por medio de un bloque. Esta vez veremos como los bloques permiten anidar llamadas y cómo esto puede ser útil en ejemplos realistas. También descubriremos cómo definir métodos con un parámetro secundario opcional, ¡lo cual es muy común!

## Especificaciones

Implementa el método `#tag` que crea etiquetas HTML alrededor del contenido que le pasemos en el bloque. Por ejemplo:

```ruby
tag("h1") do
  "Some Title"
end
#=> "<h1>Some Title</h1>"
```

Este método acepta un parámetro secundario opcional (ve la sección siguiente sobre argumentos con valores predeterminados), lo que permite pasarle un array con un atributo HTML y su valor, como `["href", "www.google.com"]`.

```ruby
tag("a", ["href", "www.google.com"]) do
  "Google it"
end
#=> '<a href="www.google.com">Google it</a>'
```

Tal vez necesites saber que para incluir el símbolo `"` dentro de un string delimitado por comillas dobles, debes **escapar** el carácter con una barra invertida: `\"`.

Lo bueno sobre este método es que puedes anidar llamadas de métodos:

```ruby
tag("a", ["href", "www.google.com"]) do
  tag("h1") do
    "Google it"
  end
end
# => '<a href="www.google.com"><h1>Google it</h1></a>'
```

Está bueno, ¿no?

#### Argumentos con valores predeterminados

En Ruby puedes suministrar un valor predeterminado para un argumento. Esto quiere decir que si el valor de un argumento no es suministrado, el valor predeterminado será utilizado. Por ejemplo:

```ruby
def sum(a, b, c = 0)
  return a + b + c
end

sum(3, 6, 1) # => 10
sum(4, 2)    # => 6
```

En este ejemplo el tercer argumento tendrá un valor `0` si llamamos a `sum`  con solo dos argumentos.
