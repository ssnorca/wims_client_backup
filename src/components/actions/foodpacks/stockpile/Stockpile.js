import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Index from './Index';
import Viewstockpile from './ViewStockpile';
class Stockpile extends Component{
    render(){
      return(
        <Router basename={'/whims'}>
            <div>
            <Switch>
                <Route exact path="/foodpacks/" component={Index}/>
                <Route path="/foodpacks/viewstockpile/:id" component={Viewstockpile}/>
            </Switch>
            </div>
        </Router>
      );
    }
  }

export default Stockpile;