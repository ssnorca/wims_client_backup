import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Allocation from './allocation/Allocation';
import Composition from './composition/Composition';
import Production from './production/Production';
import Releases from './releases/Releases';

export default class ListFoodPacks extends Component{
    
    render(){
    return(
        <div>
            <Tabs variant="tabs" defaultActiveKey="production" id="controlled-tab-example" style={{fontWeight:'bold', color: '#e6ebef'}}>
                <Tab eventKey="production" title="Production">
                    <Production/>
                </Tab>
                <Tab eventKey="commodities" title="Releases">
                    <Releases/>
                </Tab>
            </Tabs>
        </div>
        );
    }
    
}