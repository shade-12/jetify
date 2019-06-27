import React, { Component } from 'react';

class Playlist extends Component {

  render() {
    return (
      <div className="playlist-container">
        <iframe
          src={'https://open.spotify.com/embed/user/spotify/playlist/' + this.props.playlistID}
          frameBorder='0'
          height="800px"
          allowtransparency='true'
          allow='encrypted-media'
          title='playlist-widget'
        />
        <section>
          <button type="button" className="btn generate-button">Generate</button>&nbsp;&nbsp;
          <button type="button" className="btn btn-primary" onClick={this.props.savePlaylist}>Save</button>
        </section>
      </div>
    );
  }
}
export default Playlist;

