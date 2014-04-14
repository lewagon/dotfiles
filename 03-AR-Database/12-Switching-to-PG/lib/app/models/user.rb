class User < ActiveRecord::Base
  has_many :recipes
  def to_s
    "#{self.name} | #{self.email} ¬ id: #{self.id}"
  end
end
