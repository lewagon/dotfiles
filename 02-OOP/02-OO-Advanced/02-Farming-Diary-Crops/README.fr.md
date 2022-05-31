## Contexte et objectifs

Voici un petit scénario de ferme à coder étape par étape pour découvrir les avantages de l’héritage.

## Spécifications

Une ferme a deux types de **cultures** (riz et maïs).

![Cultures](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/crops.svg?sanitize=true)

Réfléchis avec ton buddy : de combien de classes as-tu besoin, et comment les structurerais-tu ?

**IMPORTANT :** Dans cet exercice, n’utilise pas `rake` pour coder tes classes ! Code l’interface dans `lib/farming_diary.rb` et laisse le programme te guider pour créer tes classes ! À la fin de l’exercice, une fois que l’interface aura imprimé le résultat attendu, vérifie le code de tes classes avec `rake` 👌

### La classe `Corn`

Pour commencer, code une classe `Corn` dans `corn.rb` en utilisant les méthodes suivantes :
- `initialize` définit la variable d’instance `@grains` à zéro.
- `water!` : ajoute 10 grains à chaque fois que la méthode est appelée.
- `ripe?` retourne `true` s’il y a au moins 15 grains.

Ouvre `farming_diary.rb` et complète la section **Day One** (jour 1). Adapte le code afin qu’il imprime le résultat suivant :

```bash
📝 Day One: Corn
The corn crop produced 10 grains
The corn crop is not ripe
```

Exécute ton calendrier avec :

```bash
ruby lib/farming_diary.rb
```

### La classe `Rice`

Crée une classe `Rice` et copie/colle toutes les méthodes de la classe `Corn`.
- Ajuste la production de grains dans `water!` : ajoute seulement 5 grains.
- `ripe?` a le même comportement que dans `Corn`.
- `Rice` a une méthode spécifique appelée `transplant!`, qui produit 10 grains supplémentaires.

Complète ton calendrier agricole en plantant du riz le jour 2 (**Day Two**).

### Refactorisation

Si tu as trouvé pénible de devoir copier/coller du code, tu as raison ! Dupliquer du code requiert de la maintenance, en plus d’être une source d’erreurs. C’est là que l’héritage entre en jeu pour que le code reste DRY (Don’t Repeat Yourself).

Les cultures ont de nombreuses similitudes. Refactorise-les :
- Introduis une classe parente appelée `Crop` et déplace les méthodes partagées dedans.
- Fais en sorte que les classes `Corn` et `Rice` **héritent** de `Crop`.
- N'oublie pas de `require_relative`.

## Vérifications et enseignements

Et maintenant, exécute `rake` ! Prends ton temps : tous les tests doivent apparaître en vert pour valider ton architecture et tes interfaces de classe publiques. Si tu te demandes pourquoi on restreint certains setters dans les specs, c’est parce que le calendrier agricole ne nécessitait pas qu’on les ajoute ! Tu te souviens de l’**encapsulation** ?

> L’encapsulation consiste à masquer par défaut l’état interne ou le comportement d’un objet et de l’exposer avec le bon niveau d’abstraction **en fonction des besoins de ton programme**

Bravo ! Tu as pris le temps de laisser **le programme** te guider dans le codage de tes classes avant d’exécuter `rake`. C’est un aspect important de ton apprentissage pour gagner en autonomie en tant que développeur.
