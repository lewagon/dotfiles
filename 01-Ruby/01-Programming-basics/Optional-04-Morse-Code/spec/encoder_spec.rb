require "encoder"

describe "encoder" do
  it "should encode a simple letter, 'a'" do
    expect(encode("a")).to eq(".-")
  end

  it "should be case insensitive. Encoding 'b' or 'B' is the same." do
    expect(encode("b")).to eq("-...")
    expect(encode("b")).to eq(encode("B"))
  end

  it "should put a space between two letters of the same word" do
    expect(encode("hi")).to eq(".... ..")
  end

  it "should put a pipe (|) character between two words" do
    expect(encode("hi guys")).to eq(".... ..|--. ..- -.-- ...")
  end

  it "should ignore punctation like a comma (,) or a single quote (')" do
    expect(encode("hello, world")).to eq(".... . .-.. .-.. ---|.-- --- .-. .-.. -..")
  end

  it "should encode Hey jude's first sentence" do
    text = "Hey Jude, don't make it bad"
    morse = ".... . -.--|.--- ..- -.. .|-.. --- -. -|-- .- -.- .|.. -|-... .- -.."
    expect(encode(text)).to eq(morse)
  end
end
