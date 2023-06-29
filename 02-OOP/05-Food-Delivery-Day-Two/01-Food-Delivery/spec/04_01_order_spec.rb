begin
  require_relative "../app/models/meal"
  require_relative "../app/models/customer"
  require_relative "../app/models/employee"
  require_relative "../app/models/order"
rescue LoadError => e
  describe "Order" do
    it "You need a `order.rb` file for your `Order` model" do
      fail
    end
  end
end

describe "Order", :_order do
  describe "#initialize" do
    it "takes a hash of attributes as a parameter" do
      properties = { id: 1, delivered: false }
      order = Order.new(properties)
      expect(order).to be_a(Order)
    end

    it "receives the :meal attribute, which is an instance of Meal" do
      properties = { meal: Meal.new({}) }
      order = Order.new(properties)
      expect(order.instance_variable_get(:@meal)).to be_a(Meal)
    end

    it "receives the :customer attribute, which is an instance of Customer" do
      properties = { customer: Customer.new({}) }
      order = Order.new(properties)
      expect(order.instance_variable_get(:@customer)).to be_a(Customer)
    end

    it "receives the :employee attribute, which is an instance of Employee" do
      properties = { employee: Employee.new({}) }
      order = Order.new(properties)
      expect(order.instance_variable_get(:@employee)).to be_a(Employee)
    end

  end

  describe "#id" do
    it "should return the order id" do
      order = Order.new(id: 42)
      expect(order.id).to eq(42)
    end
  end

  describe "#id=" do
    it "should set the order id" do
      order = Order.new(id: 42)
      order.id = 43
      expect(order.id).to eq(43)
    end
  end

  describe "#delivered?" do
    it "should return true if the order has been delivered" do
      order = Order.new(delivered: true)
      expect(order.delivered?).to be true
    end

    it "should return false if the order has not yet been delivered" do
      order = Order.new({})
      expect(order.delivered?).to be false
    end
  end

  describe "#meal" do
    it "should return the meal associated with the order" do
      order = Order.new(meal: Meal.new({}))
      expect(order.meal).to be_a(Meal)
    end
  end

  describe "#employee" do
    it "should return the employee associated with the order" do
      order = Order.new(employee: Employee.new({}))
      expect(order.employee).to be_a(Employee)
    end
  end

  describe "#customer" do
    it "should return the customer associated with the order" do
      order = Order.new(customer: Customer.new({}))
      expect(order.customer).to be_a(Customer)
    end
  end

  describe "#deliver!" do
    it "should mark an order as delivered" do
      order = Order.new(id: 12)
      expect(order.delivered?).to be false
      order.deliver!
      expect(order.delivered?).to be true
    end
  end
end
