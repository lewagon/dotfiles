Contexte et objectifs
---------------------

Dans le cadre de cet exercice, on va créer un programme simulant une
course de chevaux. Comme dans une course réelle, l’utilisateur·rice
verra une liste des chevaux en compétition, choisira le cheval sur
lequel il/elle souhaite parier et découvrira finalement si son favori a
gagné ou perdu. L’utilisateur·rice pourra parier jusqu’à ce qu’il/elle
n’ait plus d’argent.

Indications
-----------

Cet exercice devrait te prendre **45 minutes ðŸ•’**

1.  Comme pour le premier exercice, commence par écrire le pseudocode
    avec ton/ta prof en live-code ðŸ’».
2.  Tu auras ensuite 20 minutes pour essayer de trouver la solution
    tout·e seul·e.
3.  Puis on corrigera l’exercice ensemble ! ðŸ’»

Pseudocode
----------

Comment ton programme doit-il fonctionner quand tu le lances ? Rédige le
pseudocode !

``` {.ruby}
# interface.rb

# Pseudo-code:
# 1. Imprime Bienvenue et les noms des chevaux
# 2. Obtiens le pari de l’utilisateur·rice
# 3. Exécute la course ðŸ�´
# 4. Imprime les résultats
```

Les étapes ci-dessus sont trop générales. **Essaie de les détailler un
peu plus**.

Étape 1 - Fausse course de chevaux
----------------------------------

On va modéliser une course de chevaux. L’utilisateur·rice peut parier
sur (choisir) un cheval, le cheval court (l’ordinateur choisit un
vainqueur au hasard) et le vainqueur est imprimé sur le terminal avec un
message indiquant à l’utilisateur·rice s’il/elle a gagné. Commençons par
le pseudocode. Comment allons-nous modéliser les chevaux ?

Étape 2 - Crée une boucle !
---------------------------

Comment va-t-on ajouter une contrepartie au jeu ? Admettons que tu aies
100â‚¬ au début de la course, tu gagnes 50â‚¬ si tu gagnes ton pari et
perds 10â‚¬ si ton cheval ne gagne pas la course. Que dois-tu changer à
ton programme de courses de chevaux ? Assure-toi que l’utilisateur·rice
ne peut pas jouer s’il/elle n’a pas suffisamment d’argent.
