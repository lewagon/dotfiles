require "fizz_buzz"

describe "fizz_buzz" do
  it "should raise an argument error if passed a number below 1" do
    expect { fizz_buzz(0) }.to raise_error ArgumentError
  end

  it "should return the array [ 1 ] for number 1" do
    expect(fizz_buzz(1)).to eq([ 1 ])
  end

  it "should return the array [ 1, 2, 'Fizz' ] for number 3" do
    expect(fizz_buzz(3)).to eq([ 1, 2, 'Fizz'])
  end

  it "should return the array [ 1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7 ] for number 7" do
    expect(fizz_buzz(7)).to eq([ 1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7 ])
  end

  it "should return an array with 'FizzBuzz' at the 15th element of the array (15 is divisible by both 3 and 5)" do
    expect(fizz_buzz(100)[14]).to eq 'FizzBuzz'
  end
end
