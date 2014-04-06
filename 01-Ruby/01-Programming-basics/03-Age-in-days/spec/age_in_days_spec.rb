# Encoding: utf-8
require 'spec_helper'
require 'age_in_days'

describe '#age_in_days' do

  it 'should return a Fixnum object' do
    response = age_in_days(1, 1, 2000)
    response.must_be_instance_of Fixnum
  end

  it 'should compute the right number of days' do
    target_age = 365 * 25
    birthdate = Date.today - target_age
    response = age_in_days(birthdate.day, birthdate.month, birthdate.year)
    response.must_equal target_age
  end

end
