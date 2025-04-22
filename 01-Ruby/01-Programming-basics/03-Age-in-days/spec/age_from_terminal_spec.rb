require "open3"
require "age_in_days"

describe "Interface" do
  it "should print out the age calculated from age_in_days" do
    result = nil
    y, m, d = 1986, 11, 18

    Open3.popen2("ruby ./lib/interface.rb") do |i, o, th|
      # Send year
      i.puts y.to_s
      # Send month
      i.puts m.to_s
      # Send day
      i.puts d.to_s
      i.close

      result = o.read
    end

    age = age_in_days(d, m, y)
    expect(result).to match(/You are #{age.to_s} days old/)
  end
end
