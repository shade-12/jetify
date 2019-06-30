import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import NavBar from './_Navbar.js';
import LocationBar from './_Locationbar.js';

const styles = require('./_map.json');
var headphone = require('./icons8-headphones-24.png');

class HistoryPage extends Component {
  constructor(props){
    super(props);
    const {cookies} = this.props;
    const { city, region } = cookies.get('jetify_location');
    this.state={
      region: region,
      city: city,
      lat: '',
      lng: '',
      current_user: {},
      current_playlist_id: '',
      allLocations: [],
      redirectToUserPage: false,
      redirectToFuturePage: false,
      activeMarker: {},
      showInfoWindow: false,
    }
  }

  async componentDidMount() {
    const {cookies} = this.props;
    await axios.get(`/api/users/${cookies.get('jetify_user')}/getPlaylists`)
                .then(response => {
                  const { locations, playlists } = response.data;
                  console.log('Hello there!!!!!!!', response.data);
                  //filter out duplicate locations
                  const locationArray = [];
                    locations.map(location => {
                      if(!this.locationExists(locationArray, location)) {
                        locationArray.push(location);
                      }
                      return locationArray
                    });

                  //sort playlists according to location
                  locationArray.forEach(location => {
                    location.playlists = [];
                    playlists.forEach(playlist => {
                      if(location.id === playlist.location_id){
                        location.playlists.push(playlist);
                      }
                    });
                  });
                  this.setState({
                    allLocations: locationArray
                  });
                  axios.get(`/api/users/${cookies.get('jetify_user')}`).then((response) => {
                    this.setState({current_user: response.data.user });
                  });
                });
  }

  //handle navbar buttons click after login
  handleLogout = () => {
    const {cookies} = this.props;
    cookies.remove('jetify_token', { path: '/' });
    cookies.remove('jetify_user', { path: '/' });
    cookies.remove('jetify_location', { path: '/' });
    this.setState({ current_user: null });
  }

  handleJetify = () => {
    this.setState({redirectToUserPage: true});
  }

  handleMyPlans = () => {
    this.setState({redirectToFuturePage: true});
  }

  onMouseOver = (props, marker, e) => {
    console.log(marker)
    if(!(marker.name === this.state.activeMarker.name)){
      this.setState({
        activeMarker: marker,
        showInfoWindow: true,
      })
  }
  }
  onMouseOut = () => {
    if(this.state.showInfoWindow){
    this.setState({
      showInfoWindow: false,
        activeMarker: {},
    })
  }
}
  

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showInfoWindow: true
  });

  locationExists = (array, location) => {
    for(let i = 0; i < array.length; i++) {
      if(array[i].name === location.name) {
        return true;
      }
    }
    return false;
  }

   render() {

    const {cookies} = this.props;

    if(this.state.current_user === null) {
      return <Redirect to="/" />
    }

    if(this.state.redirectToUserPage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}`} />
    }

    if(this.state.redirectToFuturePage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}/future`} />
    }
    
    const locationMarkers = this.state.allLocations.map(location =>
      <Marker
        draggable={false}
        name={location.name}
        playlist={location.playlists.length}
        key={location.created_at}
        position={{lat: location.latitude, lng: location.longitude}}
        options={{icon:headphone}}  
        onMouseover={this.onMouseOver}
        onMouseout={this.onMouseOut}
     />
    );
console.log(this.state.allLocations)
    return (
      <div className="history">
        <NavBar
          user={this.state.current_user}
          city={this.state.city}
          region={this.state.region}
          handleLogout={this.handleLogout}
          handleJetify={this.handleJetify}
          handleMyPlaylists={this.handleMyPlaylists}
          handleMyPlans={this.handleMyPlans}
        />
        <LocationBar locations={this.state.allLocations} />
        <Map
          className={'map-container'}
          google={this.props.google}
          zoom={2.3}
          styles= {styles}
          initialCenter={{
           lat: 39.399872,
           lng: -8.224454
          }}
          // onMousemove={this.onMouseMove}
        >
        {locationMarkers }
        <InfoWindow
        visible={this.state.showInfoWindow}
        position={this.state.activeMarker.position}
         >
        <div>
          <h4>{this.state.activeMarker.name}</h4>
          <p>Playlists:{this.state.activeMarker.playlist}</p> 
        </div>
        </InfoWindow>
        </Map>
      </div>
    );
      }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(HistoryPage);


