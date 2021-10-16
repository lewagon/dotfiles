## Contexte et objectifs

Dans le module `01-Ruby`, tu as écrit tout un tas de programmes Ruby
avec des classes comme `String`, `Integer`, `Array`, `Hash`, etc. En
réalité, tu as même manipulé des *instances* de ces classes.

Tu as bien noté que `String` est une classe, non ? Cela signifie que
`"john lennon"` ou `"Hello!"` sont tous deux des instances de `String`.

Utiliser des classes intégrées, c’est bien. Mais créer tes **propres**
classes, c’est encore mieux !

## Spécifications

Implémente une classe `OrangeTree` qui modélise la vie d’un oranger (sa
naissance, son cycle de vie et sa mort).

Pour simuler le passage du temps, tu vas devoir implémenter la méthode
d’**instance** suivante :

```ruby
def one_year_passes!
 # À FAIRE : faire vieillir l’arbre d’un an
 # À FAIRE : voir si l’arbre a survécu
 # À FAIRE : s’il a survécu, le faire grandir
 # À FAIRE : s’il a survécu, faire pousser des fruits sur l’arbre
end
```

-   Tu dois pouvoir mesurer la hauteur de l’arbre.
-   Tu dois pouvoir déterminer si l’arbre est mort.
-   Chaque année, l’arbre doit prendre 1 an (il vieillit et grandit, et
    finit par mourir).
-   Un arbre prend 1 mètre chaque année jusqu’à ses 10 ans. Puis, il
    arrête de pousser.
-   L’oranger **ne peut pas** mourir avant d’avoir atteint 50 ans.
-   Après 50 ans, la possibilité qu’il meure augmente chaque année.
-   Aucun arbre ne peut vivre plus de 100 ans.
-   Un arbre produira 100 fruits par an une fois qu’il aura plus de 5
    ans.
-   Un arbre produira 200 fruits par an à partir de 10 ans.
-   Un arbre ne produira plus de fruits à partir de 15 ans.
-   Tu dois pouvoir cueillir **un fruit** de l’arbre en appelant la
    méthode `pick_a_fruit!` sur ton arbre (mais seulement s’il reste des
    fruits).
-   À la fin de chaque année, les fruits qui n’ont pas été cueillis
    **tomberont**.
-   Tu dois pouvoir déterminer combien de fruits sont encore sur
    l’arbre.

Pour tester ta classe, lance l’interface (`ruby lib/interface.rb`) et
vois ce qui se passe ;).

## Enseignements clés

-   Quelles sont les variables d’instance de la classe `OrangeTree` ?
-   Qu’est-ce que l’état ?
-   Quelles méthodes, lorsqu’on les appelle, modifient l’objet sur
    lequel elles sont appelées ? Comment appelle-t-on ces méthodes ?

