require "group_anagrams"

describe "#group_anagrams" do
  it "should return an empty array when empty array taken" do
    expect(group_anagrams([])).to eq([])
  end

  it "should return an array of arrays" do
    expect(group_anagrams(['cars', 'for', 'potatoes', 'racs', 'four','scar', 'creams', 'scream']).reduce(true){ |bool, el| bool && el.class.name == "Array"}).to eq(true)
  end

  it "should group anagrams together" do
    output = group_anagrams(['cars', 'for', 'potatoes', 'racs', 'four','scar', 'creams', 'scream'])
    ouput = output.nil? ? nil : output.sort
    expect(output).to \
      eq([["cars", "racs", "scar"], ["creams", "scream"], ["for"], ["four"], ["potatoes"]])
  end

end