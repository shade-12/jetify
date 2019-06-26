
TICKETMASTER_KEY=ENV['TICKETMASTER_KEY']


class TicketmasterService
  #this method makes a request to ticket master API using the ticketmaster-sdk wrapper
  
  class << self
    def call(latlong, startDate, endDate)
      params = { size: 15,  latlong: latlong,
        classificationId:'KZFzniwnSyZfZ7v7nJ', 
        startDateTime: startDate, 
        endDateTime: endDate,
        radius: 10,
        unit: 'miles'
      }
      client = Ticketmaster.client(apikey: TICKETMASTER_KEY)
      response = client.search_events(params: params)
      response.results.map{|result| event_hash(result)}
    end

    private
    def event_hash(result)
      date = result.dates['start']
      venue = result.venues.first
      image = result.images.first
      {
        id: result.id,
        image: image ? image.url : '',
        name: result.name, 
        date: date ? date['localDate'] : '',
        venue: venue ? venue.name : '',
        url: result.data['url'] 
      }
    end
  end
end



# events = TicketmasterService.call('54.9713082,-2.7246093',
#  DateTime.rfc3339('2019-07-05T17:52:00Z'), 
#  DateTime.rfc3339('2019-07-20T17:52:00Z'))

