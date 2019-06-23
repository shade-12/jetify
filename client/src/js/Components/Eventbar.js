import React, { Component } from 'react';
import axios from 'axios';
import Event from './Event.js';
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
    if (loading) {
      return (
        <div className="events-container">
          <p>loading!</p>
        </div>
      );
    } else {
      return (
        <div className="events-container">
          {events.map(event => (
            <Event event={event} />
          ))}
        </div>
      );
    }
  }
}

export default EventBar;
