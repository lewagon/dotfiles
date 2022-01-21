## Contexto y Objetivos

- Trabajar con archivos de texto
- Construir un analizador de texto usando el Hash

### Leer un archivo en Ruby

Puedes leer un archivo, línea por línea con

```ruby
File.open("my/file/path", "r").each_line do |line|
  # Do something with the line variable
end
```

## Especificaciones

- Implementar `most_common_words` que devuelve el número de veces que aparecen las palabras más frecuentes en un archivo de texto. Por ejemplo, si consideramos la biblia como el texto fuente:

```ruby
most_common_words('source-text.txt', 'stop_words.txt', 3)
#=> { 'lord' => 8722, 'God' => 7380, 'Jesus' => 2617 }
```

NOTA: Por favor, haz caso omiso a la puntuación (ejemplo: `Seb's` debería ser considerado como `Seb` en el conteo final de ocurrencias de las palabras).

### Deshazte de todo lo innecesario

Añade un filtro en tu método para deshacerte de las [palabras vacías](http://en.wikipedia.org/wiki/Stop_words) como artículos, pronombres y preposiciones ("a", "the", "is" etc.).

### Se creativo/a

Copia/Pega cualquier texto de tu elección en el archivo fuente para experimentar con tu programa (un discurso político, el extracto de un libro, tu canción favorita, etc.)
