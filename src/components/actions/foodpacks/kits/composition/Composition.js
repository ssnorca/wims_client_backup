import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Nav, NavItem, NavLink } from "shards-react";
import AddComposition from './AddComposition';
import EditComposition from './EditComposition';
import ListProductionItem from './ListProductionItem';
import ViewComposition from './ViewComposition';
import ViewResult from './ViewResult';

class Composition extends Component{
    render(){
        return(
            <div>
              <Router basename={'/whims'}>
                <div>
                <Nav fill>
                  <NavItem style={{background:'#dee2e6'}}>
                    <Link to="/foodpacks">Kit Composition</Link>
                  </NavItem>
                  <NavItem style={{background:'#dee2e6'}}>
                    <Link to="/foodpacks/addkitcomposition">New Kit Composition</Link>
                  </NavItem>
                </Nav>
    
                <hr />
                  <Switch>
                    <Route exact path="/foodpacks" component={ListProductionItem}/>
                    <Route path="/foodpacks/addkitcomposition" component={AddComposition}/>
                    <Route path="/foodpacks/editkitcomposition/:id" component={EditComposition}/>
                    <Route path="/foodpacks/viewkitcompositionresult/:id" component={ViewResult}/>
                    <Route path="/foodpacks/viewkitcomposition/:id" component={ViewComposition}/>
                  </Switch>
                </div>
              </Router>
            </div>
          ); 
    }
}
export default Composition;