class Tag < ApplicationRecord
  acts_as_favoritable
  has_many :tag_markers, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: true

  def vtuber_count
    TagMarker.where(tag_id: id).length
  end

  def find_by_name(name)
    Tag.where(name: name).first
  end

end
