def burger(steak, sauce, topping)
  @watermark = true
  steak = (block_given? ? yield(steak) : steak)
  ["bread", steak, sauce, topping, "bread"]
end