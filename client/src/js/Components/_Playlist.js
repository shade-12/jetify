import React, { Component } from 'react';

class Playlist extends Component {

  render() {
    return (
      <iframe
        src={'https://open.spotify.com/embed/user/spotify/playlist/' + this.props.playlistID}
        frameBorder='0'
        allowtransparency='true'
        allow='encrypted-media'
        title='playlist-widget'
      />
    );
  }
}
export default Playlist;

