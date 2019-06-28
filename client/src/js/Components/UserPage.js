import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

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
      current_user: '',
      current_playlist_id: '',
      display_city: 'Vancouver',
      display_lat: 49.2827,
      display_long: -123.1207,
      position: '49.2827,-123.1207',
      startDate: start.toDate(),
      endDate: end.toDate(),
      eventBarPosition: '49.2827,-123.1207',
      eventStartDate: start.toISOString(),
      eventEndDate: end.toISOString(),
      artists: [],
      tracksInPlaylist: true
    };
  }

  componentDidMount() {
    //fetch user data from backends
    //set artists from Ticketmaster API and render relevant Spotify playlist
    this.setArtists();
    this.renderPlaylist();
  }

  componentDidUpdate(_, prevState) {
    //If artist state changes (on submit of new location) new playlist renders
    if (this.state.artists !== prevState.artists) {
      this.renderPlaylist();
    }
  }

  renderPlaylist = () => {
    let artistIds = [];
    let tracks = [];
    axios
      .get('/api/users/2')
      .then(response => {
        let user = response.data.user;
        this.setState({ current_user: user });

        //connect to spotify web API
        const { cookies } = this.props;
        spotifyApi.setAccessToken(cookies.get('jetify_token'));
      })
      .then(() =>
        //fetch artistID for all artists in this.state.artist
        {
          const promises = this.state.artists.map(artist =>
            spotifyApi.searchArtists(artist, 'artist').then(
              response => {
                if (response.artists.items.length) {
                  artistIds.push(response.artists.items[0].id);
                }
              },
              err => {
                console.error(err);
              }
            )
          );
          return Promise.all(promises);
        }
      )
      .then(() => {
        //fetch top songs for each artist in this.state.artists
        console.log('artistsids: ', artistIds);
        {
          const promises2 = artistIds.map(id =>
            spotifyApi.getArtistTopTracks(id, 'GB', { limit: 3 }).then(
              response => {
                for (let i = 0; i <= 2; i++) {
                  tracks.push(response.tracks[i].uri);
                }
              },
              err => {
                console.error(err);
              }
            )
          );
          return Promise.all(promises2);
        }
      })
      .then(() => {
        //create playlist called 'Jetify' with artists top songs as tracks
        spotifyApi
          .createPlaylist(this.state.current_user.spotify_id, {
            name: 'Jetify'
          })
          .then(
            response => {
              this.setState({ current_playlist_id: response.id });
              console.log('length tracks', tracks.length);
              if (!tracks.length) {
                this.setState({
                  tracksInPlaylist: false
                });
              } else {
                spotifyApi.addTracksToPlaylist(response.id, tracks);
              }
            },
            err => {
              console.error(err);
            }
          );
      });
  };

  handleLogout = () => {
    const { cookies } = this.props;
    cookies.remove('jetify_token', { path: '/' });
    this.setState({ current_user: null });
    console.log('Remove cookie');
  };

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
      display_long: lng
    });
    this.setState({
      position: this.makePositionString()
    });
  };

  setArtists = artistObj => {
    this.setState({
      artists: [...new Set(artistObj)]
    });
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
    if (this.state.current_user === null) {
      return <Redirect to="/" />;
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
          <Playlist playlistID={this.state.current_playlist_id} />
        </div>
      </div>
    );
  }
}

export default User;
