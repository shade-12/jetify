import React, { Component } from 'react';

class Location extends Component {
  render() {
    return (
      <div className="card bg-dark text-white location-thumbnail">
        <img className="card-img" src={this.props.image} alt="Card image"/>
        <div className="card-img-overlay">
          <h3 className="card-title">{this.props.name}</h3>
          {<p className="card-text">{this.props.playlists.length} playlists</p>}
        </div>
      </div>
    );
  }
}

export default Location;