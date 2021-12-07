## Contexte et objectifs

Un **getter** est une méthode qui **demande** des informations à une variable d’instance. Un **setter** est une méthode qui **modifie** des informations sur une variable d’instance.

Dans cet exercice, on va implémenter un distributeur simple (classe Ruby `VendingMachine`) sur lequel un utilisateur peut acheter des snacks à un prix donné. L’utilisateur peut se rendre au distributeur, insérer de la monnaie, puis appuyer sur un bouton "Buy" (Acheter).

## Spécifications

**N’exécute pas tout de suite `rake`**. L’objectif de l’exercice est de te faire **lire** du code Ruby et d'essayer d’identifier ce qu’il manque dans la classe `VendingMachine`.

### Scénario d’achat

Ouvre le fichier `lib/buying_scenario.rb` et lis-le, ligne par ligne. Tu peux utiliser la méthode du [Rubber Duck Debugging](https://rubberduckdebugging.com/), qui consiste à expliquer ligne par ligne ce que le code fait à un canard en plastique imaginaire. Une fois que c’est fait, exécute le code :

```bash
ruby lib/buying_scenario.rb
```

Le code **échouera** et renverra un message d’erreur. C’est maintenant que l’exercice commence ! Tu dois déterminer le code à ajouter dans le fichier `lib/vending_machine.rb` pour que ce scénario fonctionne !

### Scénario de réapprovisionnement

Ce scénario est plus simple. Au départ, le distributeur est vide. Un technicien doit venir le réapprovisionner en snacks !

```bash
ruby lib/refilling_scenario.rb
```

Ici encore, le code ne fonctionnera pas. C’est à toi de déterminer ce qu’il faut ajouter au fichier `lib/vending_machine.rb` !

### Tu peux enfin exécuter `rake`

Lorsque tu es satisfait de la façon dont les deux scénarios fonctionnent, vérifie que ton code est correct avec :

```bash
rake
```

Tu auras peut-être besoin de retravailler un peu ta classe `VendingMachine` 😉

## (Perfectionnement) Quelques questions ouvertes 🤔

1.  Tu as peut-être remarqué la présence de la méthode `display` dans les deux fichiers de scénario. Comment pourrait-on refactoriser ce code de façon à ce qu’il soit plus « orienté objet » ? Et comment pourrait-on modifier nos getters afin d’exposer **moins** d’informations au monde extérieur ? Le concept à retenir ici est l’[**encapsulation**](https://fr.wikipedia.org/wiki/Encapsulation_(programmation)).
2.  Tu as utilisé un setter pour mettre à jour le nombre de snacks au moment du réapprovisionnement. Comment pourrait-on modifier ce code en remplaçant le setter par une méthode d’instance ? Quelle est la meilleure approche ?
