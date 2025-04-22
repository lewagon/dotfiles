require "team"

describe "#team_count" do
  it "should return the number of elements in the array" do
    london_team = %w(Edward Arthur Benjamin Sandrine Jess Jamie Phelim)
    founders = %w(Boris Romain Seb)
    expect(team_count(london_team)).to eq(7)
    expect(team_count(founders)).to eq(3)
  end
end
