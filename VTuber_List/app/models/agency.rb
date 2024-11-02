class Agency < ApplicationRecord
  has_many :vtubers

  validates :name, presence: true
  validates :name, uniqueness: true

  def vtuber_count
    Vtuber.where(agency_id: id).length
  end

  def has_website?
    website && !website.blank?
  end

  def has_yt_channel?
    yt_channel && !yt_channel.blank?
  end

  def self.find_by_name(name)
    Agency.where(name: name).first
  end
end
