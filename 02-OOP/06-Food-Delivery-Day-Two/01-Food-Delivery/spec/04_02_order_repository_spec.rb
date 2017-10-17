require "fileutils"
require_relative "support/csv_helper"

begin
  require_relative "../app/repositories/order_repository"
  require_relative "../app/repositories/meal_repository"
  require_relative "../app/repositories/employee_repository"
  require_relative "../app/repositories/customer_repository"
rescue LoadError => e
  describe "OrderRepository" do
    it "You need a `order_repository.rb` file for your `OrderRepository`" do
      fail
    end
  end
end

describe "OrderRepository", :_order do
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
      [ 2, "john", "secret", "delivery_guy" ]
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
    ]
  end
  let(:orders_csv_path) { "spec/support/orders.csv" }
  let(:order_repository) { OrderRepository.new(orders_csv_path) }

  before(:each) do
    CsvHelper.write_csv(meals_csv_path, meals)
    CsvHelper.write_csv(employees_csv_path, employees)
    CsvHelper.write_csv(customers_csv_path, customers)
    CsvHelper.write_csv(orders_csv_path, orders)
  end

  def elements(repo)
    repo.instance_variable_get(:@orders) ||
      repo.instance_variable_get(:@elements)
  end

  describe "#initialize" do
    it "should take 4 arguments: the CSV file path to store orders, and 3 repository instances (meal, employee and customer)" do
      expect(OrderRepository.instance_method(:initialize).arity).to eq(4)
    end

    it "should not crash if the CSV path does not exist yet. Hint: use File.exist?" do
      expect { OrderRepository.new('unexisting_file.csv', meal_repository, employee_repository, customer_repository) }.not_to raise_error
    end

    it "store the 3 auxiliary repositories in instance variables" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      expect(repo.instance_variable_get(:@meal_repository)).to be_a(MealRepository)
      expect(repo.instance_variable_get(:@employee_repository)).to be_a(EmployeeRepository)
      expect(repo.instance_variable_get(:@customer_repository)).to be_a(CustomerRepository)
    end

    it "store orders in memory in an instance variable `@orders` or `@elements`" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      expect(elements(repo)).to be_a(Array)
    end

    it "should load existing orders from the CSV" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      loaded_orders = elements(repo) || []
      expect(loaded_orders.length).to eq(3)
    end

    it "should fill the `@orders` with instance of `Order`, setting the correct types on each property" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      loaded_orders = elements(repo) || []
      fail if loaded_orders.empty?
      loaded_orders.each do |order|
        expect(order).to be_a(Order)
        expect(order.meal).to be_a(Meal)
        expect(order.employee).to be_a(Employee)
        expect(order.customer).to be_a(Customer)
      end
      expect(loaded_orders[0].instance_variable_get(:@delivered)).to be true
      expect(loaded_orders[1].instance_variable_get(:@delivered)).to be false
      expect(loaded_orders[2].instance_variable_get(:@delivered)).to be false
    end
  end

  describe "#undelivered_orders" do
    it "should return all the undelivered orders" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      expect(repo.undelivered_orders).to be_a(Array)
      expect(repo.undelivered_orders.length).to eq(2)
      expect(repo.undelivered_orders[0]).to be_a(Order)
      expect(repo.undelivered_orders[1]).to be_a(Order)
      expect(repo.undelivered_orders[0].delivered?).to be false
      expect(repo.undelivered_orders[1].delivered?).to be false
    end

    it "OrderRepository should not expose the @orders through a reader/method" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      expect(repo).not_to respond_to(:orders)
    end
  end

  describe "#add" do
    it "should add an order to the in-memory list" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      new_order = Order.new({
        meal: meal_repository.find(1),
        customer: customer_repository.find(1),
        employee: employee_repository.find(1)
      })
      repo.add(new_order)
      expect(elements(repo).length).to eq(4)
    end

    it "should set the new order id" do
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      new_order = Order.new({
        meal: meal_repository.find(1),
        customer: customer_repository.find(1),
        employee: employee_repository.find(1)
      })
      repo.add(new_order)
      expect(new_order.id).to eq(4)
    end

    it "should start auto-incrementing at 1 if it is the first order added" do
      orders_csv_path = 'unexisting_empty_orders.csv'
      FileUtils.remove_file(orders_csv_path, force: true)

      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      new_order = Order.new({
        meal: meal_repository.find(1),
        customer: customer_repository.find(1),
        employee: employee_repository.find(1)
      })
      repo.add(new_order)
      expect(new_order.id).to eq(1)

      FileUtils.remove_file(orders_csv_path, force: true)
    end

    it "should save each new order in the CSV (first row = headers)" do
      orders_csv_path = 'spec/support/empty_orders.csv'
      FileUtils.remove_file(orders_csv_path, force: true)

      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      new_order = Order.new({
        meal: meal_repository.find(1),
        customer: customer_repository.find(1),
        employee: employee_repository.find(1)
      })
      repo.add(new_order)

      # Reload from the CSV
      repo = OrderRepository.new(orders_csv_path, meal_repository, employee_repository, customer_repository)
      expect(repo.undelivered_orders.length).to eq(1)
      expect(repo.undelivered_orders[0].id).to eq(1)
      expect(repo.undelivered_orders[0].meal).to be_a(Meal)
      expect(repo.undelivered_orders[0].meal.id).to eq(1)
      expect(repo.undelivered_orders[0].employee).to be_a(Employee)
      expect(repo.undelivered_orders[0].employee.id).to eq(1)
      expect(repo.undelivered_orders[0].customer).to be_a(Customer)
      expect(repo.undelivered_orders[0].customer.id).to eq(1)

      FileUtils.remove_file(orders_csv_path, force: true)
    end
  end
end
