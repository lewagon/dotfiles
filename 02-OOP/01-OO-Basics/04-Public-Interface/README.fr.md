## Introduction

Une bonne conception orientée objet implique de comprendre à quel point un objet doit être **exposé**.

Exposer un objet signifie rendre ses propriétés (données internes) accessibles au « public », c’est-à-dire à d’autres objets dans le programme voire à d’autres programmes. Ensemble, ces méthodes publiques forment l’**interface publique** d’un objet. Les méthodes qui sont privées (accessibles uniquement au sein de l’objet) forment son **interface privée**.

En règle générale, on expose uniquement d’un objet ce dont les autres objets ont besoin pour interagir avec lui. **On ne crée pas d’objets perméables à moins d’avoir besoin qu’ils soient perméables**.

## Objectifs

- Créer une classe avec une interface publique
- Jouer avec les getters
- Écrire ta propre méthode `to_s`
- Utiliser des arguments par défaut pour les méthodes
- En savoir plus sur les exceptions personnalisées

On va jouer avec la classe `BankAccount`, qui stocke des informations relatives à un compte bancaire et permet à un utilisateur de réaliser des transactions.

## Spécifications

### Le contrat `BankAccount` dans `bank_account.rb`

L’interface publique de la classe, c’est-à-dire l’ensemble de ses méthodes publiques, est appelée contrat de classe (en savoir plus sur la notion de [programmation par contrat](https://fr.wikipedia.org/wiki/Programmation_par_contrat)). Il s’agit d’une sorte de promesse faite par la classe aux autres objets ou programmes Ruby. Ci-dessous, on spécifie le contrat de notre classe `BankAccount`. On veut pouvoir réaliser les actions suivantes avec nos objets BankAccount **depuis le monde extérieur** :
- Consulter le nom complet et le solde du ou de la titulaire
- Consulter uniquement un IBAN **partiel**, par exemple IBAN : FR14**************606
- Imprimer des informations de compte partielles dans un format lisible
- Retirer ou déposer de l’argent
- Imprimer l’historique des transactions si un mot de passe est fourni

### La méthode `to_s`

Cette méthode signifie littéralement « to string » (transformer en string) et sert à donner des informations à un utilisateur à propos d’un objet. Avec une méthode `to_s` personnalisée, tu peux définir le comportement de ton choix, et tu verras ça souvent en Ruby.

On peut utiliser cette méthode pour notre compte bancaire. Une fois implémentée, elle ressemblera à ça :

```ruby
account = BankAccount.new("John Lennon", "FR14-2004-1010-0505-0001-3M02-606", 200, "yoko")

puts account
# le puts appellera la méthode `to_s` sur l'objet
# =>  Owner: John Lennon - IBAN: FR14**************606 - Balance: 200 euros
```

Implémente ta méthode `#to_s`, qui doit aussi appeler ta méthode d’IBAN partiel.

### Retrait et dépôt

Implémente `#withdraw` et `#deposit`. Ces deux méthodes doivent appeler la méthode privée `#add_transaction` (également appelée dans la méthode `#initialize`). Chaque méthode doit retourner un message du type « You’ve just withdrawn/deposited XXX euros » (Tu viens de retirer/déposer XXX euros). Souviens-toi qu’un retrait est simplement un dépôt négatif 😉

### Historique des transactions

Tu dois maintenant implémenter la méthode `#transactions_history`. Cette méthode prend un hash avec le mot de passe comme paramètre (par exemple, `{ password: 'yoko' }`), qui est un paramètre facultatif. En l'absence de paramètre, elle prend un hash vide (c’est ce que signifie la notation `args = {}`). Ta méthode d’historique des transactions doit :

1.  retourner une string affichant les transactions si le mot de passe correct est donné
2.  retourner `"wrong password"` si le mot de passe ne correspond pas au mot de passe du compte
3.  retourner `"no password given"` si la méthode est appelée sans arguments

## (Optionnel) Ajouter une classe `Transaction`

Et si tu améliorais ton compte bancaire, en ajoutant des informations concernant la date de chaque transaction ? Ou en modifiant la méthode d’historique des transactions afin qu’elle imprime les transactions comme suit ?

```bash
+ 200 euros on 22/10/13 at 8:30am
- 120 euros on 30/11/13 at 2:30pm
+ 1050 euros on 30/11/13 at 2:30pm
```

Renseigne-toi sur le [principe de responsabilité unique](https://fr.wikipedia.org/wiki/Principe_de_responsabilit%C3%A9_unique) (Single Responsibily Principle SRP), et interroge-toi :
- Quelle est la responsabilité de la classe `BankAccount` ? Sa responsabilité principale est bien d’imprimer des informations de base sur le compte et de permettre les retraits et les dépôts d’argent, n’est-ce-pas ?
- Est-ce la responsabilité du compte bancaire d’assurer un suivi de la date de chaque transaction ou d’imprimer joliment chaque transaction ?

Le moment est peut-être venu de déléguer ces responsabilités à une autre classe `Transaction`, qui sera responsable :
- du suivi de la date des dépôts et retraits, et de leur montant
- de l’impression de ces informations dans un format lisible
- Tu peux même envisager d’autres données pour cette classe, comme une variable d’instance `@message` pour stocker la string de référence pour chaque retrait/dépôt ("car rental", "ibiza weekend", "christmas shopping", etc.)

Une fois que ta classe `Transaction` aura été implémentée, tu devras modifier ta classe `BankAccount` de façon à ce que les arrays de transactions stockent des objets `Transaction` au lieu de chiffres. Tu devras également charger le fichier *transaction.rb* dans *account.rb* avec

```ruby
require_relative "transaction"
```

## Enseignements clés

- Qu’est-ce que l’interface publique d’une classe ?
- Quelle est la différence entre un getter et un setter ?
- À quoi sert la méthode `to_s` ?
- Que sont des arguments par défaut ? Comment les utilise-t-on ?
- Dans `bank_account.rb`, que se passe-t-il aux lignes 2-3 et à la ligne 19 ?

## Suggestions et ressources complémentaires

-   Tu peux utiliser la méthode `Time#strftime` pour mettre en forme la date dans `Transaction#to_s`.
- De nombreuses exceptions sont intégrées et définies dans Ruby, mais nous pouvons également définir nos propres exceptions, comme `DepositError`! Cela nous permet de fournir un message d'erreur plus détaillé et compréhensible qui nous aidera plus tard pour débugger. Tu peux lire [cet article](https://launchschool.medium.com/getting-started-with-ruby-exceptions-d6318975b8d1), et en particulier le paragraphe `Raising Custom Exceptions` pour en apprendre plus sur le sujet.
