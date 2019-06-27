class Api::LocationsController < ApplicationController

  def create
    @location = Location.find_or_create_by(
      name: params[:name],
      latitude: params[:latitude],
      longitude: params[:longitude]
    )
    if @location.save
      render :json => {
        location: @location
      }
    end
  end

  def show
    @location = Location.find params[:name]
    render :json => {
      location: @location
    }
  end

end
