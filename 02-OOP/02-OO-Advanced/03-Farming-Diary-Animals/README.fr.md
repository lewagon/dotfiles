## Contexte et objectifs

Cet exercice est le prolongement du précédent : la ferme accueille ses premiers animaux !

## Spécifications

![Animaux](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/animals.svg?sanitize=true)

Réfléchis avec ton buddy : de combien de classes as-tu besoin, et comment les structurerais-tu ?

N’exécute pas `rake` ! Attends la toute fin de l’exercice, suis les instructions et laisse le calendrier agricole te guider pour coder les classes !

### Parent et enfants

Maintenant que tu connais les avantages de l’héritage, continue et :
- Crée les trois classes vides
- Définis la bonne relation d’héritage entre les classes enfants et parentes

Contrairement à l’exercice précédent, commence par coder les comportements communs dans la classe parente :
- Au départ, un animal a zéro **énergie**
- Tu peux **nourrir** un animal : cela augmentera son **énergie** de 1

### Les bruits des animaux

Afin de déterminer les classes, commence par le **programme** que tu souhaites exécuter :
- Ouvre `lib/farming_diary.rb`, lis *Day Three* et rassemble les informations nécessaires pour coder les classes.
- Exécute le fichier avec `ruby lib/farming_diary.rb`. Corrige les erreurs une par une en codant la méthode `talk` manquante dans `Cow` et `Chicken`.

Résultat attendu :

```bash
📝 Day Three: Animals Talk
The cow says moo
The female chicken says cluck cluck
The male chicken says cock-a-doodle-doo
```

### Nourris les animaux

Passe au jour 4 et nourris tous les animaux en même temps avec une itération. Souviens-toi que tes animaux partagent la méthode `feed!`. Tu peux appeler la même méthode sur deux objets de types différents ! Ce concept s’appelle le [polymorphisme](https://thoughtbot.com/blog/back-to-basics-polymorphism-and-ruby) 🤓

Voici ce que tu dois savoir à propos de `feed!` :
- `Cow` : en plus de gagner en énergie, une vache produit 2 litres de **@milk** (lait)
- `Chicken` : en plus de gagner en énergie, une poule produit 2 **@eggs** (œufs) (les coqs aucun 🤷‍♂️)

**Astuce** : la méthode enfant **étend** la méthode parente. N’oublie pas d’utiliser `super` pour appeler la méthode parente !

Résultat attendu :

```bash
📝 Day Four: Feed The Animals
The cow produced 2 liters of milk
The female chicken produced 2 eggs
The male chicken produced 0 eggs
```

## Enseignements

Félicitations ! Tu peux exécuter `rake` pour vérifier que ton code est bien organisé.

Dans la classe enfant, il existe 4 sortes de méthodes :
- des méthodes qui **héritent** de la classe parente : la méthode est uniquement définie dans la classe parente
- des méthodes qui **étendent** la définition de la méthode parente : la méthode est légèrement différente dans les classes enfants
- des méthodes qui **override** ou surchargent la méthode parente . la définition est complètement différente que dans la classe parente
- des méthodes qui sont propres à la classe enfant : elles ne sont *pas du tout* définies dans la classe parente

Pour étendre une méthode, il faut utiliser le mot-clé `super` : il agit comme si tu copiais le corps de la méthode parente et le collais là où `super` est invoqué.
