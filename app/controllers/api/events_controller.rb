class Api::EventsController < ApplicationController
  def index

    events = TicketmasterService.call
    render json: events
    # render :json => {
    #   message: "hello tesring!"
    # }
  end
end