import React, { Component } from 'react';
import axios from 'axios';
import Event from './_Event.js';
import { PushSpinner } from 'react-spinners-kit';
// has state - loading true or fault (starts true)
// componant did mount will make a request to the controller api action - once got events have can control them.

class EventBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      events: [],
      artists: []
    };
  } //constructor ends here.

  getEventInfo = () => {
    // const { latlong, startDate, endDate } = this.props;
    axios
      .get(
        `http://localhost:3000/api/events?latlong=${
          this.props.latlong
        }&startDate=${this.props.startDate}&endDate=${this.props.endDate}`
      )
      .then(response => {
        let data = response.data;
        this.setState({
          loading: false,
          events: data,
          artists: data.filter(e => e.artist).map(e => e.artist)
        });
        this.props.setArtists(this.state.artists);
      })
      .catch(error => {
        console.log(error);
      });
  }; //get info ends here

  componentDidMount() {
    this.getEventInfo();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.latlong !== prevProps.latlong ||
      this.props.startDate !== prevProps.startDate ||
      this.props.endDate !== prevProps.endDate
    ) {
      this.setState({loading: true});
      this.getEventInfo();
    }
  }

  render() {
    const { loading, events } = this.state;
    if (loading) {
      return (
        <div className="events-container">
          <h4>Events on the way ...</h4>
          <PushSpinner size={80} color="#1db954" loading={loading} />
        </div>
      );
    } else {
      if (this.props.tracksInPlaylist === true) {
        return (
          <div className="events-container">
            {events.map(event => (
              <Event event={event} key={event.id} />
            ))}
          </div>
        );
      } else {
        return <p>No shows in this location!</p>;
      }
    }
  }
}

export default EventBar;
