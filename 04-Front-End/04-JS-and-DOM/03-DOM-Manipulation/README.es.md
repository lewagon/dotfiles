## Contexto y Objetivos

El objetivo de este ejercicio es manipular una página web de forma dinámica usando lo que leíste sobre selectores durante el módulo CSS.

A esto se le conoce como la manipulación del [Document Object Model](http://en.wikipedia.org/wiki/Document_Object_Model) (DOM) lo que es la **representación en memoria del HTML creado por el navegador**. Imagina que es como un árbol genealógico: el nodo raíz, sus hijos, sus nietos, etc. En ese árbol puedes hacer lo siguiente:

- Atraversarlo para leer nodos específicos
- Remover nodos
- Agregar nodos

Al realizar cualquiera de las acciones anteriores la página cambia instantáneamente sin necesidad de refrescarla ("Refresh").

## Especificaciones

Abre el archivo `lib/dom.js`. Ahí encontrarás una lista de desafíos que completar.

Para testear tu código, abre una nueva Terminal y corre el siguiente comando:

```bash
rake webpack
```

Luego abre [`localhost:8080`](http://localhost:8080) en tu navegador favorito. Abre la Consola.

Cambia algo del código en `lib/dom.js`. La página se cargará sola en el navegador tan pronto guardes los cambios en tu editor de texto.

¡Tu objetivo es hacer que pasen todos los tests!
