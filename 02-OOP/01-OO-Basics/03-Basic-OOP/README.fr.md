## Contexte et objectifs

Dans le module `01-Ruby`, tu as écrit tout un tas de programmes Ruby avec des classes comme `String`, `Integer`, `Array`, `Hash`, etc. En réalité, tu as même manipulé des *instances* de ces classes.

Tu as bien noté que `String` est une classe, non ? Cela signifie que `"john lennon"` ou `"Hello!"` sont tous deux des instances de `String`.

Utiliser des classes intégrées, c’est bien. Mais créer tes **propres** classes, c’est encore mieux !

## Spécifications

Implémente une classe `OrangeTree` qui modélise la vie d’un oranger (sa naissance, son cycle de vie et sa mort).

### Vieillissement
- Quand un oranger naît, son âge est égal à 0.
- Chaque année, l'oranger vieillit d'un an.
- L'oranger **ne peut pas** mourir avant d'avoir atteint 50 ans.
- Après 50 ans, la probabilité de mourir augmente chaque année.
- Aucun oranger ne peut vivre plus de 100 ans.
- Tu dois pouvoir obtenir l'âge de l'oranger.
- Tu dois pouvoir savoir si l'oranger est mort en appelant la méthode d'instance `#dead?`.

### Taille
- Un oranger grandit d'un mètre par an jusqu'à ce qu'il ait 10 ans. Puis il arrête de grandir.
- Tu dois pouvoir obtenir la hauteur de l'oranger.

### Fruits
- Un oranger produit 100 oranges par an une fois qu'il a strictement plus de 5 ans.
- Un oranger produit 200 oranges par an une fois qu'il a plus de 10 ans.
- Un oranger ne produit plus de fruit une fois qu'il a 15 ans.
- Tu dois pouvoir cueillir **un seul fruit** de l'oranger en appelant la méthode d'instance `pick_a_fruit!` (mais seulement s'il en reste).
- À la fin de chaque année, les fruits qui n'ont pas été cueillis tombent de l'oranger.
- Tu dois pouvoir obtenir le nombre de fruits restant sur l'oranger.

Pour simuler le passage du temps, tu vas devoir implémenter la méthode d’**instance** suivante :

```ruby
def one_year_passes!
  # À FAIRE : vérifier que l'oranger a survécu
  # À FAIRE : si oui, le faire vieillir
  # À FAIRE : et faire pousser ses fruits
end
```

Pour tester ta classe, lance l’interface (`ruby lib/interface.rb`) et vois ce qui se passe ;)

### Refactoring

Une fois que tu a terminé d'implémenter la méthode d'**instance** `#one_year_passes!` et que ton `rake` est complètement vert, refactorise ton code dans des méthodes d'instance **private**:
- `#may_die!`
- `#grow!`
- `#produce_fruits!`

## Enseignements clés

- Quelles sont les variables d’instance de la classe `OrangeTree` ?
- Quel est son état ?
- Quelles méthodes, lorsqu’on les appelle, modifient l’objet sur lequel elles sont appelées ? Comment appelle-t-on ces méthodes ?
