## Guidelines

### Morning lecture

#### Introduction
Software are not one-file programs. They are made of classes connected together. From the beginning of the bootcamp, you've been manipulating classes without knowing it, `String`, 'Array', etc... They're the built-in classes. Now you'll see how to define your own classes !


Explain that a class includes 1) data / state (instance variables) and 2) behavior (instance methods). Example: a string is made of data = the chain of characters + behavior = all the methods that can be called (`downcase`, `split`, etc.).

Spend time on the "cake pan" metaphora to explain the difference between the class and its objects. "The cake pan is the class, the cakes created with the cake pan are the instances", repeat it again and again, as much as needed!


#### My first class

Here the best option is to live-code all the concepts directly and discuss them with the class. Spend some time on the file name convention:
- `Car` => `car.rb`
- `SportCar` => `sport_car.rb`

Make the live-code interactive. Ask them: what are the caracteristics of a car? How do you describe its state ?


- coder #initialize avec un argument
- new appelle initialize, le montrer !

def initialize(color)
     p « initialize called with #{color} »
     @color = color
end

- on peut avoir plusieurs arguments initalize(color, brand)
qu’est ce que @color ?

@engine_started = false

stocker des données propres à chaque instance

BEHAVIOR

def engine_started?..end
def start_engine..end

diff: - pas dans le fichier comme ce qu’on a codé, mais DANS la classe
idem String => upcase/downcase

dessiner des boites ac des instances de voitures, ce qu’elle a dans le ventre… une peugeot rouge, une renaut verte.


le initialize = m’état de mon objet à t=0 sa data à ce moment

ACCESSEUR
comment printer le nombre de kilometre ?
p my_car.kms
regarder le message d’erreur

attr: imaginez vous avez 5 variables d’instance (marque, couleur, prix, kilométrage, etc..) et qu’on a envie d’y accéder en lecture et en écriture => 2 x 3 x 5 = 30 lignes de code …relou !!! 2 lignes de code avec les attr !


attr_accessor sur tout ??
non @engine_started on ne veut pas que qq puisse intervenir sur le moteur directement…
méthode de démarrage = interface
démarrer avec les fils => t’as pas envie
exposer des méthodes de démarrage (avec la clef!!)







### Day challenges

Before starting the challenges

- Ensure every student has a clean git status, and that he has pulled upstream. Otherwise students may work on old versions of the challenges :).

```
$ cd ~/code/${GITHUB_USERNAME}/promo-4-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

- Ensure they're connected on the class Slack

- Make a brief overview of the roadmap of the day with them, explaining the general idea behind each challenge.

### Live-code

#### General guidelines
- The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

- Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!

- At the end of the live-code, ensure every `git status` is clean in the class! To make the work of your buddy-teacher easier tomorrow :)


#### Live-code details

