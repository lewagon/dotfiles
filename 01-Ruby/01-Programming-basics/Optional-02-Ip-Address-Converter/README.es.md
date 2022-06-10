## Contexto y Objetivos

Este es otro Kata de código para los más rápidos entre ustedes. Vamos a manipular nombres con un concepto diferente. En este caso vamos a hablar de direcciones IPv4.

Tal vez ya hayas visto algunas direcciones IPv4. Por ejemplo:  `192.168.0.1`, o `173.194.40.200`. Para obtener la dirección IP desde un nombre de dominio, puedes usar el comando `host`. Por ejemplo:

```bash
host www.lewagon.com
```

Verás que `www.lewagon.com` está vinculado a un dominio en Heroku el cual está mapeado a una dirección específica.

¿Quieres saber tu dirección IP? Tu computadora tiene una dirección local otorgada por el router WiFi y por lo tanto la puedes ver al escribir `ips` en tu terminal. Puedes type esto si quieres ver la dirección IP pública de este router, la que compartes con los otros estudiantes:

```bash
curl https://ipinfo.io/json
```

## Especificaciones

Una dirección IPv4 es un número de 32 bits que identifica a un dispositivo en Internet.

Las computadoras leen y escriben direcciones IP como números de 32 bits. Pero nosotros preferimos leerlas en notación decimal punteada, que realmente es el número separado en cuatro partes de 8 bits, transformado a decimal y delimitado por un punto.

En este Kata, crearás la función `ip_to_num` que toma una cadena de caracteres (string) de dirección IP y la convierte en un número. También crearás la función `num_to_ip` la cual toma un número y lo convierte en un string de dirección IP.

Así es como representamos un binario de 8 bits:

```ruby
00000000
# => 0

11111111
# => 255
```

¿Cómo pasamos de binario a decimal? Usamos el poder del 2.

```ruby
2^7 | 2^6 | 2^5 | 2^4 | 2^3 | 2^2 | 2^1 | 2^0 |
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
```

Así que una dirección IP de 32 bits sería:

```ruby
00000000.00000000.00000000.00000000
# => 0.0.0.0
11111111.11111111.11111111.11111111
# => 255.255.255.255
```

Ejemplo:

Si consideramos `37.160.113.170`, debemos comenzar por los primeros 8 bits: `37`. ¿Puedo restarle `128` a `37`? No. Así que le asignamos `0` a `128`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |
```

¿Puedo restarle `64` a `37`? No. Así que le asignamos `0` a `64`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0
```

¿Puedo restarle `32` a `37`? Sí. Así que le asignamos `1` a `32` y nos queda `5`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |
```

¿Puedo restarle `16` a `5`? No. Así que le asignamos `0` a `16`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |   0 |
```

¿Puedo restarle `8` a `5`? No. Así que le asignamos `0` a `8`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |
```

¿Puedo restarle `4` a `5`? Si. Así que le asignamos `1` a `4` y nos queda `1`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |  1  |
```

¿Puedo restarle `2` a `1`? No. Así que le asignamos `0` a `2`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |  1  |  0  |
```

¿Puedo restarle `1` a `1`? Si. Así que le asignamos `1` a `1` y nos queda `0`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |  1  |  0  |  1  |
```

Bueno, ¡`37` es  `00100101` en binario! (`32 + 4 + 1`). Repite los pasos para los otros números de 8 bits y obtendrás la dirección IP completa en binario.

- ¡`160` es `10100000` en binario! (`128 + 32`).
- ¡`113` es `01110001` en binario! (`64 + 32 + 16 + 1`).
- ¡`170` es `10101010` en binario! (`128 + 32 + 8 + 2`).

Quita el `.`  para obtener `00100101101000000111000110101010` y aplícale nuestro método: `536870912 (2 elevado a 29) + 67108864 (2 elevado a 26) + 16777216 (2 elevado a 24) + 8388608 (2 elevado a 23) + 2097152 (2 elevado a 21) + 16384 (2 elevado a 14) + 8192 (2 elevado a 13) + 4096 (2 elevado a 12) + 256 (2 elevado a 8) + 128 (2 elevado a 7) + 32 (2 elevado a 5) + 8 (2 elevado a 3) + 2 (2 elevado a 1)  = 631271850`.

Así que ```631271850``` es el número decimal para la dirección IP ```37.160.113.170```.

El objetivo de tu código es tener 2 métodos. Uno para transformar una dirección IP a un número y otro para transformar un número a una dirección IP.

```ruby
ip_to_num("37.160.113.170")
# => 631271850

num_to_ip(631271850)
# => "37.160.113.170"
```
