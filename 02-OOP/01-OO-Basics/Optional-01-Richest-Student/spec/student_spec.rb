require "student"

describe Student do
  describe "#initialize" do
    it "should take 4 arguments: name, fives, tens and twenties" do
      expect(Student.allocate.method(:initialize).arity).to eq 4
    end
  end

  describe "#wealth" do
    it "should return the total amount of money based on owned bills" do
      alice = Student.new("alice", 10, 2, 1)
      expect(alice.wealth).to eq 90
    end
  end

  describe "#name" do
    it "should return the student's name" do
      alice = Student.new("alice", 10, 2, 1)
      expect(alice.name).to eq "alice"
    end
  end

  it "should be comparable to another student" do
    alice = Student.new("alice", 10, 1, 0)
    bob = Student.new("bob", 5, 1, 0)
    expect(alice > bob).to eq true
    expect(alice < bob).to eq false
  end

  it "should be equal to another student if has same wealth" do
    alice = Student.new("alice", 10, 0, 1)
    bob = Student.new("bob", 0, 5, 1)
    expect(alice == bob).to eq true
  end

  it "should allow to sort an array of students based on wealth" do
    alice = Student.new("alice", 10, 1, 1)
    bob = Student.new("bob", 0, 5, 1)
    charlie = Student.new("charlie", 1, 0, 0)
    students = [alice, bob, charlie]
    sorted_students = students.sort
    expect(sorted_students).to eq([ charlie, bob, alice])
  end
end
