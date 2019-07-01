import React, { Component } from 'react';
import Location from './_Location.js';

class LocationBar extends Component {
  render() {
    const locations = this.props.locations.map(location => (
      <Location key={location.id} {...location} cookies={this.props.cookies} />
    ));

    return <div className="locations-container">{locations}</div>;
  }
}

export default LocationBar;
