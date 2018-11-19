import React from 'react';

import styles from './style.scss';

class Place extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      near: "near=Singapore",
      section: "section=topPicks",
      places: ""
    }
    this.getPlaces = this.getPlaces.bind(this);
    this.locInput = this.locInput.bind(this);
    this.sectionInput = this.sectionInput.bind(this);
  };

locInput(event) {
  this.setState({near: event.target.value});
  this.getPlaces();
}

sectionInput(event) {
  this.setState({section: event.target.value});
  this.getPlaces();
}


getPlaces() {
  var url = `https://api.foursquare.com/v2/venues/explore/?${this.state.near}&venuePhotos=1&${this.state.section}&client_id=ZXBTIXJSKMP3JERUZMCLJOC5MTTJIYTSJI2XZ3IG4F3WISSE&client_secret=GPAN3ZXU51UEWKQ3GC2OJG22BJUSMPOXS3YW4VWKLDNYZQNP&v=20181113`;

          fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson.response.groups[0].items);
              this.setState({places: responseJson.response.groups[0].items});
            })
            .catch((error) => {
             // console.error(error);
              });
  };

  componentDidMount() {
    var reactState = this;

      function getPlaces() {
    var url = `https://api.foursquare.com/v2/venues/explore/?${reactState.state.near}&venuePhotos=1&${reactState.state.section}&client_id=ZXBTIXJSKMP3JERUZMCLJOC5MTTJIYTSJI2XZ3IG4F3WISSE&client_secret=GPAN3ZXU51UEWKQ3GC2OJG22BJUSMPOXS3YW4VWKLDNYZQNP&v=20181113`;

            fetch(url)
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson.response.groups[0].items);
                reactState.setState({places: responseJson.response.groups[0].items});
              })
              .catch((error) => {
               // console.error(error);
                });
  };

  getPlaces();
  }

  render() {
    let squarePl;

    if(this.state.places) {
      squarePl = this.state.places.map((item, index) => {
          return(
            <div key={index} onClick={(e) => this.props.currentfs(e)} >
              <li key={index} id={index} className={styles.li} lat={item.venue.location.lat} lon={item.venue.location.lng}>{item.venue.name}<br />
            {item.venue.location.address}</li>
            </div>
          )
      });
  }
    return (
        <div className={styles.place}>
          <h1>Recommendations</h1>
          <select id="near" onChange={this.locInput} value={this.state.near}>
              <option value="">Choose a location</option>
              <option value={"ll="+this.props.current[0]+","+this.props.current[1]}>Your current location</option>
              <option value={"ll="+this.props.foursquare[1]+","+this.props.foursquare[2]}>{this.props.foursquare[0]}</option>
          </select>
          <select id="section" onChange={this.sectionInput} value={this.state.section}>
              <option value="section=topPicks">Choose a category</option>
              <option value="section=food">Food</option>
              <option value="section=outdoors">Outdoors</option>
              <option value="section=drinks">Drinks</option>
          </select>
          <p>{this.state.near}</p>
          {squarePl}
        </div>
    );
  }
}

export default Place;