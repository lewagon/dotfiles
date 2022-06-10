require "experiment"

describe "#get_rid_of_surrounding_whitespaces" do
  it "should get rid of both leading and trailing whitespaces" do
    expect(get_rid_of_surrounding_whitespaces("  hey yo  ")).to eq("hey yo")
    expect(get_rid_of_surrounding_whitespaces(" nice try!")).to eq("nice try!")
  end
end

describe "#belongs_to?" do
  it "should return true if the word is included in the string" do
    expect(belongs_to?("hey jude", "jude")).to eq(true)
  end

  it "should return false if the word is not included in the string" do
    expect(belongs_to?("hey jude", "joe")).to eq(false)
  end
end

describe "#replace" do
  it "should correctly replace the letter(s) in the string" do
    expect(replace("casanova", "a", "o")).to eq "cosonovo"
    expect(replace("casanova", "o", "a")).to eq "casanava"
    expect(replace("hello world", "h", "y")).to eq "yello world"
    expect(replace("hello world", "l", "i")).to eq "heiio worid"
  end
end

describe "#exactly_divide" do
  it "should show exact division" do
    expect(exactly_divide(13, 4)).to eq 3.25
  end
end

describe "#divisible_by_two?" do
  it "should return true if number is even" do
    expect(divisible_by_two?(6)).to eq true
  end

  it "should return false if number is odd" do
    expect(divisible_by_two?(7)).to eq false
  end
end

describe "#random_subset" do
  let(:array) { ("a".."z").to_a }
  let(:random_subset_example) { random_subset(array, 4) }

  it "should return an array of the correct size" do
    expect(random_subset_example).to be_a Array
    expect(random_subset_example.size).to eq 4 if random_subset_example.is_a? Array
  end

  it "should return random elements" do
    other_random_subset_example = random_subset(("a".."z").to_a, 4)
    expect(random_subset_example).not_to eq other_random_subset_example
  end

  it "should return elements present in the initial array" do
    expect(random_subset_example - array).to be_empty
  end
end

describe "#randomize" do
  let(:array) { ("a".."z").to_a }
  let(:response) { randomize(array) }

  it "should return random elements" do
    other_response = randomize(array)
    expect(response).not_to eq other_response
  end

  it "should return random copy of the initial array" do
    expect(response).to be_a Array
    expect(response.sort).to eq array.sort
  end
end

describe "#ascending_order" do
  it "should return the array in alphabetical order" do
    array = ("a".."z").to_a.shuffle
    response = ascending_order(array)
    expect(response).to eq array.sort
  end
end
