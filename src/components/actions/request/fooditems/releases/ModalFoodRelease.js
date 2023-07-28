import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';
import ItemListRelease from './ItemListRelease';
import Pagination from "react-js-pagination";
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import { withRouter } from 'react-router-dom';
import history from '../../../history';
import { parse } from '@fortawesome/fontawesome-svg-core';
//import axios from '../../../../../axios';
class ModalFoodRelease extends Component{
    constructor (props){
        super(props);
        this.state = {
            releases_ffp: [],
            init:0,
            activePage:1,
            itemsCountPerPage:1,
            pageRangeDisplayed:3,
            totalItemsCount:1,
            quantity: '',
            release_qty:'',
            quantity_allocated:'',
        }
    }
    onChange = e => {this.setState({
        [e.target.name]: e.target.value 
        })
       // console.log(this.state);
      };
    async componentDidMount() {
        const { ris_id, allocated } = this.props.location.state
        //console.log(allocated);
        //const { ris_id } = this.props.onRelease;
        /*await axios.get('/api/stockpilerelease')
        .then(res => this.setState({ 
            releases_ffp: res.data.filter(ffp=>{
                return ffp.ris_id===ris_id;
             }),
            init:1,
            activePage:res.data.current_page,
            itemsCountPerPage:res.data.per_page,
            totalItemsCount:res.data.total,
            quantity_allocated:allocated,
        }));*/
       await fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilerelease`,{
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
                    releases_ffp: validation.filter(ffp=>{
                        return ffp.ris_id===ris_id;
                     }),
                    init:1,
                    activePage: validation.current_page,
                    itemsCountPerPage: validation.per_page,
                    totalItemsCount: validation.total,
                    quantity_allocated:allocated,
                });
             }
          })

        let sum = this.state.releases_ffp.reduce(function(prev, current) {
            return prev +current.quantity
          }, 0);
        this.setState({ 
            quantity: sum,
          });
          //console.log(this.props.onRelease);
    } 
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
        //console.log(e)
    };
    handlePageChange(pageNumber) {
        //console.log('active page is ${pageNumber}');
        this.setState({activePage: pageNumber});
    }
    onSend = () =>{
        const { ris_id, allocated } = this.props.location.state
        const { release_qty, quantity, u} = this.state;
        const { quantity_requested } = this.props.location.state;
        var area = localStorage.getItem('roleDesigArea');
        //if the quantity to be release > requested
        if (release_qty > quantity_requested){
            this.setState({alert_message:"error"})
        //if the quantity to be release > 
        }else if(release_qty > (quantity_requested-quantity)){
            this.setState({alert_message:"error"})
        }else if(release_qty===''||release_qty<=0){
            this.setState({alert_message:"error"})
        }else if(parseInt(release_qty) > parseInt(allocated)){
            this.setState({alert_message:"error"})
        }else if((parseInt(release_qty)+parseInt(quantity)) > parseInt(allocated)){
            this.setState({alert_message:"error"})
        }
        else{
           
               // console.log('sent');          
            const ffp_release ={
                ris_id: ris_id,
                quantity: this.state.release_qty,
                provider: area,
              }
              //console.log(ffp_release);
              /*axios.post('/api/stockpilerelease', ffp_release)
                .then(res => {
                    this.setState({alert_message:"success"})
                }).catch(error=>{
                    this.setState({alert_message:"error"})
                });*/
                fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilerelease`,{
                mode:'cors',
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "accept" : "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem('token')}` 
                },
                    body: JSON.stringify(ffp_release)
                }).then(async response => {
                    if (!response.ok) {
                    const validation = await response.json();
                    console.log(validation.errors);
                    this.setState({alert_message:"error"})
                }else{
                    //history('/categories')
                    //const validation = await response.json();
                    this.setState({alert_message:"success"})
                    //console.log(validation)
                }
                })
            this.onReload(); 
            this.props.onReload();
        }

    }

    //Reloads the DaTA froM the DAtabaASe
     onReload =()=>{
        const { ris_id } = this.props.location.state
        this.liveTime = setTimeout(()=>{
           //this.reload();
           /*axios.get('/api/stockpilerelease')
           .then(res => this.setState({ 
               releases_ffp: res.data.filter(ffp=>{
                   return ffp.ris_id===ris_id;
                }),
               init:1,
               activePage:res.data.current_page,
               itemsCountPerPage:res.data.per_page,
               totalItemsCount:res.data.total
           }));*/
           fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilerelease`,{
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
                    releases_ffp: validation.filter(ffp=>{
                        return ffp.ris_id===ris_id;
                     }),
                    init:1,
                    activePage: validation.current_page,
                    itemsCountPerPage: validation.per_page,
                    totalItemsCount: validation.total
                });
             }
          })
        }, 2000);

        let sum = this.state.releases_ffp.reduce(function(prev, current) {
            return prev +current.quantity
          }, 0);
        this.setState({ 
            quantity: sum,
          });
        this.liveRedirectTime = setTimeout(()=>{ 
        this.redirectToTarget();
        }, 3000);
       }
      redirectToTarget = () => {
        const { ris_id } = this.props.location.state
        //this.props.history.push(`/request/viewrequest/${ris_id}`)
        this.props.history.push(`/request/`)
        //this.props.history.goBack
      }
      
      onSetQty =(e)=>{
          //console.log(e)
        this.setState({ 
            release_qty: e,
          }); 
      }
      onBack = e =>{
        e.preventDefault();
        const { ris_id } = this.props.location.state 
        this.props.history.push(`/request/viewrequest/${ris_id}`);
      }
    render(){
        const { ris_id, purpose, requested_by, date_request, quantity_requested, quantity_released, pending } = this.props.location.state;
        //const { id, ris_id, quantity, created_at } = this.state.releases_ffp;
        //const {ris_id} = this.state.releases_ffp;
        const { release_qty, quantity_allocated } = this.state;

        //console.log(this.props.release)
        return this.state.init ? <div>
               
        <Container>
            <div className="text-center">
                <h5 variant="primary">RIS # {ris_id}</h5>
                <cite title="Source Title">{purpose}</cite>
                <hr/>
            </div>
        
            <Row>
                <Col sm={8}>
                <h5 style={{background:'#f4f4f4'}}>Releases</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Requisition Issue Slip No.</th> 
                            <th>Quantity</th>
                            <th>Date of Releases</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.releases_ffp.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.ris_id}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.created_at}</td>
                                    </tr>
                                )
                            })
                        }
                                            
                        </tbody>
                    </Table>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
                <Card className="text-center">
                    <Card.Header>Releases</Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.quantity} FFP's</Card.Title>
                        </Card.Body>
                    <Card.Footer className="text-muted">Total Quantity</Card.Footer>
                </Card>  

                </Col>
                <Col sm={4}>
                <Card className="text-center">
                    <Card.Header>Requests</Card.Header>
                        <Card.Body>
                            <Card.Title>{quantity_allocated}/{quantity_requested}</Card.Title>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Button 
                                onClick={this.onSetQty.bind(this,quantity_allocated - this.state.quantity)}
                                variant='outline-secondary'>Release Allocation</Button>
                        </Card.Footer>
                </Card><br/>
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
                <Card>
                    <Card.Header>Release Food Packs</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter Quantity"
                                        name="release_qty" 
                                        value={release_qty}
                                        onChange={this.onChange} />
                                </Form.Group>
                                <Button onClick={this.onSend} variant="primary">
                                    Submit
                                </Button>
                                <Button onClick={this.onBack} variant="secondary">
                                    Back
                                </Button>
                            </Form>
                        </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    </div> : <div>loading...</div>;
    }
    
}
export default withRouter(ModalFoodRelease);
