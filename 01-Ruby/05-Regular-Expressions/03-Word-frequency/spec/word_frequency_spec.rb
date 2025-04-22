require "word_frequency"

describe "#most_common_words" do

  text_path = File.dirname(__FILE__) + "/obama.txt"
  stop_words_path = File.dirname(__FILE__) + "/../lib/stop_words.txt"


  it "should return a Hash" do
    expect(most_common_words(text_path, stop_words_path, 1)).to be_a Hash
  end

  it "should compute hash of most frequent words" do
    expect(most_common_words(text_path, stop_words_path, 6)).to eq ({"nation"=>3, "america"=>2, "generation"=>2, "crisis"=>2, "oath"=>2, "americans"=>2})
  end

end
