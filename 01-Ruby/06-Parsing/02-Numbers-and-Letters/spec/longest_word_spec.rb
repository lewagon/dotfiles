# Encoding: utf-8

require "spec_helper"
require "longest_word"

describe "#generate_grid" do
  let(:grid) { generate_grid(9) }
  
  it "should generate grid of required size" do
    grid.size.must_equal 9
  end
  
  it "should generate random grid" do
    grid.wont_equal generate_grid(9)
  end
  
  it "should allow for repetitive letters" do
    long_grid = generate_grid(26)
    long_grid.uniq.length.wont_equal long_grid.length # hoping not to compute a perfect permutation :)
  end

end

describe "#run_game" do

  let(:perfect) { run_game("wagon", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
  let(:quick) { run_game("law", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
  let(:slow) { run_game("law", %w(W G G Z O N A L), Time.now, Time.now + 10.0) }
  
  context "the given word is not an english one" do
    let(:not_english) { run_game("zon", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
    
    it "should compute score of zero for non-english word" do
      not_english[:score].must_equal 0
    end
    
    it "should return nil translation for invalid word" do
      not_english[:translation].must_equal nil
    end
    
    it "should build custom messages for invalid word" do
       not_english[:message].must_equal "not an english word"
    end
  end
  
  context "the given word is not in the grid" do
    let(:not_in_the_grid) { run_game("train", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
    
    it "should compute score of zero for word not in the grid" do
      not_in_the_grid[:score].must_equal 0
    end
    
    it "should build custom messages for word not in the grid" do
       not_in_the_grid[:message].must_equal "not in the grid"
    end
  end
  
  it "should compute higher score for longer word" do
    perfect[:score].must_be :>, quick[:score]
  end
  
  it "should compute higher score for quicker answer" do
    quick[:score].must_be :>, slow[:score]
  end
  
  it "should consider the first translation returned by the API" do
    perfect[:translation].must_equal "chariot"
  end
  
  it "should build custom messages for good catch" do
     perfect[:message].must_equal "well done"
  end
end
