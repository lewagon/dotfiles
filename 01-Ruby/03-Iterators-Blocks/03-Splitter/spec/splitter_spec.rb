require "splitter"

describe "#size_splitter(array, size)" do
  let (:result) do
    size_splitter([], 1)
  end

  it "should return an array" do
    expect(result).to be_a Array
  end

  it "should return an array containing two arrays" do
    expect(result.size).to eq(2)
    expect(result.first).to be_a Array
    expect(result.last).to be_a Array
  end

  FIRST_SAMPLE = %w(dog cat data ask win deal one two cow beer)

  context "with arguments `#{FIRST_SAMPLE}` and `3`" do

    let (:result) do
      size_splitter(FIRST_SAMPLE, 3)
    end

    it "should find 7 words that have 3 letters" do
      expect(result.first.size).to eq(7)
    end

    it "should find 3 words that do not have 3 letters" do
      expect(result.last.size).to eq(3)
    end

    it "should return an array of sorted arrays" do
      expect(result.first).to eq(%w(ask cat cow dog one two win))
      expect(result.last).to eq(%w(beer data deal))
    end

  end

  SECOND_SAMPLE = %w(z a bb cc aa abc)

  context "with arguments `#{SECOND_SAMPLE}` and `2" do
    let (:result) do
      size_splitter(SECOND_SAMPLE, 2)
    end

    it "should not be confused by 1-letter words" do
      expect(result.first).to eq(%w(aa bb cc))
      expect(result.last).to eq(%w(a abc z))
    end
  end
end

describe "#block_splitter" do
  context "when the given block always returns true" do
    let(:result) do
      block_splitter(%w(a b c)) { true }
    end

    it "should return an array where the second array is empty" do
      expect(result.last).to be_empty
    end
  end

  context "when the given block always returns false" do
    let(:result) do
      block_splitter(%w(a b c)) { false }
    end

    it "should return an array where the first array is empty" do
      expect(result.first).to be_empty
    end
  end

  context "when the given block tests if a word starts with an a" do
    let(:result) do
      block_splitter(%w(apple apricot banana pear)) do |element|
        element.start_with? "a"
      end
    end

    it "should return an array where the first array only has a-words" do
      expect(result.first).to eq(%w(apple apricot))
    end

    it "should return the other words in the second array" do
      expect(result.last).to eq(%w(banana pear))
    end
  end
end
