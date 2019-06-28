import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import NavBar from './_Navbar.js';
import EventBar from './_Eventbar.js';
import Playlist from './_Playlist.js';
import Map from './_Map.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class User extends Component {
  constructor(props) {
    super(props);
    var start = moment();
    var end = moment().add(2, 'days');
    const {cookies} = this.props;
    const { city, latitude, longitude } = cookies.get('jetify_location');
    this.state = {
      current_user: {},
      current_playlist_id: '',
      display_city: city,
      map_city: '',
      display_lat: latitude,
      display_long: longitude,
      position: latitude.toString() + ',' + longitude.toString(),
      startDate: start.toDate(),
      endDate: end.toDate(),
      eventBarPosition: latitude.toString() + ',' + longitude.toString(),
      eventStartDate: start.toISOString(),
      eventEndDate: end.toISOString(),
      redirectToHistory: false,
    };
  }

  async componentDidMount() {
    const {cookies} = this.props;
    //fetch user data from backend
    await axios.get(`/api/users/${cookies.get('jetify_user')}`).then(response => {
      this.setState({ current_user: response.data.user });
      console.log("User at userpage: ",this.state.current_user );
    }).then( () => {
          //connect to spotify web API
          spotifyApi.setAccessToken(cookies.get('jetify_token'));

          //fetch top tracks of local artists
          spotifyApi.getArtistTopTracks('43ZHCT0cAZBISjO8DG9PnE', 'SE', {limit: 10})
                    .then( data => {
                      let tracks = [];
                      data.tracks.forEach( track => tracks.push(track.uri) );
                      spotifyApi.createPlaylist(this.state.current_user.spotify_id, { name: 'Jetify' }).then((response) => {
                        this.setState({ current_playlist_id: response.id });
                        spotifyApi.addTracksToPlaylist(response.id, tracks);
                      });
                      }, (err) => {
                        console.error(err);
                  });
    });
  }

  handleLogout = () => {
    const {cookies} = this.props;
    cookies.remove('jetify_token', { path: '/' });
    cookies.remove('jetify_user', { path: '/' });
    cookies.remove('jetify_location', { path: '/' });
    this.setState({ current_user: null });
  }

  goToHistory = () => {
    this.setState({redirectToHistory: true});

  }

  savePlaylist = () => {
    let location = {
      name: this.state.map_city,
      latitude: this.state.display_lat,
      longitude: this.state.display_long
    };

    //save location to db first, then playlist
    axios.post('/api/locations', location).then(response => {
      let locationID = response.data.location.id
      let playlist = {
        user_id: this.state.current_user.id,
        location_id: locationID,
        name: 'Jetify',
        spotify_id: this.state.current_playlist_id
      }
      axios.post(`/api/locations/${locationID}/playlists`, playlist)
           .then(response => {
              console.log("------------------Saved playlist", response);
            });
    });
  }

  makePositionString = () => {
    const position =
      this.state.display_lat.toString() +
      ',' +
      this.state.display_long.toString();
    return position;
  };

  setLocation = locationObj => {
    console.log(locationObj)
    const lat = locationObj.mapPosition.lat;
    const lng = locationObj.mapPosition.lng;
    const area = locationObj.area
    this.setState({
      display_lat: lat,
      display_long: lng,
      map_city: area,
    });
    this.setState({
      position: this.makePositionString()
    });
  };

  setArtists = artistObj => {
    this.setState({
      artists: [...new Set(artistObj)]
    });
    console.log('post artists state', this.state.artists);
  };

  handleChangeStart = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };

  onSubmit = () => {
    console.log(this.state.startDate.toISOString());
    this.setState({
      eventBarPosition: this.state.position,
      eventStartDate: this.state.startDate.toISOString(),
      eventEndDate: this.state.endDate.toISOString()
    });
  };

  render() {
    if(this.state.current_user === null) {
      return <Redirect to="/" />
    }
    if(this.state.redirectToHistory === true){
      return <Redirect to="/history" />
    }

    return (
      <div className="App">
        <NavBar
          user={this.state.current_user}
          handleLogout={this.handleLogout}
          city={this.state.display_city}
          goToHistory={this.goToHistory}
        />
        <div className="Body">
          <EventBar
            latlong={this.state.eventBarPosition}
            startDate={this.state.eventStartDate}
            endDate={this.state.eventEndDate}
            setArtists={this.setArtists}
          />
          <div className="map-container">
            <Map
              google={this.props.google}
              center={{
                lat: this.state.display_lat,
                lng: this.state.display_long
              }}
              display_city={this.state.display_city}
              height="80vh"
              zoom={2}
              setLocation={this.setLocation}
            />
            <div className="date-form">
              <h2>Select your dates:</h2>
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
                minDate={this.state.startDate}
              />
            </div>
            <button type="onSubmit" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
          <Playlist
            playlistID={this.state.current_playlist_id}
            savePlaylist={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default User;
