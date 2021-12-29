require "decoder"

describe "decoder" do
  it "should decode '.-'" do
    expect(decode(".-")).to eq("A")
  end

  it "should decode '.... ..'" do
    expect(decode(".... ..")).to eq("HI")
  end

  it "should detect pipe (|) character and convert it into a space between words" do
    expect(decode(".... ..|--. ..- -.-- ...")).to eq("HI GUYS")
  end

  it "should decode Hey Jude" do
    morse = ".... . -.--|.--- ..- -.. .|-.. --- -. -|-- .- -.- .|.. -|-... .- -.."
    text = "HEY JUDE DONT MAKE IT BAD"
    expect(decode(morse)).to eq(text)
  end
end
