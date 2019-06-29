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
import { Button, Modal, Alert } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const PexelsAPI = require('pexels-api-wrapper');
let pexelsClient = new PexelsAPI(process.env.REACT_APP_PEXELS_API_KEY);

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
      tracksInPlaylist: true,
      redirectToUserPage: false,
      redirectToHistoryPage: false,
      redirectToFuturePage: false,
      showDateForm: false,
      showSuccessAlert: false
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
                if (response.tracks.length >= 3) {
                  for (let i = 0; i <= 2; i++) {
                    tracks.push(response.tracks[i].uri);
                  }
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
        if(tracks.length > 0) {
          spotifyApi
            .createPlaylist(this.state.current_user.spotify_id, {
              name: `Jetify: ${this.state.map_city}`
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
          }else {
            this.setState({
              tracksInPlaylist: false
            });
          }
      });
  };

  renderRandomPlaylist = () => {
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
                if (response.tracks.length >= 6) {
                  for (let i = 3; i <= 5; i++) {
                    tracks.push(response.tracks[i].uri);
                  }
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
        if(tracks.length > 0) {
          spotifyApi
            .createPlaylist(this.state.current_user.spotify_id, {
              name: `Jetify: ${this.state.map_city}`
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
        }else {
          this.setState({
            tracksInPlaylist: false
          });
        }

      });
  };

  //handle navbar buttons click after login
  handleLogout = () => {
    const { cookies } = this.props;
    cookies.remove('jetify_token', { path: '/' });
    cookies.remove('jetify_user', { path: '/' });
    cookies.remove('jetify_location', { path: '/' });
    this.setState({ current_user: null });
  };

  handleMyPlans = () => {
    this.setState({ redirectToFuturePage: true });
  };

  handleMyPlaylists = () => {
    this.setState({ redirectToHistoryPage: true });
  };

   savePlaylist = () => {
    let location = {
      name: this.state.map_city,
      latitude: this.state.display_lat,
      longitude: this.state.display_long
    };

    //get thumbnail for each location
    pexelsClient.search(location.name, 1)
                .then(result => {
                  let imageURL = result.photos[0].src.original;
                  location.image = imageURL;
                  console.log("Photos: ", imageURL);
                })
                .then(() => {
                  //save location to db first, then playlist
                  axios.post('/api/locations', location).then(response => {
                    let locationID = response.data.location.id;
                    let playlist = {
                      user_id: this.state.current_user.id,
                      location_id: locationID,
                      name: `Jetify: ${this.state.map_city}`,
                      spotify_id: this.state.current_playlist_id
                    };
                    axios
                      .post(`/api/locations/${locationID}/playlists`, playlist)
                      .then(response => {
                        this.setState({ showSuccessAlert: true });
                        console.log('------------------Saved playlist', response);
                      });
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
      showDateForm: false,
      eventBarPosition: this.state.position,
      eventStartDate: this.state.startDate.toISOString(),
      eventEndDate: this.state.endDate.toISOString()
    });
  };

  //close form
  handleClose = () => {
    this.setState({ showDateForm: false });
  };

  //show form
  handleShow = () => {
    this.setState({ showDateForm: true });
  };

  //dismiss alert
  handleDismiss = () => {
    this.setState({ showSuccessAlert: false });
  }

  render() {
    const { cookies } = this.props;

    if (this.state.current_user === null) {
      return <Redirect to="/" />;
    }

    if (this.state.redirectToUserPage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}`} />;
    }

    if (this.state.redirectToHistoryPage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}/history`} />;
    }

    if (this.state.redirectToFuturePage) {
      return <Redirect to={`/users/${cookies.get('jetify_user')}/future`} />;
    }

    return (
      <div className="App">
        <NavBar
          user={this.state.current_user}
          city={this.state.display_city}
          handleLogout={this.handleLogout}
          handleMyPlaylists={this.handleMyPlaylists}
          handleMyPlans={this.handleMyPlans}
          cookies={this.props.cookies}
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
            <Button className="popup-form-button" onClick={this.handleShow}>
              Select Dates To See Events In {this.state.map_city}
            </Button>
            <Modal
              show={this.state.showDateForm}
              onHide={this.handleClose}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Whoop! Time to plan a trip to {this.state.map_city}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              Start Date&nbsp;&nbsp;
              <DatePicker
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeStart}
                />&nbsp;&nbsp;&nbsp;
                End Date&nbsp;&nbsp;
                <DatePicker
                  selected={this.state.endDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeEnd}
                  minDate={this.state.startDate}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.onSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Playlist
            renderRandomPlaylist={this.renderRandomPlaylist}
            tracksInPlaylist={this.state.tracksInPlaylist}
            playlistID={this.state.current_playlist_id}
            savePlaylist={this.savePlaylist}
          />
          <Alert show={this.state.showSuccessAlert} variant="success" onClose={this.handleDismiss} dismissible>
            Playlist saved ! <span role="img">💚</span>
          </Alert>
        </div>
      </div>
    );
  }
}

export default User;
