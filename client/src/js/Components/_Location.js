import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleHide = (event) => {
    event.stopPropagation();
    this.setState({ show: false });
    console.log("Hide box!!!", this.state.show);
  };

  onDelete = () => {
    axios.delete(`/api/locations/${this.props.id}`).then(response => {
      console.log("Delete: ", response)
    })
  };

  render() {
    const playlists = this.props.playlists.map(playlist =>
      <iframe
            key={playlist.spotify_id}
            src={
              'https://open.spotify.com/embed/user/spotify/playlist/' +
              playlist.spotify_id
            }
            frameBorder="0"
            height="400px"
            allowtransparency="true"
            allow="encrypted-media"
            title="playlist-widget"
          />
    );

    const length = this.props.playlists.map(playlist =>
      <span key={playlist.spotify_id}> <img alt="playlist-counter" src="data:image/png;base64,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" /> </span>
    );

    return (
      <div className="card bg-dark text-white location-thumbnail" onClick={this.handleShow}>
        <img className="card-img" src={this.props.image} alt="Card-img"/>
        <div className="card-img-overlay">
          <h3 className="card-title">{this.props.name}</h3>
          <p className="card-text">{length}</p>
        </div>
         <Modal
          onClick={this.handleHide}
          className="popup-playlists-container"
          size="lg"
          show={this.state.show}
          onHide={this.handleClose}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          centered
          data-backdrop="false"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              {this.props.name} Playlists
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="popup-playlists-container-body">
          {playlists}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.onDelete}>
              Delete All
            </Button>
            <Button variant="secondary" onClick={this.handleHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Location;