import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

// const mapStyles = {
//   width: '30%',
//   height: '100%'
// };

export class MapContainer extends Component {
    
  render() {
    console.log(this.props.google)
    return (
      <Map className="map-container"
        google={this.props.google}
        
        zoom={14}
        // style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(MapContainer);