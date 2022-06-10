## Configuración

No queremos mantener tu perfil dentro de `fullstack-challenges`  porque queremos hacer una versión con `git` como un proyecto distinto. Así que copialo como una carpeta independiente y empieza a trabajar:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## Creación el repositorio GitHub

Puedes inicializar (**init**) un repositorio, hacer los commits de tus cambios y crear el respectivo repositorio GitHub:

```bash
git init
git add .
git commit -m "my profile page"
```

Luego usaremos la CLI de GitHub (interfaz de línea de comandos) para crear el repositorio asociado de GitHub. La CLI de GitHub te permite interactuar con GitHub a través de tu terminal.

### Use `gh` interactive mode

```bash
gh repo create # this launches an interactive mode to create the GitHub repo
```

Te pedirán que respondas algunas preguntas sobre cómo deseas crear tu repositorio en GitHub:

**What would you like to do?**
Selecciona _Push an existing local repository to GitHub_, dado que ya has creado tu repositorio local con `git init`.

**Path to local repository (.)**
Presiona `ENTER` para seleccionar la opción predeterminada (.) que es la carpeta actual.

**Repository name (profile)**
Presiona `ENTER` para seleccionar la opción predeterminada (profile) que es el nombre de la carpeta actual. Si deseas que tu repositorio de GitHub tenga un nombre diferente, escríbelo antes de presionar `ENTER`.

**Description**
Presiona `ENTER` para dejarlo vacío por ahora. Si deseas darle a tu repositorio una descripción que aparecerá en GitHub, escríbela antes de presionar `ENTER`.

**Visibility**
Selecciona _Public_ y presiona `ENTER` para que todo el mundo pueda tenga acceso a tu repositorio.

**Add a remote? (Y/n)**
Escribe `Y`, luego presiona `ENTER`. Agregar un remote agregará un enlace a tu repositorio GitHub en tu repositorio git local, para que puedas enviar tu código a GitHub a través de git.

**What should the new remote be called? (origin)**
Presiona `ENTER` para mantener la opción predeterminada (origin) que es el nombre estándar del remote principal.

**Would you like to push commits from the current branch to the "origin"? (Y/n)**
Escribe `Y`, luego presiona `ENTER` para hacer los push de tus commits desde tu repositorio git local a tu repositorio GitHub recién creado.

### Usa el comando de una sola línea de `gh`

Si deseas crear un repositorio **público** con un comando de una sola línea, puedes usar este comando:

```bash
gh repo create --public --source=.
```

Con gh, también puedes abrir un repositorio de GitHub en tu navegador desde tu terminal:

```bash
gh repo view --web
```

Puedes encontrar más información sobre gh en [los apuntes](https://kitt.lewagon.com/knowledge/cheatsheets/gh_cli).

## GitHub Pages

[GitHub Pages](https://pages.github.com/) es un servicio asociado de GitHub que facilita la implementación de cualquier **página web estática** en 10 segundos  (estático == no es una aplicación Rails). Se basa en una rama "mágica" que se llama `gh-pages`. GitHub pone tu página en línea cuando  detecta esta rama. Genial, ¿no? Crea esta rama mágica y haz el push. ✨🌿✨

```bash
git co -b gh-pages
git push origin gh-pages # we push the gh-pages branch, not master!
```

¡Ahora puedes construir la URL `http://<user.github_nickname>.github.io/profile/` (GitHub crea esta URL automáticamente) y ver lo que has creado en linea! Comparte el enlace con tus compañeros/as en Slack.

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
