## Spécifications

Écris un programme qui imprime les paroles de la chanson [99 Bottles of Beer](https://lyricsplayground.com/alpha/songs/numbers/99bottlesofbeeronthewall.html).

Il prendra comme argument le nombre de bouteilles de départ, donné via la ligne de commande lors de l'exécution du programme. Ce programme devrait fonctionner de cette manière.

Tu devrais définir ta méthode `#beer_song(beer_start_count)` dans `lib/beer_song.rb`. Ensuite, tu devrais exécuter le programme en lançant `lib/interface.rb`.

```bash
ruby lib/interface.rb 5

5 bouteilles de bière sur le mur, 5 bouteilles de bière !
En prends une, passe-la autour, 4 bouteilles de bière sur le mur !
4 bouteilles de bière sur le mur, 4 bouteilles de bière !
En prends une, passe-la autour, 3 bouteilles de bière sur le mur !
3 bouteilles de bière sur le mur, 3 bouteilles de bière !
En prends une, passe-la autour, 2 bouteilles de bière sur le mur !
2 bouteilles de bière sur le mur, 2 bouteilles de bière !
En prends une, passe-la autour, 1 bouteille de bière sur le mur !
1 bouteille de bière sur le mur, 1 bouteille de bière !
En prends une, passe-la autour, plus de bouteilles de bière sur le mur !
```

### Astuce

* Tu peux envoyer des arguments à ton programme depuis la ligne de commande en utilisant [ARGV](http://ruby.about.com/od/rubyfeatures/a/argv.htm)
* J'espère que tu as remarqué le changement de bouteill<strong>es</strong> à bouteill<strong>e</strong> lorsque seule 1 bouteille reste !

_Ce changement devrait se produire dans `lib/interface.rb`._

### Un peu de contexte sur ARGV

Tout programme Ruby que tu écris s'exécute à l'intérieur d'un autre logiciel : l'interpréteur Ruby. Et cet interpréteur s'exécute lui-même à l'intérieur d'un autre logiciel : ton système d'exploitation. Ces couches logicielles sont appelées l'environnement, et il existe de nombreuses façons d'échanger des données entre l'environnement et ton programme.

Une façon est via la constante ARGV qui est prédéfinie dans chaque programme Ruby. C'est un tableau de chaînes de caractères représentant les arguments de la ligne de commande. Considère ce programme simple

**testing_argv.rb**

```ruby
puts "*** Arguments de la ligne de commande ***"
p ARGV
```

Maintenant exécute-le dans le terminal de cette façon

```bash
ruby testing_argv.rb un deux trois

*** Arguments de la ligne de commande ***
["un", "deux", "trois"]
```

```bash
ruby testing_argv.rb "un et deux" trois

*** Arguments de la ligne de commande ***
["un et deux", "trois"]
%%`
