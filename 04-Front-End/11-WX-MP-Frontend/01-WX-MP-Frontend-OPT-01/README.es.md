## Contexto y Objetivos

¡Cada vez que reinicias tu aplicación los datos de tu post desaparecen! Para retenerlos debemos guardarlos en el **caché de los teléfonos** de los usuarios.

## Especificaciones

- Cuando un usuario envíe una nueva historia FMC, guárdala en el caché de su teléfono. Revisa la [documentacion API de setStorage API](https://developers.weixin.qq.com/miniprogram/en/dev/api/data.html#wxsetstoragesynckeydata) para averiguar cómo hacerlo.
- ¡Inspecciona el caché del teléfono usando la pestaña del depurador ("debugger") de **"Storage"** de la consola!
- Cuando se inicie la aplicación o cuando se muestre una página, obtén las historias del caché y cárgalos en tu *local data*. Revisa la [documentacion API de getStorage](https://developers.weixin.qq.com/miniprogram/en/dev/api/data.html#wxgetstoragesynckey
).* _Consejo: Tencent suministró un caso de uso de almacenamiento en caché directamente en el `onLaunch` de tu App ;)_
