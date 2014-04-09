require "spec_helper"
require "roman_numerals"

describe "#old_roman_numeral" do

  it "should work for numbers between 1 and 4" do
    old_roman_numeral(1).must_equal "I"
    old_roman_numeral(2).must_equal "II"
    old_roman_numeral(3).must_equal "III"
    old_roman_numeral(4).must_equal "IIII"
  end

  it "should work for numbers between 5 and 9" do
    old_roman_numeral(5).must_equal "V"
    old_roman_numeral(6).must_equal "VI"
    old_roman_numeral(7).must_equal "VII"
    old_roman_numeral(8).must_equal "VIII"
    old_roman_numeral(9).must_equal "VIIII"
  end

  it "should work for numbers between 10 and 49" do
    old_roman_numeral(10).must_equal "X"
    old_roman_numeral(11).must_equal "XI"
    old_roman_numeral(12).must_equal "XII"
    old_roman_numeral(13).must_equal "XIII"
    old_roman_numeral(14).must_equal "XIIII"
    old_roman_numeral(15).must_equal "XV"
    old_roman_numeral(19).must_equal "XVIIII"
    old_roman_numeral(20).must_equal "XX"
    old_roman_numeral(21).must_equal "XXI"
    old_roman_numeral(25).must_equal "XXV"
    old_roman_numeral(29).must_equal "XXVIIII"
    old_roman_numeral(49).must_equal "XXXXVIIII"
  end

  it "should work for numbers between 50 and 99" do
    old_roman_numeral(50).must_equal "L"
    old_roman_numeral(51).must_equal "LI"
    old_roman_numeral(99).must_equal "LXXXXVIIII"
  end

  it "should work for numbers between 100 and 499" do
    old_roman_numeral(100).must_equal "C"
    old_roman_numeral(101).must_equal "CI"
    old_roman_numeral(149).must_equal "CXXXXVIIII"
    old_roman_numeral(199).must_equal "CLXXXXVIIII"
    old_roman_numeral(200).must_equal "CC"
    old_roman_numeral(499).must_equal "CCCCLXXXXVIIII"
  end

  it "should work for numbers between 500 and 999" do
    old_roman_numeral(500).must_equal "D"
    old_roman_numeral(501).must_equal "DI"
    old_roman_numeral(600).must_equal "DC"
    old_roman_numeral(700).must_equal "DCC"
    old_roman_numeral(999).must_equal "DCCCCLXXXXVIIII"
  end

  it "should work for numbers above 1000" do
    old_roman_numeral(1000).must_equal "M"
    old_roman_numeral(1001).must_equal "MI"
    old_roman_numeral(1100).must_equal "MC"
    old_roman_numeral(1500).must_equal "MD"
    old_roman_numeral(2000).must_equal "MM"
    old_roman_numeral(3000).must_equal "MMM"
  end

end

describe "#new_roman_numeral" do

  it "should work for numbers between 1 and 4" do
    new_roman_numeral(1).must_equal "I"
    new_roman_numeral(2).must_equal "II"
    new_roman_numeral(3).must_equal "III"
    new_roman_numeral(4).must_equal "IV"
  end

  it "should work for numbers between 5 and 9" do
    new_roman_numeral(5).must_equal "V"
    new_roman_numeral(6).must_equal "VI"
    new_roman_numeral(7).must_equal "VII"
    new_roman_numeral(8).must_equal "VIII"
    new_roman_numeral(9).must_equal "IX"
  end

  it "should work for numbers between 10 and 49" do
    new_roman_numeral(10).must_equal "X"
    new_roman_numeral(11).must_equal "XI"
    new_roman_numeral(12).must_equal "XII"
    new_roman_numeral(13).must_equal "XIII"
    new_roman_numeral(14).must_equal "XIV"
    new_roman_numeral(15).must_equal "XV"
    new_roman_numeral(19).must_equal "XIX"
    new_roman_numeral(20).must_equal "XX"
    new_roman_numeral(21).must_equal "XXI"
    new_roman_numeral(25).must_equal "XXV"
    new_roman_numeral(29).must_equal "XXIX"
    new_roman_numeral(49).must_equal "XLIX"
  end

  it "should work for numbers between 50 and 99" do
    new_roman_numeral(50).must_equal "L"
    new_roman_numeral(51).must_equal "LI"
    new_roman_numeral(99).must_equal "XCIX"
  end

  it "should work for numbers between 100 and 499" do
    new_roman_numeral(100).must_equal "C"
    new_roman_numeral(101).must_equal "CI"
    new_roman_numeral(149).must_equal "CXLIX"
    new_roman_numeral(199).must_equal "CXCIX"
    new_roman_numeral(200).must_equal "CC"
    new_roman_numeral(499).must_equal "CDXCIX"
  end

  it "should work for numbers between 500 and 999" do
    new_roman_numeral(500).must_equal "D"
    new_roman_numeral(501).must_equal "DI"
    new_roman_numeral(600).must_equal "DC"
    new_roman_numeral(700).must_equal "DCC"
    new_roman_numeral(999).must_equal "CMXCIX"
  end

  it "should work for numbers above 1000" do
    new_roman_numeral(1000).must_equal "M"
    new_roman_numeral(1001).must_equal "MI"
    new_roman_numeral(1100).must_equal "MC"
    new_roman_numeral(1500).must_equal "MD"
    new_roman_numeral(2000).must_equal "MM"
    new_roman_numeral(3000).must_equal "MMM"
  end

end