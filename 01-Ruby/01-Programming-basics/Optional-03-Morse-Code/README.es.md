## Contexto y Objetivos

(Fuente: [Wikipedia](https://en.wikipedia.org/wiki/Morse_code))
En 1836, el artista estadunidense Samuel F.B. Morse junto con el físico estadounidense Joseph Henry y Alfred Vail desarrollaron el sistema de telégrafo eléctrico. El sistema enviaba pulsos de corriente eléctrica por cables que controlaban un electroimán que estaba situado en el lado receptor del telégrafo. Se necesitaba un código para transmitir lenguaje natural usando solo estos pulsos, y los momentos de silencio entre ellos. Morse se convirtió en el precursor del **Código Morse Internacional**.

En este ejercicio, escribiremos código morse **codificador** y **décodificador**. Solo consideraremos las 26 letras del alfabeto inglés, ("A" -> "Z") e ignoraremos todos los demás caracteres (números, puntuación, etc.).

### Especificaciones

Primero implementa el método `encode` el cual tomará texto como parámetros y devolverá la secuencia Morse respectiva. Las letras de una misma palabra serán separadas por un espacio y las palabras serán separadas por el símbolo de barra vertical `|`.

Por ejemplo, la oración `"Hi Guys"` deberá codificarse de la siguiente manera `".... ..|--. ..- -.-- ..."`

Una vez que el codificador esté en marcha, podrás trabajar en el método `decode` el cual hará ¡lo opuesto!

