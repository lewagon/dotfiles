## Contexte et objectifs

Dans ce premier challenge, on va sélectionner un élément du DOM !

### Configuration

`node` et `yarn` doivent déjà être installés. Vérifie avec :

```bash
node -v
# Tu dois voir ta version de node ici
yarn -v
# Tu dois voir ta version de yarn ici
```

Si ce n'est pas le cas, retourne à la section dédiée du processus d'installation [macOS](https://github.com/lewagon/setup/blob/master/macos.fr.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.fr.md#nodejs) ou [Windows](https://github.com/lewagon/setup/blob/master/windows.fr.md#nodejs).

## Spécifications

Lance un serveur local Web en exécutant :

```bash
rake webpack
```

Puis ouvre [`localhost:8080`](http://localhost:8080) dans ton navigateur Web préféré.

Tu devrais voir une liste ordonnée des pays qui ont remporté le plus de fois la Coupe du monde de la FIFA.

L'objectif de ce challenge est de sélectionner la France `<li>` 🇫🇷 !

Le moyen le plus simple et rapide de sélectionner un élément du DOM est **avec un `id`** :

- Ouvre le fichier `index.html`, repère l'élément que tu veux sélectionner et attribue-lui un `id` ;
- Ouvre le fichier `lib/select.js` et rédige le code JavaScript pour sélectionner l'élément avec l'id donné, et fais en sorte que la fonction le retourne (`return`) !

Amuse-toi bien 🎣

**N.B. :** Dans ce challenge, le résultat des tests s'affiche directement dans le navigateur ! Si tu vois `Congratulations!`, tu peux ajouter (`add`), versionner (`commit`), et pousser (`push`), puis passer au challenge suivant ! Tu peux aussi lancer `rake` pour vérifier ton style.
