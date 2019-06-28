import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavBar from './_Navbar.js';
// import MapMarker from './_MapMarker.js'
import PlaylistWindow from './_PlaylistWindow.js'
const styles = require('./_map.json')
var headphone = require('./icons8-headphones-24.png')



class HistoryPage extends Component {
  constructor(props){
    super(props);
    this.state={
      city: '',
      lat: '', 
      lng: '',
      current_user: {},
      current_playlist_id: '',
      allLocations: {},
    }
  }

    componentDidMount() {
      const {cookies} = this.props;
   axios.get(`/api/users/${cookies.get('jetify_user')}`).then(response => {
    let user = response.data.user;
    this.setState({current_user: user});
   }).then(axios.get('/api/locations/2').then(response => {
    //  const {name, latitude, longitude} = response.data;
    //  this.setState({city:name, lat:latitude, lng:longitude, allLocations: data})
    //  
    console.log(response);
    //  console.log(latitude)
    //  console.log(longitude)
     
   }))
  }
  // .then(response => {
  //   let data = response.data;
  //   this.setState({
  //     loading: false,
  //     events: data,
  //     artists: data.filter(e => e.artist).map(e => e.artist)
  //   });
  //   this.props.setArtists(this.state.artists);

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
        {/* <MapMarker lat= {this.state.lat} lng={this.state.lng} onClick={this.onMarkerClick}/> */}
        <PlaylistWindow onClick={this.onMarkerClick}/>
      <Marker 
      onMouseover={this.onMouseOver}
      onClick={this.onMarkerClick}
       lat= {this.state.lat} lng={this.state.lng}
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
 

