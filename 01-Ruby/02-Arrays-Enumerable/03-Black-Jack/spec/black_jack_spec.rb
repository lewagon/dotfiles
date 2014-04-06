# Encoding: utf-8
require "spec_helper"
require "black_jack"

describe "#bank_score" do
  it "returns a number" do
    bank_score.must_be_kind_of Numeric
  end

  it "is between 16 and 21" do
    scores = []
    1000.times do
      score = bank_score
      unless (16..21).include?(score)
        scores << score
      end
    end

    scores.must_equal []
  end
end

describe "#pick_card" do
  it "returns a number" do
    pick_card.must_be_kind_of Numeric
  end

  it "is between 1 and 11" do
    scores = []
    1000.times do
      score = pick_card
      unless (1..11).include?(score)
        scores << score
      end
    end

    scores.must_equal []
  end
end

describe "#game_outcome" do
  it "returns an Array" do
    game_outcome(1, 2).must_be_instance_of Array
  end

  it "returns an Array containing the parameters" do
    game_outcome(1, 2).must_equal [1, 2]
  end
end
