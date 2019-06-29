import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import NavBar from './_Navbar.js';
// import MapMarker from './_MapMarker.js'
import PlaylistWindow from './_PlaylistWindow.js'
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
      redirectToUserPage: false,
      redirectToHistoryPage: false,
      redirectToFuturePage: false,
      visible: false, 
    }
  }

  async componentDidMount() {
    const {cookies} = this.props;
    await axios.get(`/api/users/${cookies.get('jetify_user')}/getPlaylists`)
                .then(response => {
                  const { locations } = response.data;
                  console.log('Hello there!!!!!!!', response.data);
                  const locationArray = [];
                    locations.map(location => {
                      if(!this.locationExists(locationArray, location)) {
                        locationArray.push(location);
                        console.log("Push");
                      }
                    });
                    console.log("Array length: ", locationArray.length)
                  this.setState({allLocations: locationArray});
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

onMouseOver = (e) =>
  this.setState({
    visible: true
  });
  
onMouseLeave = (e) =>
this.setState({
  visible: false
})


 
  // onMarkerClick = (props, marker, e) =>
  // this.setState({
  //   visible: true
  // });
  
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
      return <Redirect to='/history' />
    }

    if(this.state.redirectToFuturePage) {
      return <Redirect to='/future' />
    }
    
    const locationMarkers = this.state.allLocations.map(location =>
      <Marker 
        position={{lat: location.latitude, lng: location.longitude}}
        options={{icon:headphone}}  onClick={this.onMarkerClick} onMouseover={this.onMouseOver} onMouseout={this.onMouseLeave}
      />
      );
      
      const locationInfoWindow = this.state.allLocations.map(location =>
    <InfoWindow position={{lat: location.latitude, lng: location.longitude}}
    height='50px'
      visible={this.state.visible}   >
      <div>
      <h4>{location.name}</h4>
      <button>p1</button>
      </div>
      <iframe
            src={
              'https://open.spotify.com/embed/user/spotify/playlist/' +
              this.props.playlistID
            }
            frameBorder="0"
            height="500px"
            allowtransparency="true"
            allow="encrypted-media"
            title="playlist-widget"
          />
     
      </InfoWindow>
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
        {locationInfoWindow}
        </Map>
      </div>
    );
      }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(HistoryPage);


