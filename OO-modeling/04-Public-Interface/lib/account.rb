# This is how you define your own custom exception classes
class DepositError < StandardError
end

class BankAccount

  # Contract for the BankAccount class
  # - you can access full owner's name and position, but partial IBAN
  # - you cannot access full IBAN
  # - you can print partial account infos
  # - you can print transactions only with a password
  # - you can withdraw or deposit money

  MIN_DEPOSIT =  100

  def initialize(name, iban, initial_deposit, password)
    raise DepositError, "Insufficient deposit" unless initial_deposit > MIN_DEPOSIT
    @password = password
    @transactions = []
    @position = 0
    @name, @iban = name, iban

    add_transaction(initial_deposit)
  end

  def withdraw(amount)
    # returns a string with a message
  end

  def deposit(amount)
    # returns a string with a message
  end

  def transactions_history(args = {})
    # Should return a string displaying the transactions, BUT NOT return the transaction array !
  end

  def iban
    # Partial getter (should hide the middle of the IBAN like FR14**************606)
  end

  def to_s
    # Method used when printing account object as string (also used for string interpolation)
  end

  private

  def add_transaction(amount)
    # Main account logic
    # Should add the amount in the transactions array
    # Should update the current position
  end

end
