import React, { Component } from 'react';
import axios from 'axios';
// has state - loading true or fault (starts true)
// componant did mount will make a request to the controller api action - once got events have can control them.

class EventBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      events: []
    };
  } //constructor ends here.

  getEventInfo = () => {
    axios
      .get('/api/events')
      .then(response => {
        let data = response.data;
        console.log(data);
        this.setState({
          loading: false,
          events: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }; //get info ends here

  componentDidMount() {
    this.getEventInfo();
  }

  render() {
    const { loading, events } = this.state;
    let test;
    if (loading) {
      return (
        <div className="events-container">
          <p>loading!</p>
        </div>
      );
    } else {
      return events.map(event => (
        <div className="events-container">
          <section className="card" style={{ width: 18 + 'rem' }}>
            <img
              className="card-img-top"
              src="https://hecktictravels.com/wp-content/uploads/2012/02/NYC-Nightlife-THUMBNAIL.jpg"
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">{`${event.data.name}`}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </section>
        </div>
      ));
    }
  }
}

export default EventBar;
