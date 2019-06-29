class AddReusableSpotifyPlaylistIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :reusable_spotify_playlist_id, :string
  end
end
