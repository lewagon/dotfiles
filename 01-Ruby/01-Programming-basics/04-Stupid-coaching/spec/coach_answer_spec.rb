require "coach_answer"

describe "The method coach_answer" do
  it 'returns a String' do
    expect( coach_answer("Hello Coach!") ).to be_a String
  end

  it 'answers back he does not care when you tell him something' do
    expect( coach_answer("I would love to eat some pizza!") ).to eq "I don't care, get dressed and go to work!"
  end

  it 'answers back that\'s a silly question when you ask him something' do
    expect( coach_answer("Can I eat some pizza?") ).to eq "Silly question, get dressed and go to work!"
  end

  it 'does not answer back when you tell him you are going to work' do
    expect( coach_answer( "I am going to work right now!" ) ).to eq ""
  end
end

describe "The method coach_answer_enhanced" do
  it 'returns a String' do
    expect( coach_answer_enhanced("Hello Coach!") ).to be_a String
  end

  it 'answers back he does not care when you tell him something and does not shout' do
    expect( coach_answer("I would love to eat some pizza!") ).to eq "I don't care, get dressed and go to work!"
  end

  it 'answers back that\'s a silly question when you ask him something and does not shout' do
    expect( coach_answer("Can I eat some pizza?") ).to eq "Silly question, get dressed and go to work!"
  end

  it 'does not answer back when you tell him you are going to work and does not shout' do
    expect( coach_answer( "I am going to work right now!" ) ).to eq ""
  end

  it 'prepends a motivation statement and answers back he does not care when you tell him something and you shout' do
    expect( coach_answer_enhanced("I WOULD LOVE SOME PIZZA!") ).to eq "I can feel your motivation! I don't care, get dressed and go to work!"
  end

  it 'prepends a motivation statement and answers back that\'s a silly question when you ask him something and you shout' do
    expect( coach_answer_enhanced("CAN I EAT SOME PIZZA?") ).to eq "I can feel your motivation! Silly question, get dressed and go to work!"
  end

  it 'does not answer back when you tell him you are going to work and you shout' do
    expect( coach_answer_enhanced( "I AM GOING TO WORK RIGHT NOW!" ) ).to eq ""
  end
end
