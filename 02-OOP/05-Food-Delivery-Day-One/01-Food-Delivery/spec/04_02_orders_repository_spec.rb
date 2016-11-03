require "fileutils"
require_relative "support/csv_helper.rb"

begin
  require_relative "../app/repositories/orders_repository.rb"
  require_relative "../app/repositories/meals_repository.rb"
  require_relative "../app/repositories/employees_repository.rb"
  require_relative "../app/repositories/customers_repository.rb"
rescue LoadError => e
  describe "OrdersRepository" do
    it "You need a `orders_repository.rb` file for your `OrdersRepository`" do
      fail
    end
  end
end

describe "OrdersRepository", :order do
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
  let(:meals_repository) { MealsRepository.new(meals_csv_path) }

  let(:employees) do
    [
      [ "id", "username", "password", "role" ],
      [ 1, "paul", "secret", "manager" ],
      [ 2, "john", "secret", "delivery_guy" ]
    ]
  end
  let(:employees_csv_path) { "spec/support/employees.csv" }
  let(:employees_repository) { EmployeesRepository.new(employees_csv_path) }

  let(:customers) do
    [
      [ "id", "name", "address" ],
      [ 1, "Paul McCartney", "Liverpool" ],
      [ 2, "John Bonham", "Redditch" ],
      [ 3, "John Entwistle", "Chiswick" ],
    ]
  end
  let(:customers_csv_path) { "spec/support/customers.csv" }
  let(:customers_repository) { CustomersRepository.new(customers_csv_path) }

  let(:orders) do
    [
      [ "id", "delivered", "meal_id", "employee_id", "customer_id" ],
      [ 1, true,  1, 2, 1 ],
      [ 2, false, 1, 2, 2 ],
      [ 3, false, 2, 2, 3 ],
    ]
  end
  let(:orders_csv_path) { "spec/support/orders.csv" }
  let(:orders_repository) { OrdersRepository.new(orders_csv_path) }

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
    it "should take one argument: the CSV file path to store orders, and 3 repository instances for meal, employee and customer" do
      expect(OrdersRepository.instance_method(:initialize).arity).to eq(4)
    end

    it "should not crash if the CSV path does not exist yet. Hint: use File.exist?" do
      expect { OrdersRepository.new('unexisting_file.csv', meals_repository, employees_repository, customers_repository) }.not_to raise_error
    end

    it "store the 3 auxiliary repositories in instance variables" do
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      expect(repo.instance_variable_get(:@meals_repository)).to be_a(MealsRepository)
      expect(repo.instance_variable_get(:@employees_repository)).to be_a(EmployeesRepository)
      expect(repo.instance_variable_get(:@customers_repository)).to be_a(CustomersRepository)
    end

    it "store orders in memory in an instance variable `@orders` or `@elements`" do
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      expect(elements(repo)).to be_a(Array)
    end

    it "loads existing orders from the CSV" do
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      loaded_orders = elements(repo) || []
      expect(loaded_orders.length).to eq(3)
    end

    it "fills the `@orders` with instance of `Order`, setting the correct types on each property" do
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
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
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      expect(repo.undelivered_orders).to be_a(Array)
      expect(repo.undelivered_orders.length).to eq(2)
      expect(repo.undelivered_orders[0]).to be_a(Order)
      expect(repo.undelivered_orders[1]).to be_a(Order)
      expect(repo.undelivered_orders[0].delivered?).to be false
      expect(repo.undelivered_orders[1].delivered?).to be false
    end

    it "OrdersRepository should not expose the @orders through a reader/method" do
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      expect(repo).not_to respond_to(:orders)
    end
  end

  describe "#add" do
    it "should add a order to the in-memory list" do
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      new_order = Order.new({
        meal: meals_repository.find(1),
        customer: customers_repository.find(1),
        employee: employees_repository.find(1)
      })
      repo.add(new_order)
      expect(repo.instance_variable_get(:@orders).length).to eq(4)
    end

    it "should set the new order id" do
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      new_order = Order.new({
        meal: meals_repository.find(1),
        customer: customers_repository.find(1),
        employee: employees_repository.find(1)
      })
      repo.add(new_order)
      expect(new_order.id).to eq(4)
    end

    it "should start auto-incremting at 1 if very first order added" do
      orders_csv_path = 'unexisting_empty_orders.csv'
      FileUtils.remove_file(orders_csv_path, force: true)

      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      new_order = Order.new({
        meal: meals_repository.find(1),
        customer: customers_repository.find(1),
        employee: employees_repository.find(1)
      })
      repo.add(new_order)
      expect(new_order.id).to eq(1)

      FileUtils.remove_file(orders_csv_path, force: true)
    end

    it "should persist in the CSV the new added order (first row = headers)" do
      orders_csv_path = 'spec/support/empty_orders.csv'
      FileUtils.remove_file(orders_csv_path, force: true)

      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
      new_order = Order.new({
        meal: meals_repository.find(1),
        customer: customers_repository.find(1),
        employee: employees_repository.find(1)
      })
      repo.add(new_order)

      # Reload from the CSV
      repo = OrdersRepository.new(orders_csv_path, meals_repository, employees_repository, customers_repository)
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
