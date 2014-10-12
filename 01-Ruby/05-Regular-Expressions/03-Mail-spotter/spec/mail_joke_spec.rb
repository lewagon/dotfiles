# Encoding: utf-8

require "mail_joke"

describe "#mail_joke" do

  it "should raise an ArgumentError if input is not an email" do
    expect( lambda { mail_joke("foo") } ).to raise_error ArgumentError
  end

  it "should compliment LeWagon email owners" do
    expect(mail_joke "boris@lewagon.org").to eq "Well done boris, you're skilled and capable"
  end

  it "should tell Gmail user that they are average and modern" do
    expect(mail_joke "boris@gmail.com").to eq "boris, you're an average but modern person"
  end

  it "should tell Live user that they live in the past" do
    expect(mail_joke "jean-marc.alarue@live.com").to eq "jean-marc alarue, aren't you born before 1973?"
  end

  it "should tell unknownd domain users that we can't judge them" do
    expect(mail_joke "voyageurdufutur@milkyway.gal").to eq "Sorry voyageurdufutur, we don't know how to judge 'milkyway.gal'"
  end

end
