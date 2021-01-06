## Configuración

No queremos mantener tu perfil dentro de `fullstack-challenges`  porque queremos hacer una versión con `git` como un proyecto distinto. Así que copialo como una carpeta independiente y empieza a trabajar:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## Creación el repositorio Github

Puedes inicializar (**init**) un repositorio, hacer los commits de tus cambios y crear el respectivo repositorio Github:

```bash
git init
git add .
git commit -m "my profile page"
gh repo create # this creates the associated repo on Github!
```

Para abrir el repositorio Github desde tu navegador, puedes correr el código siguiente:

```bash
gh repo view --web
```

## Github Pages

[Github Pages](https://pages.github.com/) es un servicio asociado de Github que facilita la implementación de cualquier **página web estática** en 10 segundos  (estático == no es una aplicación Rails). Se basa en una rama "mágica" que se llama `gh-pages`. Github pone tu página en línea cuando  detecta esta rama. Genial, ¿no? Crea esta rama mágica y haz el push. ✨🌿✨

```bash
git co -b gh-pages
git push origin gh-pages # we push the gh-pages branch, not master!
```

¡Ahora puedes construir la URL `http://<user.github_nickname>.github.io/profile/` (Github crea esta URL automáticamente) y ver lo que has creado en linea! Comparte el enlace con tus compañeros/as en Slack.

A partir de este momento y hasta el final del día puedes trabajar en tu directorio `~/code/<user.github_nickname>/profile` Y en la rama `gh-pages`. Esto quiere decir que cualquier actualización de tu perfil puede ser pusheada a `http://<user.github_nickname>.github.io/profile/` por medio de los comandos git habituales:

```bash
git add .
git commit -m "make my profile prettier"
git push origin gh-pages
```

## Entrega tu código en Kitt

Tu trabajo no será subido a Kitt porque no estabas en `fullstack-challenges`. Si quieres que este desafío se marque como completado, puedes hacer lo siguiente:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/05-Push-on-Github-Pages
cp -r ~/code/<user.github_nickname>/profile .
rm -rf profile/.git
git add .
git commit -m "Submitting my work to Kitt"
git push origin master

```
