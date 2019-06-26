class Api::EventsController < ApplicationController
  def index
    events = TicketmasterService.call(
      params[:latlong],
      DateTime.parse(params[:startDate]),
      DateTime.parse(params[:endDate])
    )
    render json: events
  end
end