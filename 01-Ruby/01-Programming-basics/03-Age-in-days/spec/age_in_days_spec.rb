require "age_in_days"

describe "#age_in_days" do
  it "should return a Integer object" do
    response = age_in_days(1, 1, 2000)
    expect(response).to be_a Integer
  end

  it "should compute the right number of days" do
    target_age = 365 * 25
    birthdate = Date.today - target_age
    response = age_in_days(birthdate.day, birthdate.month, birthdate.year)
    expect(response).to eq(target_age)
  end
end
