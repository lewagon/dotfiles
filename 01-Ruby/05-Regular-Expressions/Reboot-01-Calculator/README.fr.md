Contexte et objectifs
---------------------

On va créer une calculatrice simple capable de réaliser les 4 opérations de base (`+`, `-` , `*`, `/`). Le programme demandera à l’utilisateur·rice deux nombres et un des quatre opérateurs pour pouvoir effectuer un calcul simple et afficher le résultat pour l’utilisateur·rice.

Indications
-----------

Cet exercice devrait te prendre **30 minutes ðŸ•’**

1.  On va commencer l’exercice avec le/la prof (en live-code ðŸ’»)) et **écrire ensemble le pseudocode**.
2.  Tu auras ensuite 10 minutes pour essayer de trouver la solution tout·e seul·e.
3.  Puis tu corrigeras l’exercice avec le/la prof (de nouveau en live-code ðŸ’»).

Pseudocode
----------

On commencera toujours avec le fichier `interface.rb`. C’est le fichier que tu lanceras (avec la commande `ruby interface.rb`) pour exécuter ton programme. L’idéal est de toujours commencer avec l’interface et de te demander **"Que doit-il se passer quand je lance mon programme ?"**

Attaque toujours un exercice avec le/la prof en écrivant le *pseudocode*. Exemple :

``` {.ruby}
# interface.rb

# Pseudo-code (what are the steps in plain english):
# 1. Say hello to the user
# 2. Ask user for the first number
# 3. Get user answer
# 4. Ask user for second number
# 5. etc.
```

**Écrire le pseudocode représente 80 % du travail !** Traduire en Ruby est la partie facile. Suis cette méthodologie du pseudocode pour **tous** les exercices de la session Reboot.

Étape 1 - Calculatrice de base
------------------------------

Crée une simple calculatrice avec une interface utilisateur en ligne de commande :

-   capable de traiter seulement les additions pour commencer
-   puis toutes les opérations (multiplications, soustractions, divisions)

Elle doit fonctionner comme ceci :

``` {.bash}
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Choose operation [+][-][*][/]
> *
> Result: 48
```

Il n’est pas possible de tester les exercices de reboot, mais tu peux toujours exécuter `rake` pour vérifier le style de ton code.

Étape 2 - Crée une boucle
-------------------------

C’est un peu pénible d’avoir à relancer ta calculatrice à chaque fois que ton programme se termine. Imagine une vraie calculatrice qui s’éteindrait après chaque opération ðŸ˜Š

Crée une boucle ! Réfléchis au moment où tu aimerais que ton programme arrête de tourner en boucle.

``` {.bash}
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Which operation [+][-][x][/]
> x
> Result: 48
> Do you want to calculate again? [Y/N]
> Y
> Enter a first number:
> 55
> Enter a second one:
> 2
> Which operation [+][-][x][/]
> -
> Result: 53
> Do you want to calculate again? [Y/N]
> N
```

Étape 3 - Refactorise ton code
------------------------------

-   Quel morceau de code fait vraiment partie de l’interface utilisateur (`gets` et `puts`) ?
-   Quel morceau de code n’appartient pas à l’interface ?

Essaie de refactoriser le code avec l’aide du/de la prof. Par exemple, tu peux créer un nouveau fichier `calculator.rb` :

``` {.ruby}
# calculator.rb
def calculate(first_number, second_number, operator)
 # compute and return result
end
```

Et l’utiliser dans ton interface :

``` {.ruby}
# interface.rb
require_relative "calculator"

# [...]
```
