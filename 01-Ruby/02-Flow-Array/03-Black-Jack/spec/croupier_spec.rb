# Encoding: utf-8
require "croupier"

describe "#state_of_the_game" do
  it 'returns a String' do
    expect(state_of_the_game(1, 2)).to be_a String
  end

  it "returns an interpolated String with player and bank' scores" do
    expect(state_of_the_game(1, 2)).to match /score is 1/i
    expect(state_of_the_game(1, 2)).to match /bank('s)?( score)? is 2/i
  end
end

describe "#end_game_message" do
  it 'returns a String' do
    expect(end_game_message(2, 16)).to be_a String
  end

  it "returns a message telling you that you lost when going over 21" do
    expect(end_game_message(22, 16)).to match /los[et]/i
  end

  it 'returns a "Black Jack" when you reached 21 exactly' do
    expect(end_game_message(21, 16)).to match /black[ -]?jack/i
  end

  it 'returns "Push" when it\'s a draw' do
    expect(end_game_message(18, 18)).to match /push/i
  end

  it 'returns a message telling you that you lost if your score is lower than the bank\'s' do
    expect(end_game_message(20, 18)).to match /w[io]n/i
  end

  it 'returns a message telling you that you won if your score is lower than the bank\'s' do
    expect(end_game_message(17, 20)).to match /los[et]/i
  end
end
