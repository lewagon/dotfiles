# Encoding: utf-8

require "spec_helper"
require "mail_joke"

describe "#mail_joke" do

  it "should raise an ArgumentError if input is not an email" do
    lambda { mail_joke("foo") } .must_raise ArgumentError
  end

  it "should compliment LeWagon email owners" do
    response = mail_joke "boris@lewagon.org"
    response.must_equal "Well done boris, you're skilled and capable"
  end

  it "should tell Gmail user that they are average and modern" do
    response = mail_joke "boris@gmail.com"
    response.must_equal "boris, you're an average but modern person"
  end

  it "should tell Live user that they live in the past" do
    response = mail_joke "jean-marc.alarue@live.com"
    response.must_equal "jean-marc alarue, aren't you born before 1973?"
  end

  it "should tell unknownd domain users that we can't judge them" do
    response = mail_joke "voyageurdufutur@milkyway.gal"
    response.must_equal "Sorry voyageurdufutur, we don't know how to judge 'milkyway.gal'"
  end

end
