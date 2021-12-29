## Contexte et objectifs

- Comprendre la différence entre une méthode de classe et une méthode d’instance.

Quand tu utiliseras une gem ou un module de la bibliothèque standard, tu devras utiliser des méthodes de classe **APPELÉES DIRECTEMENT SUR LA CLASSE**, et non sur des instances de la classe. Lis les lignes suivantes dans IRB :

```ruby
"this is a string object".upcase
["this", "is", "an", "array", "object"].shuffle
Time.now
a_time_object = Time.now
a_time_object.hour
```

Peux-tu identifier une méthode qui diffère des autres ? Trouve l’intrus !

## Spécifications

- Crée une classe `Restaurant` avec deux variables d’instance, `@city` et `@name`, définies avec les deux paramètres d’`initialize`.
- Définis une méthode d’instance `#rate(new_rate)` permettant de noter un objet restaurant. Cette méthode doit re-calculer la note moyenne `@average_rating` du restaurant à chaque fois qu’elle est appelée avec une nouvelle note. Cette `@average_rating` doit être accessible au monde extérieur.
- Définis une méthode de **classe** `.filter_by_city(restaurants, city)` qui retourne tous les restaurants dans une ville donnée (elle doit retourner un array d’objets restaurants). Exemple :

```ruby
jules_verne = Restaurant.new("paris", "Jules Verne")
bluebird = Restaurant.new("london", "Bluebird")
daniel = Restaurant.new("new york", "Daniel")
restaurants = [jules_verne, bluebird, daniel]
Restaurant.filter_by_city(restaurants, "london") # => [ #<Restaurant:0x007f9a43bb7eb8 @city="london", @name="Bluebird"> ]
```

## Enseignements clés

Es-tu capable de répondre aux questions suivantes ? (Consulte la documentation si besoin)

- Entre `#rate` and `.filter_by_city`, laquelle est une méthode d’instance ? Laquelle est une méthode de classe ?
- Examine la liste ci-dessous. Qu’est-ce qui est quoi ?

```ruby
Date.today
Twitter::REST::Client#follow (cf. https://github.com/sferik/twitter)
String#upcase
Nokogiri::HTML::Document.parse #(cf. http://www.rubydoc.info/gems/nokogiri/Nokogiri/XML/Document)
Array#shuffle
```

- **optionnel :** Examine les méthodes `new` et `initialize`. Laquelle est une méthode d’instance ? Laquelle est une méthode de classe ? Comment sont-elles liées l’une à l’autre ? Laquelle appelle l’autre ?
