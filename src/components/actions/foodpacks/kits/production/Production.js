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
                <Link to="/foodpacks">List of Produced Kits</Link>
              </NavItem>
              <NavItem style={{background:'#dee2e6'}}>
                <Link to="/foodpacks/addkitproduction">Produce Kits</Link>
              </NavItem>
            </Nav>

            <hr />
              <Switch>
                <Route exact path="/foodpacks" component={ListProductionItem}/>
                <Route path="/foodpacks/addkitproduction" component={AddProduction}/>
                <Route path="/foodpacks/editkitproduction/:id" component={EditProduction}/>
                <Route path="/foodpacks/viewkitresult/:id" component={ViewResult}/>
                <Route path="/foodpacks/viewkitproduction/:id" component={ViewProduction}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }

export default Production;