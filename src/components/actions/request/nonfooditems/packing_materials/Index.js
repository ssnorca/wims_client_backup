import React, {Component} from 'react';
import AddRequest from './AddRequest';
import PackingMaterials from './PackingMaterials';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

export default class Index extends Component{
    render(){
    return(
        <React.Fragment>
            <PackingMaterials/>
            <AddRequest/>
        </React.Fragment>
        );
    }
    
}

