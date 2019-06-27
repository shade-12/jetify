class Api::PlaylistsController < ApplicationController

  def create
    @playlist = Playlist.find_or_create_by(
      user: params[:user],
      location: params[:location],
      name: params[:name],
      spotify_id: params[:spotify_id]
    )
    @playlist.save
  end

  def show
    @playlist = Playlist.find params[:id]
    render :json => {
      user: @playlist
    }
  end

end
