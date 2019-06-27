import React, { Component } from 'react';

class Playlist extends Component {

  render() {
    return (
      <iframe
        src={'https://open.spotify.com/embed/user/spotify/playlist/5zzMJmLaHZnpg7eYb4VE8s'}
        frameborder='0'
        allowtransparency='true'
        allow='encrypted-media'
        title='playlist-widget'
      />
    );
  }
}
export default Playlist;

