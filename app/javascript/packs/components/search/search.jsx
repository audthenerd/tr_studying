import React from 'react';

import styles from './style.scss';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        point: ""
    }
      };
            getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = 'AIzaSyACySFLlLmNi76Xy9u-nD_LtiVJLUnkuN0';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=resolveGoogleMapsPromise`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    var autocomplete;
    var place;

    this.getGoogleMaps().then((google) => {
       var input = document.getElementById('autocomplete');
        autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', getLocation);
    });

   function getLocation() {
     place = autocomplete.getPlace();
        console.log("loc", place);
    };

    this.setState({point: location});
  }

  render() {
    var barStyle = {
        width: '1000px',
        height: '30px'
    }
    console.log("point", this.state.point);

    return (
      <div className={styles.search}>
        <p>Where do you wanna go?</p>
        <form onSubmit={this.props.input} action="/places">
            <input style={barStyle} onChange={this.props.input} ref={el => this.el = el} id="autocomplete" />
        </form>
        <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">I want to see..
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
                <li><button value="food">Name</button></li>
                <li><button value="poi">Popularity</button></li>
                <li><button value="hotels">Customer Ratings</button></li>
            </ul>
        </div>
      </div>
    );
  }
}

export default Search;