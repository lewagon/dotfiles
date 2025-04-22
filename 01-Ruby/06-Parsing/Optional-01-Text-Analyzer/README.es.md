## Contexto y Objetivos

Vas a desarrollar un analizador de texto. Tu programa Ruby leerá un texto suministrado en un archivo por separado, lo analizará de acuerdo a ciertos patrones y estadísticas y le mostrará el resultado al usuario. Los programas de procesamiento son la base de muchos desarrollos de aplicaciones.

Ruby está preparado para análisis de texto y documentos con sus herramientas de expresiones regulares y la facilidad de uso de `gsub`, `scan` y `split`.

Esto lo usarás mucho en tu aplicación.

## Funcionalidades requeridas

* Conteo de caracteres (incluyendo **and** excluyendo espacios)
* Conteo de líneas
* Conteo de palabras
* Conteo de oraciones
* Conteo de párrafos
* Número promedio de palabras por oración
* Número promedio de oraciones por párrafo

Implementa el método `analyze` que toma un texto de cadena de caracteres (`String`) como argumento (el texto lo puedes cargar desde un archivo) y devuelve un resultado `Hash` con las siguientes llaves (keys):

```ruby
{
  character_count: 523,
  character_count_excluding_spaces: 463,
  line_count: 42,
  word_count: 145,
  sentence_count: 32,
  paragraph_count: 4,
  average_words_per_sentence: 4.53,
  average_sentences_per_paragraph: 8
}
```

## Flujo de la aplicación

1. Crea un `program.rb` que cargue el archivo que contiene el documento de texto y llame al método  `analyze`.
1. En `analyze`, `text` es una cadena de caracteres (string) lo que significa que puedes medir su longitud fácilmente.
1. Remueve temporalmente los espacios en blanco y cuenta cuántos caracteres hay sin incluir los espacios (spaces).
1. Separa todos los espacios en blanco para averiguar cuántas palabras hay.
1. Separa los puntos finales para saber cuántas oraciones hay.
1. Separa los saltos de línea dobles para calcular el número de párrafos.
1. Computa los promedios usando y tus contadores.

### Test de datos

Puedes obtener algunos datos `.txt` de test via [Google Search](https://www.google.com/search?q=The+Philosopher's+Stone.txt)

### Incorporación de funcionalidades adicionales

Tu analizador todavía no es muy atractivo :(

Agreguemos algunas funcionalidades interesantes.

El conteo de línea, párrafo y palabra es estadística útil pero con el poder de Ruby puedes hacer análisis aún mejores ¡El único límite es tu imaginación!

* **Porcentaje de palabras "útiles"**: la mayoría del material escrito contiene palabras como "the", "are",... Estas palabras se les llaman palabras vacías y normalmente son ignoradas por los sistemas de computación cuyo trabajo es analizar y buscar cosas a través de textos. Se omiten porque no son palabras que la mayoría de las personas buscan (Google es el ejemplo perfecto de esto).

* **Resumen interesante**: Los procesadores de palabras como Microsoft Word generalmente tienen la función de generalización que puede seleccionar el extracto más significativo de una página dada y producir un resumen del mismo. Una de las técnicas para encontrar un buen extracto es seleccionar oraciones que tengan una longitud promedio y que contenga **sustantivos**. Las oraciones cortas probablemente no sean muy útiles y las que son  largas probablemente sean muy largas para un resumen. Para saber si una oraciones tienen sustantivos, puedes buscar palabras como "is" o "are" los cuales son buenos indicadores ("There are x nouns", "Noun is", "Nouns are",...).

**Pista:** primero debes decidir qué parte del texto original mantendrás para el resumen (por ejemplo: computado sobre el número de oraciones).
