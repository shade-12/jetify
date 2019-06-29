import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavBar from './_Navbar.js';
import PlaylistWindow from './_PlaylistWindow.js';
import LocationBar from './_Locationbar.js';
const styles = require('./_map.json')
var headphone = require('./icons8-headphones-24.png')

class HistoryPage extends Component {
  constructor(props){
    super(props);
    const {cookies} = this.props;
    const { city } = cookies.get('jetify_location');
    this.state={
      city: city,
      lat: '',
      lng: '',
      current_user: {},
      current_playlist_id: '',
      allLocations: [],
      allPlaylists:[],
      redirectToUserPage: false,
      redirectToHistoryPage: false,
      redirectToFuturePage: false
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
                    });
                  this.setState({
                    allLocations: locationArray,
                    allPlaylists: playlists
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

  handleMyPlaylists = () => {
    this.setState({redirectToHistoryPage: true});
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

  locationExists = (array, location) => {
    for(let i = 0; i < array.length; i++) {
      if(array[i].name === location.name) {
        return true;
      }
    }
    return false;
  }

// onClose = props => {
//   if (this.state.showingInfoWindow) {
//     this.setState({
//       showingInfoWindow: false,
//       activeMarker: null
//     });
//   }
// };
   render() {
    const {cookies} = this.props;

    if(this.state.current_user === null) {
      return <Redirect to="/" />
    }

    if(this.state.redirectToUserPage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}`} />
    }

    if(this.state.redirectToHistoryPage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}/history`} />
    }

    if(this.state.redirectToFuturePage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}/future`} />
    }

    const locationMarkers = this.state.allLocations.map(location =>
      <Marker
        key={location.created_at}
        position={{lat: location.latitude, lng: location.longitude}}
        options={{icon:headphone}}
      />
    );

    return (
      <div className="history">
        <NavBar
          user={this.state.current_user}
          city={this.state.city}
          handleLogout={this.handleLogout}
          handleJetify={this.handleJetify}
          handleMyPlaylists={this.handleMyPlaylists}
          handleMyPlans={this.handleMyPlans}
        />
        <Map
          className={'map-container'}
          google={this.props.google}
          zoom={2.3}
          styles= {styles}
          initialCenter={{
           lat: 39.399872,
           lng: -8.224454
          }}
        >
        {locationMarkers}
        <PlaylistWindow onClick={this.onMarkerClick}/>
        </Map>
        <LocationBar locations={this.state.allLocations} playlists={this.state.allPlaylists} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(HistoryPage);


