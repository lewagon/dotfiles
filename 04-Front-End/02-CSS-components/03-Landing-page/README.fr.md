## Contexte et objectifs

Maintenant que tu t'es entraîné à créer des composants de base, tu vas apprendre à les utiliser et à les combiner pour construire une vraie page d'accueil ! Tout site Web qui se respecte possède une **jolie page d'accueil**. Elle est importante, car c'est la première page que les visiteurs voient ; elle doit donc être suffisamment séduisante pour qu'ils deviennent des clients 💰.
Dans ce challenge, tu vas reproduire un design de page d'accueil classique comme [celle-ci](https://arthur-littm.github.io/startup-landing/)!

Ta page d'accueil doit contenir **au moins** :

- une section **Hero / Banner** présentant ton produit avec un appel à l'action (CTA) ;
- une section **Comment ça marche** (avec les composants qui pourraient être utilisés pour décomposer les différents aspects de ton produit/service) ;
- un pied de page ou **Footer**.

## Maquette (Mockup)

⚠️ **Ne commence jamais à coder une page avant de savoir à quoi elle va ressembler !**


Au cours des prochaines semaines, tu apprendras à créer une maquette de tes pages comme un pro en utilisant [Figma](https://www.figma.com/), mais pour aujourd'hui, un papier et un crayon te suffiront à imaginer les différentes sections de ta page.

Pour cet exercice, ta structure devrait ressembler à ceci :

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/startup-landing-drawing.png" alt="" width="100%">
</div>

⚠️ Si tu n'es pas complètement sûr de ta structure, demande au prof de la vérifier avant de commencer à coder !

## Spécifications

Crée une page d'accueil avec les éléments suivants :

- une section **Hero / Banner** pour présenter ton produit ;
- une section **Comment ça marche** ;
- un **Footer**.

## Suggestions et ressources supplémentaires

- [Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox)
- [Bonnes combinaisons Google Fonts](https://fontpair.co/)
- [Illustrations de démarrage](https://undraw.co/illustrations)
- [Icônes](https://www.flaticon.com/)
- [Coolors](https://coolors.co/)

## Tu as terminé ?

Une fois que tu as terminé, tu peux à nouveau pousser ta page sur [Github Pages](https://pages.github.com) et la partager avec ton batch :

Copie d'abord le projet en dehors de `fullstack-challenges` afin d'en garder une trace comme projet `git` séparé :

```bash
cp -r ../03-Landing-page/landing ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/landing
```

Puis assure le suivi du projet avec `git` et pousse-le sur une branche `gh-pages` :

```bash
git init
git add .
git commit -m "my landing page"
gh repo create
git push origin master # pousse sur master d'abord
# puis pousse sur une branche `gh-pages`
git co -b gh-pages
git push origin gh-pages
```
