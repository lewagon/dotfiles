require "love_message"

describe "#tell" do

  it "should tell something to someone" do
    message = tell("tromblard") { "j'ai rencard avec nanar" }
    expect(message).to eq "tromblard, j'ai rencard avec nanar!"
  end

end

describe "#tell_mum" do

  it "should tell something to your mum'" do
    message = tell_mum {"I love you"}
    expect(message).to eq "mum, I love you!"
  end

end

describe "#tell_with_proc" do

  it "should tell something to someone passing a Proc" do
    block = Proc.new {"j'ai rencard avec nanar"}
    message = tell_with_proc("tromblard", block)
    expect(message).to eq "tromblard, j'ai rencard avec nanar!"
  end

end

describe "#tell_mum_with_proc" do

  it "should tell something to your mum passing a Proc" do
    love_block = Proc.new {"I love you"}
    message = tell_mum_with_proc(love_block)
    expect(message).to eq "mum, I love you!"
  end

end
