# Encoding: utf-8
require "spec_helper"
require "word_frequency"

describe "#most_common_words" do
  
  text_path = File.dirname(__FILE__) + "/obama.txt"
  stop_words_path = File.dirname(__FILE__) + "/../lib/stop_words.txt"
  

  it "should return a Hash" do
    most_common_words(text_path, stop_words_path, 1).must_be_instance_of Hash 
  end

  it "should compute hash of most frequent words" do
    most_common_words(text_path, stop_words_path, 6).must_equal({"nation"=>3, "america"=>2, "generation"=>2, "crisis"=>2, "oath"=>2, "americans"=>2})
  end
  
end