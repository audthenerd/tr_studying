import React from 'react';
import styles from './style.scss';
import {Switch, Route} from 'react-router-dom'

import Search from './search/search'
import Main from './map/map'
import Place from './place/place'

export default class App extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            query: 'hello',
            name: "",
            current: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.placeSearched = this.placeSearched.bind(this);
        this.getCurrentLoc = this.getCurrentLoc.bind(this);
        this.getName = this.getName.bind(this);
    };



    changeHandler(e) {
        console.log('changeHandler', e.target);
    }

    placeSearched(event) {
        console.log(event.target);
    }

    getCurrentLoc(position) {
        this.setState({current: [position.coords.latitude, position.coords.longitude]});
        console.log("current", this.state.current);
    }

    getName(place) {
        this.setState({name: [place.name, place.geometry.location.lat(), place.geometry.location.lng()]});
        console.log(this.state.name);
    }


  render(){
    var compStyle = {
        display: 'flex',
    }
    return(
        <div>
            <Switch>
                <Route exact path="/" render={(props) => <Search {...props} input={this.changeHandler} search={this.placeSearched} val={this.state.query} />}  />
                <Route path="/places" render={(props) =>
                    <div style={compStyle} >
                     <Main here={this.getCurrentLoc} name={this.getName}{...props} />
                        <Place current={this.state.current} foursquare={this.state.name}{...props} />
                    </div>
                } />
            </Switch>
        </div>);
  }
}