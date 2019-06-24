class Api::EventsController < ApplicationController
  def index
    events = TicketmasterService.call
    render json: events
  end
end