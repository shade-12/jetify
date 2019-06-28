import React from "react";
import { Marker } from 'google-maps-react';
var headphone = require('./icons8-headphones-24.png')

export default class MapMarker extends React.Component {

  render(){
    console.log(this.props.position)
    return(
        <Marker
        lat= {this.props.lat} 
        lng={this.props.lng} 
          icon={headphone}
        >
        </Marker>
    );
  }
}
