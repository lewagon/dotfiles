require "wagon_sort"

describe "#wagon_sort" do
  it "should return an empty array if given an empty array" do
    expect(wagon_sort([])).to eq []
  end

  it "should sort all-caps students" do
    expect(wagon_sort(["BOB", "ALICE", "CHARLIE"])).to eq(["ALICE", "BOB", "CHARLIE"])
  end

  it "should be case-insensitive" do
    expect(wagon_sort(["BOB", "alice", "CHARLIE"])).to eq(["alice", "BOB", "CHARLIE"])
  end
end