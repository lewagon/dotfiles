Avant de commencer
------------------

N’oublie pas qu’à 14h, tu auras ton premier quiz écrit. Sans ordinateur et sans Google. Juste ta tête et un crayon. Ce n’est pas un examen et tu ne seras pas noté, ne t’inquiète pas pour ça ðŸ˜Š, mais cela te permettra d’identifier les points qui te posent encore problème et de les retravailler avant d’aller plus loin. Alors prends ton temps et essaie de répondre à tout aussi précisément que possible.

À la fin du quiz, un·e prof prendra 15 minutes pour passer en revue tes réponses et essayer de clarifier les points que tu n’as pas compris. Cela te permettra de savoir quoi revoir pendant le week-end, et de décider si tu dois participer au groupe Reboot lundi et mardi prochains.

Bonne chance et bon quiz !

Contexte et objectifs
---------------------

Supposons que tu aies envie de garder la ligne tout en continuant à manger McDo… Tu as une super idée : rédiger une méthode rapide pour calculer le nombre de calories d’une commande McDonald’s. On va se servir du tableau ci-dessous comme d’un condensé du menu McDonald’s :

<table class="table">
 <thead>
 <tr>
 <th>
Item
</th>
 <th>
Calories
</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>
Hamburger
</td>
 <td>
250
</td>
 </tr>
 <tr>
 <td>
Cheese Burger
</td>
 <td>
300
</td>
 </tr>
 <tr>
 <td>
Big Mac
</td>
 <td>
540
</td>
 </tr>
 <tr>
 <td>
McChicken
</td>
 <td>
350
</td>
 </tr>
 <tr>
 <td>
French Fries
</td>
 <td>
230
</td>
 </tr>
 <tr>
 <td>
Salad
</td>
 <td>
15
</td>
 </tr>
 <tr>
 <td>
Coca Cola
</td>
 <td>
150
</td>
 </tr>
 <tr>
 <td>
Sprite
</td>
 <td>
150
</td>
 </tr>
 </tbody>
</table>


Tu as besoin de stocker ces informations dans une [constante](https://www.rubyguides.com/2017/07/ruby-constants/) Ruby pour créer une sorte de base de données.
Voici un exemple de `Hash` - `AGE_OF_STUDENTS` qui contient des étudiants et leur âge :

``` {.ruby}
AGE_OF_STUDENTS = {
 "Peter" => 21,
 "George" => 22,
 "Mary" => 20
}
```

Lis la documentation sur les [Hashes](https://ruby-doc.org/core-2.6.6/Hash.html).
Tu vas t’en servir tout le temps, alors apprends à les aimer ðŸ˜Š

**Pour cet exercice, utilise des `Strings` pour tes clés, plutôt que des `Symbols`. C’est plus simple**

Spécifications
--------------

-   Crée une méthode `poor_calories_counter` qui retourne le nombre total de calories pour les trois éléments de ta commande.
-   **contrainte** : ta méthode doit utiliser un hash (ça va de soi !)
-   **contrainte** : ta méthode doit utiliser **nos valeurs caloriques données** !

Exemple : `poor_calories_counter("McChicken", "French Fries", "Sprite")` doit retourner `730`.

Enseignements clés
------------------

-   Qu’est-ce qu’un hash ? - Comment l’utilise-t-on ?
-   Comment récupérer une valeur stockée dans un `Hash` ?

