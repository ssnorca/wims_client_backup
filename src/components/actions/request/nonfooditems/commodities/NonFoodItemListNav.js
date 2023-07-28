import React, {Component} from 'react';
import AddRequest from './AddRequest';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
export default class NonFoodItem extends Component{
    getStyle = (e)=>{
        if(e){
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
        const ready = 'badge badge-danger badge-pill';
        const not = 'badge badge-success badge-pill'
        if(id===0){
            return not
        }return ready
    }
    render(){
    return(
        <React.Fragment>
                <ReactSearchAutocomplete
                    items={this.props.commodities}
                    onSearch={this.props.handleOnSearch}
                    onSelect={this.props.handleOnSelect}
                    /*onFocus={this.handleOnFocus}*/
                    autoFocus
                    fuseOptions={{ keys: ["ris_id","emp_id"] }}
                    resultStringKeyName="ris_id"
                />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Prepared By</th>
                            <th>Purpose</th>
                            <th>Date Request</th>
                            <th>Destination</th>                   
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.commodities.map((item)=>{
                            return(
                                <tr key={item.ris_id} style={this.getStyle(item.pending)}>                                   
                                    <td>
                                        <span className={this.findStatus(item.pending)}>
                                            {item.ris_id}
                                        </span>
                                    </td>
                                    <td>{item.emp_id}</td>
                                    <td><Link to={`/request/viewnonfood/${item.ris_id}`}>{item.purpose}</Link></td>
                                    <td>{item.created_at}</td> 
                                    <td>{item.destination}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <AddRequest onAdd={this.props.onAdd} addRequest={this.addRequest}/>
        </React.Fragment>
        );
    }
    
}

