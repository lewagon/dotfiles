require "refrain"

describe "#better_refrain" do

  it "should have the same behavior as the #refrain method" do
    expect(better_refrain("hey ya")).to eq(refrain("hey ya"))
  end

  it "should follow instructions correctly when additional options are passed as parameters" do
    response = better_refrain "hey ya", vibrato: 10, strong: true, number_of_times: 4
    expect(response).to eq(refrain("hey ya", 4, 10, true))
  end

end
