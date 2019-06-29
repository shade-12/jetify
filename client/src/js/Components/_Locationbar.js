import React, { Component } from 'react';
import { PushSpinner } from 'react-spinners-kit';

class LocationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
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
        return (
          <div className="empty-container">
            <h4>No events happening here</h4>
          </div>
        );
      }
    }
  }
}

export default LocationBar;
