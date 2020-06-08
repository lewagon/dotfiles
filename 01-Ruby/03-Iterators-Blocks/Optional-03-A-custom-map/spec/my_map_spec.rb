require "my_map"

describe "#my_map" do
  it "should upcase all elements of an array when passed `element.upcase` in the block" do
    array = %w(alex John bOB)
    new_array = my_map(array) do |element|
      element.upcase
    end
    expect(new_array).to eq(%w(ALEX JOHN BOB))
  end

  it "should multiply all integers with themselves when passed `element * element` in the block" do
    array = [2, 4, 6, 8]
    new_array = my_map(array) do |element|
      element * element
    end
    expect(new_array).to eq([4, 16, 36, 64])
  end
end
