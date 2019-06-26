class Api::UsersController < ApplicationController
  def create
    @user = User.new(
      name: params[:name],
      email: params[:email]
    )

    if @user.save
      redirect_to '/'
    end
  end

  def show
  end
end
