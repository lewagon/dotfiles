## Contexto y Objetivos

Debido a que ahora tenemos las asociaciones entre `Post` y `User`, podemos agregar algunas validaciones a los modelos para asegurarnos de almacenar datos **consistentes** en la base de datos. Antes de empezar a trabajar en los ejercicios, tomate 15 minutos y leer la siguiente guía completamente porque está muy buena:

[guides.rubyonrails.org/active\_record\_validations](http://guides.rubyonrails.org/active_record_validations.html)

## Configuración

Ya hay una migración para crear las tablas `posts` y `users` (ve la carpeta `db/migrate`). Puedes correrlas con:

```bash
rake db:create
rake db:migrate
```

## Especificaciones

### Agregar validaciones al modelo del usuario (`User`)

- Un usuario debe tener un nombre: `username`
- Un usuario debe tener un `email` **válido**
- Cada usuario debe tener nombres (`username`) únicos

### Agregar validaciones al modelo del post (`Post`)

- Un post debe tener un título `title`, una `url` (¡en el formato adecuado!) y un usuario
- el título (`title`) de un post debe ser de por lo menos 5 caracteres
- Cada post debe tener un título (`title`) único (insensible a las mayúsculas y minúsculas).

### Bonus: Callbacks

Esto no estuvo en la clase pero necesitas saber que los callbacks existen en Active Record. Una retrollamada **(un callback), también conocida como llamada de vuelta, es un pedazo de código que es llamado cuando un evento es generado**. Este concepto lo usaremos mucho cuando programemos en JavaScript más adelante en el bootcamp.

Ejemplo: cuando la instancia de usuario está a punto de ser validada, llama a un método para hacer algo de limpieza primero como cambiar un nombre de usuario (`username`) a minúsculas.

Esto lo podemos hacer con el código siguiente:

```ruby
class User
  before_validation :lower_username

  private

  def lower_username
    self.username = username.downcase unless username.nil?
  end
end
```

Lee la [Guía de callbacks de Ative Record](http://guides.rubyonrails.org/active_record_callbacks.html) para responder la última pregunta opcional.

Implementa un callback para eliminar los espacios en blanco al inicio y al final de un email antes de su validación.

Implementa una retrollamada (callback) que se ejecute después de que el usuario ha sido creado para enviarle un **email de bienvenida** a la persona. Lee más sobre los [retrollamadas (callbacks) disponibles](http://guides.rubyonrails.org/active_record_callbacks.html#available-callbacks) para decidir cual usar.

En este momento no tenemos Rails o gemas como [letter_opener](https://github.com/ryanb/letter_opener), así que simularmos el envío del email con el siguiente código:

```ruby
FakeMailer.instance.mail('boris@lewagon.org', 'Welcome to HN!')
```
