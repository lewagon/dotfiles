## Contexte et objectifs

Pourquoi a-t-on besoin de l’héritage ? Parce qu’on ne veut pas que la même logique se répète à plusieurs endroits dans notre code ! Si plusieurs classes partagent certains aspects du même comportement, il est peut-être temps d’introduire l’héritage.

Exemple : Tu veux coder un `Parser` générique avec des caractéristiques de base (lire un fichier, stocker son contenu, etc.). Au bout d’un moment, tu décides que tu veux créer des parsers plus spécifiques de type `XmlParser` ou `JsonParser` pour traiter certains formats. En faisant de ces nouvelles classes les **enfants** de la classe `Parser`, tu n’as pas besoin de réécrire toutes les méthodes de base créées dans Parser ; tu dois seulement créer les méthodes qui sont **propres** à tes besoins XML ou JSON. Avec l’héritage, ton code reste [DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas) (Don't Repeat Yourself, Ne te répète pas) !

En savoir plus sur l’héritage dans [l’apprentissage de Ruby](http://rubylearning.com/satishtalim/ruby_inheritance.html).

## Spécifications

#### Héritage de la classe `Dessert`

Complète la classe `Dessert`.

- Ajoute des getters et des setters pour `name` et `calories`
- Les méthodes d’instance `Dessert#healthy?` doivent retourner `true` si un dessert a moins de 200 calories
- `Dessert#delicious?` doit retourner `true` pour tous les desserts 😊

Complète `JellyBean` qui hérite de `Dessert`.

- Ajoute un getter pour `flavor`
- Modifie `delicious?` pour retourner `false` si le goût est `"black licorice"` (réglisse noir) mais `true` pour tout le reste.

#### Super vélo

- Dans `bicycle.rb`, remplace tous les `"?"` dans la méthode `#quiz` par le bon integer.

#### (Optionnel)

- Sais-tu à quoi sert le mot-clé `super` ? Si oui, utilise-le pour réécrire `JellyBean#initialize` dans `dessert.rb` avec.

## Enseignements clés

- Pourquoi fait-on en sorte que des classes héritent d’autres ? À quoi cela sert-il ?
- Quel est le mot-clé qui permet d’étendre le comportement d’une méthode héritée ?
- On a la classe `class Bike < Vehicle` et on a défini `Vehicle#drive`. Si on implémente `Bike#drive`, quelle méthode s’appliquera aux objets `Bike`, `Vehicle#drive` ou `Bike#drive` ?
- Digression : à propos de `nil?` et de l’héritage. Dans la documentation Ruby, cherche l’implémentation de la méthode `nil?` dans `NilClass` et dans la classe `Object`, qui est la superclasse de tous les objets Ruby. Maintenant, essaie de déterminer ce qui se passe exactement quand tu appelles `an_example_object.nil?`.
