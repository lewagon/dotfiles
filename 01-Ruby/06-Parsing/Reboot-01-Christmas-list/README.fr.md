## Indications

L’hiver approche ⛄⛄⛄. On veut créer un programme pour gérer notre
liste de cadeaux, marquer les articles achetés et enfin trouver
l’inspiration sur un site Web externe comme Etsy. Ce challenge devrait
te prendre la journée. 🎁

Comme hier, commence par écrire le pseudo-code en groupe en live-code
 💻.

 _Remarque : L'utilisateur peut ajouter le cadeau **qu'il souhaite**. Il n'est pas nécessaire de faire une liste fixe de cadeaux possibles._

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

Tu es à court d'idées pour Noël et tu veux trouver de l'inspiration sur internet.
Aujourd'hui, nous allons scraper ["Letsy"](https://letsy.lewagon.com/), une version fictive d'Etsy, pour trouver des idées de cadeaux.
Malheureusement, nous ne pouvons pas scraper [Etsy](https://www.etsy.com) directement car ils ont un système anti-scraping puissant. Mais tu peux voir un exemple de comment faire cela plus tard dans la vidéo de solution.

Ajoute une nouvelle action `idée` à ton menu (en plus des actions `liste`, `ajouter`, `supprimer` et `marquer`). Voici comment cette action pourrait fonctionner :

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

Pour le scraper, voici un script de départ pour t'aider à extraire les données :

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

- N’hésite pas à scraper un autre site Web en adaptant ce script.
- Tu peux aussi scraper d’autres informations en dehors du nom de l’article (par exemple son prix).


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
