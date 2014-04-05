require "spec_helper"
require "wagon_sort"

describe "#wagon_sort" do
  it "should return an empty array if given an empty array" do
    wagon_sort([]).must_equal []
  end

  it "should sort all-caps students" do
    wagon_sort(["BOB", "ALICE", "CHARLIE"]).must_equal(["ALICE", "BOB", "CHARLIE"])
  end

  it "should be case-insensitive" do
    wagon_sort(["BOB", "alice", "CHARLIE"]).must_equal(["alice", "BOB", "CHARLIE"])
  end
end