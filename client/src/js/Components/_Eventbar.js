import React, { Component } from 'react';
import axios from 'axios';
import Event from './_Event.js';
// has state - loading true or fault (starts true)
// componant did mount will make a request to the controller api action - once got events have can control them.

class EventBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      events: []
    };
  } //constructor ends here.

  getEventInfo = () => {
    console.log(this.props)
    axios
      .get(
        `http://localhost:3000/api/events?latlong=${this.props.latlong}&startDate=${this.props.startDate}&endDate=${this.props.endDate}&radius=100&unit=miles`
        )
      .then(response => {
        let data = response.data;
        console.log(data);
        this.setState({
          loading: false,
          events: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }; //get info ends here

  componentDidMount() {
    this.getEventInfo();
  }
  shouldComponentUpdate( nextProps, nextState ){
    if(nextProps.endDate !== this.props.endDate ||
    nextProps.startDate !== this.props.startDate ||
    nextProps.latlong !== this.props.latlong){
          this.getEventInfo();
      return true
    }else if(nextState.events !== this.state.events){
      return true
    }
    else{
      return false 
    }
  }


  // componentDidUpdate(prevprops){
  //   this.getEventInfo();

  // }

  render() {
    const { loading, events } = this.state;
    if (loading) {
      return (
        <div className="events-container">
          <p className="loading">loading!</p>
        </div>
      );
    } else {
      return (
        <div className="events-container">
          {events.map(event => (
            <Event event={event} key={event.id} />
          ))}
        </div>
      );
    }
  }
}

export default EventBar;
