## Prueba tus aplicaciones móviles con ngrok

Si bien usar el navegador de tu computadora portátil en la vista móvil es fácil y funciona bien para las vistas iniciales, el problema es que nunca es exactamente igual en los navegadores móviles nativos. Para asegurarnos de que tu aplicación también se vea bien en el teléfono, debemos probarla allí. Sin embargo, es una molestia tener que esperar hasta el merge de una Pull Request y la subida a Heroku para hacer verificaciones. Configuremos una forma de verificar el localhost en nuestro teléfono a través de una herramienta llamada `ngrok`. La forma en que funciona es que crea un túnel desde tu host local a una URL pública a la que luego puedes acceder desde el navegador de tu teléfono (puedes leer más sobre esto [aquí](https://ngrok.com/product)).

Instalación para Macs:

```zsh
brew install --cask ngrok
```

Instalación para Ubuntu/WSL:

```zsh
sudo wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.tgz -O - | sudo tar xz -C /usr/local/bin
```

Si necesitas instalarlo manualmente, puedes descargarlo [aquí](https://ngrok.com/download).

Después de instalar ngrok, deberás abrir un túnel en el puerto que estamos usando para nuestra aplicación Rails, también conocido como `3000` (el número después de `localhost:` siempre es el número de puerto).
```zsh
ngrok http 3000
```

Esto te dará una interfaz de usuario similar a esta:

```zsh
ngrok by @inconshreveable

Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://92832de0.ngrok.io -> localhost:80
Forwarding                    https://92832de0.ngrok.io -> localhost:80

Connnections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Luego podrás acceder a tu host local desde las direcciones a las que se reenvía. Por lo general, es mejor tomar `https` en lugar de `http`. Envíate esta URL a ti mismo a través de Slack o una aplicación de mensajería, ¡y listo! Ahora puedes ver tus vistas de localhost en tu navegador móvil.

Nota: cada vez que cierres y luego reinicies un túnel ngrok, obtendrás una nueva dirección de reenvío. por lo general es una buena idea dejar ngrok ejecutándose en una ventana de terminal hasta que ya no lo necesites. Te lo decimos porque es incómodo tener que reenviarse la dirección una y otra vez.
