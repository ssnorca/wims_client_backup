import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Container, Table, Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
//import axios from '../../../../../axios';
export default class OperationUseView extends Component{
    constructor (props){
        super(props);
        this.state = {
          item:[],
        };
      }
    componentDidMount() {
        const id = Number.parseInt(this.props.match.params.id, 10)
        /*axios.get('/api/stockpilereferencewasteView')
        .then(res => this.setState({ 
            item: res.data.filter(ffp=>{
             return ffp.stockpile_reference_waste_id===id;
            }),
        }));*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereferencewasteView`,{
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
                    item: validation.filter(ffp=>{
                        return ffp.stockpile_reference_waste_id===id;
                       }),
                });
             }
          })
    }
    onAdd = e =>{
        e.preventDefault();
        const itemId = this.props.location.item_id;
        this.props.history.push(`/request/forcondition/`+itemId)
    }
    render(){
    return(
        <React.Fragment>
                <Card>
              <Card.Header>Reconditioned Items</Card.Header>
                  <Card.Body>
              <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Type</th>
                        <th>Wasted Item</th>
                        <th>Reason</th>
                        <th>Replaced By</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.item.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                      <td>{item.item_type}</td>
                                      <td>{item.item_name}</td>
                                      <td>{item.item_remarks}</td>
                                      <td>{item._description}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.created_at}</td>
                                      <td>
                                          <Button variant='info'>Return Allocated Quantity</Button>
                                      </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                  </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button onClick={this.onAdd} variant="primary">
                                        Back
                        </Button>
                    </Card.Footer>
                      </Card>
        </React.Fragment>
        );
    }
    
}

