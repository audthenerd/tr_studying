import React from 'react';
import style from './style.scss';
import {Switch, Route} from 'react-router-dom'

import Search from './search/search'
import Main from './map/map'

export default class App extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            query: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.placeSearched = this.placeSearched.bind(this);
    };

    changeHandler(e) {
        console.log('changeHandler', e.target);
    }

    placeSearched(event) {
        console.log(event.target);
    }



  render(){


    console.log("query", this.state.query);
    return(
        <div>
            <Switch>
                <Route exact path="/" render={(props) => <Search {...props} input={this.changeHandler} search={this.placeSearched} val={this.state.query} />}  />
                <Route path="/places" component={Main} />
            </Switch>
        </div>);
  }
}