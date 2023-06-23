N’oublie pas d’exécuter les commandes ci-dessus 👆

**IMPORTANT** 👇

Copie le code du bloc précédent :

```bash
cp -r ../../04-Food-Delivery-Day-One/01-Food-Delivery/{app,data,app.rb,router.rb} . # le point à la fin est important
```

Avant de commencer, vérifie que tout fonctionne encore en lançant ton app :

```bash
ruby app.rb
```

Puis exécute :

```bash
rake
```

Maintenant, reprends ton code et continue d’ajouter des fonctionnalités au routeur / en veillant à ce que `rake` reste en vert.

Continue d’ajouter des fonctionnalités à ton programme Food Delivery !

Voici toutes les **actions utilisateur** de l’application :
[ ] En tant qu’employé, je peux me connecter
[X] En tant que gérant, je peux ajouter un nouveau repas
[X] En tant que gérant, je peux lister tous les repas
[X] En tant que gérant, je peux ajouter un nouveau client
[X] En tant que gérant, je peux lister tous les clients
[ ] En tant que gérant, je peux ajouter une nouvelle commande
[ ] En tant que gérant, je peux lister toutes les commandes non livrées
[ ] En tant que livreur, je peux marquer l’une de mes commandes comme livrée
[ ] En tant que livreur, je peux lister de toutes mes commandes non livrées

Il y a donc deux nouveaux composants :
- **Employés**
- **Commandes**

## 1 - Employés (employees)

### 1.1 - Modèle d'employé (employee)

Le restaurant a deux types d’employés, les **gérants** et les **livreurs**. Les deux ont un identifiant `id`, un nom d’utilisateur `username` et un mot de passe `password`, mais ils ont des privilèges différents en fonction de leur rôle `role`.

Écris le code pour implémenter cela et teste ton modèle. Teste ensuite ton code en exécutant `rake employee`.

Tout est vert ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

### 1.2 - Dépôt d'employé (employee repository)

Maintenant que tu as un modèle pour représenter les employés, tu as besoin d’un dépôt (repository) pour les stocker.

Ce repository s’initialise avec un chemin de fichier CSV. Il fonctionne en **lecture seule**, car seul l’administrateur de l’app peut créer des comptes (inutile de créer une méthode `add`). L’interface de ce repository permet de :
- récupérer tous les `rider` du repository (`all_riders`)
- trouver un `employee` spécifique grâce à son id (`find`)
- trouver un `employee` spécifique grâce à son `username` (`find_by_username`).

Écris le code pour implémenter cela et teste ton repository dans `irb`.Tu dois créer ton propre fichier CSV `employees.csv` dans le dossier `data`. Teste ensuite ton code en exécutant `rake employee`.

Tout est en vert ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

### 1.3 - Contrôleur de session (sessions controller)

On va maintenant implémenter une logique de **connexion** dans notre application.

On veut qu’il y ait deux menus dans le routeur : un contenant les tâches des gérants, l’autre contenant les tâches des livreurs. On veut aussi router le choix de l’employé vers la bonne action du bon contrôleur.

Pour cela, on va introduire la notion de **session**. Au niveau du routeur, on va stocker l’utilisateur connecté à une session.

La séquence de connexion doit ressembler à ceci :

```bash
> username?
paul
> password?
blablabla
Wrong credentials... Try again!
> username?
paul
> password?
secret
Welcome Paul!
```

Une fois la connexion établie, le tableau de bord qui s’affiche doit **dépendre du rôle**.

Écris le code pour implémenter ce comportement.

Il n’y a pas de rake pour cette partie. Lance ton application en exécutant cette commande dans le terminal :

```bash
ruby app.rb
```

Tout fonctionne correctement ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

## 2 - Commande (orders)

### 2.1 - Modèle de commande (order model)

Le restaurant prend des commandes ; tu dois donc trouver une façon de représenter ce qu’est une commande.

Une commande est ce qui lie tout ensemble. Chaque commande a un identifiant `id`, un repas `meal`, un client `customer`, un employé `employee` et un booléen `delivered` pour indiquer si la commande a été livrée ou non.

Écris le code pour implémenter cela et teste ton modèle. Teste ensuite ton code en exécutant `rake order`.

Tout est vert ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

### 2.2 - Dépôt de commande (order repository)

Maintenant que tu as un modèle pour représenter les commandes, tu as besoin d’un dépôt (repository) pour les stocker.

Ce repository s’initialise avec un chemin de fichier CSV. Il lit et écrit les commandes depuis le fichier CSV et les garde en mémoire. L’interface de ce repository permet de :
- créer une nouvelle commande (`create`)
- récupérer toutes les commandes non livrées (`undelivered_orders`)

Puisqu’une commande a des **instances** `meal`, `customer` et `employee`, on doit également initialiser notre repository de commandes avec un `meal_repository`, un `customer_repository` et un `employee_repository`.

Écris le code pour implémenter cela et teste ton repository. Tu dois créer ton propre fichier CSV `orders.csv` dans le dossier `data`. Teste ensuite ton code en exécutant `rake order`.

**Important** : Les tests `rake` sur `order_repository` **fonctionnent uniquement si tu définis les paramètres dans `#initialize` dans le même ordre que dans les tests** :

```ruby
class OrderRepository
 def initialize(orders_csv_path, meal_repository, customer_repository, employee_repository)
    # [...]
 end

  # [...]
end
```

Fais également attention à ce que ton fichier CSV `orders.csv` stocke bien les informations avec ces noms de colonnes si tu veux passer les tests `rake`:
`id, delivered, meal_id, customer_id, employee_id`

Tout est vert ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

### 2.3 - Contrôleur des commandes (orders controller)

On va passer au contrôleur. Voici les **actions utilisateur** que l'on veut implémenter :
- En tant que gérant, je peux ajouter une nouvelle commande (`add`)
- En tant que gérant, je peux lister toutes les commandes non livrées (`list_undelivered_orders`)
- En tant que livreur, je peux lister toutes mes commandes non livrées (`list_my_orders`)
- En tant que livreur, je peux marquer l’une de mes commandes non encore livrée comme livrée (`mark_as_delivered`)

Souviens-toi que le rôle du contrôleur est de déléguer le travail aux autres composants de l’app (modèles, repositories et vues) !

Commence par écrire le **pseudo-code**, en distinguant les étapes élémentaires de chaque action utilisateur et en déléguant chaque étape à un composant (modèle, repository ou vue). Puis écris le code pour implémenter chaque étape. Crée et code-la étape par étape.

Pour tester ton contrôleur, connecte-le à ton app en l’instanciant dans `app.rb` et en le passant au routeur. Tu peux ensuite tester ton code en lançant ton app :

```bash
ruby app.rb
```

`rake order` devrait également t'être utile pendant ces étapes. Suis ton guide !

Vérifie que ces quatre actions utilisateur fonctionnent avant de passer à la fonctionnalité suivante.

**Important** : Les tests `rake` sur `orders_controller` **fonctionnent uniquement si tu définis les paramètres dans `#initialize` dans le même ordre que dans les tests** :

```ruby
class OrdersController
 def initialize(meal_repository, customer_repository, employee_repository, order_repository)
    # [...]
 end

  # [...]
end
```

**Attention** ⚠️ Dans la mesure où les **id** ne commencent pas forcément à 1 et ne se suivent pas nécessairement, c'est une **mauvaise pratique de demander un id à un utilisateur**.

Imagie que nous ayons 3 meal, avec les ids `1234`, `4242` et `987654`. Nous **ne voulons pas** afficher :

```bash
1234 - pizza
4242 - burger
987654 - salad

Please choose an id:
>
```

On veut plutôt utiliser des **indices** pour améliorer l'expérience de l'utilisateur :

```bash
1 - pizza
2 - burger
3 - salad

Please choose an index:
>
```

Tout est vert ? Parfait ! Le moment est venu de faire `git add`, `commit` et `push`.

## 3 - (Optionnels)

### 3.1 - Implémenter les actions `edit` et `destroy` pour les commandes

Dans l’application, un gérant ne peut pas modifier ou supprimer une commande existante.

Implémente ces actions utilisateur complémentaires :
- En tant que gérant, je peux modifier une commande existante
- En tant que gérant, je peux supprimer une commande existante

C’est bon ? Le moment est venu de faire `git add`, `commit` et `push`.

### 3.2 - Masquer le mot de passe de l’utilisateur

Pour le moment, le mot de passe de l’utilisateur est stocké directement dans le CSV et visible de tous. Est-ce une bonne idée ? Que pourrait-on faire à la place ?

C’est bon ? Le moment est venu de faire `git add`, `commit` et `push`.

Tu as terminé l’exercice !
