import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  render() {
    const playlists = this.props.playlists.map(playlist =>
      <iframe
            src={
              'https://open.spotify.com/embed/user/spotify/playlist/' +
              playlist.spotify_id
            }
            frameBorder="0"
            height="800px"
            allowtransparency="true"
            allow="encrypted-media"
            title="playlist-widget"
          />
    );

    return (
      <div className="card bg-dark text-white location-thumbnail" onClick={this.handleShow}>
        <img className="card-img" src={this.props.image} alt="Card image"/>
        <div className="card-img-overlay">
          <h3 className="card-title">{this.props.name}</h3>
          <p className="card-text">{this.props.playlists.length} playlists</p>
        </div>
         <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {this.props.name} Playlists
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="popup-playlists-container">
          {playlists}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Location;