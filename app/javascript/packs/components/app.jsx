import React from 'react';
import style from './style.scss';
import {Switch, Route} from 'react-router-dom'

import Search from './search/search'
import Main from './map/map'
import Place from './place/place'

export default class App extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            query: 'hello',
            name: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.placeSearched = this.placeSearched.bind(this);
        this.getName = this.getName.bind(this);
    };



    changeHandler(e) {
        console.log('changeHandler', e.target);
    }

    placeSearched(event) {
        console.log(event.target);
    }

    getName() {
        this.setState({name: place.name});
    }


  render(){


    console.log("query", this.state.query);
    return(
        <div>
            <Switch>
                <Route exact path="/" render={(props) => <Search {...props} input={this.changeHandler} search={this.placeSearched} val={this.state.query} />}  />
                <Route path="/places" render={(props) =>
                    <div>
                        <Main {...props} name={this.getName} test={this.state.query}/>
                        <Place />
                    </div>
                } />
            </Switch>
        </div>);
  }
}