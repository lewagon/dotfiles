## Background and Objectives

Here is another code kata for the fastest among you. We want to manipulate numbers in a different notation, in this case we'll talk about IPv4 addresses.

You might have already seen some IPv4 addresses, for instance `192.168.0.1`, or `173.194.40.200`. To get an IP address from a domain name, you can use the `host` command. For instance:

```bash
host www.lewagon.com
```

You'll see that `www.lewagon.com` is aliased to a domain on Heroku, which is mapped to a specific address.

Now you may want to discover your own IP address? Your computer has a local address given by the WiFi router, and you can get it typing `ips` in your terminal. If you want to determine what the Public IP Address of this Wifi router is, the one shared between you and other students, you can use the following command:

```bash
curl https://ipinfo.io/json
```

## Specs

An IPv4 address is a 32-bit number that identifies a device on the internet.

While computers read and write IP addresses as a 32-bit number, we prefer to read them in dotted-decimal notation, which is basically the number split up into 4 chunks of 8 bits, converted to decimal, and delimited by a dot.

In this kata, you will create the function `ip_to_num` that takes an ip address string and converts it to a number, as well as the function `num_to_ip` that takes a number and converts it to an IP address string.

This is how we represent 8-bit in binary:

```ruby
00000000
# => 0

11111111
# => 255
```

How do we go from binary to decimal? We use the power of 2.

```ruby
2^7 | 2^6 | 2^5 | 2^4 | 2^3 | 2^2 | 2^1 | 2^0 |
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
```

So a 32-bit ip address would be:

```ruby
00000000.00000000.00000000.00000000
# => 0.0.0.0
11111111.11111111.11111111.11111111
# => 255.255.255.255
```

Example:

If we take `37.160.113.170`. We have to start with the first 8-bit : `37`. Can I susbstract `128` from `37`? No, so we assign  `0` to `128`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |
```

Can I substract `64` from `37`? No, so we assign `0` to `64`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0
```

Can I substract `32` from `37`? Yes, so we assign `1` to `32` and our remainder is now `5`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |
```

Can I substract `16` from `5`? No, so we assign `0` to `16`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |   0 |
```

Can I substract `8` from `5`? No, so we assign `0` to `8`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |
```

Can I substract `4` from `5`? Yes, so we assign `1` to `4` and our remainder is now `1`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |  1  |
```

Can I substract `2` from `1`? No, so we assign `0` to `2`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |  1  |  0  |
```

Can I substract `1` from `1`? Yes, so we assign `1` to `1` and our remainder is `0`.

```ruby
128 |  64 |  32 |  16 |  8  |  4  |  2  |  1  |
 0  |  0  |   1 |  0  |  0  |  1  |  0  |  1  |
```

So `37` is `00100101` in binary! (`32 + 4 + 1`). Repeat for the other three 8-bit numbers and you'll get the full ip in binary.

- `160` is `10100000` in binary! (`128 + 32`).
- `113` is `01110001` in binary! (`64 + 32 + 16 + 1`).
- `170` is `10101010` in binary! (`128 + 32 + 8 + 2`).

Remove the `.` to get `00100101101000000111000110101010` and apply our method to it: `536870912 (2 power 29) + 67108864 (2 power 26) + 16777216 (2 power 24) + 8388608 (2 power 23) + 2097152 (2 power 21) + 16384 (2 power 14) + 8192 (2 power 13) + 4096 (2 power 12) + 256 (2 power 8) + 128 (2 power 7) + 32 (2 power 5) + 8 (2 power 3) + 2 (2 power 1)  = 631271850`.

So ```631271850``` is the decimal number for the ip address ```37.160.113.170```.

The goal of your code is to  have 2 methods, one to transform an ip to a number and one to tranform a number to an ip address.

```ruby
ip_to_num("37.160.113.170")
# => 631271850

num_to_ip(631271850)
# => "37.160.113.170"
```
