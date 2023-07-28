import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
export default class ListCategoryItems extends Component{

render(){
    //console.log(this.props.release)
    const { category_id, name, particular } = this.props.category;
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Type</th>
                <th>Particular</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.category.map((category)=>{
                        return(
                            <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.particular}</td>
                            <td>
                                <Link to={`/rawmaterials/editcategory/${category.id}`}>Edit</Link>
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