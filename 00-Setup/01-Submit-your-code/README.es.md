## Contexto y Objetivos

* Entender la estructura del repositorio de un ejercicio y el enlace directo a tu cuenta GitHub.
* Aprender a evaluar tu código localmente antes de entregar tu solución.
* Aprender los comandos git básicos para hacer los commits de los cambios que hagas en tu código y hacer el push a GitHub.
* Descubrir las herramientas que ofrece la plataforma Kitt.

A lo largo de las 9 semanas, trabajarás en pares o grupos de 3-4 personas. Se te asignará un/a compañero/a diariamente, siguiendo el algoritmo [systema de todos contra todos](http://en.wikipedia.org/wiki/Round-robin_tournament) el cual forma parte de la siguiente [gema](https://github.com/ssaunier/round_robin_tournament).

Antes de empezar a resolver un nuevo desafío, **pregúntense entre ustedes lo que el ejercicio les pide hacer y asegúrense de que lo tengan bien claro** y esto debe ser **antes** de empezar a escribir la primera línea de código. Luego pueden programar en pares en una sola pantalla, o trabajar individualmente, haciendo seguimiento cada 10 minutos para ayudarse entre ustedes.

Trabajar en pares es una práctica habitual en la ingeniería de software. La idea es que si trabajas solo/a y encuentras un obstáculo, es posible que pases horas intentando resolver el problema. En cambio, otro par de ojos podrían encontrar el problema en segundos. ¡Nunca subestimes eso!

## Ejercicio 1: El `rake`.

Ve a la carpeta del ejercicio con el comando que está al principio de esta página.

* Corre `rake`. Todo debe estar en rojo (ya que no has comenzado a codear todavía).

Abre el archivo `lib/wagon_start.rb` en tu editor de texto. Ahí es donde tendrás que editar el código.

* Haz que el método `wagon_start` devuelva `"That's how it starts"`
* En la Terminal, corre `rake` y asegúrate de que tienes el resultado en verde para `#wagon_start` y con buen estilo (**sin ofensas**). Si tienes un estilo pobre, aún puedes continuar al siguiente ejercicio. Pero si quieres crear buenos hábitos de codeo, mejor ¡asegúrate de que tienes todo en verde antes de comenzar otro ejercicio!
* Haz el commit de los cambios y luego haz el push de los mismos.
* Regresa a Kitt y recarga la página. Verás tu solución en el lado derecho.

## Ejercicio 2: Práctica con líneas de comando (la Terminal)

Antes de seguir avanzando en el directorio fullstack-challenges, trabajarás con las líneas de comando que acabas de aprender.

NOTA:**¡No está permitido usar Finder (o tu buscador de archivos)!**

### Directorio tmp

El primer paso será crear todos nuestros archivos en un directorio llamado`tmp`.

* Ve a tu directorio principal (`~`)
* Crea un directorio `tmp` en este directorio principal
* Ve al directorio `tmp`

### Archivo README

* Dentro del directorio `tmp`, crea un archivo llamado `README`
* Abre este directorio `tmp` en tu editor de texto. Escribe algo en el archivo `README`.

### Directorio Nivel 1

* Crea un directorio `level-1` en el directorio `tmp`.
* Ve a ese directorio y crea un archivo llamado `README-level1`
* Muestra el camino donde estás

### Directorio Nivel 2

* Regresa al directorio padre
* Desde el directorio `tmp`, crea uno llamado `level-2` dentro del directorio `level-1`
* En el mismo directorio 'tmp', crea un archivo llamado `configuration` dentro del directorio `level-2` (el cual está dentro del directorio `level-1`)

### Jugando con archivos

Vamos a usar el comando `mv` el cual usarás para mover y remover carpetas y archivos.
¡Ya es hora de comportarse como un verdadero desarrollador! Usa Google para averiguar cómo llevar a cabo las siguientes actividades:

* Mueve este archivo de configuración del directorio `level-2` al directorio `level-1`
* Ve al directorio `level-1`
* Cambia el nombre del archivo `configuration` a `config`
* Muestra la lista de todos los archivos
* Remueve la carpeta `level-2`
* Remueve el archivo `config`

### Últimas palabras

* Regresa a tu directorio principal (`~`)
* Borra la carpeta tmp
* Despeja la ventana de la Terminal

Cuando hayas terminado, échale un vistazo a los siguientes enlaces.

## Un paso más lejos

Si ya terminaste toda la configuración de tu computadora y los ejercicios, échale un vistazo a los siguientes recursos:

* [ficha recordatoria git](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf)
* [fichas recordatorias interactivas](http://www.ndpsoftware.com/git-cheatsheet.html)
* Ve este video [this TED conference](http://www.ted.com/talks/clay_shirky_how_the_internet_will_one_day_transform_government) sobre cómo usar git/GitHub para proyectos habituales (que no son de desarrollo)
* Lee y practica todo este tutorial: [Aprende lo suficiente sobre líneas de comando para ser peligroso](http://www.learnenough.com/command-line/)
