:warning: **¡Aviso!** Este reto _no funciona_ en Windows, por favor, sáltatelo si usas este sistema operativo (o emparéjate con alguien en macOS / Linux).

## Contexto y Objetivos

¡Ya es hora de crear un juego! Para esto usaremos una gema que se llama `gosu`.

## Instalación

Abre tu Terminal y corre lo siguiente:

### macOS

```bash
brew update
brew install sdl2
gem install gosu
```

### Linux

```bash
sudo apt-get update
sudo apt-get install build-essential libsdl2-dev libsdl2-ttf-dev\
  libpango1.0-dev libgl1-mesa-dev libfreeimage-dev libopenal-dev\
  libsndfile-dev libmpg123-dev
gem install gosu
```

## Snake

Escribamos el código del clásico juego **Snake**. Los controles son fáciles: las teclas de flechas en tu teclado. El objetivo es crecer comiendo y sobreviviendo (¡no toques los bordes de la ventana!)

![](http://g.recordit.co/Wu3KJw9Jd1.gif)

## Especificaciones

1. Sigue el [tutorial de Gosu](https://github.com/gosu/gosu/wiki/ruby-tutorial) para ponerlo en marcha en `game.rb`.
1. Dibujaremos un cuadrado blanco de `20x20` para representar la **cabeza** de la serpiente. Introducimos la clase `Snake` con una constante `SIZE` y refactorizamos el método `initialize` de `Game` para construir una ventana proporcional al tamaño de la serpiente.
1. Hagamos el modelado de `Snake`. ¿Cuál debería ser su estado? ¿y qué hay de su comportamiento? Tal vez necesites [`Gosu::draw_rect`](https://www.rubydoc.info/gems/gosu/Gosu.draw_rect) y `Gosu::Color::WHITE`.
1. Agreguemos el concepto de **dirección** a la serpiente (`Snake`). Luego le agregamos a la serpiente (`Snake`) un método `#move`. Recuerda que morirá si pasa el borde de la ventana. ¿Cómo cambia la dirección cuando se presionan los botones? Tal vez necesites [`Gosu.button_down?`](https://www.rubydoc.info/gems/gosu/Gosu.button_down%3F) y `Gosu::KB_LEFT`.
1. ¿Por qué es tan rápido 😱? Tratemos de reducir la velocidad de la serpiente.
1. Hagamos que aparezca un poco de comida (`Food`). La comida será un cuadrado rojo del mismo tamaño que el de la serpiente. Debe aparecer aleatoriamente en la pantalla. ¿Cuáles deberían ser las variables de instancia? Implementa el método `draw`.
1. ¡Comamos! Cuando la serpiente pasa la comida, el puntaje debe aumentar y debe aparecer un cuadrado nuevo de comida en algún otro lado. Tal vez necesites [`Gosu::Font#draw`](http://www.rubydoc.info/github/gosu/gosu/Gosu/Font).

Abre tu terminal y corre lo siguiente:

```bash
touch lib/game.rb
touch lib/snake.rb
touch lib/food.rb
curl https://themushroomkingdom.net/sounds/wav/smb/smb_bump.wav > lib/start.wav
curl https://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav > lib/eat.wav
code .
```

Iniciaremos el juego con el siguiente código:

```bash
ruby lib/game.rb
```

## Yendo más lejos
1. ¡La serpiente debe crecer en vez de quedarse como un cuadrado!
1. ¡La serpiente debe ir más rápido cada vez que coma!
1. ¡Agrega un sonido para cada vez que la serpiente coma o muera!
