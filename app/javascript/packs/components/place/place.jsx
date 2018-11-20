import React from 'react';

import './style.css';

class Place extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      near: "near=Singapore",
      section: "section=topPicks",
      place: {
        location:""
      },
      input:""
    }
    this.getPlaces = this.getPlaces.bind(this);
    this.locInput = this.locInput.bind(this);
    this.sectionInput = this.sectionInput.bind(this);
    this.sendData = this.sendData.bind(this);
  };

locInput(event) {
  this.setState({near: event.target.value});
  this.getPlaces();
}

sectionInput(event) {
  this.setState({section: event.target.value});
  this.getPlaces();
}


sendData() {
  var reactState = this;
  console.log("input", reactState.state.place.location);

   var url = '/places/new';

   fetch(url, {
       method: 'get',
       body: JSON.stringify({
        place: {
          location: reactState.state.place.location
        }
      }),
       headers : {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
          }
   })
   .then(function(response){
       return response.json()
   })
   .then(function(data){
       console.log('post req', data);
   })
}


getPlaces() {
  var url = `https://api.foursquare.com/v2/venues/explore/?${this.state.near}&venuePhotos=1&${this.state.section}&client_id=ZXBTIXJSKMP3JERUZMCLJOC5MTTJIYTSJI2XZ3IG4F3WISSE&client_secret=GPAN3ZXU51UEWKQ3GC2OJG22BJUSMPOXS3YW4VWKLDNYZQNP&v=20181113`;

          fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson.response.groups[0].items);
              this.setState({ place: { ...this.state.place, location: responseJson.response.groups[0].items}});
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
                reactState.setState({ place: { ...reactState.state.place, location: responseJson.response.groups[0].items} });
                // reactState.setState({places: responseJson.response.groups[0].items});
              })
              .catch((error) => {
               // console.error(error);
                });
  };

  getPlaces();
  }

  render() {
    let squarePl;

    if(this.state.place.location) {
      squarePl = this.state.place.location.map((item, index) => {
          return(

                <li className="location-list" key={index} onClick={(e) => this.props.currentfs(e)} id={index} lat={item.venue.location.lat} lon={item.venue.location.lng} all={item.venue} >{item.venue.name}<br />
              {item.venue.location.address}
              <button><a className="location-link" href={"/trips/1/places/new?location=" + item.venue.name}>Add to Itinerary</a></button>

              </li>



          )
      });
  }
    return (
        <div className="place">
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
          <ul className="foo">{squarePl}</ul>
        </div>
    );
  }
}

export default Place;