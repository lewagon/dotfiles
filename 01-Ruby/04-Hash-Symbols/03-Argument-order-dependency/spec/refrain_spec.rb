# Encoding: utf-8

require "refrain"

describe "#better_refrain" do

  it "should get good default behavior" do
    expect(better_refrain("hey ya")).to eq(refrain("hey ya"))
  end

  it "should get good behavior when giving options" do
    response = better_refrain "hey ya", vibrato: 10, strong: true, number_of_times: 4
    expect(response).to eq(refrain("hey ya", 4, 10, true))
  end

end