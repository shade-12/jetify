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
    const { cookies } = this.props;
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
      artists: [],
      tracksInPlaylist: true
    };
  }

  async componentDidMount() {
    //fetch user data from backend
    await this.renderPlaylist();
  }

  componentDidUpdate(_, prevState) {
    //If artist state changes (on submit of new location) new playlist renders
    if (this.state.artists !== prevState.artists) {
      this.renderPlaylist();
    }
  }

  renderPlaylist = () => {
    const { cookies } = this.props;
    let artistIds = [];
    let tracks = [];
    this.setState({
      tracksInPlaylist: true
    });
    axios
      .get(`/api/users/${cookies.get('jetify_user')}`)
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
    cookies.remove('jetify_user', { path: '/' });
    cookies.remove('jetify_location', { path: '/' });
    this.setState({ current_user: null });
  };

  goToHistory = () => {
    this.setState({ redirectToHistory: true });
  };

  savePlaylist = () => {
    let location = {
      name: this.state.map_city,
      latitude: this.state.display_lat,
      longitude: this.state.display_long
    };

    //save location to db first, then playlist
    axios.post('/api/locations', location).then(response => {
      let locationID = response.data.location.id;
      let playlist = {
        user_id: this.state.current_user.id,
        location_id: locationID,
        name: 'Jetify',
        spotify_id: this.state.current_playlist_id
      };
      axios
        .post(`/api/locations/${locationID}/playlists`, playlist)
        .then(response => {
          console.log('------------------Saved playlist', response);
        });
    });
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
    const area = locationObj.area;
    this.setState({
      display_lat: lat,
      display_long: lng,
      map_city: area
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
    if (this.state.current_user === null) {
      return <Redirect to="/" />;
    }
    if (this.state.redirectToHistory === true) {
      return <Redirect to="/history" />;
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
            tracksInPlaylist={this.state.tracksInPlaylist}
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
            tracksInPlaylist={this.state.tracksInPlaylist}
            playlistID={this.state.current_playlist_id}
            savePlaylist={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default User;
