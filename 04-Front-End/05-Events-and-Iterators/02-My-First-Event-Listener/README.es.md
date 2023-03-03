## Contexto y Objetivos

Ayer trabajamos en la selección de un elemento DOM. Leímos información en él y lo actualizamos (texto, CSS, etc.). Hoy vamos a ver como reaccionar a [eventos DOM](https://developer.mozilla.org/en-US/docs/Web/Events) para crear páginas web interactivas.

### Instalación

Lanza un servidor web local ejecutando:

```bash
serve
```

Luego abre [`localhost:8000`](http://localhost:8000) en tu navegador.

## Especificaciones

Abre el archivo `index.html`. Notarás que estamos usando Bootstrap. También verás un gran botón en el `<body>`.

Tu objetivo es implementar algo de JavaScript en el archivo `lib/listener.js`. **Debes reaccionar al clic en el botón azul.** Al hacer clic queremos que pase lo siguiente:

- Que el botón sea deshabilitado. Esto se puede hacer agregando la clase `.disabled`.
- Que el texto del botón cambie de "Click me!" a "Bingo!"
- Opcional: el `sound.mp3` [se reproduce en el navegador](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript).

Puede que el sonido no funcione en algunos navegadores que corran en **Ubuntu**. Para arreglar eso, corre lo siguiente:

```bash
sudo apt-get install ubuntu-restricted-extras
```

No hay tests para este ejercicio pero ¡puedes comprobar tu estilo con `rake`!
