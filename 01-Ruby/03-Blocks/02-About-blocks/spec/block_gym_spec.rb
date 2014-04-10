# Encoding: utf-8
require "spec_helper"
require "block_gym"

describe "#tag" do
  it "should return the correct html string" do
    html_string = tag("div", ["class", "kitt-container"]) do 
      tag("a", ["href", "http://kitt.lewagon.org"]) do 
        tag("h2") do 
          "KITT"
        end
      end
    end
    html_string.must_equal "<div class='kitt-container'><a href='http://kitt.lewagon.org'><h2>KITT</h2></a></div>"
  end
end

describe "#timer_for" do
  let(:block_time) do
    timer_for do
      "quick one"
    end
  end
  
  it "should compute a Float" do
    block_time.must_be_instance_of Float 
  end
  
  it "more complex blocks should take more time to execute (in seconds)" do 
    long_block_time = timer_for do 
      (1..100).each { |i| (1..100000).to_a.shuffle.sort }
    end
    block_time.must_be :<, long_block_time if block_time.is_a? Float
  end
end

describe "#transform" do
  it "should apply the block to yielded param" do
    double = transform(5) do |el|
      el * 2
    end
    double.must_equal 10
  end
end
