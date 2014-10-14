require "text_analyzer"

describe "#analyze" do
  it "should return a hash" do
    expect(analyze("")).to be_a Hash
  end

  it "should return basic statistics for a simple sentence" do
    expect(analyze("I love programming.")).to eq({
      character_count: 19,
      line_count: 1,
      word_count: 3,
      sentence_count: 1,
      paragraph_count: 1,
      average_words_per_sentence: 3,
      average_sentences_per_paragraph: 1
    })
  end

  # TODO: add more spec with external file and lots of paragraphs.
end