## Contexto y Objetivos

## Ejemplo

Primero abre tu Terminal e instala [Nokogiri](http://www.nokogiri.org/), una **gema** muy útil para extraer contenido web (también conocido como "hacer web scraping").

```bash
gem install nokogiri
```

Luego puedes correr el siguiente código Ruby:

```ruby
require 'open-uri'
require 'nokogiri'

html_content = URI.open('https://www.etsy.com/search?q=wallet').read
doc = Nokogiri::HTML.parse(html_content)

doc.search('.wt-grid .v2-listing-card__info .v2-listing-card__title').each_with_index do |element, index|
  puts "#{index + 1}. #{element.text.strip}"
end
```

Al ejecutar este código, este mostrará todas las billeteras encontradas en la primera página en [Etsy](https://www.etsy.com/search?q=wallet)

¿Cómo funciona?

El método `search` toma un [selector CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) y busca todos los elementos HTML en la página que coincidan con el mismo. En este ejemplo utilizamos el selector de **clase** (class) `.card-meta-row` porque la [fuente HTML] [HTML source](https://support.mozilla.org/en-US/questions/873324) era algo como:

```html
<div class="card-meta-row">
  Leather Wallet
</div>
```

## Especificaciones

Queremos hacer scraping de **antiguedades** en [craigslist](https://craigslist.org/) para una ciudad dada. Abre `lib/scraper.rb` e implementa el método `scrape_craiglist_antiques`. Deberá **devolver** un arreglo (`Array`) de las antigüedades que se encontraron en la página.

Este método debería hacer el scraping correctamente en ciudades como Londres y Nueva York. Por ende `scrape_craiglist_antiques("london")` y `scrape_craiglist_antiques("newyork")` deben arrojar resultados. Responde la siguiente pregunta: ¿Son iguales los urls craigslist de todas las ciudades?
