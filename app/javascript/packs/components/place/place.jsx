import React from 'react';

import styles from './style.scss';

class Place extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      near: "",
      lat: "",
      lon: "",
      section: ""
    }

    this.userInput = this.userInput.bind(this);
  };


userInput(event) {
  this.setState({section: event.target.value});
  getPlaces();
}

componentDidMount() {


 function getPlaces() {

   var url = `https://api.foursquare.com/v2/venues/explore/?near=Shibuya&venuePhotos=1&${this.state.section}&client_id=ZXBTIXJSKMP3JERUZMCLJOC5MTTJIYTSJI2XZ3IG4F3WISSE&client_secret=GPAN3ZXU51UEWKQ3GC2OJG22BJUSMPOXS3YW4VWKLDNYZQNP&v=20181113`;

        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
           // console.error(error);
            });
  };
}


  render() {


    return (
        <div className={styles.place}>
          <h1>Recommendations</h1>
          <select id="near" value={this.state.near}>
              <option value="ll">Your current location</option>
              <option value="food">Food</option>
          </select>
          <select id="section" onChange={this.userInput} value={this.state.section}>
              <option value="">Choose a category</option>
              <option value="section=food">Food</option>
              <option value="section=outdoors">Outdoors</option>
              <option value="section=drinks">Drinks</option>
          </select>
          <p></p>
          <p>{this.state.section}</p>
        </div>
    );
  }
}

export default Place;