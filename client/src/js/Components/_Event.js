// cleaner to move each event into this componant
import React, { Component } from 'react';
// import axios from 'axios';
// has state - loading true or fault (starts true)
// componant did mount will make a request to the controller api action - once got events have can control them.

class Event extends Component {
  render() {
    const { event } = this.props;
    // let url = '';
    // if (event.data._embedded.sales.url === []) {
    //   url =
    //     'https://www.ticketmaster.com/?landing=c&c=SEM_TMBRAND_ggl_295481099_21183198059_ticketmaster&GCID=0&&gclid=Cj0KCQjwo7foBRD8ARIsAHTy2wmQR3K6RFM0qxj7j6jPqmd7SyYBoDJycACNl2yUKn3lBhX6hKjmRLoaAjpFEALw_wcB&gclsrc=aw.ds';
    // } else {
    //   url = event.data._embedded.sales.url;
    // }
    return (
      <section className="card" style={{ width: 18 + 'rem' }}>
        <img className="card-img-top" src={event.image} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{event.artist}</h5>
          {/* event.name */}
          <p className="card-date">{event.date}</p>
          <p className="card-venue">{event.venue}</p>
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
