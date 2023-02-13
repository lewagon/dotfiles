## Kit UI Kit avanzado (30min)

Ya que tienes tus primeros componentes UI es hora de trabajar en uno más avanzado. Vamos a crear una responsive card usando el feature [Auto Layout] de Figma (https://help.figma.com/hc/en-us/articles/360040451373-Create-dynamic-designs-with-Auto-layout).

**Auto Layout** te permite diseñar componentes dinámicos (llamados frames) que responden al contenido que almacenan - crecen para rellenar y se encogen para ajustar el espacio. Con Auto Layout también puedes definir un padding en un frame y alinear los ítems horizontalmente y verticalmente en su interior. Tal como en un CSS flexbox! 💪

### Diseña una dynamic card component con Auto Layout

Comienza creando dos rectángulos, uno será tu card y el otro será una imágen que estará encima de ella. Pon una encima de la otra. Agrégales highlight a ambas y selecciona la opción `Auto Layout` en el panel de diseño de la derecha. Si no ves esa opción en el panel derecho, haz clic derecho sobre tu selección y escoge `add auto layout` que aparecerá en el menú.

![Crea un frame con Auto Layout](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_one.gif)

Esto crea un **frame** y te da nuevas opciones de diseño que verás en el panel derecho. Por ejemplo, ahora puedes agregar un padding en la card con los píxeles que quieras en cada lado.

![Agregar padding en la  card](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_two.png)

Ahora puedes tomar otros componentes como un texto o un botón y arrastrarlos a tu frame. Espera hasta que una línea azul aparezca en la card y luego suéltalos. ¡Verás que tu card crece de acuerdo al contenido nuevo **y** que mantiene el padding que definiste en el paso anterior! 😎


![La card crece en base al contenido en su interior](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_three.gif)

Veamos qué pasa si tenemos una descripción larga para la card. Agrega un poco más de texto y tus layout breaks. Podemos arreglar esto cambiando la opción `Resizing` en el `text` desde el `Hug contents` hasta el `Fill container`.

**Resizing options**:
- **Fill container** hace que un objeto se estire para llenar su container. Solo puede definirse en los hijos de un frame. En nuestro caso será en el texto.
- **Hug contents** hace que un padre se adapte al tamaño de sus hijos.
- **Fixed** significa que el objeto no cambiará su tamaño ni con el padre ni con los hijos.

![Mantén el diseño usando las opciones de resizing](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_four.gif)

Puedes experimentar cambiando la posición de los hijos en el frame para alinearlos al centro, al final del frame o en algún otro lugar. Si haces clic en la flecha cerca de la palabra clave `Packed`, verás otra opción de distribución llamada `Space between`. Como podrás haber adivinado, te permite alinear los hijos en tu frame tal como lo harías en un CSS flexbox 🤩

![Alínea los ítems en tu card como en un
flexbox](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_five.png)

¿Y si necesitas cambiarle el tamaño a tu card? Asegúrate de seleccionar la opción de resizing llamada `Fill container` tanto en la imágen como en el texto (y en cualquier otro elemento que se estire desde el principio de la card hasta su fin) y después no tendrás ningún problema para agrandar o encoger tu card sin romper el diseño 🎉

![Cámbiale el tamaño a tu card](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_six.gif)

### Más acerca de Auto Layout

Auto Layout es una muy buena forma de diseñar componentes dinámicos. Pero tiene más que ofrecer: ¡también puedes usarlo para reordenar tus elementos rápidamente o para crear pantallas completas que funcionen en diversos dispositivos! Échale un vistazo al [Auto Layout Playground](https://www.figma.com/community/file/784448220678228461) para aprender más.

¡Que disfrutes la Automágia! ✨
