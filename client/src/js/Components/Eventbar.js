import React, { Component } from 'react';
import axios from 'axios';
// has state - loading true or fault (starts true)
// componant did mount will make a request to the controller api action - once got events have can control them.

class EventBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      events: []
    };
  }

  getEventInfo = () => {
    axios
      .get('/api/events')
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
  };

  componentDidMount() {
    // use axios to call events controller
    this.getEventInfo();
  }

  render() {
    const { loading, events } = this.state;

    if (loading) {
      return <p>loading!</p>;
    } else {
      return (
        <div className="events-container">
          <section className="card" style={{ width: 18 + 'rem' }}>
            <img
              className="card-img-top"
              src="https://hecktictravels.com/wp-content/uploads/2012/02/NYC-Nightlife-THUMBNAIL.jpg"
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">Event 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </section>
          <section className="card" style={{ width: 18 + 'rem' }}>
            <img
              className="card-img-top"
              src="https://www.billboard.com/files/media/nyc-skyline-billboard-1548.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Event 2</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </section>
          <section className="card" style={{ width: 18 + 'rem' }}>
            <img
              className="card-img-top"
              src="https://victoryroadvgc.com/wp-content/uploads/2019/05/img_lugar_108_1522053167_kualalumpur.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Event 3</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </section>
          <section className="card" style={{ width: 18 + 'rem' }}>
            <img
              className="card-img-top"
              src="https://uploads.disquscdn.com/images/ad1339ef2da88b7701e51026ca5563a684daf85aeff0173d0d2f451853a76f9c.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Event 4</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default EventBar;
