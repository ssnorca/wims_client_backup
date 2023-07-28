import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
export default class ListItemsPurchase extends Component{

render(){
    //console.log(this.props.release)
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    {/**<th>Cost</th>
                    <th>Unit Cost</th>**/}
                    <th>Purchase Order #</th>
                    <th>Delivery Receipt #</th>
                    <th>Available Quantity</th>
                    <th>Released Quantity</th>
                    <th>Sourced</th>
                    <th>Remarks</th>
                    <th>Date Added</th>
                    <th>Date of Expiration</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.item.map((item)=>{
                        return(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item._description}</td>
                                {/**<td>{item.cost}</td>
                                <td>{item.unit_cost}</td>**/}
                                <td>
                                    <Link to='#'>{item.purchase_order}</Link>
                                </td>
                                <td>{item.delivery_receipt}</td>
                                <td>{item.quantity_available}</td>
                                <td>{item.quantity_release}</td>
                                <td>{item._source}</td>
                                <td>{item.remarks}</td>
                                <td>{item.created_at}</td>
                                <td>{item.date_expire}</td>
                                <td>
                                    <Link to={`/rawmaterials/edititempurchase/${item.id}`}>Edit</Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );

    }
    
}