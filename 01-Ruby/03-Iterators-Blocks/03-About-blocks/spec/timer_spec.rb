require "01_timer"

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
