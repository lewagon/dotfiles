require "fileutils"
require_relative "support/csv_helper"

begin
  require_relative "../app/repositories/customer_repository"
rescue LoadError => e
  if e.message =~ /customer_repository/
    describe "CustomerRepository" do
      it "You need a `customer_repository.rb` file for your `CustomerRepository`" do
        fail
      end
    end
  else
    raise e
  end
end

describe "CustomerRepository", :customer do
  let(:customers) do
    [
      [ "id", "name", "address" ],
      [ 1, "Paul McCartney", "Liverpool" ],
      [ 2, "John Bonham", "Redditch" ],
      [ 3, "John Entwistle", "Chiswick" ],
    ]
  end
  let(:csv_path) { "spec/support/customers.csv" }

  before(:each) do
    CsvHelper.write_csv(csv_path, customers)
  end

  def elements(repo)
    repo.instance_variable_get(:@customers) ||
      repo.instance_variable_get(:@elements)
  end

  describe "#initialize" do
    it "should take one argument: the CSV file path to store customers" do
      expect(CustomerRepository.instance_method(:initialize).arity).to eq(1)
    end

    it "should not crash if the CSV path does not exist yet. Hint: use File.exist?" do
      expect { CustomerRepository.new('unexisting_file.csv') }.not_to raise_error
    end

    it "should store customers in memory in an instance variable `@customers` or `@elements`" do
      repo = CustomerRepository.new(csv_path)
      expect(elements(repo)).to be_a(Array)
    end

    it "should load existing customers from the CSV" do
      repo = CustomerRepository.new(csv_path)
      loaded_customers = elements(repo) || []
      expect(loaded_customers.length).to eq(3)
    end

    it "should fill the `@customers` with instances of `Customer`, setting the correct types on each property" do
      repo = CustomerRepository.new(csv_path)
      loaded_customers = elements(repo) || []
      fail if loaded_customers.empty?
      loaded_customers.each do |customer|
        expect(customer).to be_a(Customer)
        expect(customer.id).to be_a(Integer)
      end
    end
  end

  describe "#all" do
    it "should return all the customers stored by the repo" do
      repo = CustomerRepository.new(csv_path)
      expect(repo.all).to be_a(Array)
      expect(repo.all[0].name).to eq("Paul McCartney")
    end

    it "CustomerRepository should not expose the @customers through a reader/method" do
      repo = CustomerRepository.new(csv_path)
      expect(repo).not_to respond_to(:customers)
    end
  end

  describe "#add" do
    it "should add a customer to the in-memory list" do
      repo = CustomerRepository.new(csv_path)
      new_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(new_customer)
      expect(repo.all.length).to eq(4)
    end

    it "should set the new customer id" do
      repo = CustomerRepository.new(csv_path)
      hawaii_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(hawaii_customer)
      expect(hawaii_customer.id).to eq(4)
      rucola_customer = Customer.new(address: "Stone Town", name: 'Freddie Mercury')
      repo.add(rucola_customer)
      expect(rucola_customer.id).to eq(5)
    end

    it "should start auto-incremting at 1 if it is the first customer added" do
      csv_path = 'unexisting_empty_customers.csv'
      FileUtils.remove_file(csv_path, force: true)

      repo = CustomerRepository.new(csv_path)
      hawaii_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(hawaii_customer)
      expect(hawaii_customer.id).to eq(1)

      FileUtils.remove_file(csv_path, force: true)
    end

    it "should save each new customer in the CSV (first row = headers)" do
      csv_path = 'spec/support/empty_customers.csv'
      FileUtils.remove_file(csv_path, force: true)

      repo = CustomerRepository.new(csv_path)
      hawaii_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(hawaii_customer)

      repo = CustomerRepository.new(csv_path)
      expect(repo.all.length).to eq(1)
      expect(repo.all[0].id).to eq(1)
      expect(repo.all[0].name).to eq("Michael Jackson")
      expect(repo.all[0].address).to eq("Gary")

      rucola_customer = Customer.new(address: 'Stone Town', name: 'Freddie Mercury')
      repo.add(rucola_customer)
      expect(rucola_customer.id).to eq(2)

      repo = CustomerRepository.new(csv_path)
      expect(repo.all.length).to eq(2)
      expect(repo.all[1].id).to eq(2)
      expect(repo.all[1].name).to eq("Freddie Mercury")
      expect(repo.all[1].address).to eq("Stone Town")

      FileUtils.remove_file(csv_path, force: true)
    end
  end

  describe "#find" do
    it "should retrieve a specific customer based on its id" do
      repo = CustomerRepository.new(csv_path)
      customer = repo.find(3)
      expect(customer.id).to eq(3)
      expect(customer.name).to eq("John Entwistle")
    end
  end
end
