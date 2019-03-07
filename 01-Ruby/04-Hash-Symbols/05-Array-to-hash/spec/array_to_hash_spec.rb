require "array_to_hash"

describe "#array_to_hash" do
  let(:array) {["a", "b", "c"]}

  it "should build a hash with index keys when called without block" do
    expect(array_to_hash(array)).to eq({ "0" => "a", "1" => "b", "2" => "c" })
  end

  it "should build hash keys executing block on array indices" do
    expect(array_to_hash(array) { |index| "key#{index}" }).to eq({ "key0" => "a", "key1" => "b", "key2" => "c" })
  end

end
