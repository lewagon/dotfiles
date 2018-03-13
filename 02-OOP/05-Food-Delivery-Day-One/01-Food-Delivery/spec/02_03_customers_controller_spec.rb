require_relative "support/csv_helper"

begin
  require_relative "../app/controllers/customers_controller"
  require_relative "../app/repositories/customer_repository"
rescue LoadError => e
  if e.message =~ /customer_repository/ || e.message =~ /customers_controller/
    describe "CustomersController" do
      it "You need a `customers_controller.rb` file for your `CustomersController`" do
        fail
      end
    end
  else
    fail e
  end
end

describe "CustomersController", :customer do
  let(:customers) do
    [
      [ "id", "name", "address" ],
      [ 1, "Paul McCartney", "Liverpool" ],
      [ 2, "John Bonham", "Redditch" ],
      [ 3, "John Entwistle", "Chiswick" ],
    ]
  end
  let(:csv_path) { "spec/support/customers.csv" }
  let(:repository) { CustomerRepository.new(csv_path) }

  it "should be initialized with a `CustomerRepository` instance" do
    controller = CustomersController.new(repository)
    expect(controller).to be_a(CustomersController)
  end

  describe "#list" do
    it "should grab customers from the repo and display them" do
      controller = CustomersController.new(repository)
      customers.drop(1).each do |customer_array|
        expect(STDOUT).to receive(:puts).with(/#{customer_array[1]}/)
      end

      controller.list
    end
  end

  describe "#add" do
    it "should ask the user for a name and address, then store the new customer" do
      controller = CustomersController.new(repository)
      Object.any_instance.stub(gets: "Le Wagon")

      controller.add

      expect(repository.all.length).to eq(4)
      expect(repository.all[3].name).to eq("Le Wagon")
      expect(repository.all[3].address).to eq("Le Wagon")
    end
  end
end
