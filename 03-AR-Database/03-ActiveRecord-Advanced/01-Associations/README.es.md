## Contexto y Objetivos

Continuemos con nuestra aplicación clon de Hacker News. Hoy queremos agregar la funcionalidad de usuario para que la gente tenga que iniciar sesión antes de subir un post.

(Sin embargo, no tendrán que iniciar sesión para leerlos).

## Configuración

Te hemos dado la primera migración para crear la tabla `posts`.

```bash
rake db:create
rake db:migrate
```

## Especificaciones

### Agregar un modelo de usuario (`User`)

También te damos un esquema básico de posts (ve la migración actual en la carpeta `db/migrate`).

Primero genera la nueva migración para crear el modelo del usuario (`User`). Dicho modelo debe tener los siguientes campos:

- `username`
- `email`

### Migración: un usuario (User) tiene muchos (has many) posts

Genera otra migración para crear una referencia uno a muchos (one-to-many) entre el usuario (`User`) y el post (`Post`).

Asegúrate de agregar el código necesario en tus modelos para darte acceso a los posts desde una instancia de usuario y al usuario a partir de una instancia de post dada.

### Seed con usuario y posts

Escribe el código del seed para poblar tu base de datos con 5 usuarios (users) quienes tienen entre 5 y 10 posts cada uno. Siéntete libre de usar cualquier estrategia que quieras, ya sea Faker o API.

No dediques mucho tiempo tratando de usar una API. Recuerda que nuestro objetivo en este ejercicio es practicar las asociaciones.
