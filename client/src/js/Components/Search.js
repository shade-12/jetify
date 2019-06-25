import React, { Component } from 'react';
// import Map from './Map.js';  
// import Autocomplete from 'react-google-autocomplete';

class Search extends Component {
 
  render(){
    console.log(this.props.city)
    return (
      <div className ="center-column">
      {/* <div className="search-container"> 
        <h3>Listen to what</h3>
        <h2 className="city-name">{this.props.display_city}</h2>
        <h3>sounds like this week !</h3>  */}
         {/* <form className="form-inline" onSubmit={this.props.onSubmit}>
          <input className="form-control mr-sm-2" onChange={this.props.handleChange} type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form> */}
       {/* </div> */}
       {/* <div className="autocomplete">
       <Autocomplete 
						onPlaceSelected={ this.onPlaceSelected }
						types={['(regions)']}
					/></div> */}
       {/* <div className="map-container">

            <Map google={this.props.google}
        center={{lat: this.props.display_lat, 
          lng: this.props.display_long}}
          display_city={this.props.display_city}
        height='400px'
        zoom={2}
    />
         </div> */}
  </div>
      );
  }
}

export default Search;
