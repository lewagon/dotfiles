Indications
-----------

L’hiver approche â›„â›„â›„. On veut créer un programme pour gérer notre
liste de cadeaux, marquer les articles achetés et enfin trouver
l’inspiration sur un site Web externe comme Etsy. Ce challenge devrait
te prendre la journée. ðŸŽ�

Comme hier, commence par écrire le pseudocode en groupe en live-code
ðŸ’».

Pseudocode
----------

Commençons par réfléchir ensemble au **pseudocode** :

``` {.ruby}
# interface.rb

# Pseudo-code:
# 1. Welcome
# 2. Display menu (list / add / delete / mark )
# 3. Get user action
# 4. Perform the right action
```

Étape 1 - La boucle de menu ðŸŽ�
--------------------------------

Commence par créer la boucle principale qui affiche les actions et
récupère les données entrées par l’utilisateur :

``` {.bash}
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

Étape 2 - Lister, ajouter, supprimer ðŸŽ�ðŸŽ�
---------------------------------------------

Le moment est venu d’exécuter les actions simples (`list`, `add`,
`delete`).

-   Comment modélises-tu ta liste de cadeaux (`gift_list`) ?
-   Utilises-tu un hash ? Un array ?

**Parles-en avec ton/ta prof avant de te lancer dans chaque action.**

Étape 3 - Marquer un article comme acheté ðŸŽ�ðŸŽ�ðŸŽ�
------------------------------------------------------

On veut pouvoir marquer tous les articles ayant été achetés :

``` {.bash}
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

-   Comment modifies-tu ta liste de cadeaux (`gift_list`) pour stocker
    le statut de chaque article ?
-   Comment cela affecte-t-il ton code ?

Encore une fois, **parles-en avec ton prof**

Étape 4 - Trouver des idées sur Etsy ðŸŽ�ðŸŽ�ðŸŽ�ðŸŽ�
-----------------------------------------------------

Tu es à court d’idées pour Noël et tu aimerais trouver l’inspiration sur
[Etsy](https://www.etsy.com). Ajoute une nouvelle action `idea` à ton
menu (en plus des actions `list`, `add`, `delete` et `mark`). Voici
comment cette action peut fonctionner :

``` {.bash}
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

``` {.bash}
# Télécharge la page à scraper dans ton répertoire de travail
curl "https://www.etsy.com/search?q=THE_ARTICLE_YOUR_ARE_LOOKING_FOR" > results.html
# obtiens le chemin vers le fichier HTML
pwd
```

``` {.ruby}
# lib/scraper.rb
require 'nokogiri'

filepath = "/path/to/the/HTML/file.html"
# 1. On obtient le contenu de la page HTML
html_content = File.open(filepath)
# 2. On crée un document Nokogiri à partir de ce fichier
doc = Nokogiri::HTML(html_content)

# 3. On recherche les éléments corrects contenant le titre des articles dans notre document HTML
doc.search('.v2-listing-card .v2-listing-card__info .text-body').each do |element|
 # 4. Pour chaque article trouvé, on extrait son titre et on l’imprime
 puts element.text.strip
end
```

Une fois que tu as réussi à scraper le fichier local `results.html`,
actualise ton outil pour le connecter à la page de résultats d’Etsy et
scraper la page en ligne :

``` {.ruby}
require 'open-uri'
require 'nokogiri'

puts "What are you searching on Etsy?"
article = gets.chomp

# 1. On obtient le contenu de la page HTML grâce à open-url
html_content = URI.open("https://www.etsy.com/search?q=#{article}").read
# 2. On crée un document Nokogiri à partir de ce fichier
doc = Nokogiri::HTML(html_content)

# 3. On recherche les éléments corrects contenant le titre des articles dans notre document HTML
doc.search('.v2-listing-card .v2-listing-card__info .text-body').each do |element|
 # 4. Pour chaque article trouvé, on extrait son titre et on l’imprime
 puts element.text.strip
end
```

-   N’hésite pas à scraper un autre site Web en adaptant ce script.
-   Tu peux aussi scraper d’autres informations en dehors du nom de
    l’article (par exemple son prix).

[FACULTATIF] Enregistre les cadeaux dans un fichier CSV ðŸŽ�ðŸŽ�ðŸŽ�ðŸŽ�ðŸŽ�
----------------------------------------------------------------------------

On veut pouvoir récupérer la liste de cadeaux à chaque fois qu’on lance
l’application. Crée un fichier `gifts.csv` pour conserver tes données
localement.

Parser un fichier CSV

``` {.ruby}
require 'csv'

csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
filepath = 'gifts.csv'

CSV.foreach(filepath, csv_options) do |row|
 # TODO: build new gift from information stored in each row
end
```

Stocker un fichier CSV

``` {.ruby}
require 'csv'

csv_options = { col_sep: ',', force_quotes: true, quote_char: '"' }
filepath = 'gifts.csv'

CSV.open(filepath, 'wb', csv_options) do |csv|
 # On avait des headers pour le fichier CSV
 csv << ['name', 'price', 'bought']
 #TODO: store each gift
end
```

-   Trouve le meilleur moment pour charger les cadeaux.
-   Quand dois-tu enregistrer les cadeaux ?

