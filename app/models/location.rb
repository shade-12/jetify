class Location < ApplicationRecord
  has_many :playlists, :dependent => :destroy
end
