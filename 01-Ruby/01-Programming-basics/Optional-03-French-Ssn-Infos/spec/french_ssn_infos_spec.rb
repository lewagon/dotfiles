require "french_ssn_infos"

describe "#french_ssn_infos" do
  it "returns 'invalid number' when passed an empty string" do
    actual = french_ssn_infos("")
    expected = "invalid number"
    expect(actual).to eq(expected)
  end

  it "returns 'a man born in December 1984 in Seine-Maritime' when passed '1 84 12 76 451 089 46'" do
    actual = french_ssn_infos("1 84 12 76 451 089 46")
    expected = "a man born in December 1984 in Seine-Maritime"
    expect(actual).to eq(expected)
  end

  it "returns 'a woman born in June 1989 in Essonne' when passed ' 2890 6917628 492 4 '" do
    actual = french_ssn_infos(" 2890 6917628 492 4 ")
    expected = "a woman born in June 1989 in Essonne"
    expect(actual).to eq(expected)
  end

  it "returns 'invalid number' when passed a French SSN number with an invalid check key" do
    actual = french_ssn_infos("1 84 12 76 451 089 22")
    expected = "invalid number"
    expect(actual).to eq(expected)
  end
end
