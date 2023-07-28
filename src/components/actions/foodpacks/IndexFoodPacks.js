import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
//import ListKits from '../kits/ListKits';
import ListKits from './kits/ListKits';
import ListFoodPacks from './ListFoodPacks';

export default class IndexFoodPacks extends Component{
    
    render(){
    return(
        <div>
            <Tabs fill variant="tabs" defaultActiveKey="fooditems" id="controlled-tab-example" style={{fontWeight:'bold', color: '#e6ebef'}}>
                <Tab eventKey="fooditems" title="Food Items">
                    <ListFoodPacks/>
                </Tab>
                <Tab eventKey="nonfood" title="Non Food Items">
                   {/** <Releases/>*/} 
                   <ListKits/>
                </Tab>
            </Tabs>
        </div>
        );
    }
    
}