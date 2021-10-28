## Contexte et objectifs

À première vue, les blocs et `yield` peuvent être déroutants… Mais tout est une question de pratique. Voici les objectifs :
- Implémenter des méthodes de base utilisant `yield` pour en comprendre le mécanisme.
- Apprendre la syntaxe à utiliser pour appeler une méthode avec un bloc.
- Comprendre ce qui se passe quand tu passes un paramètre au bloc.

Dans le cadre de cet exercice, tu es sur le point d’ouvrir un **restaurant de burgers**. Tu dois donc mettre en place des méthodes pour préparer des burgers à servir à tes premiers clients, de la cuisine au comptoir.

## Spécifications

### Étape 1 : Le burger basique

On va commencer par coder une méthode `burger` simple qui prend 3 paramètres, la base (patty), la sauce (sauce) et la garniture (topping), et retourne le burger sous la forme d’un array de strings. Par exemple :

```ruby
burger("steak", "ketchup", "onions")
# => ["bread", "steak", "ketchup", "onions", "bread"]
```

Les clients peuvent composer leur burger en choisissant un élément de chaque :

![Menu du restaurant de burgers](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-menu.svg?sanitize=true)

### Étape 2 : Burger à la demande

La méthode `burger` peut uniquement être appelée avec des arguments qui figurent dans les listes ci-dessus. Mais lorsqu’ils commandent, les clients ont souvent des demandes spéciales concernant leur **base**, comme la cuisson, la taille de la portion ou une alternative.

Notre méthode n’est pas en mesure de recevoir ce genre de demandes spéciales pour le moment ; on va donc la retravailler.

Mais avant de nous lancer dans le code de la méthode, réfléchissons à une façon d’écrire les instructions spéciales pour la cuisine (en respectant la contrainte de ne pas passer les informations complémentaires au travers d’arguments). C’est comme si on ajoutait une note à la commande :

![Appel de méthode avec une note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-method.svg?sanitize=true)

Pour cela, on va utiliser un bloc dans Ruby !

```ruby
burger("steak", "ketchup", "onions") do |patty|
 "grilled #{patty}"
end
```

Génial ! On a trouvé un moyen de transformer la base de notre burger sans modifier l’argument. L’appel ci-dessus devrait donc retourner :

```ruby
# => ["bread", "grilled steak", "ketchup", "onions", "bread"]
```

On va modifier notre méthode pour que cela fonctionne !

#### De retour en cuisine

`yield` est le mot-clé dont tu as besoin pour exécuter le bloc. Il intervient dans ta méthode pour appliquer les instructions des clients concernant la base de leur burger.

![Note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-yield.svg?sanitize=true)

Améliore la méthode `burger` pour accueillir un bloc :
- Place `yield` là où tu veux appeler le bloc
- Le bloc transformera uniquement `patty` (la base)

La méthode doit fonctionner **avec ou sans bloc**. Utilise la méthode [`block_given?`](https://ruby-doc.org/core-2.7.0/Kernel.html#method-i-block_given-3F) pour déterminer si un bloc a été passé à la méthode `burger` lors de son appel.

### Étape 3 : Préparation des burgers

Les clients affluent, ils veulent tous goûter à tes délicieux burgers.
Ouvre le fichier `interface.rb`, qui contient une liste de commandes à honorer. Écris toutes les instructions pour la préparation des burgers. Tu peux ensuite afficher les burgers avec `puts` or `p`.

#### Petit coup de pouce pour ton premier bloc

L’un de tes clients a demandé une plus grande portion de poisson. Transforme ton burger classique en un plus grand burger pour lui et écris un bloc pour passer la string en majuscules :
1.  Appelle la méthode `burger` avec "fish", "mayo" et "salad", **tout en minuscules**, et stocke le résultat dans la variable `bigger_burger`.
2.  Ajoute un bloc (pour la note) avec les instructions spéciales :
- Il prend une string comme argument
- Il transforme la string en majuscules

![Écris un bloc dans Ruby](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-syntax.svg?sanitize=true)

Tu viens d’écrire ton premier bloc. Entraîne-toi tout seul avec les autres burgers !
