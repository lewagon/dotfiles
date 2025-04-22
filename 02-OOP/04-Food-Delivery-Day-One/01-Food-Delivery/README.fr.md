Dans cet exercice, on va créer un programme de livraison d’aliments pour un restaurant !

Voici les premières **actions utilisateur** de l’application :
- En tant qu’utilisateur, je peux ajouter un nouveau repas
- En tant qu’utilisateur, je peux lister tous les repas
- En tant qu’utilisateur, je peux ajouter un nouveau client
- En tant qu’utilisateur, je peux lister tous les clients

**ATTENTION**

Le logiciel est conçu pour **un restaurant seulement**, alors inutile de livrer (sans mauvais jeu de mots 😉) une application pour plusieurs restaurants (par ex., tu n’as pas besoin de modèle `Restaurant`).

Le logiciel est conçu pour **le personnel du restaurant uniquement**, alors inutile de concevoir une interface de connexion pour les clients.

Les premiers composants du logiciel sont donc les suivants :
- **Repas** (meals)
- **Clients** (customers)

## 1 - Repas (meals)

### 1.1 - Modèle de repas (meal)

Le restaurant vend des repas ; tu dois donc trouver une façon de représenter ce qu’est un repas (meal).

Chaque repas `meal` a un identifiant `id`, un nom `name` et un prix `price`.

Écris le code pour implémenter cela et teste ton modèle. Puis teste ton code en exécutant `rake meal`.

Tout est vert ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

### 1.2 - Dépôt de repas (meal repository)

Maintenant que tu as un modèle pour représenter les repas, tu as besoin d’un dépôt (repository) pour les stocker.

Ce repository s’initialise avec un chemin de fichier CSV. Il lit et écrit les repas depuis le fichier CSV et les stocke comme des objets dans un array. Le comportement que l'on souhaite pour le repository est le suivant :
- créer un nouveau `meal` (`create`)
- récupérer tous les `meal` (`all`)
- trouver un `meal` spécifique grâce à son `id` (`find`)

Écris le code pour implémenter cela et teste ton repository. Tu dois créer ton propre fichier CSV `meals.csv` dans le dossier `data`. Teste ensuite ton code en exécutant `rake meal`.

Tout est vert ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

### 1.3 - Routeur et application (router and app)

Tu n'as pas encore lancé ton application. Pour cela, tu as besoin d’un routeur et de remplir le fichier `app.rb`.

Le routeur est chargé d’afficher les tâches que l’utilisateur peut effectuer et de router le choix de l’utilisateur vers la bonne action du bon contrôleur. Le fichier `app.rb` est en charge de `require` tous les fichiers nécessaires, d’instancier un routeur et d’exécuter sa méthode `run` pour lancer l’application.

Remplis les fichiers `router.rb` et `app.rb` pour implémenter cela. Si tu es coincé, retourne à l’exercice [Cookbook](https://kitt.lewagon.com/camps/<user.batch_slug>/challenges?path=02-OOP%2F03-Cookbook%2F02-Cookbook) et télécharge la solution pour trouver de l’inspiration. **Inutile d’instancier le routeur avec un contrôleur** puisque tu n’en as pas encore. Pour le moment, contente-toi d’imprimer `TODO` quand l’utilisateur sélectionne une tâche.

Il n’y a pas de rake pour cette partie. Lance ton application en exécutant cette commande dans le terminal :

```bash
ruby app.rb
```

Tout fonctionne correctement ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

### 1.4 - Contrôleur des repas (meals controller)

On va passer au contrôleur. Voici les **actions utilisateur** que l'on veut implémenter :
- ajouter un nouveau `meal` (`add`)
- lister tous les `meal` (`list`)

Souviens-toi que le rôle du contrôleur est de déléguer et de coordonner le travail des autres composants de l’app (modèle, repository et vue) !

Commence par écrire le **pseudo-code**, en distinguant les étapes élémentaires de chaque action utilisateur et en déléguant chaque étape à un composant (modèle, repository ou vue). Puis écris le code pour implémenter chaque étape. Crée la vue et code-la étape par étape.

Pour tester ton contrôleur, connecte-le à ton app en l’instanciant dans `app.rb` et en le passant au routeur. Tu peux ensuite tester ton code en lançant ton app :

```bash
ruby app.rb
```

`rake meal` devrait t’être utile pendant ces étapes. Suis ton guide !

Vérifie que les deux actions utilisateur sur les repas fonctionnent avant de passer à la fonction suivante.

📝 **Note:** Dans cet exercice (contrairement aux modèles et aux contrôleurs), il n'y a pas de `rake` spécifique pour les vues. Cela est dû au fait qu'il existe de nombreuses façons différentes d'afficher les informations pertinentes et qu'il n'y a pas de seule manière "correcte". N'hésitez donc pas à penser de manière artistique 🧑‍🎨 à ce que vos vues devraient montrer. Mais assurez-vous qu'elles fonctionnent correctement en exécutant `ruby app.rb` et en vérifiant si l'application fonctionne bien et est facile à utiliser.

Tout est vert ? Parfait ! Le moment est venu de `git add`, `commit` et `push`.

## 2 - Clients (customers)

### 2.1 - Modèle de client (customer model)

Le restaurant vend à des clients ; tu dois donc trouver une façon de représenter ce qu’est un client (customer).

Chaque client `customer` a un identifiant `id`, un nom `name` et une adresse `address`.

Écris le code pour implémenter cela et teste ton modèle. Puis teste ton code en exécutant `rake customer`.

Tout est vert ? Parfait ! Le moment est venu de `git add`, `commit` et `push`.

### 2.2 - Dépôt de client (client repository)

Maintenant que tu as un modèle pour représenter les clients, tu as besoin d’un dépôt (repository) pour les stocker.

Ce repository s’initialise avec un chemin de fichier CSV. Il lit et écrit les clients depuis le fichier CSV et les stocke comme des objets dans un array. Le comportement souhaité du repository est le suivant :
- créer un nouveau `customer` (`create`)
- récupérer tous les `customer` (`all`)
- trouver un `customer` spécifique grâce à son `id` (`find`)

Écris le code pour implémenter cela et teste ton repository. Tu dois créer ton propre fichier CSV `customers.csv` dans le dossier `data`. Teste ensuite ton code en exécutant `rake customer`.

Tout est vert ? Parfait ! Le moment est venu de `git add`, `commit` et `push`.

### 2.3 - Contrôleur des clients (clients controller)

On va passer au contrôleur. Voici les **actions utilisateur** que l’on veut implémenter :
- ajouter un nouveau `customer` (`add`)
- lister tous les `customer` (`list`)

Souviens-toi que le rôle du contrôleur est de déléguer le travail aux autres composants de l’app (modèle, repository et vue) !

Commence par écrire le **pseudo-code**, en distinguant les étapes élémentaires de chaque action utilisateur et en déléguant chaque étape à un composant (modèle, repository ou vue). Puis écris le code pour implémenter chaque étape. Crée la vue et code-la étape par étape.

Pour tester ton contrôleur, connecte-le à ton app en l’instanciant dans `app.rb` et en le passant au routeur. Tu peux ensuite tester ton code en lançant ton app :

```bash
ruby app.rb
```

`rake customer` devrait t’être utile pendant ces étapes. Suis ton guide !

Vérifie que les deux actions utilisateur sur les clients fonctionnent avant de passer à la fonction suivante.

Tout est vert ? Parfait ! Le moment est venu de `git add`, `commit` et `push`.

## 3 - (Optionnels)

### 3.1 - Implémenter les actions `edit` et `destroy` pour les repas et les clients

Dans l’application, un utilisateur ne peut pas modifier ou supprimer de repas ou de client existant.

Implémente ces actions utilisateurs complémentaires :
- En tant qu’utilisateur, je peux modifier un repas existant
- En tant qu’utilisateur, je peux supprimer un repas existant
- En tant qu’utilisateur, je peux modifier un client existant
- En tant qu’utilisateur, je peux supprimer un client existant

C’est bon ? Le moment est venu de `git add`, `commit` et `push`.

### 3.2 - Refactoriser des repositories grâce à l’héritage

`MealRepository` et `CustomerRepository` ont beaucoup de similitudes, non ? Pour que ton code reste [DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas), tu as besoin de définir une classe parente, `BaseRepository`, qui stockera tous les comportements partagés et dont `MealRepository` et `CustomerRepository` hériteront.

Écris le code pour implémenter cela. Il s’agit d’une refactorisation, il n’y a donc rien de nouveau à tester. Si ton `rake` était vert, il doit le rester !

C’est bon ? Le moment est venu de `git add`, `commit` et `push`.
