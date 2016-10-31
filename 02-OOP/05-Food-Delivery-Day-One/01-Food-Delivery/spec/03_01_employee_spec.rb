begin
  require_relative "../app/models/employee.rb"
rescue LoadError => e
  if e.message =~ /employee\.rb/
    describe "Employee" do
      it "You need a `employee.rb` file for your `Employee` model" do
        fail
      end
    end
  else
    raise e
  end
end

describe "Employee", :employee do
  it "should be initialized with a hash of properties" do
    properties = { id: 1, username: "paul", password: 'secret', role: 'manager' }
    employee = Employee.new(properties)
    expect(employee).to be_a(Employee)
  end

  describe "#id" do
    it "should return the employee id" do
      employee = Employee.new({ id: 42 })
      expect(employee.id).to eq(42)
    end
  end

  describe "#id=" do
    it "should set the employee id" do
      employee = Employee.new({ id: 42 })
      employee.id = 43
      expect(employee.id).to eq(43)
    end
  end

  describe "#username" do
    it "should return the username of the Employee" do
      employee = Employee.new({ username: "paul" })
      expect(employee.username).to eq("paul")
    end
  end

  describe "#password" do
    it "should return the password of the Employee" do
      employee = Employee.new({ password: 'secret' })
      expect(employee.password).to eq('secret')
    end
  end

  describe "#role" do
    it "should return the role of the Employee" do
      employee = Employee.new({ role: 'delivery_guy' })
      expect(employee.role).to eq('delivery_guy')
    end
  end

  describe "#manager?" do
    it "should return true is the employee is a manager" do
      employee = Employee.new({ role: 'manager' })
      expect(employee.manager?).to be true
    end

    it "should return false is the employee is a delivery guy" do
      employee = Employee.new({ role: 'delivery_guy' })
      expect(employee.manager?).to be false
    end
  end

  describe "#delivery_guy?" do
    it "should return true is the employee is a delivery guy" do
      employee = Employee.new({ role: 'delivery_guy' })
      expect(employee.delivery_guy?).to be true
    end

    it "should return false is the employee is a manager" do
      employee = Employee.new({ role: 'manager' })
      expect(employee.delivery_guy?).to be false
    end
  end
end
