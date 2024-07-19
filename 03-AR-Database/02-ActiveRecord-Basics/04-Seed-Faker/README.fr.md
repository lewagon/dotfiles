## Contexte & Objectifs

Maintenant que tu es familier avec les migrations et les modèles, il est temps pour un scénario de la vie réelle. Comment testes-tu si ta base de données fonctionne, si tu n'as pas de **données** ? Pour ce faire, nous devons créer un tas de données que nous pouvons utiliser pour initialiser notre base de données. Cela s'appelle une `seed`.

### Alimenter ta base de données

Pour ajouter des données après la création d'une base de données, tu peux commencer par remplir le fichier `db/seeds.rb` avec quelques commandes Ruby que tu aimerais exécuter. Par exemple, si tu veux créer 3 publications :

```ruby
# db/seeds.rb
Post.create(title: "Ma première publication", url: "https://www.blog.com/ma-premiere-publication", votes: 13)
Post.create(title: "Ma deuxième publication", url: "https://www.blog.com/ma-deuxieme-publication", votes: 42)
Post.create(title: "Ma troisième publication", url: "https://www.blog.com/ma-troisieme-publication", votes: 128)
```

Ou si tu veux en créer 10 :

```ruby
# db/seeds.rb
10.times do |i|
  Post.create(title: "Ma publication numéro #{i}")
end
```

Tu peux ensuite exécuter ce fichier en exécutant dans ton terminal :

```bash
rake db:seed
```

### Données de test avec `faker`

Lorsque tu sèmes des données dans ta base de données, tu souhaites peut-être qu'elles ressemblent à de vraies données utilisateur sans avoir à trouver l'inspiration et à les écrire toi-même. Dans ce cas, tu peux utiliser la gemme [faker](https://github.com/faker-ruby/faker) pour générer des données fausses. Installons-la :

```bash
gem install faker
```

Tu peux ensuite l'utiliser dans ton fichier `db/seeds.rb` :

```ruby
# db/seeds.rb
require "faker"

Post.create(title: Faker::Music.band, url: Faker::Sports::Football.player, votes: 2)
```

Explore la [documentation de la gem `faker`](https://github.com/faker-ruby/faker) pour trouver les modules appropriés parmis les nombreux proposés.

### Réinitialisation de ta base de données

Voici une commande utile pour **supprimer** ta base de données, la **recréer**, **migrer** le schéma et la **_seed_**. Cela te fera gagner beaucoup de temps et tu l'utiliseras beaucoup lors des semaines de projet, c'est le moment de s'entraîner !

```bash
rake db:drop db:create db:migrate db:seed
```

Une fois que tu as réinitialisé ta base de données, tu peux interroger ta base de données dans une `rake console`, par exemple avec :

```ruby
Post.all
```

## Spécifications

Ouvre le fichier `db/seeds.rb` et écris du code pour insérer 100 publications, en utilisant des données fausses générées par la gem [`faker`](https://github.com/faker-ruby/faker). Il y a plein d'options amusantes de faker là-dedans, alors sois créatif 😊.
