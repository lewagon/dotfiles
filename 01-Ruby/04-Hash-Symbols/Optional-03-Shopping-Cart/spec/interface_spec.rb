require 'data'
require 'open3'

describe 'Shopping cart interface' do

  it 'correctly takes inputs and returns the total price' do
    result = nil

    Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|

      # Add some products to the cart
      [0, 2, 4].each { |idx| i.puts PRODUCTS[idx] }

      # Enter empty product to exit the loop
      i.puts ''
      i.close

      result = o.read
    end

    total_regex = /Total price: (\d+)€/
    expect(result).to match(total_regex)

    m = result.match(total_regex)
    total = m.captures[0].to_i

    [0, 2, 4].each { |idx| total -= PRICES[idx] }

    expect(total).to eq(0)
  end
end
