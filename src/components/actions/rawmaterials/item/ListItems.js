import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
export default class ListItems extends Component{

render(){
    //console.log(this.props.release)
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Type</th>
                <th>Particular</th>
                <th>Item</th>
                <th>Unit</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.item.map((item)=>{
                        return(
                            <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.type}</td>
                            <td>{item.particular}</td>
                            <td>{item.name}</td>
                            <td>{item.unit}</td>
                            <td>
                                <Link to={{
                                    pathname:`/rawmaterials/edititem/${item.id}`,
                                    particular:item.particular
                                    }}>Edit</Link>
                            </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
    /*return this.props.category.map((category)=>(
            <ListCategoryItem 
                key={category.category_id} 
                category={category} 
                />
        ));*/
    }
    
}