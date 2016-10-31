require_relative "support/csv_helper.rb"

begin
  require_relative "../app/controllers/customers_controller.rb"
  require_relative "../app/repositories/customers_repository.rb"
rescue LoadError => e
  if e.message =~ /customers_repository\.rb/ || e.message =~ /customers_controller\.rb/
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
  let(:repository) { CustomersRepository.new(csv_path) }

  it "should be initialized with a `CustomersRepository` instance" do
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
      module Kernel; def gets; STDIN.gets; end; end
      allow(STDIN).to receive(:gets).and_return("Michael Jackson", "Gary")

      controller.add

      expect(repository.all.length).to eq(4)
      expect(repository.all[3].name).to eq("Michael Jackson")
      expect(repository.all[3].address).to eq("Gary")
    end
  end
end
