## Configuration

On va maintenant apporter la touche finale à ton profil. Si tu ne l'as pas déjà fait, copie la version précédente de ton profil dans le dossier de ce challenge et ajoute un fichier CSS dedans :

```bash
cp -r ../03-Finishing-profile-design/profile .
```

## Contexte et objectifs

## Rendre ta page « responsive » (adaptée à toutes les tailles d'écran) avec des media queries (littéralement requêtes média)

Ton profil est terminé, mais que se passe-t-il si tu réduis la taille de la fenêtre de ton navigateur ? Ta page n'est pas encore **« responsive »** 😱.

Pour créer un design « responsive », tu peux ajouter des media queries à ton CSS. Pour utiliser les media queries, le `<head>` de ton html doit contenir la ligne suivante 👇

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

 Cela permet à ta page de détecter la largeur de l'appareil que tu utilises.

 Les media queries fonctionnent un peu comme une déclaration `if` en Ruby. En gros, **tu peux définir des règles CSS qui s'appliqueront uniquement si la fenêtre est plus petite qu'une largeur donnée**. Par exemple, pour créer un conteneur « responsive », tu peux procéder comme suit :


```css
@media (max-width: 960px) {
  /* For a screen < 960px, this CSS will be read */
  .container {
    width: 700px;
  }
}
@media (max-width: 720px) {
  /* For a screen < 720px, this CSS will be read */
  .container {
    width: 500px;
  }
}
@media (max-width: 540px) {
  /* For a screen < 540px, this CSS will be read */
  .container {
    width: 300px;
  }
}
```

Essaie de redimensionner ta fenêtre pour bien comprendre le fonctionnement des media queries.

### ⚠️⚠️⚠️ Fais attention à l'ordre de tes media queries ⚠️⚠️⚠️

Comme pour les déclarations `if` en Ruby, l'ordre est important ! Si plusieurs conditions sont `true`, la dernière règle CSS sera appliquée.
