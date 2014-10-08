require "chain_unchain"

describe "#shuffle_word" do
  it "should still work" do
    output = shuffle_word('hello')
    shuffle_word_working = !!output.join.match(/[HELO]{5}/)
    expect(shuffle_word_working).to eq true
  end

  it "should not use variables" do
    code = File.read("#{__dir__}/../lib/chain_unchain.rb")
    shuffle_word_clean = !!code.match(/def shuffle_word[^=]+end/)
    expect(shuffle_word_clean).to eq true
  end
end

describe "#quote_prime_numbers" do
  it "should still work" do
    output = quote_prime_numbers(10)
    expected = [1, 2, 3, 5, 7].map { |n| "#{n} is prime" }
    expect(output).to eq expected
  end
end
