import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Production from './production/Production';

export default class ListKits extends Component{
    
    render(){
    return(
        <div>
            <Tabs variant="tabs" defaultActiveKey="production" id="controlled-tab-example" style={{fontWeight:'bold', color: '#e6ebef'}}>
                <Tab eventKey="production" title="Production">
                    <Production/>
                </Tab>

            </Tabs>
        </div>
        );
    }
    
}