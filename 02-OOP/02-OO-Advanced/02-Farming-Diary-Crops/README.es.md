## Contexto y Objetivos

A continuación te presentamos el escenario agrícola cuyo código escribirás paso a paso para descubrir los beneficios de la herencia (inheritance), uno de los mecanismos más utilizados en la programación orientada a objetos.


## Especificaciones

La granja tiene dos tipos de cultivos (**crops**): arroz y maíz.

![Crops](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/crops.svg?sanitize=true)

Responde las siguientes preguntas con tu compañero/a: ¿Cuántas clases crees que necesites? ¿Cómo puedes estructurarlas?

**IMPORTANTE:** En este desafío ¡NO uses `rake` para escribir el código de tus clases! ¡Escribe el código de la interfaz en `lib/farming_diary.rb` y deja que el programa te guíe a lo largo del diseño de tus clases! Usa `rake` al final del desafío cuando la interfaz imprima el output esperado para testear el código de tus clases 👌


### La clase `Corn`
Comienza escribiendo el código de la clase `Corn` en `corn.rb` con los siguientes métodos:
- `initialize` asigna cero como valor inicial de la variable de instancia `@grains`.
- `water!`: agrega 10 semillas cada vez que sea llamado.
- `ripe?` devuelve true si hay por lo menos 15 semillas.

Abre `farming_diary.rb` y completa la sección **Day One**.
Adapta el código para que imprima el siguiente output:

```bash
📝 Day One: Corn
The corn crop produced 10 grains
The corn crop is not ripe
```

Corre tu diary con lo siguiente:

```bash
ruby lib/farming_diary.rb
```

### La clase `Rice` (arroz)
Crea una clase `Rice` en `rice.rb` y copia/pega todos los métodos de la clase `Corn`.
- Ajusta la producción de semillas en `water!`: esto solamente agrega 5 semillas.
- `ripe?` tiene el mismo comportamiento que en `Corn`.
- `Rice` tiene un método específico llamado `transplant!` el cual produce 10 semillas adicionales.

Sigue trabajando en tu farming diary plantando algo de arroz en **Day Two**.


### Refactorización
¿Te sentiste incómodo/a cuando copiaste/pegaste el código? ¡Es normal! Duplicar código trae errores y requiere más mantenimiento. Esto explica la utilidad de la herencia (inheritance) ya que mantiene el código libre de repeticiones innecesarias (En inglés se utiliza la abreviación DRY: Don't Repeat Yourself).

Los cultivos (crops) tienen muchas cosas en común, así que podemos refactorizarlos:
- Introduce una clase padre llamada `Crop` y mueve los métodos compartidos hacia la misma.
- Haz que las clases `Corn` y `Rice`  **hereden** de `Crop`.
- No olvides el `require_relative`.

## Verificaciones y aprendizajes
¡Corre `rake`! Asegúrate de que todos los tests salgan en verde para validar la interfaz pública de tu arquitectura y clases. ¡En caso de que te preguntes por qué hemos restringido algunos setters en las especificaciones, es porque el farming diary no nos pide agregarlos! ¿Recuerdas el término **encapsulation**?

> Encapsulation oculta de manera predefinida el estado o comportamiento interno de un objeto y lo expone con el nivel adecuado de abstracción **de acuerdo a las necesidades de tus programas**

¡Bravo! Te tomaste el tiempo para dejar_que_el_programa_guiara el código de tus clases antes de correr `rake` y te felicitamos por eso. Es un paso importante en tu aprendizaje como desarrollador/a web para ganar autonomía.
