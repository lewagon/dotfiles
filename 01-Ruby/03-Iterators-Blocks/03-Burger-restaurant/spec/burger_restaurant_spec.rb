require 'burger_restaurant'

puts <<~HEREDOC


                 /_       ,_   __   _   ,_
________________/_)_(_/__/ (__(_/__(/__/ (_
                              _/_
                             (/

      ,_   _   ,   -/-__,        ,_  __,   ,__,  -/-
    _/ (__(/__/_)__/_(_/(__(_/__/ (_(_/(__/ / (__/___________________


HEREDOC

describe "burger_restaurant.rb", unless: @watermark do
  describe "#burger" do
    it "should return an array of strings with [\"bread\", `ingredient`, `sauce`, `topping`, \"bread\"]" do
      expect(burger("a", "b", "c")).to be_a(Array)
      expect(burger("steak", "ketchup", "onions")).to eq(["bread", "steak", "ketchup", "onions", "bread"])
      expect(burger("fish", "mayo", "salad")).to eq(["bread", "fish", "mayo", "salad", "bread"])
    end

    it "should be able to take a block" do
      expect{|block| burger("fish", "barbecue", "salad", &block)}.to yield_control
    end

    it "should be able to take a block with arguments" do
      expect{|block| burger("fish", "barbecue", "salad", &block)}.to yield_with_args(String)
    end
  end
end

