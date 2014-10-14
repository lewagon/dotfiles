# Encoding: utf-8
require "longest_word"

describe "#generate_grid" do
  let(:grid) { generate_grid(9) }

  it "should generate grid of required size" do
    expect(grid.size).to eq 9
  end

  it "should generate random grid" do
    expect(grid).not_to eq generate_grid(9)
  end

  it "should allow for repetitive letters" do
    long_grid = generate_grid(26)
    expect(long_grid.uniq.length).not_to eq long_grid.length # hoping not to compute a perfect permutation :)
  end

end

describe "#run_game" do

  let(:perfect) { run_game("wagon", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
  let(:quick) { run_game("law", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
  let(:slow) { run_game("law", %w(W G G Z O N A L), Time.now, Time.now + 10.0) }

  context "the given word is not an english one" do
    let(:not_english) { run_game("zon", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }

    it "should compute score of zero for non-english word" do
      expect(not_english[:score]).to eq 0
    end

    it "should return nil translation for invalid word" do
      expect(not_english[:translation]).to eq nil
    end

    it "should build custom messages for invalid word" do
      expect(not_english[:message]).to eq "not an english word"
    end
  end

  context "the given word is not in the grid" do
    let(:not_in_the_grid) { run_game("train", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }

    it "should compute score of zero for word not in the grid" do
      expect(not_in_the_grid[:score]).to eq 0
    end

    it "should build custom messages for word not in the grid" do
      expect(not_in_the_grid[:message]).to eq "not in the grid"
    end
  end

  it "should compute higher score for longer word" do
    expect(perfect[:score] > quick[:score]).to eq true
  end

  it "should compute higher score for quicker answer" do
    expect(quick[:score] > slow[:score]).to eq true
  end

  it "should consider the first translation returned by the API" do
    expect(perfect[:translation]).to eq "chariot"
  end

  it "should build custom messages for good catch" do
    expect(perfect[:message]).to eq "well done"
  end
end
