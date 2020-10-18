## Lineamientos

Ya va a llegar el invierno ⛄⛄⛄. Queremos crear un programa que maneje nuestra lista de regalos, marcar los ítems como comprados y eventualmente buscar algo de inspiración en una página externa como Etsy. Este desafío te tomará todo el día. 🎁

Tal como hiciste ayer, empieza escribiendo el pseudocódigo en el grupo como una sesión de codeo en vivo 💻.

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

Queremos poder ser capaces de marcar cualquier ítem como comprado:


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

Ya no tienes más ideas para navidad y quieres encontrar inspiración en [Etsy](https://www.etsy.com). Agrega una nueva acción `idea` a tu menú (adicional a las acciones `list`, `add`, `delete` y `mark`). Esta acción pudiera funcionar de la siguiente manera:

```bash
What are you looking for on Etsy?
> Jeans
Here are Etsy results for "Jeans":
1 - Levis Blue Jeans
2 - Vintage Jeans
3 - Cargo Jeans Pants
4 - White Jeans
etc.
Pick one to add to your list (give the number)
> 2
"Vintage Jeans" added to your wishlist
```
Aquí hay un script inicial para ayudarte a hacer la extracción de datos (web scraping):

_Alerta: para evitar ser bloqueados en Etsy, no vamos a hacer el scraping en tiempo real sino que descargaremos una página HTML y haremos el scraping localmente_

```bash
# Download the page to be scraped inside your working directory
curl "https://www.etsy.com/search?q=THE_ARTICLE_YOUR_ARE_LOOKING_FOR" > results.html
# get the path to the HTML file
pwd
```
```ruby
# lib/scraper.rb
require 'nokogiri'

filepath = "/path/to/the/HTML/file.html"
# 1. We get the HTML page content
html_content = File.open(filepath)
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
doc.search('.v2-listing-card .v2-listing-card__info .text-body').each do |element|
  # 4. For each item found, we extract its title and print it
  puts element.text.strip
end
```

Una vez que el scraping funcione en tu archivo local  `results.html`, actualízalo para conectarlo a la página de resultados de Etsy para cualquier palabra clave y hacer el scraping de la pagina en linea:

```ruby
require 'open-uri'
require 'nokogiri'

puts "What are you searching on Etsy?"
article = gets.chomp

# 1. We get the HTML page content thanks to open-uri
html_content = open("https://www.etsy.com/search?q=#{article}").read
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
doc.search('.v2-listing-card .v2-listing-card__info .text-body').each do |element|
  # 4. For each item found, we extract its title and print it
  puts element.text.strip
end
```

- Siéntete libre de hacer el scraping de otra página web adaptando este script.
- También puedes hacer scraping de otro tipo de información además del nombre (por ejemplo: el precio del ítem).

## [OPCIONAL] Resguardo de regalos en un archivo CSV 🎁🎁🎁🎁🎁
Queremos poder ser capaces de recuperar la lista de regalos cada vez que ejecutemos la aplicación.
Crea un archivo para persistir tus datos localmente.

Parseo CSV

```ruby
require 'csv'

csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
filepath    = 'gifts.csv'

CSV.foreach(filepath, csv_options) do |row|
  # TODO: build new gift from information stored in each row
end
```

Almacenado de CSV

```ruby
require 'csv'

csv_options = { col_sep: ',', force_quotes: true, quote_char: '"' }
filepath    = 'gifts.csv'

CSV.open(filepath, 'wb', csv_options) do |csv|
  # We had headers to the CSV
  csv << ['name', 'price', 'bought']
  #TODO: store each gift
end
```

- Encuentra el mejor momento para guardar los regalos.
- ¿Cuándo necesitas guardar los regalos?
