## Introduction

Good object-oriented design relies on understanding how much of an object to **expose**.

Exposing an object means making its properties (internal data) available to the "public", i.e. other objects in the program or even other programs. Together, these public methods make up an object's **public interface**. The methods which are private (accessible only within the object itself) make up its **private interface**.

As a general rule, you should only expose as much of an object as is needed for other objects to interact with it. Design objects that can take care of their own properties. They should not invite everyone else in to mess around with their business. **Don't design permeable objects if they don't need to be permeable**

## Objectives

- Create a class with a public interface
- Play with getters
- Write your own `to_s` method
- Use default arguments for methods
- Learn more about custom Exceptions

Let's play with a `BankAccount` class that stores information about a bank account, and enables a user to make transactions.

## Specs

### The `BankAccount` contract in `bank_account.rb`

The public interface of the class, i.e. the set of all its public methods, defines what is called the class contract (see the notion of [DbC](http://en.wikipedia.org/wiki/Design_by_contract)). It is a sort of promise made by the class to other objects or other ruby programs. Below we specify our `BankAccount` class contract. We want to be able to do the following with our BankAccount objects from the outside world :

* Access owner's full name and balance
* Access only **partial** IBAN
* Print partial account info in an user-friendly way
* Print transaction history if a password is provided
* Withdraw or deposit money


### The `to_s` method

You will probably come across many classes in Ruby that redefine the built-in method `to_s`. This is an easy way to display taylor-made information about an object to the user, and to control which information is printed.

This is the method called when you try to print the object or use string interpolation. Once implemented, it will be called as in the following examples :

```ruby
account = BankAccount.new("John Lennon", "FR14-2004-1010-0505-0001-3M02-606", 200, "yoko")

puts account
# =>  Owner: John Lenon - IBAN: FR14**************606 - Balance: 200 euros
```

Implement your `#to_s` method, which should call your partial IBAN method.

### Withdraw and Deposit

Implement `#withdraw` and `#deposit`. Both of these methods should call the private `#add_transaction` method (which is also called in the `#initialize`). These methods should return a message like "You've just withdrawn/deposited XXX euros".

### Transactions history

Now you have to implement  `#transactions_history` method. This method takes a password hash as parameter (for example `{ password: 'yoko' }`), which is an optional parameter, and is set to the empty hash if not provided (this is the meaning of the notation `args = {}`). Your transaction history method should

1. return a string displaying the transactions if the right password is given.
2. return `"wrong password"` if the password does not correspond to the account's password.
3. return `"no password given"` if the method is called without arguments.

## (Optional) Add a `Transaction` class

What about enhancing our bank account, by adding info about the date of each transactions? And change our transaction history method so that it prints transactions like:

```bash
+ 200 euros on 22/10/13 at 8:30am
- 120 euros on 30/11/13 at 2:30pm
+ 1050 euros on 30/11/13 at 2:30pm
```

Read about the [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle), now ask yourself:
- What is the responsibility of the `BankAccount` class? Its main responsibility is to print basic account info and enable for cash withdrawal/deposit, right?
- Is is the responsibility of the bank account to keep track of the date of each transaction and print each transaction nicely?

Here comes the time where you might delegate these responsibilities to another `Transaction` class which would be responsible for:
- keeping track of the date and amount of the deposit or withdrawal
- printing these info about itself in an user-friendly fashion
- you could even think of additional data for this class such as a `@message` instance variable to store the reason of each withdrawal/deposit ("car rent", "pay day", "christmas gifts"...)

After implementing your `Transaction` class, you will have to change your `BankAccount` class so that its transactions arrays stores `Transaction` objects instead of numbers. You will also have to load the *transaction.rb* file in *account.rb* with

```ruby
require_relative 'transaction'
```

## Key learning points

- What is the public interface of a class?
- What is the difference between a getter and a setter?
- What is the to_s method's use?
- What is the use of default arguments? How do you use them?
- In `bank_account.rb` what is happening in lines 2-3 and line 19?

## Further suggestions & resources

- You could use `Time#strftime` method to format your date in `Transaction#to_s`.**
