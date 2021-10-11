Contexte et objectifs
---------------------

L’exercice qui suit est un peu plus compliqué, car tu vas devoir utiliser des notions que l’on n’a pas encore abordées (conditions et boucles). Pas de panique, **on verra ces concepts demain**. Essaie de procéder étape par étape et demande-toi ce que tu cherches à faire avec ton programme avant de commencer à coder.

Dans cet exercice, on va créer ton coach personnel.
Malheureusement, ton coach est un peu stupide et uniquement capable de se comporter de la façon suivante :

1.  Si tu te contentes de lui **dire** au lieu de lui **demander** quelque chose (exemple : `"I met a girl last night"`), ton coach répondra simplement `"I don’t care, get dressed and go to work!"`
2.  Si tu lui poses une question (exemple : `"Can I eat some pizza?"`), ton coach ne sera pas d’une grande aide non plus et te répondra `"Silly question, get dressed and go to work!"`
3.  La **seule** façon de te débarrasser de ton coach est de lui dire ce qu’il a envie d’entendre : `"I am going to work right now!"`.

Comparons le **monde réel** et le **monde du code**.

<table class="table">
 <thead>
 <tr>
 <th>
Monde réel
</th>
 <th>
Monde du code
</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>
Réveil
</td>
 <td>
Exécuter <code>ruby lib/interface.rb</code> dans le terminal
</td>
 </tr>
 <tr>
 <td>
Parler à ton coach
</td>
 <td>
Écrire une string dans le terminal et appuyer sur Entrée
</td>
 </tr>
 <tr>
 <td>
Faire parler ton coach
</td>
 <td>
Lire la réponse de ton coach imprimée sur le terminal avec <code>puts</code>
</td>
 </tr>
 <tr>
 <td>
Poser une question
</td>
 <td>
Écrire une phrase se terminant par <code>?</code> et appuyer sur Entrée
</td>
 </tr>
 <tr>
 <td>
Te débarrasser de ton coach
</td>
 <td>
Saisir le <code>"I am going to work right now!"</code>, appuyer sur Entrée. Le programme doit se fermer.
</td>
 </tr>
 </tbody>
</table>


Les objectifs de cet exercice sont les suivants :

-   Comprendre le **flow** d’un programme et apprendre à "lire" dans ton code, ligne par ligne
-   Découvrir les \*\*conditions""
-   Découvrir les structures de code qui permettent de modifier le flow de ton programme : `if/unless..else..end`, `while/until..end`, etc. Ce sont des [structures de contrôle](https://en.wikipedia.org/wiki/Control_flow)

Spécifications
--------------

### Réponse de ton coach

Le fichier `lib/coach_answer.rb` contient la définition de la méthode pour `coach_answer`. Cette méthode prend un argument, `your_message`, qui correspond à la phrase que tu dis à ton coach. La méthode doit retourner une `String` (à savoir la réponse de ton coach), qui dépendra de la valeur passée dans `your_message`.

Nous allons maintenant créer une version améliorée de ton coach avec la méthode `coach_answer_enhanced`. Si tu t’adresses à ton coach **EN CRIANT**, il appréciera et ajoutera "I can feel your motivation!" avant sa réponse habituelle. Souviens-toi que pour crier sur Internet, il faut écrire en MAJUSCULES ! Et si tu cries "I AM GOING TO WORK RIGHT NOW!", alors ton coach te laissera tranquille.

### Programme interactif

-   Écris le code qui te permettra d’interagir avec ton coach par l’intermédiaire du terminal
-   **contrainte** : Ce programme doit s’exécuter en **boucle**. Ton coach doit répondre à ton message et attendre le suivant jusqu’à ce que tu décides de t’en débarrasser. Utilise `while..end` ou `until..end` pour cela.

Si tu te retrouves coincé dans une **boucle infinie**, appuie simplement sur `Ctrl` + `C` ! Le programme arrêtera de s’exécuter.

тЪая╕П L’exercice n’est terminé que quand rake est complètement vert ! Tu dois t’assurer de vraiment pouvoir poser des questions à ton coach en exécutant ruby lib/interface.rb ЁЯШЙ

Enseignements clés
------------------

-   Quel est le flow habituel d’un programme ?
-   Comment des structures de type `if..else..end` or `while..end` modifient-elles ce flow ?
-   Comment ces structures fonctionnent-elles ?
-   Qu’est-ce qu’une condition ? Quelles valeurs peut-elle prendre ? Quelle est la différence entre `=` and `==` ?
-   Une méthode simple peut-elle modifier le flow de ton programme ?

