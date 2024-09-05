## Contexte & Objectifs

## Exemple

Tout d'abord, ouvre ton terminal et installe [Nokogiri](http://www.nokogiri.org/), une **gemme** très utile lorsque tu veux scraper le contenu d'une page web.

```bash
gem install nokogiri
```

Ensuite, tu peux exécuter le code Ruby suivant :

```ruby
require 'open-uri'
require 'nokogiri'

html_content = URI.parse('https://www.etsy.com/search?q=wallet').read
doc = Nokogiri::HTML.parse(html_content)

doc.search('.wt-grid .v2-listing-card__info .v2-listing-card__title').each_with_index do |element, index|
  puts "#{index + 1}. #{element.text.strip}"
end
```

Si tu lances ce code, il affichera tous les portefeuilles trouvés sur la première page de résultats sur [Etsy](https://www.etsy.com/search?q=wallet)

Comment ça a marché ?

La méthode `search` prend un [sélecteur CSS](https://developer.mozilla.org/fr/docs/Web/Guide/CSS/Getting_started/Selectors) et recherche tous les éléments HTML de la page qui correspondent. Ici, nous sélectionnons les éléments en utilisant 3 classes car la [source HTML](https://support.mozilla.org/fr/questions/873324) ressemble à ceci :

```html
<div class="wt-grid">
  <div class="v2-listing-card__info">
    <div class="v2-listing-card__title">
      Portefeuille en Cuir
    </div>
  </div>
</div>
```

## Spécifications

Nous aimerions scraper les **recettes** répertoriées sur [recipes.lewagon.com](https://recipes.lewagon.com/) pour un terme de recherche donné. Ouvre le fichier `lib/scraper.rb` et implémente la méthode `scrape_recipes`. Elle devrait **retourner** un tableau de recettes trouvées sur le site web.

Cette méthode devrait scraper avec succès pour une recherche. Ainsi, `scrape_recipes("chocolat")` et `scrape_recipes("cacahuète")` devraient tous deux retourner des résultats. Les URL de recettes pour toutes les recherches sont-elles les mêmes ?

### Aller plus loin

Pour obtenir plus d'informations sur Nokogiri, consulte notre [feuille de triche dédiée](https://kitt.lewagon.com/knowledge/cheatsheets/nokogiri).
