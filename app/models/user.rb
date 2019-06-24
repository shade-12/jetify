class User < ApplicationRecord
  default_scope { order('id ASC') }
  has_many :moods
  has_many :songs, through: :moods
  has_many :saved_playlists
  has_many :songs, through: :saved_playlists

  def access_token_expired?
    (Time.now - self.updated_at) > 3300
  end
end
