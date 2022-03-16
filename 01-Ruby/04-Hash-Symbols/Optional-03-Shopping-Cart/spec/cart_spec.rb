require 'data'

require 'cart'
require 'store'


describe 'cart methods' do

  let(:cart) { PRODUCTS.dup.clear }

  describe 'add_to_cart' do
    it 'adds any product to the cart' do
      add_to_cart(cart, PRODUCTS[0])
      add_to_cart(cart, PRODUCTS[2])
      add_to_cart(cart, PRODUCTS[3])
      add_to_cart(cart, 'whatever')

      expect(cart).to eq([PRODUCTS.select { |p| [0, 2, 3].include?(PRODUCTS.index(p)) }, 'whatever'].flatten)
    end

  end

  describe 'cart_to_s' do
    it 'returns a string containing all products separated by a comma' do
      add_to_cart(cart, PRODUCTS[0])
      add_to_cart(cart, PRODUCTS[2])
      add_to_cart(cart, PRODUCTS[4])

      str = cart_to_s(cart)
      str.split(',').each_with_index do |p, idx|
        expect(p.strip).to include(PRODUCTS[idx * 2])
      end
    end
  end

  describe 'cart_total_price' do
    it 'returns the total price of the given cart' do
      add_to_cart(cart, PRODUCTS[0])
      add_to_cart(cart, PRODUCTS[2])
      add_to_cart(cart, PRODUCTS[4])
      add_to_cart(cart, 'whatever')

      total = cart_total_price(cart, store_items)
      [0, 2, 4].each { |idx| total -= PRICES[idx] }
      expect(total).to eq(0)
    end
  end
end
