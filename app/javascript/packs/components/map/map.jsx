import React from 'react';

import styles from './style.scss';

const reactState = this;

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
        lat: 1.3521,
        lng: 103.8198,
        place: "",
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
 };

// **********************
// HANDLERS
// **********************
    changeHandler() {
        console.log("sb change", this.sb.value);
    }

    clickHandler() {
        console.log("sb click", this.sb.value);
        // this.setState({query: e.target.value});
    }


// **********************
// GOOGLE MAPS
// **********************
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
    var reactState = this;
    var autocomplete;
    var service;
    var infowindow;
    var map;

// **********************
// Setting up the map
// **********************
this.getGoogleMaps().then((google) => {

    var singapore = {lat: reactState.state.lat , lng: reactState.state.lng};
    map = new google.maps.Map(document.getElementById('map'), {
          center: singapore,
          zoom: 15
        });

    infowindow = new google.maps.InfoWindow();

        if ("geolocation" in navigator) {
  // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
        function success(position) {
     // for when getting location is a success
         console.log('latitude', position.coords.latitude, 'longitude', position.coords.longitude);
         reactState.props.here(position);
         getAddress(position.coords.latitude, position.coords.longitude);
        getServices();
   },

        function error(error_message) {
    // for when getting location results in an error
            console.error('An error has occured while retrieving location', error_message)
            ipLookUp();
        });
} else {
  // geolocation is not supported
  // get your location some other way
  console.log('geolocation is not enabled on this browser')
  ipLookUp()
};
        var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-33.8902, 151.1759),
          new google.maps.LatLng(-33.8474, 151.2631));

        var input = document.getElementById('autocomplete');
        var options = {
          bounds: defaultBounds,
          types: ['establishment']
        };

        autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', getLocation);

    function getLocation() {
        var place = autocomplete.getPlace();
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();

        reactState.setState({lat: latitude});
        reactState.setState({lng: longitude});

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            map.setZoom(14);
            getServices();
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(14);  // Why 17? Because it looks good.
            getServices();
          }


          var address = '';
              if (place.address_components) {
                address = [
                  (place.address_components[0] && place.address_components[0].short_name || ''),
                  (place.address_components[1] && place.address_components[1].short_name || ''),
                  (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
          }

    };
        // pyrmont = {lat: reactState.state.lat , lng: reactState.state.lng};
      });

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP
        });

        marker.setMap(map)

        google.maps.event.addListener(marker, 'click', function() {


          infowindow.setContent(place.name);
          // console.log(place.geometry.location.lat());
          infowindow.open(map, this);
          reactState.props.name(place);
        });
      }


// **********************
// GEOCODING
// **********************
function ipLookUp () {

        var url = 'http://ip-api.com/json';
            fetch(url)
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                  lat: responseJson.lat,
                  lng: responseJson.lon
                });
                getServices();
              })
              .catch((error) => {
               // console.error(error);
                });
    };

function getAddress (latitude, longitude) {
  fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +latitude + ',' + longitude + '&key=' + 'AIzaSyACySFLlLmNi76Xy9u-nD_LtiVJLUnkuN0')
  .then((response) => response.json())
  .then((responseJson) => {
            this.setState({
              lat: responseJson.lat,
              lng: responseJson.lon
            });
  })
  .catch((error) => {
           // console.error(error);
    });
};


// **********************
// G-PLACES SERVICES
// **********************
function getServices() {
    var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
              location: {lat: reactState.state.lat , lng: reactState.state.lng},
              radius: 1000,
              type: ['food', 'place_of_worship', 'establishment']
            }, callback);
};

};

  render() {
    var barStyle = {
        width: '700px',
        height: '30px'
    }

    var divStyle = {
        height: '500px',
        width: '700px'
    }

    return (
        <div className={styles.main}>
        <div className={styles.search}>
        <p>Search for a location</p>
        <form onClick={this.clickHandler} className="search-results" >
            <input className={styles.name} style={barStyle} ref={sb => this.sb = sb} onClick={this.changeHandler} id="autocomplete"/>
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

            <div style={divStyle} id="map"></div>
        </div>
    );
  }
}

export default Main;