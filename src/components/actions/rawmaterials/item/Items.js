import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Nav, NavItem, NavLink } from "shards-react";
import AddItem from './AddItem';
import ListItem from './ListItem';
import EditItem from './EditItem';
export default class Items extends Component{
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
                <Link to="/rawmaterials/additem">Register New Item</Link>
              </NavItem>
            </Nav>

            <hr />
              <Switch>
                <Route exact path="/rawmaterials" component={ListItem}/>
                <Route path="/rawmaterials/additem" component={AddItem}/>
                <Route path="/rawmaterials/edititem/:id" component={EditItem}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
    
}

