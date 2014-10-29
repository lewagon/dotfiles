require "uber_hash"

describe UberHash do
  let(:uber_hash) { UberHash.new }
  it "should store a color and let us read it" do
    expect { uber_hash.color = "red" }.not_to raise_error
    expect(uber_hash.color).to eq "red"
  end

  it "should store any random key and let us read it" do
    10.times do
      key = "key_" + (0...8).map { (65 + rand(26)).chr }.join.downcase
      expect { uber_hash.send(:"#{key}=", "a_value") }.not_to raise_error
      expect(uber_hash.send(:"#{key}")).to eq "a_value"
    end
  end
end