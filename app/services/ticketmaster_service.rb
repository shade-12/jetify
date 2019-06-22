# require 'ticketmaster-sdk'
TICKETMASTER_KEY = 'WYh6wyUhsALWBUVdSzGP9Z44bfT2YlDt'

class TicketmasterService
  #this where to make request to ticket master API using the ticket-master-sdk wrppaer
  
  class << self

    def call
      params = { size: 10,  keyword: 'vancouver',
        classificationId:'KZFzniwnSyZfZ7v7nJ', 
        startDateTime: DateTime.rfc3339('2019-06-20T15:14:00Z'), 
        endDateTime: DateTime.rfc3339('2019-06-27T15:15:00Z')
      }
      client = Ticketmaster.client(apikey: TICKETMASTER_KEY)
      response = client.search_events(params: params)
      events = response.results
    end
  end
  
end


#events.map(&:name)

# events.map { |event| event.name } #artist name/event name
# events = TicketmasterService.call
# e = events.first 
# e.attractions.first.url #e.attractions.first.name to check it's the correct artist and not just featured. Get the first one and this should be right 
# e.venues.first.name