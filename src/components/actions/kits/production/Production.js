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
      return(
        <div>
          <Router basename={'/whims'}>
            <div>
            <Nav fill>
              <NavItem style={{background:'#dee2e6'}}>
                <Link to="/kits">List of Available Kits</Link>
              </NavItem>
              <NavItem style={{background:'#dee2e6'}}>
                <Link to="/kits/addproduction">Add Kits</Link>
              </NavItem>
            </Nav>

            <hr />
              <Switch>
                <Route exact path="/kits" component={ListProductionItem}/>
                <Route path="/kits/addproduction" component={AddProduction}/>
                <Route path="/kits/editproduction/:id" component={EditProduction}/>
                <Route path="/kits/viewresult/:id" component={ViewResult}/>
                <Route path="/kits/viewproduction/:id" component={ViewProduction}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }

export default Production;