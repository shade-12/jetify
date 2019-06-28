import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker, } from 'google-maps-react';
import NavBar from './_Navbar.js';
import MapMarker from './_MapMarker.js'
import PlaylistWindow from './_PlaylistWindow.js'
const styles = require('./_map.json')
var headphone = require('./icons8-headphones-24.png')



class HistoryPage extends Component {
  constructor(props){
    super(props);
    this.state={
      city: '',
      position: {lat: '', lng: ''},
      current_user: {},
      current_playlist_id: '',
    }
  }

    componentDidMount() {
   axios.get('/api/users/1').then(response => {
    let user = response.data.user;
    this.setState({current_user: user});
   }).then(axios.get('/api/locations/1').then(response => {
     console.log(response);
   }))
  }


  onMouseOver = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
  


  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  

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
      <NavBar 
      user={this.state.current_user}
      handleLogout={this.handleLogout}
      city={this.state.city}/>
      <Map className="map-container"
        google={this.props.google}
         zoom={2.3}
        styles= {styles}
        initialCenter={{
         lat: 39.399872,
         lng: -8.224454
        }}
      >
        <MapMarker position={this.state.position} onClick={this.onMarkerClick}/>
        <PlaylistWindow onClick={this.onMarkerClick}/>
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
 

