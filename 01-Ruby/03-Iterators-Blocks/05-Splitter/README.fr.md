## Contexte et objectifs

Combinons le pouvoir des énumerables (`#each`, `#map`, etc.) et des blocs (et `yield`). On va essayer de créer une méthode de **séparation** (splitter), qui prendra un array et le divisera en deux groupes en fonction d’une règle arbitraire. On pourrait, par exemple, diviser un groupe de personnes en fonction de leur âge.

## Spécifications

### Séparation par taille (Size Splitter)

Implémente une première méthode `size_splitter` qui prend deux paramètres : un array et un integer (la taille ou `size`). On partira du principe que l’array contient uniquement des mots de type `String`, et que la règle arbitraire consiste à former deux groupes : le premier avec des mots de la taille indiquée (deuxième paramètre de la méthode), et le second avec tous les autres mots.

La méthode `size_splitter` doit retourner un array de deux arrays (les deux groupes définis ci-dessus) dont le contenu doit être trié **alphabétiquement**.

```ruby
words = %w(dog data ask my win two beer as)
result = size_splitter(words, 3)

# result => [["ask", "dog", "two", "win"], ["as", "beer", "data", "my"]]
```

### Perfectionnement : séparation par bloc (Block Splitter)

Dans l’exercice précédent, la règle arbitraire était fixée. Et si on voulait laisser la personne qui appelle la méthode décider de la règle à appliquer ? C’est possible grâce au pouvoir des blocs et de `yield` !

Écris une méthode `block_splitter` de façon à ce que l’exemple suivant fonctionne :

```ruby
beatles = [ "John", "Paul", "Ringo", "George" ]
result = block_splitter(beatles) { |beatle| beatle.start_with?("P") }

# result => [ [ "Paul" ], [ "John", "Ringo", "George" ] ]
```
