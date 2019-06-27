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
    this.state = {
      current_user: {},
      current_playlist_id: '',
      display_city: 'Vancouver',
      display_lat: 49.2827,
      display_long: -123.1207,
      position: '49.2827,-123.1207',
      startDate: start.toDate(),
      endDate: end.toDate(),
      eventBarPosition: '49.2827,-123.1207',
      eventStartDate: start.toISOString(),
      eventEndDate: end.toISOString()
    };
  }

  componentDidMount() {
    //fetch user data from backend
    axios.get('/api/users/1').then((response) => {
      let user = response.data.user;
      this.setState({current_user: user});

      //connect to spotify web API
      const {cookies} = this.props;
      spotifyApi.setAccessToken(cookies.get('jetify_token')); })
                .then(() =>
                  //fetch top tracks of local artists
                  spotifyApi.getArtistTopTracks('43ZHCT0cAZBISjO8DG9PnE', 'SE', {limit: 10})
                            .then( (data) => {
                              let tracks = [];
                              data.tracks.forEach( track => tracks.push(track.uri) );
                              spotifyApi.createPlaylist(this.state.current_user.spotify_id, { name: 'Jetify' }).then((response) => {
                                this.setState({ current_playlist_id: response.id });
                                spotifyApi.addTracksToPlaylist(response.id, tracks);
                              });
                            }, (err) => {
                              console.error(err);
                            })
                );
  }

  handleLogout = () => {
    const {cookies} = this.props;
    cookies.remove('jetify_token', { path: '/' });
    this.setState({ current_user: null });
  }

  savePlaylist = () => {
    let location = {
      name: this.state.display_city,
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
    })
  }

  makePositionString = () => {
    const position =
      this.state.display_lat.toString() +
      ',' +
      this.state.display_long.toString();
    return position;
  };

  setLocation = locationObj => {
    const lat = locationObj.mapPosition.lat;
    const lng = locationObj.mapPosition.lng;
    this.setState({
      display_lat: lat,
      display_long: lng,
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
    const date = new Date();
    console.log(date);
    if(this.state.current_user === null) {
      return <Redirect to="/" />
    }

    return (
      <div className="App">
        <NavBar
          user={this.state.current_user}
          handleLogout={this.handleLogout}
          city={this.state.display_city}
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
