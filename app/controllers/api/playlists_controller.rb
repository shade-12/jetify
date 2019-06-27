class Api::PlaylistsController < ApplicationController

  def create
    @playlist = Playlist.find_or_create_by(
      user_id: params[:user_id],
      location_id: params[:location_id],
      name: params[:name],
      spotify_id: params[:spotify_id]
    )
    @playlist.save
  end

  def show
    @playlist = Playlist.find params[:id]
    render :json => {
      playlist: @playlist
    }
  end

end
