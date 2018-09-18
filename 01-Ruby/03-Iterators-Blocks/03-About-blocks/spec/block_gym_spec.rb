require "block_gym"

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
      (1..10).each { |i| (1..10000).to_a.shuffle.sort }
    end
    expect(block_time < long_block_time).to eq true
  end
end

describe "#my_map" do
  it "should upcase all elements of an array when passed `element.upcase` in the block" do
    array = %w(alex John bOB)
    new_array = my_map(array) do |element|
      element.upcase
    end
    expect(new_array).to eq(%w(ALEX JOHN BOB))
  end

  it "should multiply all integers with themselves when passed `element * element` in the block" do
    array = [2, 4, 6, 8]
    new_array = my_map(array) do |element|
      element * element
    end
    expect(new_array).to eq([4, 16, 36, 64])
  end
end

describe "#tag" do
  it "should return the correct html for any example without an attribute" do
    html_string = tag("h1") do
      "Hello world"
    end
    expect(html_string).to eq "<h1>Hello world</h1>"
  end

  it "should return the correct html for an example with one attribute" do
    html_string = tag("h1", ["style", "color: red"]) do
      "Hello world"
    end
    expect(html_string).to eq '<h1 style="color: red">Hello world</h1>'
  end

  it "should return the correct html string for a nested configuration" do
    html_string = tag("div", ["class", "kitt-container"]) do
      tag("a", ["href", "https://kitt.lewagon.com"]) do
        tag("h2") do
          "KITT"
        end
      end
    end
    expect(html_string).to eq '<div class="kitt-container"><a href="https://kitt.lewagon.com"><h2>KITT</h2></a></div>'
  end
end
