require "array_to_hash"

describe "#array_to_hash" do
  let(:array) {["a", "b", "c"]}

  it "should build a hash with index keys when called without block" do
    expect(array_to_hash(array)).to eq({ "0" => "a", "1" => "b", "2" => "c" })
  end

  it "should build hash keys executing block on array indices" do
    expect(array_to_hash(array) { |index| "key#{index + 1}" }).to eq({ "key1" => "a", "key2" => "b", "key3" => "c" })
  end

end
