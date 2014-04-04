# Encoding: utf-8

require "spec_helper"
require "louchebem"

describe "#louchebemize" do

  let(:suffixes) { %w(em é ji oc ic uche ès) }  
  let(:fou_translations) { %w(loufem loufé loufji loufoc loufic loufuche loufès) }
  let(:chat_translations) { %w(latchem latché latchji latchoc latchic latchuche latchès) }
  let(:translations_pairs) { chat_translations.product(fou_translations) }  
  
  it "final suffix should be in (em é ji oc ic uche ès)" do
    fou_translations.must_include louchebemize("fou")
  end
  
  it "should not translate one-letter word" do
    louchebemize("l").must_equal "l"
  end
  
  it "should behave differently for word beginning with a vowel" do
    translations = %w(latoutem latouté latoutji latoutoc latoutic latoutuche latoutès)
    translations.must_include louchebemize("atout")
  end
  
  it "should handle word beginning with several consonants" do
    chat_translations.must_include louchebemize("chat")
  end
  
  it "should translate a sentence including white spaces" do
    translations = []
    translations_pairs.each do |pair|
      translations << "#{pair[0]} #{pair[1]}"
    end
    translations.must_include louchebemize("chat fou")
  end
  
  it "should translate any sentence with special characters" do
    translations = []
    translations_pairs.each do |pair|
      translations << "#{pair[0]}, #{pair[1]}!!"
    end
    translations.must_include louchebemize("chat, fou!!")
  end
  
end