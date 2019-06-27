import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, } from 'google-maps-react';
import NavBar from './_Navbar.js';
import MapMarker from './_MapMarker.js'
const styles = require('./_map.json')
var headphone = require('./icons8-headphones-24.png')



 export class HistoryPage extends Component {

//   onMarkerClick = (props, marker, e) =>
//   this.setState({
//     selectedPlace: props,
//     activeMarker: marker,
//     showingInfoWindow: true
//   });

// onClose = props => {
//   if (this.state.showingInfoWindow) {
//     this.setState({
//       showingInfoWindow: false,
//       activeMarker: null
//     });
//   }
// };
   render() {
    console.log(this.props.google)
    return (
      <div className="history">
      <NavBar />
      <Map className="map-container"
        google={this.props.google}
         zoom={2.3}
        styles= {styles}
        initialCenter={{
         lat: 39.399872,
         lng: -8.224454
        }}
        {...MapMarker}
      
      >
      <Marker 
      onClick={this.onMarkerClick}
      position={{ lat: 37.7749, lng: -122.4194}}
      options={{icon:headphone}}
       />
      </Map>
      </div>
    );
  }
}

 export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(HistoryPage); 
 

