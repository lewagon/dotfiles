## Contexte et objectifs

Notre objectif dans cet exercice est d'améliorer notre livre de recettes existant codé lors de l'exercice précédent en sauvegardant nos recettes dans un fichier CSV. De cette façon, lorsque nous quittons et redémarrons notre application dans le Terminal, nos recettes seront toujours sauvegardées sur notre ordinateur.

Si vous souhaitez vous souvenir de la syntaxe pour analyser et stocker des données dans un fichier CSV, consultez [les diapositives du cours sur l'analyse](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data#/2/3)

N'oubliez pas qu'un fichier CSV est essentiellement un tableur Excel avec un format très simple dans lequel les lignes sont séparées par des sauts de ligne `↵` et les colonnes sont séparées par des virgules `,`. Voici un exemple du fichier CSV utilisé pour les tests `rake` de cet exercice :

```csv
Crumpets,Description des crumpets
Petit-déjeuner haricots et bacon,Description des haricots
Pudding aux prunes,Description du pudding
Tarte aux pommes,Description de la tarte aux pommes
Crumble de Noël,Description du crumble
```

Dans quel fichier doit-on effectuer la sauvegarde/chargement ? 🤔 Notre fichier CSV doit stocker un tableur qui répertorie _toutes_ les recettes de notre application. Et il se trouve qu'il existe un fichier dont la responsabilité est de gérer le stockage de toutes nos instances de `Recipe`. Oui, c'est le `Cookbook`, notre **référentiel**. Donc, le seul fichier que nous allons modifier dans cet exercice est `lib/cookbook.rb`.

## Configuration

Tout d'abord, copions-collons le code de votre livre de recettes dans le dossier `lib` de cet exercice :

```bash
# assurez-vous d'être dans le bon répertoire
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/03-Cookbook/03-Cookbook-With-CSV

# copiez votre code depuis l'exercice Cookbook Challenge 2
cp -r ../02-Cookbook/lib .
```

Avant de commencer, exécutez le code que vous venez d'importer pour vous assurer que les actions utilisateurs implémentées (liste/ajout/suppression) fonctionnent toujours !

```bash
ruby lib/app.rb
```

## Spécifications

### Analyse

Lorsqu'un programme Ruby se termine, nous perdons toutes les données que nous avons stockées dans les variables. Si nous voulons récupérer les données la prochaine fois que nous exécutons le programme, nous devons les persister sur le disque dur. Nous utiliserons un fichier CSV pour cela ! Le fichier CSV est vide à ce stade de l'exercice, vous ajouterez vos propres recettes plus tard via l'application.

Commencez par charger le CSV. Quand devons-nous charger les données qui y sont stockées ? Lorsque vous démarrez l'application 🚀 Et avons-nous déjà un endroit dans notre `Cookbook` qui s'exécute  au démarrage de l'application ? C'est exact, la méthode `#initialize`.

Actuellement, notre méthode `#initialize` ne prend aucun argument. Mettons à jour cette méthode pour qu'elle prenne un argument, une chaîne de texte (`String`) qui indique le chemin d'accès au fichier CSV à ouvrir. Elle devrait donc ressembler à `initialize(csv_file_path)`. Cela signifie que pour initialiser une nouvelle instance de `Cookbook`, vous devrez passer un chemin d'accès valide au fichier, par exemple : `my_cookbook = Cookbook.new('lib/recipes.csv')`.

***

**Important** : Étant donné que nous avons modifié le nombre d'arguments que prend `#initialize`, cela aura un impact sur notre fichier `app.rb`. Actuellement, ce fichier devrait comporter une ligne comme celle-ci :

```rb
cookbook   = Cookbook.new
```

Changez cette ligne (vous pouvez la copier et la coller) par :

```rb
csv_file   = File.join(__dir__, 'recipes.csv')
cookbook   = Cookbook.new(csv_file)
```

Maintenant, l'instance `Cookbook` recevra le chemin d'accès au fichier `lib/recipes.csv` en tant qu'argument 📊

***

Ensuite, mettons à jour la méthode `#initialize` pour charger les recettes à partir du fichier CSV. Par exemple, si le fichier CSV contient 5 lignes, le tableau `@recipes` doit contenir 5 instances de `Recipe`.

Ensuite, réorganisons le code. Comme il peut occuper plusieurs lignes, il serait préférable de l'écrire dans une méthode privée `#load_csv` que nous pourrons ensuite appeler dans la méthode `#initialize`.

### Stockage

Quand devons-nous enregistrer les modifications dans notre fichier CSV ? Lorsque les recettes du `Cookbook` changent 🌈 Cela signifie soit :

1. lorsqu'une nouvelle recette est ajoutée ;
2. lorsqu'une recette est supprimée.

Écrivons donc une nouvelle méthode privée `#save_csv` qui enregistre toutes les instances de `Recipe` dans le tableau `@recipes` dans notre fichier CSV. Donc, s'il y a 6 instances de `Recipe` dans le tableau `@recipes`, le fichier CSV devrait contenir 6 lignes lorsqu'il est mis à jour.

_Remarque : lorsque vous enregistrez le fichier CSV, vous écrasez entièrement le fichier. Donc, même si une recette était déjà stockée préalablement dans le fichier CSV, elle devra être stockée à nouveau chaque fois que le fichier est écrasé._

Ensuite, vous voudrez examiner le `Cookbook` pour trouver tous les endroits où une recette est ajoutée ou supprimée, puis vous voudrez appeler la méthode `#save_csv` à ces endroits.

#### Résumé

Mettez à jour la méthode existante du `Cookbook` :
-  `initialize(csv_file_path)`, qui charge les `Recipe` existantes à partir du CSV.

Pour charger et stocker les données dans le CSV, nous allons implémenter 2 méthodes **privées** :
-  `load_csv`, qui charge les données existantes du fichier CSV dans notre application. Nous l'appellerons dans la méthode `#initialize`.
-  `save_csv`, qui ajoute les nouvelles recettes comme **nouvelles lignes** dans notre fichier CSV. Nous l'appellerons chaque fois que nous ajoutons ou supprimons une recette du `Cookbook`.

## Test

Pour vérifier si cela fonctionne, exécutez :

```bash
ruby lib/app.rb
```

Ensuite, essayez d'ajouter une nouvelle recette au livre de recettes, puis quittez l'application. Ensuite, exécutez `ruby lib/app.rb` à nouveau. Cette recette devrait réapparaître (parce qu'elle a été stockée lorsque vous l'avez ajoutée et analysée lorsque vous avez rouvert l'application) 💾

