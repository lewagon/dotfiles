## Background and Objectives

In this challenge, we are going to extract data from a French SSN (social security number).

## Specs

Write a `#french_ssn_infos` method extracting infos from a French SSN.

Valid French social security numbers have the following pattern:

> `1 84 12 76 451 089 46`

- Gender                (1 => male, 2 => female)
- Birth year            (84 => 1984)
- Birth month           (12 => december)
- Birth department code (76 => Seine-Maritime, basically included between 01 and 99)
- Birth city code       (3 digits)
- Birth order number    (3 digits)
- A 2 digits check key  (46, equal to the **remainder** of the division of (97 - `ssn_without_key`) by 97)

The method must return the following strings:

```ruby
french_ssn_infos("1 84 12 76 451 089 46")
=> "a man born in December 1984 in Seine-Maritime"

french_ssn_infos("289069176284924")
=> "a woman born in June 1989 in Essonne"

french_ssn_infos("123")
=> "invalid number"
```

Your code should work even if the SSN was given with spaces.

## Hints

The French departments codes and corresponding names are given in the `data/french_department.yml` file and can be accessed with the following code:

```ruby
require 'yaml'

FRENCH_DEPARTMENTS = YAML.load_file("data/french_departments.yml")
puts FRENCH_DEPARTMENTS["76"]
# => Seine-Maritime
```
