import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ListCategory from './ListCategory';
import { Nav, NavItem, NavLink } from "shards-react";
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';


class Category extends Component{
    render(){
      return(
        <div>
          <Router basename={'/whims'}>
            <div>
            <Nav fill>
              <NavItem>
                <Link to="/rawmaterials">Category List</Link>
              </NavItem>
              <NavItem>
                <Link to="/rawmaterials/addcategory">Register New Category</Link>
              </NavItem>
            </Nav>

            <hr />
              <Switch>
                <Route exact path="/rawmaterials" component={ListCategory}/>
                <Route path="/rawmaterials/addcategory" component={AddCategory}/>
                <Route path="/rawmaterials/editcategory/:id" component={EditCategory}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }

export default Category;