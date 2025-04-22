require "roman_numerals"

describe "#old_roman_numeral" do

  it "should work for numbers between 1 and 4" do
    expect(old_roman_numeral(1)).to eq "I"
    expect(old_roman_numeral(2)).to eq "II"
    expect(old_roman_numeral(3)).to eq "III"
    expect(old_roman_numeral(4)).to eq "IIII"
  end

  it "should work for numbers between 5 and 9" do
    expect(old_roman_numeral(5)).to eq "V"
    expect(old_roman_numeral(6)).to eq "VI"
    expect(old_roman_numeral(7)).to eq "VII"
    expect(old_roman_numeral(8)).to eq "VIII"
    expect(old_roman_numeral(9)).to eq "VIIII"
  end

  it "should work for numbers between 10 and 49" do
    expect(old_roman_numeral(10)).to eq "X"
    expect(old_roman_numeral(11)).to eq "XI"
    expect(old_roman_numeral(12)).to eq "XII"
    expect(old_roman_numeral(13)).to eq "XIII"
    expect(old_roman_numeral(14)).to eq "XIIII"
    expect(old_roman_numeral(15)).to eq "XV"
    expect(old_roman_numeral(19)).to eq "XVIIII"
    expect(old_roman_numeral(20)).to eq "XX"
    expect(old_roman_numeral(21)).to eq "XXI"
    expect(old_roman_numeral(25)).to eq "XXV"
    expect(old_roman_numeral(29)).to eq "XXVIIII"
    expect(old_roman_numeral(49)).to eq "XXXXVIIII"
  end

  it "should work for numbers between 50 and 99" do
    expect(old_roman_numeral(50)).to eq "L"
    expect(old_roman_numeral(51)).to eq "LI"
    expect(old_roman_numeral(99)).to eq "LXXXXVIIII"
  end

  it "should work for numbers between 100 and 499" do
    expect(old_roman_numeral(100)).to eq "C"
    expect(old_roman_numeral(101)).to eq "CI"
    expect(old_roman_numeral(149)).to eq "CXXXXVIIII"
    expect(old_roman_numeral(199)).to eq "CLXXXXVIIII"
    expect(old_roman_numeral(200)).to eq "CC"
    expect(old_roman_numeral(499)).to eq "CCCCLXXXXVIIII"
  end

  it "should work for numbers between 500 and 999" do
    expect(old_roman_numeral(500)).to eq "D"
    expect(old_roman_numeral(501)).to eq "DI"
    expect(old_roman_numeral(600)).to eq "DC"
    expect(old_roman_numeral(700)).to eq "DCC"
    expect(old_roman_numeral(999)).to eq "DCCCCLXXXXVIIII"
  end

  it "should work for numbers above 1000" do
    expect(old_roman_numeral(1000)).to eq "M"
    expect(old_roman_numeral(1001)).to eq "MI"
    expect(old_roman_numeral(1100)).to eq "MC"
    expect(old_roman_numeral(1500)).to eq "MD"
    expect(old_roman_numeral(2000)).to eq "MM"
    expect(old_roman_numeral(3000)).to eq "MMM"
  end

end

describe "#new_roman_numeral" do

  it "should work for numbers between 1 and 4" do
    expect(new_roman_numeral(1)).to eq "I"
    expect(new_roman_numeral(2)).to eq "II"
    expect(new_roman_numeral(3)).to eq "III"
    expect(new_roman_numeral(4)).to eq "IV"
  end

  it "should work for numbers between 5 and 9" do
    expect(new_roman_numeral(5)).to eq "V"
    expect(new_roman_numeral(6)).to eq "VI"
    expect(new_roman_numeral(7)).to eq "VII"
    expect(new_roman_numeral(8)).to eq "VIII"
    expect(new_roman_numeral(9)).to eq "IX"
  end

  it "should work for numbers between 10 and 49" do
    expect(new_roman_numeral(10)).to eq "X"
    expect(new_roman_numeral(11)).to eq "XI"
    expect(new_roman_numeral(12)).to eq "XII"
    expect(new_roman_numeral(13)).to eq "XIII"
    expect(new_roman_numeral(14)).to eq "XIV"
    expect(new_roman_numeral(15)).to eq "XV"
    expect(new_roman_numeral(19)).to eq "XIX"
    expect(new_roman_numeral(20)).to eq "XX"
    expect(new_roman_numeral(21)).to eq "XXI"
    expect(new_roman_numeral(25)).to eq "XXV"
    expect(new_roman_numeral(29)).to eq "XXIX"
    expect(new_roman_numeral(49)).to eq "XLIX"
  end

  it "should work for numbers between 50 and 99" do
    expect(new_roman_numeral(50)).to eq "L"
    expect(new_roman_numeral(51)).to eq "LI"
    expect(new_roman_numeral(99)).to eq "XCIX"
  end

  it "should work for numbers between 100 and 499" do
    expect(new_roman_numeral(100)).to eq "C"
    expect(new_roman_numeral(101)).to eq "CI"
    expect(new_roman_numeral(149)).to eq "CXLIX"
    expect(new_roman_numeral(199)).to eq "CXCIX"
    expect(new_roman_numeral(200)).to eq "CC"
    expect(new_roman_numeral(499)).to eq "CDXCIX"
  end

  it "should work for numbers between 500 and 999" do
    expect(new_roman_numeral(500)).to eq "D"
    expect(new_roman_numeral(501)).to eq "DI"
    expect(new_roman_numeral(600)).to eq "DC"
    expect(new_roman_numeral(700)).to eq "DCC"
    expect(new_roman_numeral(999)).to eq "CMXCIX"
  end

  it "should work for numbers above 1000" do
    expect(new_roman_numeral(1000)).to eq "M"
    expect(new_roman_numeral(1001)).to eq "MI"
    expect(new_roman_numeral(1100)).to eq "MC"
    expect(new_roman_numeral(1500)).to eq "MD"
    expect(new_roman_numeral(2000)).to eq "MM"
    expect(new_roman_numeral(3000)).to eq "MMM"
  end

end