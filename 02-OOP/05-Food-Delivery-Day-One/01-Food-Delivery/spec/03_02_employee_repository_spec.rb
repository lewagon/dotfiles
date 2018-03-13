require "fileutils"
require_relative "support/csv_helper"

begin
  require_relative "../app/repositories/employee_repository"
rescue LoadError => e
  if e.message =~ /employee_repository/
    describe "EmployeeRepository" do
      it "You need a `employee_repository.rb` file for your `EmployeeRepository`" do
        fail
      end
    end
  else
    raise e
  end
end

describe "EmployeeRepository", :employee do
  let(:employees) do
    [
      [ "id", "username", "password", "role" ],
      [ 1, "paul", "secret", "manager" ],
      [ 2, "john", "secret", "delivery_guy" ]
    ]
  end
  let(:csv_path) { "spec/support/employees.csv" }

  before(:each) do
    CsvHelper.write_csv(csv_path, employees)
  end

  def elements(repo)
    repo.instance_variable_get(:@employees) ||
      repo.instance_variable_get(:@elements)
  end

  describe "#initialize" do
    it "should take one argument: the CSV file path to store employees" do
      expect(EmployeeRepository.instance_method(:initialize).arity).to eq(1)
    end

    it "should not crash if the CSV path does not exist yet. Hint: use File.exist?" do
      expect { EmployeeRepository.new('unexisting_file.csv') }.not_to raise_error
    end

    it "should store employees in memory in an instance variable `@employees` or `@elements`" do
      repo = EmployeeRepository.new(csv_path)
      expect(elements(repo)).to be_a(Array)
    end

    it "should load existing employees from the CSV" do
      repo = EmployeeRepository.new(csv_path)
      loaded_employees = elements(repo) || []
      expect(loaded_employees.length).to eq(2)
    end

    it "fills the `@employees` with instance of `Employee`, setting the correct types on each property" do
      repo = EmployeeRepository.new(csv_path)
      loaded_employees = elements(repo) || []
      fail if loaded_employees.empty?
      loaded_employees.each do |employee|
        expect(employee).to be_a(Employee)
        expect(employee.id).to be_a(Integer)
        expect(employee.username).not_to be_empty
        expect(employee.password).not_to be_empty
        expect(employee.role).not_to be_empty
      end
    end
  end

  describe "#all_delivery_guys" do
    it "should return all the delivery guys stored by the repo" do
      repo = EmployeeRepository.new(csv_path)
      expect(repo.all_delivery_guys).to be_a(Array)
      expect(repo.all_delivery_guys.size).to eq(1)
      expect(repo.all_delivery_guys[0].username).to eq("john")
    end

    it "EmployeeRepository should not expose the @employees through a reader/method" do
      repo = EmployeeRepository.new(csv_path)
      expect(repo).not_to respond_to(:employees)
    end
  end

  it "EmployeeRepository should not implement an add method (we'll add employees manually to the CSV)" do
    repo = EmployeeRepository.new(csv_path)
    expect(repo).not_to respond_to(:add)
  end

  describe "#find" do
    it "should retrieve a specific employee based on its id" do
      repo = EmployeeRepository.new(csv_path)
      employee = repo.find(1)
      expect(employee.id).to eq(1)
      expect(employee.username).to eq("paul")
    end
  end

  describe "#find_by_username" do
    it "should retrieve a specific employee based on its username" do
      repo = EmployeeRepository.new(csv_path)
      employee = repo.find_by_username("john")
      expect(employee).not_to be_nil
      expect(employee.id).to eq(2)
      expect(employee.username).to eq("john")
    end
  end
end
