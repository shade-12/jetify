class Api::LoginController < ApplicationController
  skip_before_action :authorized, only: [:index]

  def index
    query_params ={
      client_id: ENV['CLIENT_ID'],
      response_type: "code",
      redirect_uri: 'http://localhost:3000/api/logging-in',
      scope: "user-library-read user-library-modify playlist-modify-public user-top-read playlist-modify-public user-modify-playback-state user-follow-modify user-read-currently-playing user-read-playback-state user-follow-read app-remote-control streaming user-read-birthdate user-read-email user-read-private",
      show_dialog: true
    }

    url = "https://accounts.spotify.com/authorize/"

    redirect_to "#{url}?#{query_params.to_query}"
  end
end
