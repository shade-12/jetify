import React from "react";
import { Marker } from 'google-maps-react';
var headphone = require('./icons8-headphones-24.png')

export default class MapMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
          icon={headphone}
        >
        </Marker>
    );
  }
}
