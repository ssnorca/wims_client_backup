import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Index from './Index';
import ViewRelease from './ViewRelease';
class Releases extends Component{
    render(){
      return(
        <Router basename={'/whims'}>
            <div>
            <Switch>
                <Route exact path="/foodpacks/" component={Index}/>
                <Route path="/foodpacks/viewrelease/:id" component={ViewRelease}/>
            </Switch>
            </div>
        </Router>
      );
    }
  }

export default Releases;