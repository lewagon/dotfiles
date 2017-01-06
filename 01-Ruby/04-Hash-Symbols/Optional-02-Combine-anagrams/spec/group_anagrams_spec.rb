require "group_anagrams"

describe "#group_anagrams" do
  it "should return an empty array when empty array taken" do
    expect(group_anagrams([])).to eq([])
  end

  it "should return an array of arrays" do
    expect(group_anagrams(['cars', 'for', 'potatoes', 'racs', 'four','scar', 'creams', 'scream']). \
      reduce(true) { |bool, el| bool && el.class.name == "Array"}).to eq(true)
  end

  it "should group anagrams together" do
    output = group_anagrams(['cars', 'for', 'potatoes', 'racs', 'four', 'scar', 'creams', 'scream'])
    cars_group = output.find { |group| group.include?("cars") }
    creams_group = output.find { |group| group.include?("creams") }
    potatoes_group = output.find { |group| group.include?("potatoes") }
    for_group = output.find { |group| group.include?("for") }
    four_group = output.find { |group| group.include?("four") }

    expect(cars_group).to include("racs")
    expect(cars_group).to include("scar")

    expect(creams_group).to include("scream")

    expect(potatoes_group.size).to eq(1)
    expect(for_group.size).to eq(1)
    expect(four_group.size).to eq(1)
  end

end
