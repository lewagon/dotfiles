Dans cet exercice, on va créer un programme de livraison d’aliments pour
un restaurant !

Voici les premières **actions utilisateur** de l’application :
- En tant qu’utilisateur·rice, je peux ajouter un nouveau repas
- En tant qu’utilisateur·rice, je peux faire une liste de tous les repas
- En tant qu’utilisateur·rice, je peux ajouter un·e nouveau/elle client·e
- En tant qu’utilisateur·rice, je peux faire une liste de tou·te·s les
client·e·s

**ATTENTION**

Le logiciel est conçu pour **un restaurant seulement**, alors inutile de
livrer (sans mauvais jeu de mots 😉) une application pour plusieurs
restaurants (par ex., tu n’as pas besoin de modèle `Restaurant`).

Le logiciel est conçu pour **le personnel du restaurant uniquement**,
alors inutile de concevoir une interface de connexion pour les
client·e·s.

Les premiers composants du logiciel sont donc les suivants :
- **Repas**
- **Client·e·s**

## 1 - Repas

### 1.1 - Modèle de repas

Le restaurant vend des repas ; tu dois donc trouver une façon de
représenter ce qu’est un repas.

Chaque repas a une id, un nom et un prix.

Écris du code pour implémenter cela et teste ton modèle. Puis teste ton
code en exécutant `rake meal`.

Tout est en vert ? Parfait ! Le moment est venu de faire `git add`,
`commit` et `push`.

### 1.2 - Repository des repas

Maintenant que tu as un modèle pour représenter les repas, tu as besoin
d’un repository pour les stocker.

Ce repository s’initialise avec un chemin de fichier CSV. Il lit/écrit
les repas depuis le fichier CSV et les stocke comme des objets dans un
array. Le comportement souhaité du repository est le suivant :
- créer un nouveau repas
- récupérer tous les repas
- trouver un repas spécifique grâce à son id

Écris du code pour implémenter cela et teste ton repository. Tu dois
créer ton propre fichier CSV `meals.csv` dans le dossier `data`. Teste
ensuite ton code en exécutant `rake meal`.

Tout est en vert ? Parfait ! Le moment est venu de faire `git add`,
`commit` et `push`.

### 1.3 - Routeur et application

Ton application n’est pas encore lancée. Pour cela, tu as besoin d’un
routeur et de remplir le fichier `app.rb`.

Le routeur est chargé d’afficher les tâches que l’utilisateur·rice peut
effectuer et de router le choix de l’utilisateur·rice vers l’action
correspondante du contrôleur correspondant. Le fichier `app.rb` est
chargé de réclamer tous les fichiers nécessaires, d’instancier un
routeur et d’exécuter sa méthode `run` pour lancer l’application.

Remplis les fichiers `router.rb` et `app.rb` pour implémenter cela. Si
tu es coincé·e, retourne à l’exercice [Cookbook Day
2](https://kitt.lewagon.com/camps/<user.batch_slug>/challenges?path=02-OOP%2F04-Cookbook-Day-Two%2F01-Cookbook-Advanced)
et télécharge la solution pour trouver l’inspiration. **Inutile
d’instancier le routeur avec un contrôleur** puisque tu n’en as pas
encore. Pour le moment, contente-toi d’imprimer `TODO` quand
l’utilisateur·rice sélectionne une tâche.

Il n’y a pas de rake pour cette partie. Lance ton application et exécute
cette commande dans le terminal :

```bash
ruby app.rb
```

Tout fonctionne correctement ? Parfait ! Le moment est venu de faire
`git add`, `commit` et `push`.

### 1.4 - Contrôleur des repas

On va passer au contrôleur. Voici les **actions utilisateur** qu’on veut
implémenter :
- ajouter (`add`) un nouveau repas
- faire une liste (`list`) de tous les repas

Souviens-toi que le rôle du contrôleur est de déléguer et de coordonner
le travail des autres composants de l’app (modèle, repository et vue) !

Commence par écrire le **pseudocode**, en distinguant les étapes
élémentaires de chaque action utilisateur et en déléguant chaque étape à
un composant (modèle, repository ou vue). Puis écris le code pour
implémenter chaque étape. Crée la vue et code-la étape par étape.

Pour tester ton contrôleur, connecte-le à ton app en l’instanciant dans
`app.rb` et en le passant au routeur. Tu peux ensuite tester ton code en
lançant ton app :

```bash
ruby app.rb
```

`rake meal` devrait t’être utile pendant ces étapes. Suis ton guide !

Vérifie que les deux actions utilisateur sur les repas fonctionnent
avant de passer à la fonction suivante.

Tout est en vert ? Parfait ! Le moment est venu de `git add`, `commit`
et `push`.

## 2 - Clients

### 2.1 - Modèle de client

Le restaurant vend à des clients ; tu dois donc trouver une façon de
représenter ce qu’est un client.

Chaque client a un id, un nom et une adresse.

Écris du code pour implémenter cela et teste ton modèle. Puis teste ton
code en exécutant `rake customer`.

Tout est en vert ? Parfait ! Le moment est venu de `git add`, `commit`
et `push`.

### 2.2 - Repository des client·e·s

Maintenant que tu as un modèle pour représenter les client·e·s, tu as
besoin d’un repository pour les stocker.

Ce repository s’initialise avec un chemin de fichier CSV. Il lit/écrit
les clients depuis le fichier CSV et les stocke comme des objets dans un
array. Le comportement souhaité du repository est le suivant :
- créer un·e nouveau·elle client·e
- récupérer tou·te·s les client·e·s
- trouver un·e client·e spécifique grâce à son id

Écris du code pour implémenter cela et teste ton repository. Tu dois
créer ton propre fichier CSV `customers.csv` dans le dossier `data`.
Teste ensuite ton code en exécutant `rake customer`.

Tout est en vert ? Parfait ! Le moment est venu de `git add`, `commit`
et `push`.

### 2.3 - Contrôleur des client·e·s

On va passer au contrôleur. Voici les **actions utilisateur** qu’on veut
implémenter :
- ajouter (`add`) un nouveau client
- faire une liste (`list`) de tou·te·s les client·e·s

Souviens-toi que le rôle du contrôleur est de déléguer le travail aux
autres composants de l’app (modèle, repository et vue) !

Commence par écrire le **pseudocode**, en distinguant les étapes
élémentaires de chaque action utilisateur et en déléguant chaque étape à
un composant (modèle, repository ou vue). Puis écris le code pour
implémenter chaque étape. Crée la vue et code-la étape par étape.

Pour tester ton contrôleur, connecte-le à ton app en l’instanciant dans
`app.rb` et en le passant au routeur. Tu peux ensuite tester ton code en
lançant ton app :

```bash
ruby app.rb
```

`rake customer` devrait t’être utile pendant ces étapes. Suis ton
guide !

Vérifie que les deux actions utilisateur sur les client·e·s fonctionnent
avant de passer à la fonction suivante.

Tout est en vert ? Parfait ! Le moment est venu de `git add`, `commit`
et `push`.

## 3 - Facultatif

### 3.1 - Implémenter les actions `edit` et `destroy` pour les repas et les client·e·s

Dans l’application, un·e utilisateur·rice ne peut pas modifier ou
supprimer de repas ou de client·e existant·e.

Implémente ces actions utilisateurs complémentaires :
- En tant qu’utilisateur·rice, je peux modifier un repas existant
- En tant qu’utilisateur·rice, je peux supprimer un repas existant
- En tant qu’utilisateur·rice, je peux modifier un·e client·e existant·e
- En tant qu’utilisateur·rice, je peux supprimer un·e client·e existant·e

C’est bon ? Le moment est venu de `git add`, `commit` et `push`.

### 3.2 - Refactoriser des repositories grâce à l’héritage

`MealRepository` ont `CustomerRepository` ont beaucoup de similitudes,
non ? Pour que ton code reste
[DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas), tu
as besoin de définir une classe parente, `BaseRepository`, qui stockera
tous les comportements partagés et dont `MealRepository` et
`CustomerRepository` hériteront.

Écris du code pour implémenter cela. Il s’agit d’une refactorisation, il
n’y a donc rien de nouveau à tester. Si ton `rake` était vert, il doit
le rester !

C’est bon ? Le moment est venu de `git add`, `commit` et `push`.

C’est tout pour aujourd’hui !
