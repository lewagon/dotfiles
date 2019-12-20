require "ruby_is"

describe "find_nth_word" do
  it "should return the third word of a sentence" do
    expect(find_word_at_index(3, "I love Regex")).to eq "Regex"
  end

  it "should return the fifth word of a sentence" do
    expect(find_word_at_index(5, "So much fun with Regex")).to eq "Regex"
  end
end


describe "#ruby_is" do
  it "should return the description of Ruby" do
    sentences = "The very first day is a special day.
      The atmosphere is vibrant and dynamic as students gather to meet the team.
      The doors will remain wide open until everybody has arrived.
      People start to discuss the source of their motivations.
      All want to obtain a programming skill to move forward and learn Ruby.
      They got familiar with the language during the prep work.
      They are ready to work with determination.
      The setup day will be a good start to dig into the programm.
      Everyone needs to stay really focus on the guidelines.
      And read every single output on the terminal to check that everything runs smoothly.
      Install Sublime Text for its simplicity of use.
      Add packages to highlight code and enable autocompletion.
      The configuration is aimed at productivity.
      It will be totally worth it in the end.
      The setup checks the environment has all necessary gems to work properly.
      It also guides everyone through an extensive configuration of Github.
      Teachers even picked a very elegant theme for Sublime Text.
      And linters to help with syntax.
      Twist the computer user settings that lead to have a better experience.
      Choosing a shell like zsh is more suitable for a coder.
      Dark colors will protect the natural accomodation of the eyes.
      The setup ends with instructions to onboard on kitt.
      Join Slack to chat and read messages from all the batch.
      Write the first commit message and launch the first push.
      This part was kind of easy.
      It was the first steps to understand the environment.
      Tomorrow all the students will write their first lines of Ruby."
    expect(ruby_is(sentences)).to eq "a dynamic open source programming language with a focus on simplicity and productivity it has an elegant syntax that is natural to read and easy to write"
  end
end