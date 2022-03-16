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

describe "Extra part: improve the card methods" do
  context "previous cart method tests won't pass anymore" do
    let(:cart) { Hash.new(0) }

    describe 'add_to_cart' do
      it 'adds any product to the cart and increments the quantity' do
        add_to_cart(cart, PRODUCTS[0])
        add_to_cart(cart, PRODUCTS[0])
        add_to_cart(cart, PRODUCTS[3])

        expect(cart[PRODUCTS[0]]).to eq(2)
        expect(cart[PRODUCTS[3]]).to eq(1)
      end
    end

    describe 'cart_to_s' do
      it 'returns a string containing all products * the quantity, separated by a comma' do
        add_to_cart(cart, PRODUCTS[0])
        add_to_cart(cart, PRODUCTS[0])
        add_to_cart(cart, PRODUCTS[2])
        add_to_cart(cart, PRODUCTS[4])

        str = cart_to_s(cart)
        str.split(',').each_with_index do |p, idx|
          expect(p.strip.downcase).to include(PRODUCTS[idx * 2])
          expect(p.strip).to match(/x\s\d{1,2}/)
        end
      end
    end

    describe 'cart_total_price' do
      it 'returns the total price of the given cart' do
        add_to_cart(cart, PRODUCTS[0])
        add_to_cart(cart, PRODUCTS[0])
        add_to_cart(cart, PRODUCTS[2])
        add_to_cart(cart, PRODUCTS[4])

        total = cart_total_price(cart, store_items)

        expect(total).to eq(10)
      end
    end
  end
end

