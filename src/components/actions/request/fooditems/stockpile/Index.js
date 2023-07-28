import React, {Component} from 'react';
import {Form, Row , Col, Table, Card, Button} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
//import axios from '../../../../../axios';
class Index extends Component{
    constructor (props){
        super(props);
        this.state = {
            item: [],
            stockpile:[],
        }
    }
    componentDidMount(){
        console.log(this.props.quantity_requested +'Index');
        //var area = localStorage.getItem('roleDesigArea');
        var area = this.props.provider;
        /*axios.get('/api/stockpileprepositionbalance')
        .then(res =>this.setState({ 
            item: res.data.filter(ffp=>{
                return ffp.province===area;
              }),
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
                    item: validation.filter(ffp=>{
                        return ffp.province===area;
                      }),
                });
             }
          }); 

        /*axios.get('/api/stockpilepreposition')
        .then(res =>this.setState({ 
            stockpile: res.data.filter(ffp=>{
                return ffp.province===area;
              }),
        })); */
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilepreposition`,{
            mode:'cors',
            method: 'GET',
            headers: {
              "Content-Type" : "application/json",
              "accept" : "application/json",
              "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            },
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
                    stockpile: validation.filter(ffp=>{
                        return ffp.province===area;
                      }),
                });
             }
          });
    }
    findStatus =(id)=>{
        const ready = 'badge badge-danger badge-pill';
        const not = 'badge badge-success badge-pill'
        if(id===0){
            return not
        }return ready
    }
    onBack = e =>{
        e.preventDefault();
        const ris_id = this.props.ris_id;
        this.props.history.goBack()
        //this.props.history.push(`/request/viewrequest/${ris_id}`)
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
                                                              <td>{item.totalBalance}</td>                                          
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
                                                                                pathname:`/request/viewstockpile/${item.ris_no}`,
                                                                                type: item.purpose_type,
                                                                                province:item.province,
                                                                                quantity:item.quantity_received,
                                                                                destinationRIS: this.props.ris_id,
                                                                                quantityRequested: this.props.quantity_requested,
                                                                            }}>View</Link>
                                                                    </td>                                             
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                    <tfoot>
                                                    <Button style={{marginTop:'30px'}} block onClick={this.onBack} variant="secondary">
                                                        Back
                                                    </Button>
                                                    </tfoot>
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

export default withRouter(Index);