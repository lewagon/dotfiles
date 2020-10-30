⚠️ **No hay `rake`** para este ejercicio. Lo siento 😉

Ahora queremos mejorar nuestro recetario (cookbook) con recetas de internet. Usaremos
[🇫🇷 Marmiton](http://www.marmiton.org) o [🇬🇧 allrecipes](https://www.allrecipes.com), porque el lenguaje de marcado (markup) que tienen es bastante claro (lo que las hace buenas candidatas para scraping). Si quieres escoger otra página web de recetas, ¡no hay problema!. Solo debe tener la funcionalidad de **búsqueda** donde se pasen palabras clave en la cadena de consulta [query string](https://en.wikipedia.org/wiki/Query_string).

## Configuración

Primero copia y pega el código del Recetario (Cookbook) en la carpeta `lib` del desafío de hoy:

```bash
# make sure you're in the right directory
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/04-Cookbook-Day-Two/01-Cookbook-Advanced

# copy your code from Cookbook Day 1
cp -r ../../03-Cookbook-Day-One/02-Cookbook/lib .
```

También puedes tomar la solución de la sesión de codeo en vivo como punto de partida para hoy (pídele a tu profesor/a que lo comparta por Slack).

Antes de empezar, corre el recetario que copiaste para asegurarte de que las funciones del/de la usuario/a (listar / crear / destruir) funcionan bien!

```bash
ruby lib/app.rb
```

## 1 - Importar recetas de la web

Puedes hacer el scraping de cualquier página web que conozcas pero las buenas son [allrecipes](https://www.allrecipes.com) o [Marmiton](http://www.marmiton.org/) para los que hablan francés. Así es como debería funcionar esta funcionalidad:

```bash
-- My CookBook --
What do you want to do?

1. List all recipes
2. Add a recipe
3. Delete a recipe
4. Import recipes from the Internet
5. Exit

> 4
What ingredient would you like a recipe for?
> strawberry

Looking for "strawberry" recipes on the Internet...

1. Strawberry shortcake
2. Strawberry slushie
3. Strawberry martini
[...] display only the first 5 results

Which recipe would you like to import? (enter index)
> 2
Importing "Strawberry slushie"...
```

### Pseudocódigo

Para esta nueva **acción de usuario** (por eso el new _route_), necesitamos lo siguiente:

1. Preguntarle al/la usuario/a por una palabra clave que buscar
2. Hacer una petición HTTP (HTTP request) a la página web con nuestra palabra clave
3. Parsear el documento HTML para extraer las 5 primeras recetas sugeridas y almacenarlas en un Arreglo (Array)
4. Mostrarlas en una lista indexada
5. Preguntarle al/a la usuario/a qué receta quiere importar (pregunta por un índice (index)).
6. Agregarla al Recetario (`Cookbook`).

### Análisis del lenguaje de marcado (markup) de la página

Primero veamos cómo recuperaremos información de la web.

Es posible descargar un documento HTML en tu computadora con el comando `curl`. Obtén la siguiente página HTML que está guardada como un archivo `.html` en tu directorio de trabajo corriendo uno de estos dos comandos en la Terminal:

```bash
curl --silent 'https://www.marmiton.org/recettes/recherche.aspx?aqt=fraise' > fraise.html
curl --silent 'https://www.allrecipes.com/search/?wt=strawberry' > strawberry.html
```

👆 ¡**Este paso es muy importante**!

La razón por la cual mantenemos la página en nuestro disco duro es porque tenemos que correr scripts Ruby en ella cientos de veces para testear nuestro código. Es más rápido abrir el archivo que está en el disco duro que hacer que nuestra red llame a Marmiton / allrecipes cada vez (esto probablemente hará que te metan en la lista negra y te veten de la página).

### Parseo con Nokogiri

Nokogiri es una gema buena y famosa que se usa para parsear documentos HTML (¡también hace otras cosas interesantes!). Acá te mostramos cómo puedes usarla una vez que conozcas los selectores CSS de los elementos que te interesan. Te vamos a explicar los selectores CSS más adelante pero la idea principal es que puedes seleccionar todos los elementos con los atributos de una clase (`class`) dada creando el la consulta `class`.

Por ejemplo, si quieres encontrar todos los elementos con la clase `student` en el siguiente HTML, usaras la consulta `".student"`

```html
<ul>
  <li class="student">John</li>
  <li>Paul</li>
  <li class="student">Ringo</li>
</ul>
```

Puedes usar el siguiente código como plantilla para empezar:

```ruby
require 'nokogiri'
file = 'fraise.html'  # or 'strawberry.html'
doc = Nokogiri::HTML(File.open(file), nil, 'utf-8')

# Up to you to find the relevant CSS query.
```

Puedes trabajar en un archivo temporal como `parsing.rb` para encontrar los selectores adecuados y el código Ruby para obtener todos los datos que quieres extraer del HTML. Puedes comenzar simplemente mostrando la información extraída con `puts`. Una vez que hayas encontrado todo los selectores que necesites puedes comenzar a escribir el código de la acción en tu recetario.

Hoy usarás el método Nokogiri `.search()` el cual toma un selector CSS como parámetro. Si no recuerdas la sintaxis, échale un vistazo a esta sección de la [clase de parsing](https://kitt.lewagon.com/karr/karr.kitt/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data&program_id=1#/3/6).

**Recursso**: ¿Quieres saber más sobre Nokogiri? Aquí hay una [buena guía de scraping de Nokogiri](https://www.sitepoint.com/nokogiri-fundamentals-extract-html-web/).

### Obtención de datos HTML con `open-uri`

Es hora de usar tu código de parseo en una URL en línea con consultas diferentes (no solamente con `[fraise|strawberry]`). Usa la librería [open-uri](http://www.ruby-doc.org/stdlib/libdoc/open-uri/rdoc/OpenURI.html) para obtener la respuesta HTML de una URL dada:

```ruby
require 'nokogiri'
require 'open-uri'
url = "http://the_url_here"
doc = Nokogiri::HTML(open(url), nil, 'utf-8')

# Rest of the code
```

### `Controller` / `View` / `Router`

Una vez que tengas esta lógica de parseo será momento de agregar esta nueva acción de usuario a tu `Controller`. Usa el pseudocódigo anterior como guía de este nuevo método. Puedes copiar y pegar el código de parseo en tu controlador para tu primer intento.

Piensa en la **clase** que debe ser usada para mantener la información de la web parseada. ¿Cuál es?

¡Intenta correr tu recetario!

## 2 - Agrega una propiedad `@rating` a tu `Recipe`

Esta nueva propiedad debe ser:

- preguntada al/a la usuario/a cuando cree recetas
- parseada de la web al importar una nueva receta
- almacenada en el CSV
- Mostrada cuando se listen las recetas

## 3 - (Acción de usuario) Marcar una receta como hecha

Una vez que termines con la “Búsqueda”, intenta agregar una funcionalidad para marcar recetas como hechas:

```bash
-- Here are all your recipes --

1. [X] Crumpets (3 / 5)
2. [ ] Beans & Bacon breakfast (4 / 5)
3. [X] Plum pudding (3 / 5)
4. [X] Apple pie (4 / 5)
5. [ ] Christmas crumble (5 / 5)
```

## 4 - Agrega una propiedad `@prep_time` a tu `Recipe`:

Esta nueva propiedad también debe ser:

- preguntada al/a la usuario/a cuando cree recetas
- parseada de la web al importar una nueva receta
- almacenada en el CSV
- Mostrada cuando se listen las recetas

## 5 - (Opcional) Servicio

Intenta extraer la lógica de **parseo** del controlador y de ponerla en un [**Service Object**](http://brewhouse.io/blog/2014/04/30/gourmet-service-objects.html):

```ruby
class ScrapeAllrecipesService # or ScrapeMarmitonService
  def initialize(keyword)
    @keyword = keyword
  end

  def call
    # TODO: return a list of `Recipes` built from scraping the web.
  end
end
```
