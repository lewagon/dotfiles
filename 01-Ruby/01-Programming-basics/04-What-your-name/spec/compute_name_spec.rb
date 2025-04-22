require "compute_name"

describe "#compute_name" do
  it "should return a String" do
    expect(compute_name("", "", "")).to be_a String
  end

  it "should interpolate all parameters inside the returned String" do
    expect(compute_name("Jean", "Michel", "Saurin")).to eq("Jean Michel Saurin")
  end
end
