import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Nav, NavItem, NavLink } from "shards-react";
import ListItemPurchase from './ListItemPurchase';
import AddItemPurchase from './AddItemPurchase';
import EditItemPurchase from './EditItemPurchase';
class Purchases extends Component{
    render(){
      return(
        <div>
          <Router basename={'/whims'}>
            <div>
            <Nav fill>
              <NavItem>
                <Link to="/rawmaterials">Item List</Link>
              </NavItem>
              <NavItem>
                <Link to="/rawmaterials/additempurchase">Register New Item</Link>
              </NavItem>
            </Nav>

            <hr />
              <Switch>
                <Route exact path="/rawmaterials" component={ListItemPurchase}/>
                <Route path="/rawmaterials/additempurchase" component={AddItemPurchase}/>
                <Route path="/rawmaterials/edititempurchase/:id" component={EditItemPurchase}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }

export default Purchases;