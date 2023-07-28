import React, {Component} from 'react';
import {Form, Row , Col, Table, Card, Button} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import axios from '../../../../axios';
class Index extends Component{
    constructor (props){
        super(props);
        this.state = {
            item: [],
            stockpile:[],
        }
    }
    componentDidMount(){
        var area = localStorage.getItem('roleDesigArea');
        /*axios.get('/api/stockpileprepositionbalance')
        .then(res =>this.setState({ 
            item: res.data
        }));*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileprepositionbalance`,{
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
                    item: validation 
                });
             }
          })

        /*axios.get('/api/stockpilepreposition')
        .then(res =>this.setState({ 
            stockpile: res.data
        }));*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilepreposition`,{
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
                    stockpile: validation 
                });
             }
          })
    }
    findStatus =(id)=>{
        const ready = 'badge badge-success badge-pill';
        const not = 'badge badge-warning badge-pill'
        if(id===1){
            return not
        }return ready
    }
    render(){
      return(
        <div>
            <Form>  
                             
                             <Row>
                                 <Col sm={12}>
                                 <Card>
                                     <Card.Body>
                                        <Card.Title>Summary</Card.Title>
                                        
                                        <Table responsive>
                                              <thead>
                                                  <tr>
                                                    <th>Province</th>
                                                    <th>Quantity Received</th> 
                                                    <th>Quantity Returned</th>                                               
                                                    <th>Available Stockpile</th>
                                                    <th>Quantity Released</th>
                                                    <th>Remaining Stockpile</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                              {
                                                  this.state.item.map((item)=>{
                                                      return(
                                                          <tr key={item.id}>
                                                              <td>{item.province}</td>
                                                              <td>{item.totalRequest}</td> 
                                                              <td>{item.totalReturned}</td>
                                                              <td>{item.totalAvailable}</td>    
                                                              <td>{item.totalReleased}</td>
                                                              <td>{item.remBalance}</td>                                          
                                                          </tr>
                                                      )
                                                  })
                                              }
                                              </tbody>
                                          </Table>
                                     </Card.Body>                                         
                                </Card>
                                 </Col>
                                
                            </Row> 
                            <hr/>
                            <Row>
                                <Col sm={12}>

                                <Card>
                                     <Card.Body>
                                        <Card.Title>Prepositioned Stockpile Breakdown</Card.Title>
                                        
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>RIS No.</th>
                                                            <th>Province</th>
                                                            <th>Purpose Type</th>
                                                            <th>Quantity</th>
                                                            <th>Remarks</th>                                                
                                                            <th>Date of Return/Pullout</th>
                                                            <th>Action</th> 
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.stockpile.map((item)=>{
                                                            return(
                                                                <tr key={item.ris_no}>
                                                                    <td>
                                                                        <span className={this.findStatus(item.status)}>
                                                                            {item.ris_no}
                                                                        </span>
                                                                        
                                                                    </td>
                                                                    <td>{item.province}</td>
                                                                    <td>{item.purpose_type}</td>
                                                                    <td>{item.quantity_received}</td>
                                                                    <td><span className='badge badge-primary badge-pill' >
                                                                            {item.quantity}
                                                                        </span>&nbsp;
                                                                        {item.remarks}
                                                                    </td> 
                                                                    <td>{item.created_at}</td> 
                                                                    <td>
                                                                        <Link style={{display:'inline'}} onClick={()=>{}} 
                                                                            to={{
                                                                                pathname:`/foodpacks/viewrelease/${item.ris_no}`,
                                                                                type: item.purpose_type,
                                                                                province:item.province,
                                                                                quantity:item.quantity_received,
                                                                            }}>View</Link>
                                                                    </td>                                             
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
                                            </Card.Body>                                         
                                        </Card>                                    
                                 
                                </Col>                                   
                            </Row> 
                            
                     
                    </Form>
        </div>
      );
    }
  }

export default Index;