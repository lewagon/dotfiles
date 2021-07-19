require "encoder"

describe "encoder" do
  it "should encode a simple letter, 'a'" do
    expect(encode("a")).to eq(".-")
  end

  it "should be case insensitive. 'b' or 'B' should give the same result." do
    expect(encode("b")).to eq("-...")
    expect(encode("b")).to eq(encode("B"))
  end

  it "should put a space between each letter of the same word" do
    expect(encode("hi")).to eq(".... ..")
  end

  it "should put a pipe (|) character between each word to separate them" do
    expect(encode("hi all")).to eq(".... ..|.- .-.. .-..")
  end

  it "should remove punctation like commas (,) or single quotes (')" do
    expect(encode("hello, world")).to eq(".... . .-.. .-.. ---|.-- --- .-. .-.. -..")
  end

  it "should encode Hey Jude's first sentence" do
    text = "Hey Jude, don't make it bad"
    morse = ".... . -.--|.--- ..- -.. .|-.. --- -. -|-- .- -.- .|.. -|-... .- -.."
    expect(encode(text)).to eq(morse)
  end
end
