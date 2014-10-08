# Encoding: utf-8
require "croupier"

describe "#state_of_the_game" do
  it 'returns a String' do
    expect(state_of_the_game(1, 2)).to be_a String
  end

  it 'returns an interpolated String' do
    expect(state_of_the_game(1, 2)).to match /score is 1/i
    expect(state_of_the_game(1, 2)).to match /bank is 2/i
  end
end

describe "#end_game_message" do
  it 'returns a String' do
    expect(end_game_message(2, 16)).to be_a String
  end

  it 'returns the fact that you lose when over 21' do
    expect(end_game_message(22, 16)).to match /lose/i
  end

  it 'returns the fact that you win when doing 21' do
    expect(end_game_message(21, 16)).to match /black jack/i
  end

  it 'returns the fact that you won when doing more than the bank' do
    expect(end_game_message(20, 18)).to match /win/i
  end

  it 'returns the fact that you lost when doing less than the bank' do
    expect(end_game_message(17, 20)).to match /lose/i
  end
end
