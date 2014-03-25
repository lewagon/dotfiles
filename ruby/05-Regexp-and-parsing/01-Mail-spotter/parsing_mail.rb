def parse_mail
  # 1. How do you model the jokes ? Pick up the adequate line
  $jokes = [["gmail", "you're an average but modern person"],["lewagon", "you're skilled and capable"]] 
  jokes = "gmail,you're an average but modern person\nlewagon;you're skilled and capable" 
  JOKES = {"gmail" => "you're an average but modern person", "lewagon" => "you're skilled and capable"}
  
  # 2. Don't hesitate to add jokes to this poor list..
  
  # 3. Now you simply have to code the rest :)
end

parse_mail("boris@lewagon.org") # => "Well done boris, you're skilled and capable"