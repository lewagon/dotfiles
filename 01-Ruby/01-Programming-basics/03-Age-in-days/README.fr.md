## Contexte et objectifs

- Apprendre à `require` des scripts externes et à appeler des méthodes à partir de ces scripts
- **Maîtriser** les concepts de [variables](https://fr.wikipedia.org/wiki/Variable_(informatique)), d'affectation de variables, de définition de méthodes et d’appel de méthodes.

## Spécifications

### Calcul de l’âge

- Exécute la méthode `age_in_days` définie dans le fichier `lib/age_in_days.rb`. Cette méthode prend 3 arguments (`day`, `month` et `year`) et doit retourner un `Integer` qui correspond à ton âge en jours (c’est-à-dire le nombre de jours que tu as vécu sur la Terre).

### Programme interactif

- Une fois que ta méthode `age_in_days` est correcte, on veut l’appeler dans le programme `lib/interface.rb`, qui exécute un outil en ligne de commande. Pour lancer ce programme, il te suffit d’exécuter la commande suivante dans ton terminal :

```bash
ruby lib/interface.rb
```

Le programme indique que tu as `0 years old`. Tu dois modifier le code de façon à ce que le programme utilise ta méthode `age_in_days`. Remarque : le code est disponible dans le fichier `interface.rb`, car on a écrit la commande `require_relative` au début du fichier.

- **Perfectionnement** : Des lignes de code se répètent-elles dans le fichier `interface.rb` ? Peux-tu refactoriser ces lignes pour rendre ton code DRY (Don’t Repeat Yourself = Ne te répète pas) ?

## Suggestions et ressources complémentaires

- Tu peux choisir d’utiliser la [classe Date](https://ruby-doc.org/stdlib-2.2.10/libdoc/date/rdoc/Date.html), que l’on charge dans notre fichier en utilisant la ligne `require "date"`
- Utilise la console interactive Ruby (IRB) pour tester ta solution.
- Comme tu peux le voir dans le code donné, Ruby utilise la méthode `puts` pour afficher des valeurs (te montrer des choses !) sur le terminal.

## Enseignements clés

Les questions qui suivent pourront sembler évidentes à la plupart d’entre vous, **mais assure-toi de pouvoir y répondre précisément**. Les variables et les méthodes sont les bases de la programmation en Ruby, et tu dois avoir une connaissance approfondie de ces concepts.

### À propos des variables

- Qu’est-ce qu’une variable ? Quelles sont les différentes variables utilisées dans ton programme ?
- Que signifie « définir une variable » ? Quelle est la syntaxe à utiliser pour définir une variable ?
- Peut-on utiliser une variable qui n’a pas été définie ?
- Peut-on assigner une nouvelle valeur à une variable qui a déjà été définie ? Comment ?
- Peux-tu décrire **précisément** et avec les bons mots ce que l’on fait dans les deux lignes de code ci-dessous ?

```ruby
some_number = 1
some_number = some_number * 2
```

- Quelle est la convention pour nommer les variables dans Ruby (tu peux demander la réponse à Google) ?

### À propos des méthodes

- Qu’est-ce qu’une méthode ? Quelles sont les méthodes utilisées dans ton programme ?
- Quelle est la différence entre définir une méthode et appeler une méthode ?
- Où définit-on les méthodes dans ce programme ? Et où les appelle-t-on ?
- Qu’est-ce que la valeur de retour d’une méthode ?
- Quelle convention simple de Ruby s’applique au return d’une méthode ?

### Bonus

- Comment demande-t-on une valeur dans le terminal ?
- Pourquoi utilise-t-on la méthode `chomp` ?
- Pourquoi utilise-t-on la méthode `to_i` ?
