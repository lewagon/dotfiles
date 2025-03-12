## Lineamientos

Ya va a llegar el invierno ⛄⛄⛄. Queremos crear un programa que maneje nuestra lista de regalos, marcar los ítems como comprados y eventualmente buscar algo de inspiración en una página externa como Etsy. Este desafío te tomará todo el día. 🎁

Tal como hiciste ayer, empieza escribiendo el pseudocódigo en el grupo como una sesión de live-code 💻.

_Nota: El usuario puede agregar **cualquier** regalo que desee. No es necesario hacer una lista fija de regalos posibles ni nada por el estilo._

## Pseudocódigo

Primero lo primero. Hagamos una tormenta de ideas juntos para generar el pseudocódigo:

```ruby
# interface.rb

# Pseudo-code:
# 1. Welcome
# 2. Display menu (list / add / delete / mark )
# 3. Get user action
# 4. Perform the right action
```

## Paso 1 - El bucle del menú  🎁

Empieza creando el bucle que mostrará las acciones y tomará la entrada de datos del usuario:

```bash
ruby interface.rb

> Welcome to your Christmas gift list
> Which action [list|add|delete|quit]?
> list
> TODO: list items
> Which action [list|add|delete|quit]?
> add
> TODO: ask user an item and add it to gift list
> Which action [list|add|delete|quit]?
> delete
> TODO: ask user the index of item to delete and delete it
> Which action [list|add|delete|quit]?
> quit
> Goodbye
```

## Paso 2 - Lista, Agrega, Borra 🎁🎁

Implementemos tres simples acciones (`list`, `add`, `delete`).

- ¿Cómo modelas tu `gift_list`?
- ¿Usarás un hash o un arreglo (array)?

**Discute esto con tu profesor/a antes de que empieces con cada acción.**

## Paso 3 - Marcar un ítem como comprado  🎁🎁🎁

Queremos tener la opción de marcar cualquier ítem como comprado:


```bash
ruby interface.rb

> Welcome to your Christmas gift list
> Which action [list|add|delete|mark|quit]?
> list
> 1 - [ ] sockets
> 2 - [X] ruby book
> 3 - [ ] macbook pro
> Which action [list|add|delete|mark|quit]?
> mark
> Which item have you bought (give the index)?
> 3
> Which action [list|add|delete|mark|quit]?
> list
> 1 - [ ] sockets
> 2 - [X] ruby book
> 3 - [X] macbook pro
```

- ¿Cómo modificas tu `gift_list` para guardar el `status` de cada ítem?
- ¿Cómo afecta esto a tu código?

Una vez mas, **discute esto con tu profesor/a**

## Paso 4 - Encontrar ideas en Etsy 🎁🎁🎁🎁

Ya no tienes más ideas para navidad y quieres encontrar inspiración en internet.
Hoy, vamos a extractar datos de ["Letsy"](https://letsy.lewagon.com/), una versión falsa de Etsy, para encontrar algunas ideas de regalo.
Desafortunadamente, no podemos extractar datos de [Etsy](https://www.etsy.com) directamente porque tienen un fuerte sistema anti-scraping. Pero puedes ver un ejemplo de cómo hacer esto más tarde en el video de solución.

Agrega una nueva acción `idea` a tu menú (además de las acciones `listar`, `agregar`, `eliminar` y `marcar`). Así es como podría funcionar esta acción:

```bash
What are you looking for?
> Jeans
Here are results for "Jeans":
1 - Levis Blue Jeans
2 - Vintage Jeans
3 - Cargo Jeans Pants
4 - White Jeans
etc.
Pick one to add to your list (give the number)
> 2
"Vintage Jeans" added to your wishlist
```

Para el web scraper, aquí tienes un script inicial para ayudarte a extraer los datos:

```ruby
# lib/scraper.rb
require 'open-uri'
require 'nokogiri'

url = "THE_URL_FROM_THE_INTERNET_YOU_WANT_TO_SCRAPE"
# 1. We get the HTML page content
html_content = URI.parse(url).read
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML.parse(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
doc.search('.CSS_CLASS_YOU_FIND_ON_THE_PAGE').each do |element|
  # 4. For each item found, we extract its title and print it
  puts element.text.strip
end
```

- Siéntete libre de hacer el scraping de otra página web adaptando este script.
- También puedes hacer scraping de otro tipo de información además del nombre (por ejemplo: el precio del ítem).

## [OPCIONAL] Resguardo de regalos en un archivo CSV 🎁🎁🎁🎁🎁
Queremos poder ser capaces de recuperar la lista de regalos cada vez que ejecutemos la aplicación.
Crea un archivo para persistir tus datos localmente.

Parseo del CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.foreach(filepath, col_sep: ',', quote_char: '"', headers: :first_row) do |row|
  # POR HACER: crea un regalo nuevo a partir de la información almacenada en cada fila
end
```

Almacenamiento del CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.open(filepath, 'wb', col_sep: ',', force_quotes: true, quote_char: '"') do |csv|
  # Teníamos los encabezados para el CSV
  csv << ['name', 'price', 'bought']
  # POR HACER: guarda cada regalo
end
```

- Encuentra el mejor momento para guardar los regalos.
- ¿Cuándo necesitas guardarlos?

## Flashcards

Para ayudarte a dominar los objetivos clave de este día de reboot puedes rehacer el siguiente mazo de flashcards: **Hash & Symbols**.
