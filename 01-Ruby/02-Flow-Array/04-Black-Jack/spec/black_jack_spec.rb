require "black_jack"

describe "#pick_bank_score" do
  it "should return a number" do
    expect(pick_bank_score).to be_a Numeric
  end

  it "should give a number between 16 and 21" do
    scores = []
    100.times do
      score = pick_bank_score
      scores << score if (16..21).include?(score)
    end

    expect(scores.size).to eq(100)
  end
end

describe "#pick_player_card" do
  it "should return a number" do
    expect(pick_player_card).to be_a Numeric
  end

  it "should draw a number between 1 and 11" do
    scores = []
    100.times do
      score = pick_player_card
      scores << score if (1..11).include?(score)
    end

    expect(scores.size).to eq(100)
  end
end
