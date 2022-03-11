## Contexto y Objetivos

Queremos construir un wiki anónimo (como [este](https://wagon-wikinimous.herokuapp.com)) donde cualquier persona pueda crear un nuevo artículo o actualizar uno existente.

Aquí no hay `rake`. También recuerda no crear tu app Rails en `fullstack-challenges` ⛔️


```bash
cd ~/code/<user.github_nickname>
rails new rails-wikinimous --skip-active-storage --skip-action-mailbox
cd rails-wikinimous
git add .
git commit -m "rails new"
gh repo create
git push origin master
```

## Especificaciones

### 1 - Modelo

Genera el modelo `Article` a través del generador Rails adecuado. Debe tener por lo menos las siguientes columnas:

- `title`, como una cadena de caracteres (`string`)
- `content`, como `text`

No dudes en hacer el crash test de tu nuevo modelo en `rails console`:

```ruby
new_article = Article.new(title: 'The meaning of life', content: "It's 42!")
new_article.valid?  # => should be `true`
new_article.save    # => should not display rollback warnings
Article.last        # => should be the one you just saved
```

### 2 - Seed

Agrega la [gema `faker`](https://github.com/stympy/faker) a tu `Gemfile` y corre `bundle install`. Usa esta gema para generar 10 artículos falsos en
`db/seeds.rb`. Cuando tu código esté listo, corre lo siguiente:

```bash
rails db:seed
```

### 3 - Rutas, Controlador y Vistas

Genera tu controlador e implementa las 7 acciones CRUD por defecto para listar, mostrar, crear, actualizar y eliminar un artículo como lo hicimos en el task manager.

Ahora sí puedes usar el atajo `resources` directamente en tus rutas.

Échale un vistazo a la [live app](https://wagon-wikinimous.herokuapp.com) para tener una idea de cómo debe lucir. 😉
