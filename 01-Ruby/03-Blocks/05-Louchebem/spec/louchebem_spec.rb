# Encoding: utf-8

require "louchebem"

describe "#louchebemize" do

  let(:suffixes) { %w(em é ji oc ic uche ès) }
  let(:fou_translations) { %w(loufem loufé loufji loufoc loufic loufuche loufès) }
  let(:chat_translations) { %w(latchem latché latchji latchoc latchic latchuche latchès) }
  let(:translations_pairs) { chat_translations.product(fou_translations) }

  it "final suffix should be in (em é ji oc ic uche ès)" do
    expect(fou_translations).to include louchebemize("fou")
  end

  it "should not translate one-letter word" do
    expect(louchebemize("l")).to eq "l"
  end

  it "should behave differently for word beginning with a vowel" do
    translations = %w(latoutem latouté latoutji latoutoc latoutic latoutuche latoutès)
    expect(translations).to include louchebemize("atout")
  end

  it "should handle word beginning with several consonants" do
    expect(chat_translations).to include louchebemize("chat")
  end

  it "should translate a sentence including white spaces" do
    translations = []
    translations_pairs.each do |pair|
      translations << "#{pair[0]} #{pair[1]}"
    end
    expect(translations).to include louchebemize("chat fou")
  end

  it "should translate any sentence with special characters" do
    translations = []
    translations_pairs.each do |pair|
      translations << "#{pair[0]}, #{pair[1]}!!"
    end
    expect(translations).to include louchebemize("chat, fou!!")
  end

end