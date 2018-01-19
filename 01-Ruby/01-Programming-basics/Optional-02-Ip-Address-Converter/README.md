## Background and Objectives

Here is another code kata for the fastest among you. We want to manipulate numbers in different a notation, in this case we'll talk about IPv4 addresses.

You might have already seen some IPv4 addresses, for instance `192.168.0.1`, or
`173.194.40.200`. To get an IP address from a domain name, you can use the `host` command. For instance:

```bash
host www.lewagon.com
```

You'll see that `www.lewagon.com` is aliased to a domain on Heroku, which
is mapped to a specific address.

Now you may want to discover your own IP address? Your computer has a local
address given by the WiFi router, and you can get it typing `ips` in your
terminal. If you want to determine what the Public IP Address of this Wifi router is, the one shared between you and other students, you can type `ip`.

```bash
ips
ip
```

These commands are not standard, you have them thanks to the setup we did on the first day. You can review those aliases by opening the `~/.aliases` file with Sublime Text for instance.

## Specs

An IPv4 address is a 32-bit number that identifies a device on the internet.

While computers read and write IP addresses as a 32-bit number, we prefer to read them in dotted-decimal notation, which is basically the number split up into 4 chunks of 8 bits, converted to decimal, and delimited by a dot.

In this kata, you will create the function `ip_to_num` that takes an ip address string and converts it to a number, as well as the function `num_to_ip` that takes a number and converts it to an IP address string.

Example:

```ruby
ip_to_num("37.160.113.170")
# => 631271850

num_to_ip(631271850)
# => "37.160.113.170"
```
