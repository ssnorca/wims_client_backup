import React, {Component} from 'react';
import {Table, Form, Col} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import axios from 'axios';
//import axios from '../../../../../axios';
export default class ListProductionItems extends Component{
    constructor(props) {
        super(props);
        this.state = {
          item: [],
          type:[],
          name:'',
          particular:'',
          result:[],
        };
      }
    componentDidMount() {
        /*axios.get('/api/kit/composition')
        .then(res => this.setState({ 
                item: res.data,
            }));
            axios.get('/api/kit/list')
        .then(res => this.setState({ 
                type: res.data, 
            }));*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/composition`,{
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
                   //this.setState({alert_message:"error"})
                 }else{
                  //history('/categories')
                  const validation = await response.json();
                  //console.log(validation)
                     this.setState({ 
                        item: validation 
                    });
                 }
              })

            fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/list`,{
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
                   //this.setState({alert_message:"error"})
                 }else{
                  //history('/categories')
                  const validation = await response.json();
                  //console.log(validation)
                     this.setState({ 
                        type: validation 
                    });
                 }
              })

    }
    onChange = e => {this.setState({
        [e.target.name]: e.target.value,
        result:this.state.item.filter(it => it._type.includes(e.target.value))
      })
    }
    /*handlePageChange = (pageNumber) => {
        http://localhost:8000.log(pageNumber);
        //this.setState({activePage: pageNumber});
        axios.get('/api/kit?page='+pageNumber)
            .then(res => this.setState({
                item: res.data.data,
                activePage:res.data.current_page,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total
            }))
    }*/
render(){
    //http://localhost:8000.log(this.props.release)
    const { editFields, name, particular } = this.state;
    return(
        <div>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridApproved">
                                <Form.Label>Particular</Form.Label><br/>
                                <Form.Control as="select" name="particular" value={particular}
                                        onChange={this.onChange}>
                                    {this.state.type.map((team) => <option key={team.name} value={team.name}>{team.name}</option>)}
                                </Form.Control>
                                
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kit Type</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.result.map((item)=>{
                                    return(
                                        <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item._type}</td>
                                        <td>{item._name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unit}</td>
                                        <td>
                                            <Link 
                                            to={{
                                                pathname: `/foodpacks/editkitcomposition/${item.id}`,
                                                state: {
                                                    kit: item.kit,
                                                    id:item.id
                                                }
                                                }}
                                            >Edit</Link>|<Link 
                                            to={{
                                                pathname: `/foodpacks/viewkitcomposition/${item.id}`,
                                                state: {
                                                    kit: item._name,
                                                    id:item.id
                                                }
                                                }}
                                            >Delete</Link>
                                        </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Form.Row>
            </Form>
        


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