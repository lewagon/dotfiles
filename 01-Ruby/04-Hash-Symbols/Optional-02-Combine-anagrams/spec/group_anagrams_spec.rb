require "group_anagrams"

describe "#group_anagrams" do
  it "should return an empty array if empty array is given" do
    expect(group_anagrams([])).to eq([])
  end

  it "should return an array of arrays" do
    words = ['cars', 'for', 'POTATOES', 'racs', 'four', 'scar', 'creams', 'SCREAM']
    expect(group_anagrams(words).reduce(true) { |bool, el| bool && el.class.name == "Array"}).to eq(true)
  end

  it "should group anagrams together" do
    words = ['cars', 'for', 'POTATOES', 'racs', 'four', 'scar', 'creams', 'SCREAM']
    output = group_anagrams(words)
    cars_group = output.find { |group| group.include?("cars") }
    creams_group = output.find { |group| group.include?("creams") }
    potatoes_group = output.find { |group| group.include?("POTATOES") }
    for_group = output.find { |group| group.include?("for") }
    four_group = output.find { |group| group.include?("four") }

    expect(cars_group).to include("racs")
    expect(cars_group).to include("scar")

    expect(creams_group).to include("SCREAM")

    expect(potatoes_group.size).to eq(1)
    expect(for_group.size).to eq(1)
    expect(four_group.size).to eq(1)
  end

end
