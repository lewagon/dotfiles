def pluralize(integer, string)
  if integer == 1
    "#{integer} #{string}"
  else
    "#{integer} #{string}s"
  end
end
