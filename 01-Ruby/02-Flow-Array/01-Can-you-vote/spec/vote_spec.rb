require "vote"

describe "#allowed_to_vote?" do
  it "should return true if age is 18 or above" do
    expect(allowed_to_vote?(18)).to eq(true)
    expect(allowed_to_vote?(20)).to eq(true)
  end

  it "should return false if age is less than 18" do
    expect(allowed_to_vote?(17)).to eq(false)
  end
end
