class Api::LocationsController < ApplicationController

  def create
    @location = Location.find_or_create_by(
      name: params[:name],
      latitude: params[:latitude],
      longitude: params[:longitude]
    )
    @location.save
  end

  def show
    @location = Location.find params[:id]
    render :json => {
      user: @location
    }
  end

end
