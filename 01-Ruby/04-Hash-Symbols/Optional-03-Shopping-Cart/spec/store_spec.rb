require 'data'
require 'store'

# Here's what you should have in store:
#   yogurts: 2€
#   meat: 7€
#   vegetables: 5€
#   potatoes: 2€
#   rice: 1€

describe '#product_in_store?' do

  it 'returns true for all products in store' do
    PRODUCTS.each do |p|
      expect(product_in_store?(p)).to be true
    end
  end

  it 'returns false for any products not in store' do
    NOT_PRODUCTS.each do |p|
      expect(product_in_store?(p)).to be false
    end
  end

end

describe '#price_of_product' do

  it 'returns the correct price for a product in store' do
    PRODUCTS.each_with_index do |p, idx|
      expect(price_of_product(p)).to eq(PRICES[idx])
    end
  end

  it 'returns nil for a product that is not in store' do
    NOT_PRODUCTS.each do |p|
      expect(price_of_product(p)).to be_nil
    end
  end

end

describe '#store_items_to_s' do

  # TODO: Return a String with all store items in the following form:
  # - Meat: 7€
  # - Vegetables: 5€
  # ...
  #
  # HINT: add line breaks in your String with "\n"

  it 'returns a list of all products as a string' do

    list = store_items_to_s
    expect(list).to be_a(String)

    regex = /^[^ ]+ ([^:]+): ?([0-9]+) ?€$/

    products = []
    prices = []

    list.each_line do |line|
      expect(line).to match(regex)

      m = line.match(regex)
      products << m.captures[0]
      prices << m.captures[1].to_i
    end

    products.each_with_index do |p, idx|
      if PRODUCTS.include?(p.downcase)
        expect(prices[idx]).to eq(PRICES[PRODUCTS.index(p.downcase)])
      end
    end

  end

end
