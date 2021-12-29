require "ip"

ips = {
  "37.160.113.170" => 631271850,
  "192.168.0.1" => 3232235521
}

describe "ip_to_num" do
  ips.each do |ip_address, number|
    it "should return the number #{number} when given '#{ip_address}'" do
      expect(ip_to_num(ip_address)).to eq number
    end
  end
end

describe "num_to_ip" do
  ips.each do |ip_address, number|
    it "should return '#{ip_address}' when given the number #{number}" do
      expect(num_to_ip(number)).to eq ip_address
    end
  end
end
