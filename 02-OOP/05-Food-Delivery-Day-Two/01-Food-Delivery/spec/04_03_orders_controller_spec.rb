require_relative "support/csv_helper"

begin
  require_relative "../app/repositories/meal_repository"
  require_relative "../app/repositories/customer_repository"
  require_relative "../app/repositories/employee_repository"
  require_relative "../app/repositories/order_repository"
  require_relative "../app/controllers/orders_controller"
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

  let(:employees) do
    [
      [ "id", "username", "password", "role" ],
      [ 1, "paul", "secret", "manager" ],
      [ 2, "john", "secret", "rider" ],
      [ 3, "ringo", "secret", "rider"]
    ]
  end
  let(:employees_csv_path) { "spec/support/employees.csv" }
  let(:employee_repository) { EmployeeRepository.new(employees_csv_path) }

  let(:orders) do
    [
      [ "id", "delivered", "meal_id", "customer_id", "employee_id" ],
      [ 1, true, 1, 1, 2 ],
      [ 2, false, 1, 2, 2 ],
      [ 3, false, 2, 3, 2 ],
      [ 4, false, 5, 2, 3 ]
    ]
  end
  let(:orders_csv_path) { "spec/support/orders.csv" }
  let(:order_repository) { OrderRepository.new(orders_csv_path, meal_repository, customer_repository, employee_repository) }

  before(:each) do
    CsvHelper.write_csv(meals_csv_path, meals)
    CsvHelper.write_csv(employees_csv_path, employees)
    CsvHelper.write_csv(customers_csv_path, customers)
    CsvHelper.write_csv(orders_csv_path, orders)
  end

  it "should be initialized with 4 repository instances" do
    controller = OrdersController.new(meal_repository, customer_repository, employee_repository, order_repository)
    expect(controller).to be_a(OrdersController)
  end

  describe "#add" do
    it "should ask the user for a meal index, a customer index and an employee index to be assigned" do
      controller = OrdersController.new(meal_repository, customer_repository, employee_repository, order_repository)
      allow_any_instance_of(Object).to receive(:gets).and_return("2")

      controller.add

      expect(order_repository.undelivered_orders.length).to eq(4)
      expect(order_repository.undelivered_orders[3].meal.name).to eq("Capricciosa")
      # hint: did you only display the riders to the user and ask for the index from that displayed list (not the employee.id)?
      expect(order_repository.undelivered_orders[3].employee.username).to eq("ringo") 
      expect(order_repository.undelivered_orders[3].customer.name).to eq("John Bonham")
    end
  end

  describe "#list_undelivered_orders" do
    it "should list undelivered orders (with meal, employee assigned and customer info)" do
      controller = OrdersController.new(meal_repository, customer_repository, employee_repository, order_repository)
      orders.drop(2).each do |order|
        expect(STDOUT).to receive(:puts).with(/#{customer_repository.find(order[3]).name}/)
      end
      controller.list_undelivered_orders
    end
  end

  describe "#list_my_orders" do
    it "should take an Employee instance as a parameter" do
      expect(OrdersController.instance_method(:list_my_orders).arity).to eq(1)
    end

    it "should list Ringo's undelivered orders" do
      controller = OrdersController.new(meal_repository, customer_repository, employee_repository, order_repository)
      ringo = employee_repository.find(3)  # ringo is a rider
      expect(STDOUT).to receive(:puts).with(/(Paul McCartney||Calzone).*(Calzone||Paul McCartney)/)
      controller.list_my_orders(ringo)
    end
  end

  describe "#mark_as_delivered" do
    it "should take an Employee instance as a parameter" do
      expect(OrdersController.instance_method(:mark_as_delivered).arity).to eq(1)
    end

    it "should ask the rider for an order index (of their undelivered orders), mark it as delivered, and save the relevant data to the CSV file" do
      controller = OrdersController.new(meal_repository, customer_repository, employee_repository, order_repository)
      # Ringo wants to mark as delivered number 4.
      allow_any_instance_of(Object).to receive(:gets).and_return("1")
      ringo = employee_repository.find(3)  # ringo is a rider
      controller.mark_as_delivered(ringo)
      # Reload from CSV
      new_order_repository = OrderRepository.new(orders_csv_path, meal_repository, customer_repository, employee_repository)
      expect(new_order_repository.undelivered_orders.map(&:id)).not_to include(4)
      # Rewrite the original CSV
      CsvHelper.write_csv(orders_csv_path, orders)
    end
  end
end
