## Contexte et objectifs

C’est l’exercice le plus long de la journée. On va créer une interface
de boutique simple, où l’utilisateur peut voir quels articles sont
disponibles et leur prix. L’utilisateur peut ensuite sélectionner
les articles qu’il souhaite placer dans son panier et, une fois
qu’il a terminé, payer et consulter sa facture.

## Indications

- Si tu as du temps avant le déjeuner, commence à réfléchir au
    pseudo-code de cet exercice avec le prof.
- Tu devrais avoir besoin de tout l’après-midi pour le terminer.
- Valide et corrige chaque étape de l’exercice avec le prof avec un
    live-code intermédiaire 💻

## Pseudo-code

Comment ton programme doit-il fonctionner quand tu le lances ?
**Écrivons le pseudo-code**


```ruby
# interface.rb

# Pseudo-code
# 1. Imprime Welcome
# 2. Définis ta boutique (quels articles sont en vente ?)
# 3. Obtiens les articles de l’utilisateur (achat)
# 4. Imprime la facture (paiement)
```

**Peux-tu détailler un peu plus le pseudo-code ?**

## Étape 1 - Fausse boutique 🛍

Voici la première version de notre programme :

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> Which item? (or 'quit' to checkout)
> pineapple
> Sorry, we don't have pineapple today.
> Which item? (or 'quit' to checkout)
> mango
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> TOTAL: 5.25€
> --------------------
```

### Modéliser la boutique et le panier

- Comment modéliser la boutique (`store`) et le panier (`cart`) ?
- Quelle est la **structure la plus adaptée à chacun** ?
- Faut-il utiliser un array ? Faut-il utiliser un hash (avec quelles
    clés et quelles valeurs) ?

**Réfléchis avec ton/ta prof avant de commencer !**

## Étape 2 - Ajouter la quantité 🛍🛍

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> How many?
> 2
> Which item? (or 'quit' to checkout)
> mango
> How many?
> 3
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> kiwi: 2 X 1.25€ = 2.5€
> mango: 3 X 4€ = 12€
> TOTAL: 14.5€
> --------------------
```

### Modéliser la boutique et le panier

- Comment modifier la boutique (`store`) et le panier (`cart`) pour
    prendre en compte la quantité ?
- Que doit-on changer dans notre code avec cette nouvelle
    modélisation ?

## Étape 3 - Ajouter la disponibilité 🛍🛍🛍

On va maintenant améliorer encore un peu le programme et gérer notre
stock (avec la disponibilité) :

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€ (5 available)
> banana: 0.5€ (4 available)
> mango: 4€ (1 available)
> asparagus: 9€ (5 available)
> --------------------
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 2
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 4
> Sorry, there are only 3 kiwis left.
> [...]
```

### Modéliser la boutique et le panier

- Comment modifier la boutique (`store`) et le panier (`cart`) pour
    prendre en compte la quantité ?
- Que doit-on changer dans notre code avec cette nouvelle
    modélisation ?

## Flashcards

Pour vous aider à maîtriser les objectifs clés de cette journée reboot, vous pouvez refaire les 2 jeux de flashcards suivants : **Flow, Conditions, Arrays** ainsi que ceux sur **Iterators & Blocks**.