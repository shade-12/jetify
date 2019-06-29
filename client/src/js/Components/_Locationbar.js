import React, { Component } from 'react';
// import { PushSpinner } from 'react-spinners-kit';
import Location from './_Location.js';

class LocationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  render() {
    const locations = this.props.locations.map(location =>
      <Location key={location.id} {...location} />
    );
    console.log("Props location: ", this.props.locations)
    return (
      <div className="locations-container">
        {locations}
      </div>
    );
  }
}

export default LocationBar;
