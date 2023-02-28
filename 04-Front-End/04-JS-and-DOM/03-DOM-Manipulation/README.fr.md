## Contexte et objectifs

L'objectif de cet exercice est de manipuler de façon dynamique une page Web en utilisant ce que tu as appris à propos des sélecteurs pendant le module CSS.

On parle de manipulation du [Modèle Objet de Document ou Document Object Model](https://fr.wikipedia.org/wiki/Document_Object_Model) (DOM), qui correspond à **la représentation en mémoire du HTML construit par le navigateur**. Vois ça comme un arbre généalogique : le nœud racine, ses enfants, ses petits-enfants, etc. Sur cet arbre, tu peux alors :

- le traverser pour lire des nœuds spécifiques ;
- supprimer des nœuds ;
- ajouter des nœuds.

N'oublie pas de rafraîchir la page pour voir les changements.

## Spécifications

Ouvre le fichier `lib/dom.js`. Il contient une liste de challenges à relever.

Pour tester ton code, ouvre une nouvelle fenêtre de terminal et exécute cette commande :

```bash
serve
```

Puis ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur Web préféré. Ouvre la Console.

Modifie le code dans `lib/dom.js`. Dès que tu l'enregistreras dans ton éditeur de texte, la page se chargera à nouveau dans le navigateur.

L'objectif est de passer tous les tests !
