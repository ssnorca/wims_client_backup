import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import axios from 'axios';
//import axios from '../../../../axios';
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
        /*axios.get('/api/production')
        .then(res => this.setState({ 
                item: res.data.data.filter(ffp=>{
                    return ffp.type_==='production'||ffp.type_==='donation';
                  }),
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/production`,{
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
                        item: validation.data.filter(ffp=>{
                            return ffp.type_==='production'||ffp.type_==='donation';
                            }),
                        activePage:validation.current_page,
                        itemsCountPerPage:validation.per_page,
                        totalItemsCount:validation.total
                    })
                }
                })
    }
    handlePageChange = (pageNumber) => {
        //console.log(pageNumber);
        //this.setState({activePage: pageNumber});
            /*axios.get('/api/production?page='+pageNumber)
            .then(res => this.setState({
                item: res.data.data.filter(ffp=>{
                    return ffp.type_==='production';
                  }),
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            }))*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/production?page=`+pageNumber,{
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
                        item: validation.data.filter(ffp=>{
                            return ffp.type_==='production';
                        }),
                        activePage:validation.current_page,
                        itemsCountPerPage:validation.per_page,
                        totalItemsCount:validation.total
                    })
                 }
              })            
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
                <th>Available Quantity</th>
                <th>Released Quantity</th>
                <th>Unit</th>
                <th>Unit Cost</th>
                <th>Unit Value</th>
                <th>Production Date</th>
                <th>Expiration Date</th>
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
                                {/** <Link to={`/foodpacks/viewproduction/${item.id}`}>{item.purpose}</Link> */}
                                <Link style={{display:'inline'}} onClick={()=>{}} 
                                    to={{
                                        pathname:`/foodpacks/viewproduction/${item.id}`,
                                        production_date: item.created_at,
                                        expiration_date: item.expired_at,
                                        purpose: item.purpose,
                                    }}>{item.purpose}</Link>
                            </td>
                            <td>{item.composition}</td>
                            <td>{item.quantity_available}</td>
                            <td>{item.quantity_release}</td>
                            <td>{item.unit}</td>
                            <td>{item.unit_cost}</td>
                            <td>{item.unit_value}</td>
                            <td>{item.created_at}</td>
                            <td>{item.expired_at}</td>
                            <td>
                                <Link to={`/foodpacks/editproduction/${item.id}`}>Edit</Link>|
                                <Link style={{display:'inline'}} onClick={()=>{}} 
                                    to={{
                                        pathname:`/foodpacks/viewproduction/${item.id}`,
                                        production_date: item.created_at,
                                        expiration_date: item.expired_at,
                                        purpose: item.purpose,
                                    }}>View</Link>
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