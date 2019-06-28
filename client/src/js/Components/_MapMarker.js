import React from "react";
import { Marker } from 'google-maps-react';
var headphone = require('./icons8-headphones-24.png')

export default class MapMarker extends React.Component {

  render(){
    console.log("I am props: ", this.props.latitude);
    return(
        {/*<Marker
          lat= {this.props.latitude}
          lng={this.props.longitude}
          icon={headphone}*/}
        // />

    );
  }
}
