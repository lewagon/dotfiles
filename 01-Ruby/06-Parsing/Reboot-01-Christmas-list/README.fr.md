## Indications

L’hiver approche ⛄⛄⛄. On veut créer un programme pour gérer notre
liste de cadeaux, marquer les articles achetés et enfin trouver
l’inspiration sur un site Web externe comme Etsy. Ce challenge devrait
te prendre la journée. 🎁

Comme hier, commence par écrire le pseudo-code en groupe en live-code
 💻.

## Pseudo-code

Commençons par réfléchir ensemble au **pseudo-code** :

```ruby
# interface.rb

# Pseudo-code :
# 1. Bienvenue
# 2. Affiche le menu (list / add / delete / mark )
# 3. Obtenir l'action utilisateur
# 4. Effectuer la bonne action
```

## Étape 1 - La boucle de menu 🎁

Commence par créer la boucle principale qui affiche les actions et
récupère les données entrées par l’utilisateur :

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

## Étape 2 - Lister, ajouter, supprimer 🎁🎁

Le moment est venu d’exécuter les actions simples (`list`, `add`,
`delete`).

- Comment modélises-tu ta liste de cadeaux (`gift_list`) ?
- Utilises-tu un hash ? Un array ?

**Parles-en avec ton/ta prof avant de te lancer dans chaque action.**

## Étape 3 - Marquer un article comme acheté 🎁🎁🎁

On veut pouvoir marquer tous les articles ayant été achetés :

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

- Comment modifies-tu ta liste de cadeaux (`gift_list`) pour stocker
    le statut de chaque article ?
- Comment cela affecte-t-il ton code ?

Encore une fois, **parles-en avec ton/ta prof**

## Étape 4 - Trouver des idées sur Etsy 🎁🎁🎁🎁

Tu es à court d’idées pour Noël et tu aimerais trouver l’inspiration sur
[Etsy](https://www.etsy.com). Ajoute une nouvelle action `idea` à ton
menu (en plus des actions `list`, `add`, `delete` et `mark`). Voici
comment cette action peut fonctionner :

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

Voici un premier script pour t’aider à scraper (extraire les données) :

*Attention : pour éviter que notre IP soit bannie sur Etsy, on ne va pas
scraper Etsy en temps réel ; on téléchargera une page html pour la
scraper en local*

```bash
# Télécharge la page à scraper dans ton répertoire de travail
curl -H "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0"  https://www.etsy.com/search?q=THE_ARTICLE_YOUR_ARE_LOOKING_FOR > results.html
# obtiens le chemin vers le fichier HTML
pwd
```

```ruby
# lib/scraper.rb
require 'nokogiri'

filepath = "/path/to/the/HTML/file.html"
# 1. On obtient le contenu de la page HTML
html_content = File.open(filepath)
# 2. On crée un document Nokogiri à partir de ce fichier
doc = Nokogiri::HTML.parse(html_content)

# 3. On recherche les éléments corrects contenant le titre des articles dans notre document HTML
doc.search('.v2-listing-card__info .v2-listing-card__title').each do |element|
  # 4. Pour chaque article trouvé, on extrait son titre et on l’imprime
  puts element.text.strip
end
```

Une fois que tu as réussi à scraper le fichier local `results.html`,
actualise ton outil pour le connecter à la page de résultats d’Etsy et
scraper la page en ligne :

```ruby
require 'open-uri'
require 'nokogiri'

puts "What are you searching on Etsy?"
article = gets.chomp

# 1. We get the HTML page content thanks to open-uri
html_content = URI.open("https://www.etsy.com/search?q=#{article}", "User-Agent" => "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0").read
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML.parse(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
doc.search('.v2-listing-card__info .v2-listing-card__title').each do |element|
  # 4. For each item found, we extract its title and print it
  puts element.text.strip
end
```

- N’hésite pas à scraper un autre site Web en adaptant ce script.
- Tu peux aussi scraper d’autres informations en dehors du nom de
    l’article (par exemple son prix).

## [FACULTATIF] Enregistre les cadeaux dans un fichier CSV 🎁🎁🎁🎁🎁

On veut pouvoir récupérer la liste de cadeaux à chaque fois qu’on lance
l’application. Crée un fichier `gifts.csv` pour conserver tes données
localement.

Parser un fichier CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.foreach(filepath, col_sep: ',', quote_char: '"', headers: :first_row) do |row|
  # TODO: build new gift from information stored in each row
end
```

Stocker un fichier CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.open(filepath, 'wb', col_sep: ',', force_quotes: true, quote_char: '"') do |csv|
  # We had headers to the CSV
  csv << ['name', 'price', 'bought']
  #TODO: store each gift
end
```

- Trouve le meilleur moment pour charger les cadeaux.
- Quand dois-tu enregistrer les cadeaux ?


## Flashcards

Pour vous aider à maîtriser les objectifs clés de cette journée reboot, vous pouvez refaire le jeu de flashcards suivant : **Hash & Symboles**.
