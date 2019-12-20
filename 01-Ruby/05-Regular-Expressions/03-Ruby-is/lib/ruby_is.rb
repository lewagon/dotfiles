SENTENCES = "z z z z z a z entering the bootcamp for the first time.
The atmosphere is vibrant and dynamic as students gather to meet the team.
The doors will remain wide open until everybody has arrived.
People start to discuss the source of their motivations.
All want to obtain a programming skill to move forward and learn Ruby.
They got familiar with the language during the prep work.
They are ready to work with determination.
The setup day will be a good start to dig into the programm.
Everyone needs to stay really focus on the guidelines.
And read every single output on the terminal to check that everything runs smoothly.
z z z z z simplicity z.
z z z z z and .
The configuration is aimed at productivity.
It will be totally worth it in the end.
The setup checks the environment has all necessary gems to work properly.
It also guides everyone through an extensive configuration of Github.
Teachers even picked a very elegant theme for Sublime Text.
And linters to help with syntax.
z z z z z that.
z z z z z is.
Follow all the steps z natural the final completion message.
The setup ends with instructions to clone the challenges repository.
z z z z z read the challenge.
z z z z z and make the very first commit message.
z z z z z easy.
z z The day draws to an end.
Tomorrow all the students will write their first lines of Ruby."



def find_nth_word(index, sentence)
  sentence.match(/(?:\w+\s){#{index - 1}}(\w+)/)[1]
end

def ruby_is
  result = SENTENCES.split(".").map do |sentence|
    find_nth_word(6, sentence)
  end
  result.join(' ')
end