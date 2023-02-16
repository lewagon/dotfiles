## Contexto y Objetivos

¡Este es un desafío rápido para entrar en calor! Repasemos cómo enlazar un evento DOM a una acción en JavaScript!

Siempre son los mismos 3 pasos:

- Selecciona (**Select**) el elemento que quieres hacer interactivo.
- Escucha (**Listen**) el evento en el elemento.
- Escribe la retrollamada (también conocida como llamada de vuelta o **callback** en inglés). Este es el código que corre cuando ocurre el evento.

## Especificaciones

Inicia tu servidor web local con:

```bash
serve
```

Abre [`localhost:8000`](http://localhost:8000) en tu navegador.

Verás un gran botón verde que dice `Click me!`. El objetivo de este desafío es mostrar una alerta ([`alert`])(https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) que diga `Thank you!` cuando hagas clic en dicho botón.

¡Abre `lib/index.js` y sigue la secuencia del pseudocódigo!

No hay ningún test para este ejercicio pero ¡vamos a testear tu estilo! Así que es buena idea correr `rake`.
