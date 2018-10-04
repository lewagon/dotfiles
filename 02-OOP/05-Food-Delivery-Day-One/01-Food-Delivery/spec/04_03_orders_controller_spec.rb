require_relative "support/csv_helper"

begin
  require_relative "../app/controllers/orders_controller"
  require_relative "../app/repositories/employee_repository"
rescue LoadError => e
  describe "OrdersController" do
    it "You need a `orders_controller.rb` file for your `OrdersController`" do
      fail
    end
  end
end

describe "OrdersController", :_order do
  let(:meals) do
    [
      [ "id", "name", "price" ],
      [ 1, "Margherita", 8 ],
      [ 2, "Capricciosa", 11 ],
      [ 3, "Napolitana", 9 ],
      [ 4, "Funghi", 12 ],
      [ 5, "Calzone", 10 ]
    ]
  end
  let(:meals_csv_path) { "spec/support/meals.csv" }
  let(:meal_repository) { MealRepository.new(meals_csv_path) }

  let(:employees) do
    [
      [ "id", "username", "password", "role" ],
      [ 1, "paul", "secret", "manager" ],
      [ 2, "john", "secret", "delivery_guy" ],
      [ 3, "ringo", "secret", "delivery_guy"]
    ]
  end
  let(:employees_csv_path) { "spec/support/employees.csv" }
  let(:employee_repository) { EmployeeRepository.new(employees_csv_path) }

  let(:customers) do
    [
      [ "id", "name", "address" ],
      [ 1, "Paul McCartney", "Liverpool" ],
      [ 2, "John Bonham", "Redditch" ],
      [ 3, "John Entwistle", "Chiswick" ],
    ]
  end
  let(:customers_csv_path) { "spec/support/customers.csv" }
  let(:customer_repository) { CustomerRepository.new(customers_csv_path) }

  let(:orders) do
    [
      [ "id", "delivered", "meal_id", "employee_id", "customer_id" ],
      [ 1, true,  1, 2, 1 ],
      [ 2, false, 1, 2, 2 ],
      [ 3, false, 2, 2, 3 ],
      [ 4, false, 5, 3, 1 ]
    ]
  end
  let(:orders_csv_path) { "spec/support/orders.csv" }
  let(:order_repository) { OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository) }

  before(:each) do
    CsvHelper.write_csv(meals_csv_path, meals)
    CsvHelper.write_csv(employees_csv_path, employees)
    CsvHelper.write_csv(customers_csv_path, customers)
    CsvHelper.write_csv(orders_csv_path, orders)
  end

  it "should be initialized with 4 repository instances" do
    controller = OrdersController.new(meal_repository, employee_repository, customer_repository, order_repository)
    expect(controller).to be_a(OrdersController)
  end

  describe "#list_undelivered_orders" do
    it "should list undelivered orders (with meal, employee assigned and customer info)" do
      controller = OrdersController.new(meal_repository, employee_repository, customer_repository, order_repository)

      orders.drop(2).each do |order|
        expect(STDOUT).to receive(:puts).with(/#{customer_repository.find(order[4]).name}/)
      end
      controller.list_undelivered_orders
    end
  end

  describe "#add" do
    it "should ask the user for a meal id, a customer id and an employee id to be assigned" do
      controller = OrdersController.new(meal_repository, employee_repository, customer_repository, order_repository)
      Object.any_instance.stub(gets: '2')

      controller.add

      expect(order_repository.undelivered_orders.length).to eq(4)
      expect(order_repository.undelivered_orders[3].meal.name).to eq("Capricciosa")
      expect(order_repository.undelivered_orders[3].employee.username).to eq("john")
      expect(order_repository.undelivered_orders[3].customer.name).to eq("John Bonham")
    end
  end

  describe "#list_my_orders" do
    it "should take an Employee instance as a parameter" do
      expect(OrdersController.instance_method(:list_my_orders).arity).to eq(1)
    end

    it "should list Ringo's undelivered orders" do
      controller = OrdersController.new(meal_repository, employee_repository, customer_repository, order_repository)
      ringo = employee_repository.find(3)  # ringo is a delivery guy
      expect(STDOUT).to receive(:puts).with(/Paul McCartney.*Calzone/)
      controller.list_my_orders(ringo)
    end
  end

  describe "#mark_as_delivered" do
    it "should take an Employee instance as a parameter" do
      expect(OrdersController.instance_method(:mark_as_delivered).arity).to eq(1)
    end

    it "should ask the delivery guy for an order id and mark it as delivered" do
      controller = OrdersController.new(meal_repository, employee_repository, customer_repository, order_repository)
      # Ringo wants to mark as delivered number 4.
      Object.any_instance.stub(gets: '4')
      ringo = employee_repository.find(3)  # ringo is a delivery guy
      controller.mark_as_delivered(ringo)
      # Reload from CSV
      new_order_repository = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      expect(new_order_repository.undelivered_orders.map(&:id)).not_to include(4)
    end
  end
end
