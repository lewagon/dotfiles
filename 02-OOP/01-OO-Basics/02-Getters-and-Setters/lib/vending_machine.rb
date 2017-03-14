class VendingMachine
  # TODO: add relevant getter/setter to this class to make the scenarios pass.

  def initialize(snack_price_cents, snacks)
    @amount_cents = 0
    @snacks = snacks
    @snack_price_cents = snack_price_cents
  end

  def insert_coin(value_cents)
    # TODO: what happens to `@snacks, @current_value and @snack_price when the user insert a coin?
  end

  def buy_snack
    # TODO: what happens to `@snacks, @current_value and @snack_price when the user pushes a button to buy a Snack?
  end
end
