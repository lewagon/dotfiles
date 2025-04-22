## Lineamientos

Este desafío lo tendrás que hacer en **30 minutos 🕒**

1. Empecemos el desafío con el/la profesor/a (sesión de live-code 💻) y **escribe el pseudocódigo junto a él/ella**.
2. Luego pasa 10 minutos solo para tratar de llegar a la solución.
3. Luego la corregirás con el/la profesor/a (sesión de live-code 💻) .

## Pseudocódigo

Siempre empezaremos con el archivo `interface.rb`. Ese es el archivo que ejecutarás (con el comando `ruby interface.rb`) para correr el programa. Siempre es recomendado empezar con la interface y preguntándote **¿"Qué debería pasar cuando corra el programa?"**

Siempre empieza los desafíos junto al/a la profesor/a y escribe el *pseudocódigo*. Por ejemplo:

```ruby
# interface.rb

# Pseudo-code (what are the steps in plain english):
# 1. Say hello to the user
# 2. Ask user for the first number
# 3. Get user answer
# 4. Ask user for second number
# 5. etc.
```

**¡Escribir el pseudocódigo es el 80% del trabajo!** La traducción del inglés a Ruby es la parte más fácil. Adopta esta metodología de pseudocódigo para **cada** desafío de la sessión de Reboot.


## Paso 1 - Calculadora tonta

Crea una calculadora simple con una interfaz de línea de comando (UI):

- Primero manipula sumas
- Luego todas las demás operaciones (multiplicación, resta, división).

Deberá funcionar de la siguiente manera:

```bash
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Choose operation [+][-][*][/]
> *
> Result: 48
```

No hay tests para los ejercicios de reboot pero puedes correr `rake` para verificar el estilo de tu código.

## Paso 2 - Hazlo correr en bucle

Es un poco fastidioso reiniciar el programa cada vez que termina. Imagina una calculadora real que se apaga después de cada cálculo 😊

¡Hazlo correr en bucle (loop)! Piensa en cuándo quieres que se detenga dicho bucle (loop).

```bash
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Which operation [+][-][x][/]
> x
> Result: 48
> Do you want to calculate again? [Y/N]
> Y
> Enter a first number:
> 55
> Enter a second one:
> 2
> Which operation [+][-][x][/]
> -
> Result: 53
> Do you want to calculate again? [Y/N]
> N
```
## Paso 3 - Refactoriza tu código

- ¿Qué parte del código realmente está en la interfaz de usuario (UI) (`gets` and `puts`)?
- ¿Qué parte del código no pertenece a la interfaz?

Intenta refactorizar el código con la ayuda de tu profesor/a. Por ejemplo, puedes crear un nuevo archivo `calculator.rb`:

```ruby
# calculator.rb
def calculate(first_number, second_number, operator)
  # compute and return result
end
```

Y utilizarlo en tu interfaz:

```ruby
# interface.rb
require_relative "calculator"

# [...]
```

## Flashcards

Para ayudarte a dominar los objetivos clave de este día de reboot puedes rehacer los 2 mazos de flashcards siguientes: **Flujo, Condiciones, Matrices** así como las de **Iteradores y Bloques**.