import React, {Component} from 'react';
import FoodItem from './FoodItem';
import {Table} from 'react-bootstrap';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import AddRequest from './AddRequest';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
export default class Food extends Component{
    /*state = {
        open: false,
        ris:''
    };*/
    constructor(props) {
        super(props);
        this.state = {
          isShow: true,
          result:[],
        };
    }
    componentDidMount() {
        console.log(this.props.requests);
        //this.setState({ result: this.props.requests }) 
    }
    onSplit = (param)=>{
        if (param != null) {
          const arr = param.split('.');
          return arr[0] + "% complete";
        } else {
          return 0;
        }       
      } 
    getStyle = (e)=>{
        if(e==='cancelled'){
            return {
                backgroundColor: 'lavender'
            }
        }else{
            return{
                textDecoration:'none'
            }
        }
    }
    findStatus =(id)=>{
        const ready = 'badge badge-success badge-pill';
        const not = 'badge badge-warning badge-pill'
        if(id===0){
            return ready
        }return not
    }
    findPercentage =(percent)=>{
        const num = Number.parseInt(percent, 10)
        const ready = 'badge badge-success badge-pill';
        const not = 'badge badge-secondary badge-pill';
        const nan = 'badge badge-warning badge-pill';
        if (isNaN(num)) {
            return nan;
        }else{
            if(num===100||num==='100'){
                return ready
            }return not
        }
       
        //console.log(num);
    }
    findPercentage2 = (rtd, dtd)=>{
        const returned    = Number.parseInt(rtd, 10);
        const distributed = Number.parseInt(dtd, 10);
        const totalPercent = returned + distributed
        const ready = 'badge badge-success badge-pill';
        const not = 'badge badge-secondary badge-pill';
        const nan = 'badge badge-warning badge-pill';

        if (isNaN(returned)||isNaN(distributed)) {
            return nan;
        }else{
            if(totalPercent===100||totalPercent==='100'){
                return ready
            }
        return not
        }
       
        //console.log(totalPercent);
    }
     /*handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
     handleOnSelect = (item) => {
        // the item selected
        console.log(item)
      }
    
     handleOnFocus = () => {
        console.log('Focused')
      }*/
    render(){
    return (
        <div>
        <ReactSearchAutocomplete
            items={this.props.requests}
            onSearch={this.props.handleOnSearch}
            onSelect={this.props.handleOnSelect}
            /*onFocus={this.handleOnFocus}*/
            autoFocus
            fuseOptions={{ keys: ["ris_id","emp_id"] }}
            resultStringKeyName="ris_id"
        />
        <Table >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Destination</th>
                    <th>Purpose</th>
                    <th>Requested Qty.</th>
                    <th>Date Request</th>
                    <th>Provider</th>
                    <th>Approved Allocation</th>                   
                    <th>Released Qty.</th>
                    <th>Returned Qty.</th>
                    <th>Distributed Qty.</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.requests.map((item, index)=>{
                        return(
                            <tr key={index} style={this.getStyle(item.status)}>
                                <td>
                                    <span className={this.findStatus(item.pending)} >
                                        {item.ris_id}
                                    </span>
                                </td>
                                <td>{item.destination}</td>
                                <td>
                                    <Link onClick={this.props.onAllocate.bind(this, item.ris_id, item.purpose, item.created_at, item.quantity_requested, item.allocated, item.percentage, item.released, item.rpercentage, item.emp_id, item.provider, item.preposition_id)} 
                                    to={`/request/viewrequest/${item.ris_id}`}>{item.purpose}
                                    </Link>
                                </td>
                                <td>{item.quantity_requested}</td>
                                <td>{item.created_at}</td>
                                <td>{item.provider}</td>
                                <td>
                                <p style={{display:'inline',fontSize:'13px',fontStyle:'bold'}}>{item.allocated} FFP's</p>
                                <p style={{fontSize:'13px',fontStyle:'italic',marginBottom:'-5px'}}>
                                    <span className={this.findPercentage(item.percentage)} >
                                        {this.onSplit(item.percentage)}
                                    </span>    
                                </p>                            
                                </td>
                                <td>
                                <p style={{display:'inline',fontSize:'13px',fontStyle:'bold'}}>{item.released} FFP's</p>
                                <p style={{fontSize:'13px',fontStyle:'italic'}}>
                                <span className={this.findPercentage(item.rpercentage)} >
                                        {this.onSplit(item.rpercentage)}
                                    </span>
                                </p>                                                       
                                </td>
                                <td>
                                    <p style={{display:'inline',fontSize:'13px',fontStyle:'bold'}}>{item.returned} FFP's</p>
                                    <p style={{fontSize:'13px',fontStyle:'italic'}}>
                                        <span className={this.findPercentage2(item.rtpercentage, item.dtpercentage)} >
                                            {this.onSplit(item.rtpercentage)}
                                        </span>
                                    </p>
                                </td>
                                <td>
                                    <p style={{display:'inline',fontSize:'13px',fontStyle:'bold'}}>{item.distributed} FFP's</p>
                                    <p style={{fontSize:'13px',fontStyle:'italic'}}>
                                        <span className={this.findPercentage2(item.rtpercentage, item.dtpercentage)} >
                                            {this.onSplit(item.dtpercentage)}
                                        </span>
                                    </p>
                                </td>
                                </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <AddRequest onAdd={this.props.onAdd} addRequest={this.addRequest}/>
    </div>
    );
    }
    
}

