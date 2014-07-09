# Encoding: utf-8
require "spec_helper"
require "chain_unchain"

describe "#shuffle_word" do
  it "should still work" do
    output = shuffle_word('hello')
    shuffle_word_working = !!output.join.match(/[HELO]{5}/)
    shuffle_word_working.must_equal true
  end

  it "should not use variables" do
    code = File.read("#{__dir__}/../lib/chain_unchain.rb")
    shuffle_word_clean = !!code.match(/def shuffle_word[^=]+end/)
    shuffle_word_clean.must_equal true
  end
end

describe "#quote_prime_numbers" do
  it "should still work" do
    output = quote_prime_numbers(10)
    expected = [1, 2, 3, 5, 7].map { |n| "#{n} is prime" }
    output.must_equal expected
  end
end
