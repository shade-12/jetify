import React, { Component } from 'react';
import { PushSpinner } from 'react-spinners-kit';

class Playlist extends Component {
  render() {
    const {
      playlistLoading,
      tracksInPlaylist,
      playlistID,
      renderRandomPlaylist,
      savePlaylist
    } = this.props;

    if (playlistLoading) {
      return (
        <div className="events-container">
          <h4>Playlist on the way ...</h4>
          <PushSpinner size={80} color="#1db954" loading={playlistLoading} />
        </div>
      );
    } else {
      if (tracksInPlaylist)
        return (
          <div className="playlist-container">
            <iframe
              src={
                'https://open.spotify.com/embed/user/spotify/playlist/' +
                playlistID
              }
              frameBorder="0"
              height="800px"
              allowtransparency="true"
              allow="encrypted-media"
              title="playlist-widget"
            />
            <section>
              <button
                type="button"
                className="btn generate-button"
                onClick={renderRandomPlaylist}
              >
                Generate
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-primary"
                onClick={savePlaylist}
              >
                Save
              </button>
            </section>
          </div>
        );
      else {
        return <p>Choose new dates/ new location!</p>;
      }
    }
  }
}
export default Playlist;
