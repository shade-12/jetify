import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import axios from 'axios';
import NavBar from './_Navbar.js';
const styles = require('./_map.json')



 export class HistoryPage extends Component {
   render() {
    console.log(this.props.google)
    return (
      <div className="history">
      <NavBar />
      <Map className="map-container"
        google={this.props.google}
         zoom={2.5}
        styles= {styles}
        initialCenter={{
         lat: 39.399872,
         lng: -8.224454
        }}
      />
      </div>
    );
  }
}

 export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(HistoryPage); 
 

