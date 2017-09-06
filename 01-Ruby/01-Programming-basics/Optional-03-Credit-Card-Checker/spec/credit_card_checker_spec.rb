require "credit_card_checker"

describe "visa?" do
  it "should return true if card number starts with a 4" do
    expect(visa?("4485888168897969")).to eq(true)
  end

  it "should return true for a valid card number ignoring any spaces" do
    expect(visa?("  4485 8881 6889  7969")).to eq(true)
  end

  it "should return false if card number starts with a 5" do
    expect(visa?("5281148957047240")).to eq(false)
  end
end

describe "mastercard?" do
  it "should return true if card number starts with a 5" do
    expect(mastercard?("5281148957047240")).to eq(true)
  end

  it "should return false if card number starts with a 4" do
    expect(mastercard?("4485888168897969")).to eq(false)
  end
end

describe "valid_card?" do
  it "should return false when given an empty card number" do
    expect(valid_card?("")).to eq(false)
  end

  # https://stripe.com/docs/testing#cards
  it "should return true for the default credit card number of Stripe - 4242 4242 4242 4242" do
    expect(valid_card?("4242 4242 4242 4242")).to eq(true)
  end

  it "should return true for a valid credit card number no matter how many spaces between numbers" do
    expect(valid_card?("4242 4242  42424242")).to eq(true)
  end

  it "should return false for the invalid credit card number: 5555 5555 5555 5555" do
    expect(valid_card?("5555 5555 5555 5555")).to eq(false)
  end

  it "should return false for the invalid credit card number: 4242424242424241" do
    expect(valid_card?("4242424242424241")).to eq(false)
  end
end
