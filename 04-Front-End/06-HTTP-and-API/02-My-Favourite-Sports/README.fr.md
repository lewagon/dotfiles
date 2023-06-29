## Contexte et objectifs

Dans ce challenge, on va chercher à reproduire l'expérience utilisateur que l'on voit de plus en plus dans les formulaires d'applications Web modernes, qui permettent de sélectionner **plusieurs** réponses possibles à une question :

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/highlights.gif)

Il s'agira donc à nouveau de **sélectionner** des éléments, de les **lier** à un événement et d'y **réagir** !

## Spécifications

Lance ton serveur Web local avec :

```bash
serve
```

Ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

Tu devrais voir apparaître une grid (grille) avec 6 cases de sports qui semblent cliquables. Quand tu en survoles une, l'interface utilisateur change et te propose de cliquer. Mais rien ne se passe quand tu cliques ! On va corriger ça.

- Quand tu cliques sur un sport, tu dois faire en sorte que la classe CSS `active` s'active/se désactive sur l'élément (pas besoin d'écrire du CSS dans ce challenge)
- On doit pouvoir sélectionner plusieurs sports (comme s'il s'agissait de cases à cocher)

Avant de rédiger du code, réfléchis aux différentes étapes du problème en utilisant le pseudo-code !

Il n'y a pas de test pour cet exercice, mais on vérifiera ton style. Lance `rake`.

## Refactorisation (facultatif)

Une fois que la surbrillance fonctionne, on va essayer de rendre le code plus lisible.

Quand tu combines `forEach` et `addEventListener`, tu obtiens du code avec **3 niveaux** d'indentation, ce qui le rend difficile à lire.

Bonne nouvelle : en JavaScript, tu peux stocker des **fonctions** dans des variables ! De cette façon, tu peux utiliser la variable sans appeler la fonction en **omettant les parenthèses**, ce qui est parfait pour les **callbacks** !

Par exemple, tu peux refactoriser ce code :

```js
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(event.currentTarget);
  });
});
```

en :

```js
const displayClickedElement = (event) => {
  console.log(event.currentTarget);
};

const bindButtonToClick = (button) => {
  button.addEventListener('click', displayClickedElement);
}

buttons.forEach(bindButtonToClick);
```

À ton tour d'extraire :

- la logique dans une fonction arrow `bindSportToClick`,
- le callback de clic dans une fonction arrow `toggleActiveClass`.

À la fin, ton code doit être facile à lire et ne doit pas avoir plus d'un niveau d'indentation !
