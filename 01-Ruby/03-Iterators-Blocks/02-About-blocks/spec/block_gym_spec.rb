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
    expect(html_string).to eq "<div class='kitt-container'><a href='http://kitt.lewagon.org'><h2>KITT</h2></a></div>"
  end
end

describe "#timer_for" do
  let(:block_time) do
    timer_for do
      "quick one"
    end
  end

  it "should compute a Float" do
    expect(block_time).to be_a Float
  end

  it "more complex blocks should take more time to execute (in seconds)" do
    long_block_time = timer_for do
      (1..100).each { |i| (1..100000).to_a.shuffle.sort }
    end
    expect(block_time < long_block_time).to eq true
  end
end
