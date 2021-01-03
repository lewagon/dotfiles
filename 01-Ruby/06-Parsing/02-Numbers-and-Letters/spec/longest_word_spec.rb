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
    long_grid = generate_grid(27)
    expect(long_grid.uniq.length).not_to eq long_grid.length
  end
end

describe "#run_game" do

  let(:perfect) { run_game("wagon", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
  let(:quick) { run_game("law", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }
  let(:slow) { run_game("law", %w(W G G Z O N A L), Time.now, Time.now + 10.0) }
  let(:repetitive) { run_game("season", %w(S S A Z O N E L), Time.now, Time.now + 1.0) }

  context "the given word is not an english one" do
    let(:not_english) { run_game("zon", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }

    it "should compute score of zero for non-english word" do
      expect(not_english[:score]).to eq 0
    end

    it "should build a custom message for an invalid word" do
      expect(not_english[:message]).to match(/not an english word/i)
    end
  end

  context "the given word is not in the grid" do
    let(:not_in_the_grid) { run_game("train", %w(W G G Z O N A L), Time.now, Time.now + 1.0) }

    it "should compute score of zero for word not in the grid" do
      expect(not_in_the_grid[:score]).to eq 0
    end

    it "should build a custom message for a word not in the grid" do
      expect(not_in_the_grid[:message]).to match(/not in the grid/i)
    end
  end

  context "the given word has the correct letters but some letters are overused" do
    let(:not_enough_letters) { run_game("spell", %w(S P E L O O O O), Time.now, Time.now + 1.0) }

    it "should tell it's not in the grid" do
      expect(not_enough_letters[:score]).to eq 0
      expect(not_enough_letters[:message]).to match(/not in the grid/i)
    end
  end


  it "should return a detailed hash of result (with `:score`, `:message` and `:time`)" do
    expect(perfect).to be_a(Hash)
    expect(perfect).to include({
      score: be_a(Numeric),
      message: be_a(String),
      time: be_a(Numeric)
    })
  end

  it "should compute higher score for longer word" do
    expect(perfect[:score] > quick[:score]).to eq true
  end

  it "should compute higher score for quicker answer" do
    expect(quick[:score] > slow[:score]).to eq true
  end

  it "should allow success when answer has repetitive letters" do
    expect(repetitive[:score] > 0).to eq true
  end

  it "should build a custom messages for a correct word" do
    expect(perfect[:message]).to match(/well done/i)
  end
end
