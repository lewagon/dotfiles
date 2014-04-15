## Background & Objectives

### Introduction

Good object-oriented design relies on understanding how much of an object to **expose**.

Exposing an object means making its properties (internal data) available to the "public", i.e. other objects in the program or even other programs. Together, these public methods make up an object's **public interface**. The methods which are private (accessible only within the object itself) make up its **private interface**.

As a general rule, you should only expose as much of an object as is needed for other objects to interact with it. Design objects that can take care of their own properties. They shouldn't just invite everyone else in to mess around with their business. **Don't design permeable objects if they don't need to be permeable**

### Objectives

- Create a class with a public interface
- Play with getters
- Learn to use the to_s method
- Use default arguments for methods
- Learn more about custom Exceptions

Let's play with a `BankAccount` class that stores information about a bank account, and enables a user to make transactions.

## Specs

#### The `BankAccount` contract in `account.rb`
The public interface of the class, i.e. the set of all its public methods, defines what's called the class contract (see the notion of [DbC](http://en.wikipedia.org/wiki/Design_by_contract)). It is the promess made by the class to other objects or other ruby programs. Let's specify our `BankAccount` class contract in full English. Here's what we want to be able to do on BankAccount objects from the outside world :

* Access full owner's name and position
* Access only partial IBAN
* Print partial account infos in a user-friendly way
* Print transactions history if a password is provided
* Withdraw or deposit money

##### Which getters ?
Given this class contract, and the code canvas, decide which getters are necessary for the `BankAccount` class.

#### Partial IBAN getter
Code a partial IBAN accessor, which hides the middle of the IBAN, replacing the characters by `*`, as in our example in the test suite.

##### The `to_s` method
You will probably come across many classes in Ruby that redefine the built-in method `to_s`. This is an easy way to display taylor-made information about an object to the user, and to control which information is printed

This is the method called when you try to print the object or use string interpolation. Once implemented, it will be called as in the following examples :

```ruby
account = BankAccount.new("Bruce Lee", "FR14-2004-1010-0505-0001-3M02-606", 200, "brucelit")
puts account
# =>  Owner: Bruce Lee
#     IBAN: FR14**************606
#     Current amount: 200 euros
puts "Account info\n#{account}"
# =>  Account info
#     Owner: Bruce Lee
#     IBAN: FR14**************606
#     Current amount: 200 euros```
```

Implement your `BankAccount#to_s` method, which should call your partial IBAN getter by the way.

##### Withdraw and Deposit
Implement `BankAccount#withdraw` and `BankAccount#deposit`. Both these methods should call the private `BankAccount#add_transaction` method (which is also called in the `BankAccount#initialize`). These methods should return a message like "You've just withdrawn/deposit XXX euros".

##### Transactions history
Now you have to implement  `BankAccount#transactions_history` method. This method takes a password hash as parameter, which is an optional parameter, and is set to the empty hash if not provided (this is the meaning of the notation `args={}`). You transaction history method should

1. print the transactions array if good password is given.
2. print "wrong password" if the password does not correspond to the account's password.
3. print "no password given" if the method is called without arguments.

#### Printing = returning a string, not the object !
Note that your method `transactions_history` should **print** the transactions array but not return it directly, that's what is said in the class contract. Let's imagine you code something like

```ruby
def transactions_history(args = {})
  (args[:password] == @password) ? @transactions : "wrong password"
end
```

This would be very dangerous as you are returning `@transactions` directly, which is very different from printing a string. With a bad implementation as this one, you enable users to access and modify the transactions array from the outside world ! For instance

```ruby
account = BankAccount.new("Bruce Lee", "FR14-2004-1010-0505-0001-3M02-606", 200, "brucelit")
account.transactions_history(password: "brucelit") << 100
account.transactions_history(password: "brucelit") # => [200, 100]
```

That is NOT what is expected from the class contract, we only want to add amounts to the transactions array through the `withdraw` and `deposit` methods, which are our chosen interface for making transactions, and not by directly accessing the transactions array !

## Extra : enhance your transactions
What about enhancing our bank account, by adding infos about the date of each transactions ? And change our transaction history method so that it prints transactions like

```ruby
+ 200 euros on 22/10/13 at 8:30am
- 120 euros on 30/11/13 at 2:30pm
+ 1050 euros on 30/11/13 at 2:30pm
```

Read about the [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle), now ask yourself :
- What's the responsibility of the `BankAccount` class ? Print basic account info and enable for cash withdraw/deposit, right?
- Is is the responsibility of the bank account to keep track of the date of each transaction and prints each transaction nicely?

Here comes the time where you might delegate these responsibilities to another `Transaction` class, which would be responsible for :
- keeping track of the date and amount of the deposit or withdraw
- printing nicely these infos about itself
- you could even think of additional data for this class such as a `@message` instance variable to store the reason of each withdraw/deposit  ("car rent", "pay day", "christmas gifts"...)

After implementing your `Transaction` class, you will have to change your `BankAccount` class so that its transactions arrays stores `Transaction` objects instead of numbers. You will also have to load the *transaction.rb* file in *account.rb* with

```ruby
require_relative 'transaction'`
```

## Learning badges

- What is the public interface of a class ?
- What's the difference between a getter and a setter ?
- What's the to_s method's use ?
- What is the use of default arguments ? How do you use them ?
- In `account.rb` what is happening Lines 2-3 and Line 19 ?

## Tips & Resources

- You could use `Time#strftime` method to format your date in `Transaction#to_s`.**
