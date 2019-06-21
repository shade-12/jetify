


require 'ticketmaster-sdk'
TICKETMASTER_KEY = 'WYh6wyUhsALWBUVdSzGP9Z44bfT2YlDt'

class TicketMasterService
  #this where to make request to ticket master API using the ticket-master-sdk wrppaer
  params = { size: 10,  keyword: 'vancouver',
     classificationId:'KZFzniwnSyZfZ7v7nJ', 
     startDateTime: DateTime.rfc3339('2019-06-20T15:14:00Z'),
     endDateTime: DateTime.rfc3339('2019-06-27T15:15:00Z')
     }
  client = Ticketmaster.client(apikey: 'WYh6wyUhsALWBUVdSzGP9Z44bfT2YlDt')
  response = client.search_events(params: params)
  events = response.results
end


