import React, { Component } from 'react';
const PexelsAPI = require('pexels-api-wrapper');
let pexelsClient = new PexelsAPI(process.env.REACT_APP_PEXELS_API_KEY);

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: ''
    };
  }

   componentDidMount() {
     // pexelsClient.search(this.props.name, 1)
     //            .then(result => {
     //              let imageURL = result.photos;
     //              // this.setState({image_url: imageURL});
     //              console.log("Photos: ", imageURL);
     //            }).
     //            catch(function(e){
     //              console.error(e);
     //            });
  }
  render() {
    // pexelsClient.search(this.props.name, 1)
    //             .then(function(result){
    //               let imageURL = result.photos[0].src.original;
    //               console.log("Photos: ", result.photos[0]);
    //             }).
    //             catch(function(e){
    //               console.error(e);
    //             });
    return (
      <div className="card bg-dark text-white location-thumbnail">
        <img className="card-img" src="https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg" alt="Card image"/>
        <div className="card-img-overlay">
          <h3 className="card-title">{this.props.name}</h3>
          {<p className="card-text">{this.props.playlists.length} playlists</p>}
        </div>
      </div>
    );
  }
}

export default Location;