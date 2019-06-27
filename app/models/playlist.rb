class Playlist < ApplicationRecord
  validates_associated :user
  validates_presence_of :user
  validates_associated :location
  validates_presence_of :location
  belongs_to :location
  belongs_to :user
end
