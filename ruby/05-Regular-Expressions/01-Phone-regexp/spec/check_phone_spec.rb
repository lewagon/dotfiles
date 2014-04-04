require "check_phone"
require "spec_helper"

describe "#french_phone_number?" do
  FIXTURES = {
    "0665363636" => true,
    "06 65 36 36 36" => true,
    "06-65-36-36-36" => true,
    "+33 6 65 36 36 36" => true,
    "06 65 36 36" => false,
    "2336653636" => false,
    "+3366536361" => false,
    "0065363636" => false
  }

  FIXTURES.each do |phone_number, result|
    it "should #{result ? 'accept' : 'reject'} #{phone_number}" do
      french_phone_number?(phone_number).must_equal result
    end
  end
end