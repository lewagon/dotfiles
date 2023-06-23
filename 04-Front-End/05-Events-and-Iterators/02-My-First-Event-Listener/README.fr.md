## Contexte et objectifs

Hier, on a vu comment sélectionner un élément du DOM, lire des informations dessus et le mettre à jour (texte, CSS, etc.). Aujourd'hui, on va voir comment réagir à des [événements du DOM](https://developer.mozilla.org/en-US/docs/Web/Events) pour créer des sites Web interactifs.

### Installation

Lance un serveur web local en exécutant :

```bash
serve
```

Puis ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

## Spécifications

Ouvre le fichier `index.html`. Tu remarqueras qu'on utilise Bootstrap. Il y a aussi un gros bouton dans le corps (`<body>`).

L'objectif est de coder du JavaScript dans le fichier `lib/listener.js`. **Tu dois réagir à un clic sur le bouton bleu.** Quand on clique sur ce bouton, on veut que :

- le bouton se désactive, ce qui peut être fait en ajoutant la classe `.disabled` ;
- le texte du bouton passe de "Click me!" à "Bingo!".
- Facultatif : que le son `sound.mp3` [soit joué dans le navigateur](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript)

Il se peut que le son ne fonctionne pas sur certains navigateurs sous **Ubuntu**. Pour régler ce problème exécute :

```bash
sudo apt-get install ubuntu-restricted-extras
```

Il n'y a pas de tests pour cet exercice, mais on vérifiera ton style ! Lance `rake`.
