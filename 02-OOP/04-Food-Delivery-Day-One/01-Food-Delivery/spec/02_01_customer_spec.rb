begin
  require_relative "../app/models/customer"
rescue LoadError => e
  if e.message =~ /customer/
    describe "Customer" do
      it "You need a `customer.rb` file for your `Customer` model" do
        fail
      end
    end
  else
    raise e
  end
end

describe "Customer", :customer do
  it "should be initialized with a hash of properties" do
    properties = { id: 1, name: "Paul McCartney", address: "Liverpool" }
    customer = Customer.new(properties)
    expect(customer).to be_a(Customer)
  end

  describe "#id" do
    it "should return the customer id" do
      customer = Customer.new({ id: 42 })
      expect(customer.id).to eq(42)
    end
  end

  describe "#id=" do
    it "should set the customer id" do
      customer = Customer.new({ id: 42 })
      customer.id = 43
      expect(customer.id).to eq(43)
    end
  end

  describe "#name" do
    it "should return the name of the Customer" do
      customer = Customer.new({ name: "Paul McCartney" })
      expect(customer.name).to eq("Paul McCartney")
    end
  end

  describe "#address" do
    it "should return the address of the Customer" do
      customer = Customer.new({ address: "Liverpool" })
      expect(customer.address).to eq("Liverpool")
    end
  end
end

