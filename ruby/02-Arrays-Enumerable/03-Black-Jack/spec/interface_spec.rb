# Encoding: utf-8
require "spec_helper"
require "interface"

describe "#state_of_the_game" do
  it 'returns a String' do
    state_of_the_game(1, 2).must_be_instance_of String
  end

  it 'returns an interpolated String' do
    state_of_the_game(1, 2).must_equal "Your score is 1, bank is 2!"
  end
end

describe "#build_message_for" do
  it 'returns a String' do
    build_message_for([1, 2]).must_be_instance_of String
  end

  it 'returns the fact that you lost when over 21' do
    build_message_for([1, 22]).must_equal "You are over 21... you loose."
  end

  it 'returns the fact that you won when doing 21' do
    build_message_for([1, 21]).must_equal "Black Jack!"
  end

  it 'returns the fact that you won when doing more than the bank' do
    build_message_for([18, 20]).must_equal "You beat the bank! You win."
  end

  it 'returns the fact that you lost when doing less than the bank' do
    build_message_for([20, 17]).must_equal "Bank beats you! You loose."
  end


end
