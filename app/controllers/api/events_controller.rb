class Api::EventsController < ApplicationController
  def index
    events = TicketmasterService.call(
      params[:latlong],
      DateTime.rfc3339(params[:startDate]),
      DateTime.rfc3339(params[:endDate])
    )
    render json: events
  end
end