import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import axios from 'axios';
//import axios from '../../../../../axios';
export default class ListProductionItems extends Component{
    constructor(props) {
        super(props);
        this.state = {
          item: [],
          activePage:1,
          itemsCountPerPage:1,
          pageRangeDisplayed:3,
          totalItemsCount:1
        };
      }
    componentDidMount() {
        /*axios.get('/api/kit')
        .then(res => this.setState({ 
                item: res.data.data,
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/kit`,{
                mode:'cors',
                method: 'GET',
                headers: {
                  "Content-Type" : "application/json",
                  "accept" : "application/json",
                  "Authorization" : `Bearer ${localStorage.getItem('token')}` 
                }
                 }).then(async response => {
                   if (!response.ok) {
                   const validation = await response.json();
                   //setErrors(validation.errors);
                   console.log(validation.errors);
                   this.setState({alert_message:"error"})
                 }else{
                  //history('/categories')
                  const validation = await response.json();
                  //console.log(validation)
                     this.setState({ 
                        item: validation.data,
                        activePage:validation.current_page,
                        itemsCountPerPage:validation.per_page,
                        totalItemsCount:validation.total
                    });
                 }
              })
          
    }
    handlePageChange = (pageNumber) => {
        /*axios.get('/api/kit?page='+pageNumber)
            .then(res => this.setState({
                item: res.data.data,
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/kit?page=`+pageNumber,{
                mode:'cors',
                method: 'GET',
                headers: {
                  "Content-Type" : "application/json",
                  "accept" : "application/json",
                  "Authorization" : `Bearer ${localStorage.getItem('token')}` 
                }
                 }).then(async response => {
                   if (!response.ok) {
                   const validation = await response.json();
                   //setErrors(validation.errors);
                   console.log(validation.errors);
                   this.setState({alert_message:"error"})
                 }else{
                  //history('/categories')
                  const validation = await response.json();
                  //console.log(validation)
                     this.setState({ 
                        item: validation.data,
                        activePage:validation.current_page,
                        itemsCountPerPage:validation.per_page,
                        totalItemsCount:validation.total 
                    });
                 }
              })
    }
    onCancelled = (stats) =>{
        if(stats ==='Cancelled'){
            return 'none';
        }
        return '';
      }
render(){
    //console.log(this.props.release)
    return(
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Purpose</th>
                <th>Composition</th>
                {/**<th>Kit Cost</th>
                <th>Total Cost</th>**/}
                <th>Status</th>
                <th>Date</th>
                <th>Unit</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.item.map((item)=>{
                        return(
                            <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                            <Link 
                            style={{ pointerEvents: this.onCancelled(item.kit) }}
                            to={{
                                pathname: `/foodpacks/viewkitproduction/${item.id}`,
                                state: {
                                    kit: item.kit,
                                    id:item.id
                                }
                                }}>{item.purpose}</Link> 
                            </td>
                            <td>{item.quantity_requested}</td>
                           {/** <td>{item.kit_cost}</td>
                            <td>{item.total_cost}</td>**/}
                            <td>{item.request_status}</td>
                            <td>{item.created_at}</td>
                            <td>{item.kit}</td>
                            <td>
                                <Link 
                                to={{
                                    pathname: `/foodpacks/editkitproduction/${item.id}`,
                                    state: {
                                        kit: item.kit,
                                        id:item.id
                                    }
                                    }}
                                >Edit</Link>|<Link 
                                style={{ pointerEvents: this.onCancelled(item.kit) }}
                                to={{
                                    pathname: `/foodpacks/viewkitproduction/${item.id}`,
                                    state: {
                                        kit: item.kit,
                                        id:item.id
                                    }
                                    }}
                                >Produce</Link>
                            </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <div className='d-flex justify-content-center'>
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                onChange={this.handlePageChange}
                itemClass='page-item'
                linkClass='page-link'
            />
        </div> 

    </div>
    );
    /*return this.props.category.map((category)=>(
            <ListCategoryItem 
                key={category.category_id} 
                category={category} 
                />
        ));*/
    }
    
}