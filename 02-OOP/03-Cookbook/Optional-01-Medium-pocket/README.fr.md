## Contexte et objectifs

Félicitations ! Tu as terminé le challenge Cookbook !!!

Tu vas pouvoir recommencer et coder une application MVC de A à Z, en partant de zéro. Cette fois-ci tu vas coder une application pour sauvegarder des articles [DEV](https://dev.to) et pouvoir les lire plus tard.

- En tant qu'utilisateur, je peux lister les articles que j'ai sauvegardés
- En tant qu'utilisateur, je peux ajouter un article que je souhaite lire plus tard
- En tant qu'utilisateur, je peux lire un article que j'ai sauvegardé
- En tant qu'utilisateur, je peux marquer un article comme lu

Une démo vaut mieux qu'un long discours, voici donc l'application que nous voulons coder :

#### Liste des articles

```bash
---------------------------------
Welcome to your DEV Pocket Reader
---------------------------------

----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 1

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
```

#### Enregistrer l'article pour plus tard

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 2

Path?
> molly_struve/level-up-your-ruby-skillz-working-with-hashes-4bid

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### Lire un article

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 3

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

[...] # ceci devrait afficher le contenu entier de l'article avec des sauts de ligne entre les paragraphes !
```

#### Marquer le message comme lu

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 4

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [x] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### Quitter l'application

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 5

Bye bye!
```

Comme tu peux le voir, l'utilisateur ne rentre que le `chemin`, le `path` de l'article DEV. Le `path` est le texte qui vient après le nom de domaine dans une url.

Par exemple, pour sauvegarder [cet article] (https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc), le chemin que nos utilisateurs doivent saisir est tout ce qui se trouve après `https://dev.to/`, c'est-à-dire `unseenwizzard/learn-git-concepts-not-commands-4gjc`.

Alors comment allons-nous récupérer l'auteur, le titre et le contenu de l'article ?

Absolument, nous allons les scraper !

**Question : où allons-nous coder la partie "scraping" ?

Tu trouveras la réponse à la fin de ce readme.

## Specs

Cette fois tu vas coder l'application sans aucune aide, `rake` ne vous donnera que des offenses de style 👌

N'hésite pas à essayer de faire du TDD sur ce challenge, avec l'aide des corrections des livecodes précédents.

### Modèle

Comme tu le sais maintenant, tu dois toujours commencer par le modèle. Le modèle est la classe Ruby dont nous avons besoin pour manipuler les données dans notre programme.

Ici, nous voulons jouer avec des **posts** de DEV, alors tu peux créer une classe `Post`. Avant de la coder, prends le temps de te poser les questions suivantes :

Son état :

- Qu'avons-nous besoin de stocker dans un `post` **pour pouvoir servir les histoires des utilisateurs** ?

La réponse te donnera les variables d'instance dont tu auras besoin.

Son comportement :

- Quelles transformations devrons-nous effectuer sur un message ?
- Quels éléments d'état devrons-nous exposer à la lecture ? à l'écriture ?

Les réponses te donneront les méthodes publiques de l'instance.

N'insiste pas trop si tu ne trouves pas toutes les variables d'instance et les méthodes, tu les trouveras plus tard quand le besoin émergera lors du codage du repo et du contrôleur. Quand tu penses avoir terminé, teste ta classe dans `irb`, corrige les bugs, et passe à la classe suivante.

### Repository

Comme dans le livre de cuisine, nous avons besoin d'un dépôt pour **stocker** nos messages en mémoire et sur nos disques durs. Cette classe doit être codée juste après le modèle, les deux classes faisant partie de la même brique **données**.

Implémente une classe `Repository` qui agira comme une fausse base de données. Elle doit être connectée à un fichier `posts.csv` pour rendre notre application persistante.

**NB:** si tu rencontres une erreur `csv invalid byte sequence in us-ascii` lors de l'analyse du csv, cela peut être résolu avec une option passée à l'appel `CSV.foreach` :

```ruby
CSV.foreach("posts.csv", encoding : 'ISO-8859-1') do |row|
  # [...]
```

### Contrôleur

Le contrôleur va nous aider à implémenter les user stories. Jetons-y un coup d'œil :

- En tant qu'utilisateur, je peux lister les articles que j'ai sauvegardés
- En tant qu'utilisateur, je peux ajouter un article que je souhaite lire plus tard
- En tant qu'utilisateur, je peux lire un article que j'ai sauvegardé
- En tant qu'utilisateur, je peux marquer un article comme lu

Rappelle-toi que le contrôleur a un rôle de pivot dans le modèle MVC. Avoir accès au repo et à la vue à partir de chaque action est une nécessité (cela devrait t'aider à définir les variables d'instance).

Pour chaque histoire d'utilisateur, tu dois coder une action (une méthode d'instance) dans le contrôleur.

Voici le processus à suivre pour chaque action :

- Écrive en pseudo-code pour décomposer le problème en petites étapes que tu pourras facilement traduire en Ruby
- Rappele-toi que chaque instruction ayant à voir avec les données sera déléguée au repo, et que chaque `puts` et `gets` seront gérés par la vue (encore une fois, pense SRP - Single Responsibility Principle).
- Coder tes actions te fera coder ta classe `View` et ses méthodes d'instance naturellement, quand le besoin s'en fera sentir.
- A chaque fois qu'un besoin émerge (nous avons besoin d'une nouvelle méthode dans le repo ou dans le modèle), suis le flux et code-la immédiatement
- Teste régulièrement ton code (toutes les 2 ou 3 lignes de code)

Pour tester tes actions, tu peux suivre ces instructions :

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
repo = Repository.new(File.join(__dir__, 'posts.csv'))
controller = Controller.new(repo)

controller.action_name # remplacer par le nom réel de l'action que vous voulez tester
```

Puis teste avec :

``bash
ruby lib/test.rb
```

**Astuce** : si tu rencontres un `403 Forbidden Bots (OpenURI::HTTPError)` lors du scraping, il y a un moyen facile de le contourner en spécifiant un `User-Agent` dans les **en-têtes** de votre requête HTTP. Voici un exemple utilisant `open-uri` :

``ruby
USER_AGENT = "Mozilla/5.0 (Windows NT x.y ; rv:10.0) Gecko/20100101 Firefox/10.0"
html_content = URI.open(url, "User-Agent" => USER_AGENT).read
```

### Routeur

Dans le Cookbook, nous t'avons donné le routeur. Cette fois-ci, essaye de le coder toi-même ! Rappelle-toi qu'à la fin de la journée, nous voulons appeler `router.run` dans `app.rb` et cela devrait lancer notre application !

### Lier le tout

Cette fois nous ne t'avons pas donné le `app.rb`. N'aies pas peur, prends le problème depuis la fin. Nous savons que le but du fichier `app.rb` est d'appeler `router.run`.
Cela signifie que tu dois instancier un `router` qui est une instance de notre classe `Router`. OK, donc c'est un `Router.new(controller)`. Cela signifie que nous avons besoin d'un `contrôleur`... En suivant ce cheminement de pensée, tu arriveras au code complet.

Quand tu seras prêt(e), tu pourras exécuter ton programme avec :

```bash
ruby lib/app.rb
```

### Au fait...

Alors, où devrais-tu coder la partie "scraping" du programme ? Eh bien, reformulons notre question. Notre programme devrait être capable d'instancier un `Post` avec seulement un `path`.

Mais quand nous instançons le `post`, nous voulons qu'il soit automatiquement rempli avec son titre, son contenu et son auteur. Un bon endroit pour coder cela pourrait être la méthode `initialize` du `Post`. Mais ce n'est pas là que nous allons le coder.

Imaginons que nous ajoutions un modèle `Author` dans l'image, et que nous voulions récupérer des informations sur l'auteur du post lors du scraping du post. La méthode `Post#initialize` ne serait plus un bon choix... La laisser dans le **contrôleur** (où nous avons accès aux modèles et aux dépôts) serait une nécessité, donc codons là et préparons nous pour une version étendue de ce défi !

Lors de la prochaine session, nous verrons comment nous pouvons ajouter une classe `Service` au pattern MVC si nous voulons extraire ce genre de fonctionnalités spécifiques du pattern.
