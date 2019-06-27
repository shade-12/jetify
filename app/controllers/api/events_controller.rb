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

# events = TicketmasterService.call('49.2,-123.1',DateTime.parse('2019-07-20T21:45:26.173Z'),DateTime.parse('2019-07-29T21:45:26.173Z'))