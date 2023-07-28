import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Nav, NavItem, NavLink } from "shards-react";
import AddProduction from './AddProduction';
import EditProduction from './EditProduction';
import ListProductionItem from './ListProductionItem';
import ViewProduction from './ViewProduction';
import ViewResult from './ViewResult';

class Production extends Component{

    render(){
      return (
      <Router basename={'/whims'}>
        <div>
          <Nav fill>
            <NavItem style={{background:'#dee2e6'}}>
              <Link to="/foodpacks">List of Available Welfare Goods</Link>
            </NavItem>
            <NavItem style={{background:'#dee2e6'}}>
              <Link to="/foodpacks/addproduction">Add Welfare Goods</Link>
            </NavItem>
          </Nav>

        <hr />
          <Switch>
            <Route exact path="/foodpacks" component={ListProductionItem}/>
            <Route path="/foodpacks/addproduction" component={AddProduction}/>
            <Route path="/foodpacks/editproduction/:id" component={EditProduction}/>
            <Route path="/foodpacks/viewresult/:id" component={ViewResult}/>
            <Route path="/foodpacks/viewproduction/:id" component={ViewProduction}/>
          </Switch>
        </div>
      </Router>
      );
      
    }
  }

export default Production;