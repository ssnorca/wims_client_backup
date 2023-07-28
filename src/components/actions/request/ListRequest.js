import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import FoodItem from '../request/fooditems/Index';
import Commodities from './nonfooditems/commodities/Index';
import OperationUse from './nonfooditems/operation_use/Index';
import PackingMaterials from './nonfooditems/packing_materials/Index';
import { Tabs, Tab } from 'react-bootstrap';

class ListRequest extends Component{
    constructor (props){
        super(props);
        this.state = {
            designation:'',
        }
    }
    componentDidMount() {
        var roleDesig = localStorage.getItem('roleDesig');
        this.setState({ designation:roleDesig });
        /*axios.get('/api/requestfood/warehouse')
        .then(res => this.setState({ 
          warehousename: res.data, 
        }));*/
      };

    checkDesignation = (designation) =>{
        if(designation != 'admin'){
            return 'd-none';
        }
        return '';
    }
    render(){
        const {designation} = this.state;
        //console.log(designation);
    return(
        <div>
            <Tabs variant="tabs" /*defaultActiveKey="food"*/ id="controlled-tab-example" >
                <Tab eventKey="food" title="Food Items">
                    <FoodItem/>
                </Tab>
                <Tab eventKey="commodities" title="Non-Food Items">
                    <Commodities/>
                </Tab>
                <Tab tabClassName={this.checkDesignation(designation)} eventKey="damaged_items" title="For Reconditioning Items">
                    <OperationUse/>
                </Tab>
            </Tabs>
        </div>
        );
    }
    
}
export default withRouter(ListRequest)

