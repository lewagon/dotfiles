require "faker"

10.times do
  post = Post.new(
    name: Faker::Commerce.product_name,
    url: Faker::Internet.url,
    votes: (0..1000).to_a.sample
  )
  post.save
end