require "fileutils"
require_relative "support/csv_helper.rb"

begin
  require_relative "../app/repositories/customers_repository.rb"
rescue LoadError => e
  if e.message =~ /customers_repository\.rb/
    describe "CustomersRepository" do
      it "You need a `customers_repository.rb` file for your `CustomersRepository`" do
        fail
      end
    end
  else
    raise e
  end
end

describe "CustomersRepository", :customer do
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
      expect(CustomersRepository.instance_method(:initialize).arity).to eq(1)
    end

    it "should not crash if the CSV path does not exist yet. Hint: use File.exist?" do
      expect { CustomersRepository.new('unexisting_file.csv') }.not_to raise_error
    end

    it "store customers in memory in an instance variable `@customers` or `@elements`" do
      repo = CustomersRepository.new(csv_path)
      expect(elements(repo)).to be_a(Array)
    end

    it "loads existing customers from the CSV" do
      repo = CustomersRepository.new(csv_path)
      loaded_customers = elements(repo) || []
      expect(loaded_customers.length).to eq(3)
    end

    it "fills the `@customers` with instance of `Customer`, setting the correct types on each property" do
      repo = CustomersRepository.new(csv_path)
      loaded_customers = elements(repo) || []
      fail if loaded_customers.empty?
      loaded_customers.each do |customer|
        expect(customer).to be_a(Customer)
        expect(customer.id).to be_a(Fixnum)
      end
    end
  end

  describe "#all" do
    it "should return all the customers stored by the repo" do
      repo = CustomersRepository.new(csv_path)
      expect(repo.all).to be_a(Array)
      expect(repo.all[0].name).to eq("Paul McCartney")
    end

    it "CustomersRepository should not expose the @customers through a reader/method" do
      repo = CustomersRepository.new(csv_path)
      expect(repo).not_to respond_to(:customers)
    end
  end

  describe "#add" do
    it "should add a customer to the in-memory list" do
      repo = CustomersRepository.new(csv_path)
      new_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(new_customer)
      expect(repo.all.length).to eq(4)
    end

    it "should set the new customer id" do
      repo = CustomersRepository.new(csv_path)
      hawaii_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(hawaii_customer)
      expect(hawaii_customer.id).to eq(4)
      rucola_customer = Customer.new(address: "Stone Town", name: 'Freddie Mercury')
      repo.add(rucola_customer)
      expect(rucola_customer.id).to eq(5)
    end

    it "should start auto-incremting at 1 if very first customer added" do
      csv_path = 'unexisting_empty_customers.csv'
      FileUtils.remove_file(csv_path, force: true)

      repo = CustomersRepository.new(csv_path)
      hawaii_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(hawaii_customer)
      expect(hawaii_customer.id).to eq(1)

      FileUtils.remove_file(csv_path, force: true)
    end

    it "should persist in the CSV the new added customer (first row = headers)" do
      csv_path = 'spec/support/empty_customers.csv'
      FileUtils.remove_file(csv_path, force: true)

      repo = CustomersRepository.new(csv_path)
      hawaii_customer = Customer.new(address: "Gary", name: 'Michael Jackson')
      repo.add(hawaii_customer)

      repo = CustomersRepository.new(csv_path)
      expect(repo.all.length).to eq(1)
      expect(repo.all[0].id).to eq(1)
      expect(repo.all[0].name).to eq("Michael Jackson")
      expect(repo.all[0].address).to eq("Gary")

      rucola_customer = Customer.new(address: 'Stone Town', name: 'Freddie Mercury')
      repo.add(rucola_customer)
      expect(rucola_customer.id).to eq(2)

      repo = CustomersRepository.new(csv_path)
      expect(repo.all.length).to eq(2)
      expect(repo.all[1].id).to eq(2)
      expect(repo.all[1].name).to eq("Freddie Mercury")
      expect(repo.all[1].address).to eq("Stone Town")

      FileUtils.remove_file(csv_path, force: true)
    end
  end

  describe "#find" do
    it "should retrieve a specific customer based on its id" do
      repo = CustomersRepository.new(csv_path)
      customer = repo.find(3)
      expect(customer.id).to eq(3)
      expect(customer.name).to eq("John Entwistle")
    end
  end
end
