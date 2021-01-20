def circle_area(radius)
  # TODO: Implement the `circle_area` method
  # Math::PI * radius * radius
  if radius.negative?
    return 0
  else
    return 3.14 * radius * radius
  end
end
