Contexte et objectifs
---------------------

C’est l’exercice le plus long de la journée. On va créer une interface
de boutique simple, où l’utilisateur·trice peut voir quels articles sont
disponibles et leur prix. L’utilisateur·trice peut ensuite sélectionner
les articles qu’il/elle souhaite placer dans son panier et, une fois
qu’il/elle a terminé, payer et consulter sa facture.

Indications
-----------

-   Si tu as du temps avant le déjeuner, commence à réfléchir au
    pseudocode de cet exercice avec le prof.
-   Tu devrais avoir besoin de tout l’après-midi pour le terminer.
-   Valide et corrige chaque étape de l’exercice avec le prof avec un
    live-code intermédiaire ðŸ’»

Pseudocode
----------

Comment ton programme doit-il fonctionner quand tu le lances ?
**Écrivons le pseudocode**

``` {.ruby}
# interface.rb

# Pseudocode
# 1. Imprime Bienvenue
# 2. Définis ta boutique (quels articles sont en vente ?)
# 3. Obtiens les articles de l’utilisateur·rice (achat)
# 4. Imprime la facture (paiement)
```

**Peux-tu détailler un peu plus le pseudocode ?**

Étape 1 - Fausse boutique ðŸ›�
------------------------------

Voici la première version de notre programme :

ruby interface.rb

    > --------------------

> Welcome to Instacart \> -------------------- In our store today: kiwi:
> 1.25â‚¬ banana: 0.5â‚¬ mango: 4â‚¬ asparagus: 9â‚¬ \>
> -------------------- Which item? (or 'quit' to checkout) kiwi Which
> item? (or 'quit' to checkout) pineapple Sorry, we don’t have pineapple
> today.. Which item? (or 'quit' to checkout) mango Which item? (or
> 'quit' to checkout) quit -------BILL--------- TOTAL: 5.25â‚¬ \>
> --------------------

### Modéliser la boutique et le panier

-   Comment modéliser la boutique (`store`) et le panier (`cart`) ?
-   Quelle est la **structure la plus adaptée à chacun** ?
-   Faut-il utiliser un array ? Faut-il utiliser un hash (avec quelles
    clés et quelles valeurs) ?

**Réfléchis avec ton/ta prof avant de commencer !**

Étape 2 - Ajouter la quantité ðŸ›�ðŸ›�
--------------------------------------

ruby interface.rb

    > --------------------

> Welcome to Instacart \> -------------------- In our store today: kiwi:
> 1.25â‚¬ banana: 0.5â‚¬ mango: 4â‚¬ asparagus: 9â‚¬ \>
> -------------------- Which item? (or 'quit' to checkout) kiwi How
> many? 2 Which item? (or 'quit' to checkout) mango How many? 3 Which
> item? (or 'quit' to checkout) quit -------BILL--------- kiwi: 2 X
> 1.25â‚¬ = 2.5â‚¬ mango: 3 X 4â‚¬ = 12â‚¬ TOTAL: 14.5â‚¬ \>
> --------------------

### Modéliser la boutique et le panier

-   Comment modifier la boutique (`store`) et le panier (`cart`) pour
    prendre en compte la quantité ?
-   Que doit-on changer dans notre code avec cette nouvelle
    modélisation ?

Étape 3 - Ajouter la disponibilité ðŸ›�ðŸ›�ðŸ›�
-----------------------------------------------

On va maintenant améliorer encore un peu le programme et gérer notre
stock (avec la disponibilité) :

ruby interface.rb

    > --------------------

> Welcome to Instacart \> -------------------- In our store today: kiwi:
> 1.25â‚¬ (5 available) banana: 0.5â‚¬ (4 available) mango: 4â‚¬ (1
> available) asparagus: 9â‚¬ (5 available) \> -------------------- Which
> item? ('quit' to checkout) kiwi How many? 2 Which item? ('quit' to
> checkout) kiwi How many? 4 Sorry, there are only 3 kiwis left.. \>
> [...]

### Modéliser la boutique et le panier

-   Comment modifier la boutique (`store`) et le panier (`cart`) pour
    prendre en compte la quantité ?
-   Que doit-on changer dans notre code avec cette nouvelle
    modélisation ?

