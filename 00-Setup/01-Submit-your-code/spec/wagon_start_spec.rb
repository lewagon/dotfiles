require "wagon_start"

describe "#wagon_start" do

  it "should return the exact message 'That's how it starts'" do
    response = wagon_start
    expect(response).to eq("That's how it starts")
  end

end
