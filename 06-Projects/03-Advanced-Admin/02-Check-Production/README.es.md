## Depuración en Heroku

Probablemente avanzaste mucho en la sesión anterior. Si tu equipo aún no ha enviado todo ese nuevo código a Heroku, ahora es el momento de hacerlo (pregúntele a tu compañero encargado del `heroku` remote):

```zsh
git status # must be clean, if not add / commit your WIP
git co master
git pull origin master
git push heroku master
```

Una vez que estés ahí, puedes hacer `heroku open`, desde la terminal, probar todas las features y priorizar la depuración de cualquier error. 👌

## Seeds

Si aún no tienes seeds, crea uno. Si ya tienes, piensa en cómo puedes mejorarlos y aumentarlos. Mientras más datos y mejores sean, más legítima se verá tu aplicación.
En el contexto de los proyectos de Le Wagon, puede que te resulte útil tener un seed que "restablezca" la base de datos al punto de partida de tu Demo. En proyectos de la "vida real", **nunca programes ningún comportamiento destructivo** en un seed ⚠️ ya que no es buena idea correr el riesgo de equivocarse con un `User.destroy_all`- 😱

Una vez que tu seed esté listo e implementado en producción, sólo necesitas ejecutar lo siguiente :point_down:

```bash
heroku run rails db:seed
```
