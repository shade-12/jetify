import React, { Component } from 'react';

class Search extends Component {
 
  render(){
    return (
      <div className="bg-light search-container">
        <h3>Listen to what</h3>
        <h2 className="city-name">{this.props.display_city}</h2>
        <h3>sounds like this week !</h3>
        <form className="form-inline" onSubmit={this.props.onSubmit}>
          <input className="form-control mr-sm-2" onChange={this.props.handleChange} type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>

      </div>
  );
  }
}

export default Search;