# require_relative "support/csv_helper"

# begin
#   require_relative "../app/controllers/sessions_controller"
#   require_relative "../app/repositories/employee_repository"
# rescue LoadError => e
#   if e.message =~ /employee_repository/ || e.message =~ /sessions_controller/
#     describe "SessionsController" do
#       it "You need a `sessions_controller.rb` file for your `SessionsController`" do
#         fail
#       end
#     end
#   else
#     fail e
#   end
# end

# describe "SessionsController", :session do
#   let(:employees) do
#     [
#       [ "id", "username", "password", "role" ],
#       [ 1, "paul", "secret", "manager" ],
#       [ 2, "john", "secret", "delivery_guy" ]
#     ]
#   end
#   let(:csv_path) { "spec/support/employees.csv" }
#   let(:repository) { EmployeeRepository.new(csv_path) }

#   before(:each) do
#     CsvHelper.write_csv(csv_path, employees)
#   end

#   it "should be initialized with a `EmployeeRepository` instance" do
#     controller = SessionsController.new(repository)
#     expect(controller).to be_a(SessionsController)
#   end

#   describe "#sign_in" do
#     module Kernel; def gets; STDIN.gets; end; end

#     it "should ask for a username and a password, find the employee, say hello if the employee exists and password match + return the employee" do
#       controller = SessionsController.new(repository)
#       expect(STDOUT).to receive(:puts).with(/username/i)
#       expect(STDOUT).to receive(:puts).with(/password/i)
#       expect(STDOUT).to receive(:puts).with(/welcome/i)
#       allow(STDIN).to receive(:gets).and_return("paul", "secret")
#       employee = controller.sign_in

#       expect(employee).not_to be_nil
#       expect(employee.username).to eq("paul")
#     end

#     it "should ask to try again if the username does not exist (Hint: recursive call of sign_in)" do
#       controller = SessionsController.new(repository)
#       allow(STDIN).to receive(:gets).and_return("ringo", "secret", "paul", "secret")
#       expect(STDOUT).to receive(:puts).with(/username/i).twice
#       expect(STDOUT).to receive(:puts).with(/password/i).twice
#       expect(STDOUT).to receive(:puts).with(/wrong credentials/i)
#       expect(STDOUT).to receive(:puts).with(/welcome/i)
#       employee = controller.sign_in
#     end

#     it "should ask to try again if the username exists but the password does not match" do
#       controller = SessionsController.new(repository)
#       allow(STDIN).to receive(:gets).and_return("paul", "something_else", "paul", "secret")
#       expect(STDOUT).to receive(:puts).with(/username/i).twice
#       expect(STDOUT).to receive(:puts).with(/password/i).twice
#       expect(STDOUT).to receive(:puts).with(/wrong credentials/i)
#       expect(STDOUT).to receive(:puts).with(/welcome/i)
#       employee = controller.sign_in
#     end
#   end
# end
