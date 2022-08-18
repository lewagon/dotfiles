## Contexto y Objetivos

Ya que hemos ganado experiencia en la creación de componentes básicos, ¡veamos cómo podemos usarlos y combinarlos para crear una página de inicio (landing page)! Toda página web debe tener una **pagina de inicio hermosa**. Es importante porque es la primera página que los visitantes ven y debe ser lo suficientemente buena para convertirlos en clientes 💰.
En este desafío vas a reproducir una página de inicio de diseño clásico  ¡[como esta](https://lewagon.github.io/landing-page-challenge)!

Tu página de inicio debe incluir **por lo menos** los siguientes elementos:

- Una seccion **Hero / Banner** que presente tu producto con una llamada a la acción (call to action).
- Una sección de **Cómo funciona** (con los componentes que podrían ser usados para separar los distintos aspectos de tu producto/servicio).
- Un pie de página (**Footer**).

## Maqueta (Mockup)

⚠️ **Nunca empieces a escribir el código de una página sin saber cómo lucirá!**

En las próximas semanas aprenderás cómo maquetar tus páginas como un profesional usando [Figma](https://www.figma.com/). Pero por ahora puedes usar lápiz y papel para diseñar sus distintas secciones.

Para este ejercicio deberás tener algo como lo siguiente:

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/startup-landing-drawing.png" alt="" width="100%">
</div>

⚠️ ¡Si no estas 100% seguro/a de tener la estructura adecuada en tu borrador, consulta con tu profesor/a para validarla antes de empezar a codear!

## Especificaciones

Crea una página de inicio con los siguientes elementos:

- Una sección **Hero / Banner** para presentar tu producto.
- Una sección de **Cómo funciona**.
- Un pie de página (**Footer**).

## Sugerencias y recursos adicionales

- [Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox)
- [Good google fonts pairs](https://fontpair.co/)
- [Startup illustrations](https://undraw.co/illustrations)
- [Icons](https://www.flaticon.com/)
- [Coolors](https://coolors.co/)

## ¿Ya terminaste?

Cuando hayas terminado, haz el push a [Github pages](https://pages.github.com) nuevamente y comparte tu trabajo en el canal de tu grupo (batch):

```bash
cp -r ../03-Landing-page/landing ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/landing
```

Luego empieza a hacerle seguimiento a tu proyecto con `git` y pushealo a la rama `gh-pages`:

```bash
git init
git add .
git commit -m "my landing page"
gh repo create --public --source=.
git push origin master # push to master first
# then puts to a `gh-pages` branch
git co -b gh-pages
git push origin gh-pages
```
