# Encoding: utf-8

require "spec_helper"
require "refrain"

describe "#better_refrain" do

  it "should get good default behavior" do
    better_refrain("hey ya").must_equal refrain("hey ya")
  end
  
  it "should get good behavior when giving options" do
    response = better_refrain "hey ya", vibrato: 10, strong: true, number_of_times: 4
    response.must_equal refrain("hey ya", 4, 10, true)
  end

end