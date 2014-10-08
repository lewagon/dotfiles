require "shuffle"

describe '#shuffle' do
  it 'should return an array' do
    expect(shuffle([])).to be_a Array
  end

  it 'sorts an array in a random way' do
    a = [1, 2, 3, 4]
    b = shuffle(a)
    expect(b).not_to be_nil
    expect(b.length).to eq a.length
    expect(a).not_to eq b
  end
end
