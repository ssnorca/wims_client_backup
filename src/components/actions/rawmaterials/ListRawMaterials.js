import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Allocation from './allocation/Allocation';
import Category from './category/Category';
import Items from './item/Items';
import Purchases from './purchases/Purchases';
import Releases from './releases/Releases';

export default class ListRequest extends Component{
    
    render(){
    return(
        <div>
            <Tabs variant="tabs" defaultActiveKey="purchases" id="controlled-tab-example" style={{fontWeight:'bold', color: '#e6ebef'}}>
                <Tab eventKey="category" title="Category">
                    <Category/>
                </Tab>
                <Tab eventKey="items" title="Items">
                    <Items/>
                </Tab>
                <Tab eventKey="purchases" title="Purchases/Received">
                    <Purchases/>
                </Tab>

            </Tabs>
        </div>
        );
    }
    
}