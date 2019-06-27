class Api::UsersController < ApplicationController
  def create
    @user = User.find_or_create_by(
      name: params[:name],
      email: params[:email],
      spotify_id: params[:spotify_id]
    )
    @user.save
  end

  def show
    @user = User.find params[:id]
    render :json => {
      user: @user
    }
  end
end
