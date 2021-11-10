## Contexte et objectifs

En Ruby, on utilise le mot-clé `self` pour accéder au contexte dans lequel le programme fonctionne actuellement.

La règle est simple. Utilisé à l’intérieur d’une méthode d’instance, `self` indiquera l'objet sur lequel la méthode est appelée. Utilisé à l’intérieur de la classe ou du module, ou avant le nom de la méthode quand on définit une méthode de classe (c.-à-d. `def self.method; end`), `self` représente la première classe ou le premier module qui l’inclut.

Il existe 3 contextes :

1.  Le contexte global ou « principal » (main), que l’on peut voir en tapant `self.inspect` dans la console IRB (**tu peux essayer**)
2.  Le contexte Classe ou Module, où le mot-clé `self` représente une Classe ou un Module
3.  Le contexte Objet où `self` représente une **instance** d’une classe.

## Spécifications

### Trouve la combinaison gagnante

Examine le code suivant, qui contient un module, une classe et des méthodes imbriquées. Implémente le retour de chaque méthode, de façon à obtenir la combinaison gagnante ! Lorsque tu es sûr de l’avoir, teste-la pour vérifier !

### Chaîner avec `self`

Dans **animal.rb**, il y a un programme qui s’exécute avec des erreurs. On a essayé d’implémenter le chaînage de méthodes, mais on a échoué lamentablement… Une **toute petite** correction de notre programme permet de le faire fonctionner. Essaie de la trouver ! **Astuce :** Il faut utiliser `self` (évidemment 😊)

Voici ce qu’on souhaite pouvoir faire :

```ruby
cat = Animal.new
cat.name("garfield").color("orange")
p cat
```
