import React from "react";
import { Marker, InfoWindow } from 'google-maps-react';
import PlaylistWindow from "./_PlaylistWindow";
import headphone from './icons8-headphones-24.png';

export default class MapMarker extends React.Component {
  constructor(props){
  super(props)
  this.state = {
    name: '',

    isOpen: false,
    activeMarker: this.props.activeMarker
  }
  console.log(this.props.location);
  }

  
  render(){
    return(
      <div>
        {this.props.location.forEach(location => 
        <Marker  
          icon={headphone}
          position={{lat:this.props.location.latitude, lng:this.props.location.longitude}}
        />)}
      
      </div>
    )

  
}
}
  
