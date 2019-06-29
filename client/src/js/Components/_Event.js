// cleaner to move each event into this componant
import React, { Component } from 'react';
// import axios from 'axios';
// has state - loading true or fault (starts true)
// componant did mount will make a request to the controller api action - once got events have can control them.

class Event extends Component {
  render() {
    const { event } = this.props;

    return (
      <section className="card" style={{ width: 18 + 'rem' }}>
        <img className="card-img-top" src={event.image} alt="Card cap" />
        <div className="card-body">
          <h4 className="card-title">{event.name}</h4>
          <p className="card-date">Date: {event.date}</p>
          <p className="card-venue">Venue: {event.venue}</p>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Buy tickets
          </a>
        </div>
      </section>
    );
  }
}

export default Event;

// {`${event.data._embedded.sales.url}`}
