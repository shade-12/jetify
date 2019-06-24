class Api::HomeController < ApplicationController
  def index
    render :json => {
      playlist_id: ENV.fetch('SPOTIFY_PLAYLIST_ID', nil),
      user_id: ENV.fetch('SPOTIFY_USER_ID', nil)
    }
  end

  def callback
    @spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    @new_playlist = @spotify_user.create_playlist!('WhatsPlaying')

    render :json => {
      spotify_user: @spotify_user,
      new_playlist: @new_playlist
    }
  end
end
