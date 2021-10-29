require "coach_answer"

describe "The method coach_answer" do
  it "returns a String" do
    expect(coach_answer("Hello Coach!")).to be_a String
  end

  it "replies saying he does not care when you enter a statement" do
    expect(coach_answer("I would love to eat some pizza!")).to eq "I don't care, get dressed and go to work!"
  end

  it "replies saying it's a silly question when you enter a question" do
    expect(coach_answer("Can I eat some pizza?")).to eq "Silly question, get dressed and go to work!"
  end

  it "does not answer back (i.e. answers with an empty string) when you tell him you are going to work" do
    expect(coach_answer("I am going to work right now!")).to eq ""
  end
end

describe "The method coach_answer_enhanced" do
  it "returns a String" do
    expect(coach_answer_enhanced("Hello Coach!")).to be_a String
  end

  it "replies saying he does not care when you enter a statement (and does not shout)" do
    expect(coach_answer_enhanced("I would love to eat some pizza!")).to eq "I don't care, get dressed and go to work!"
  end

  it "replies saying it's a silly question when you enter a question (and does not shout)" do
    expect(coach_answer_enhanced("Can I eat some pizza?")).to eq "Silly question, get dressed and go to work!"
  end

  it "does not answer back (i.e. answers with an empty string) when you tell him you are going to work (and does not shout)" do
    expect(coach_answer_enhanced( "I am going to work right now!")).to eq ""
  end

  it "prepends a motivation statement before saying he does not care when you shout a statement at him" do
    expect(coach_answer_enhanced("I WOULD LOVE SOME PIZZA!")).to eq "I can feel your motivation! I don't care, get dressed and go to work!"
  end

  it "prepends a motivation statement before saying that it's a silly question when you shout a question at him" do
    expect(coach_answer_enhanced("CAN I EAT SOME PIZZA?")).to eq "I can feel your motivation! Silly question, get dressed and go to work!"
  end

  it "does not answer back (i.e. answers with an empty string) when you shout at him saying you are going to work" do
    expect(coach_answer_enhanced("I AM GOING TO WORK RIGHT NOW!")).to eq ""
  end
end
