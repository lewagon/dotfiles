class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable,
  #        :trackable, authentication_keys: [:login]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # acts_as_favoritor


  # validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  has_many :lists, dependent: :destroy
  has_many :list_markers, dependent: :destroy
  has_one_attached :photo

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :email, uniqueness: true

  validate :validate_username

def validate_username
  if User.where(email: username).exists?
    errors.add(:username, :invalid)
  end
end

def lists
  List.where(user_id: id)
end

end
