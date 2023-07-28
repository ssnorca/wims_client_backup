import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';
import {FormSelect} from 'shards-react';
import ItemListRelease from './ItemListRelease';
import Pagination from "react-js-pagination";
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import { withRouter } from 'react-router-dom';
import history from '../../../history';
//import axios from '../../../../../axios';
class ModalFoodPackStatus extends Component{
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
            quantity_returned:'',
            remarks:'',
            ris_no:'',
            isFormDisabled:false,
        }
    }
    onChange = e => {
        const { purpose_type } = this.props.location.state;
        this.setState({
        [e.target.name]: e.target.value 
        })
        //console.log(this.state);
        if(e.target.name==='remarks' && e.target.value==='Distributed'&&purpose_type==='Preposition'){
            this.setState({ 
                isFormDisabled: true,
              });
        }else{
            this.setState({ 
                isFormDisabled: false,
              }); 
        }
        /*if(this.state.remarks==='Distributed'){
            this.setState({ 
                isFormDisabled: true,
              });
        }*/
      };
    async componentDidMount() {
        
        const { ris_id } = this.props.location.state
        //console.log(this.state.isFormDisabled);
        //const { ris_id } = this.props.onRelease;
        /*await axios.get('/api/stockpilereference')
        .then(res => this.setState({ 
            releases_ffp: res.data.filter(ffp=>{
                return ffp.ris_no===ris_id;
              }),
            init:1,
            activePage:res.data.current_page,
            itemsCountPerPage:res.data.per_page,
            totalItemsCount:res.data.total
        }));*/
      await  fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereference`,{
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
                        return ffp.ris_no===ris_id;
                      }),
                    init:1,
                    activePage: validation.current_page,
                    itemsCountPerPage: validation.per_page,
                    totalItemsCount: validation.total
                });
             }
          })
      
        let sum = this.state.releases_ffp.reduce(function(prev, current) {
            return prev +current.quantity
          }, 0);
        this.setState({ 
            quantity_returned: sum,
          });
        //console.log(this.props.onRelease);
    } 
 /*   componentDidUpdate(prevState){
        if(prevState.remarks!==this.state.remarks){
            //console.log(this.state.remarks);
            if(this.state.remarks==='Distributed'){
                this.setState({ 
                    isFormDisabled: true,
                  });
            }
        }
        
    }*/
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
        //console.log(e)
    };
    handlePageChange(pageNumber) {
        //console.log('active page is ${pageNumber}');
        this.setState({activePage: pageNumber});
    }
    
    onCheck = (purpose_type) => {
        const {quantity, remarks, quantity_returned}=this.state;
        const { ris_id, quantity_requested, released } = this.props.location.state;


        //console.log(quantity_requested-quantity_returned);
        const totalNum = released-quantity_returned
         //console.log(quantity_returned); 
         //console.log(quantity_requested); 
         // if(totalNum>quantity||totalNum<quantity){
         //   return true;
         // }else 
         if(quantity>0 && quantity<=totalNum){
              return false;
          }
          /*if(remarks==='Distributed'&&purpose_type==='Preposition'){
              //return true
              console.log('called')
          }*/
          //else
          return true;
        
        
      }
      onCheckRemarks = ()=>{
        const {remarks}=this.state;
        if(remarks==='Distributed'){
            //return true
            console.log(remarks)
        }
        return false;
      }
    onSend = () =>{
        const {quantity, remarks, quantity_returned}=this.state;
        const { ris_id, quantity_requested } = this.props.location.state
        if (quantity < 0){
            this.setState({alert_message:"error"})
        //if the quantity to be release > 
        }else if(quantity > quantity_requested){
            this.setState({alert_message:"error"})
        }
        else if(quantity > (quantity_requested-quantity_returned)){
            this.setState({alert_message:"error"})
        }else{
            const ffp ={
                ris_no: ris_id,
                quantity: quantity,
                remarks: remarks,
                status:0
              }
            //  console.log(ffp);
            /*axios.post('/api/stockpilereference', ffp)
            .then(res => {
                this.setState({alert_message:"success"})
            }).catch(error=>{
                this.setState({alert_message:"error"})
            });*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereference`,{
            mode:'cors',
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
            },
                body: JSON.stringify(ffp)
            }).then(async response => {
                if (!response.ok) {
                const validation = await response.json();
                //console.log(validation.errors);
                this.setState({alert_message:"error"})
            }else{
                //history('/categories')
                //const validation = await response.json();
                this.setState({alert_message:"success"})
                //console.log(validation)
            }
            })
            this.onReload();
        }
  
    }
    onBack = e =>{
        e.preventDefault();
        const { ris_id } = this.props.location.state
        this.props.history.push(`/request/viewrequest/`+ris_id)
    }
    //Reloads the DaTA froM the DAtabaASe
     onReload =()=>{
        const { ris_id } = this.props.location.state
        this.liveTime = setTimeout(()=>{
           //this.reload();
           /*axios.get('/api/stockpilereference')
           .then(res => this.setState({ 
               releases_ffp: res.data.filter(ffp=>{
                return ffp.ris_no===ris_id;
               }),
               init:1,
               activePage:res.data.current_page,
               itemsCountPerPage:res.data.per_page,
               totalItemsCount:res.data.total
           }));*/
           fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereference`,{
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
                        return ffp.ris_no===ris_id;
                       }),
                       init:1,
                       activePage:validation.current_page,
                       itemsCountPerPage:validation.per_page,
                       totalItemsCount:validation.total
                });
             }
          })
        }, 2000);

        this.liveRedirectTime = setTimeout(()=>{ 
        this.redirectToTarget();
        this.props.onReload();
        }, 3000);
      }
      redirectToTarget = () => {
        const { ris_id } = this.props.location.state
        //this.props.history.push(`/request/viewrequest/${ris_id}`)
        this.props.history.push(`/request/`)
        //this.props.history.goBack
      }
      canSave = () => {
        //console.log(myStatus+'-w');
        //console.log(desigArea+'-a');
        const yes = 'none';
        const no = 'block';
        const {destination} = this.props.location.state;
        var desigArea   = localStorage.getItem('roleDesigArea');
        var desigRole   = localStorage.getItem('roleDesig');
        //const { paramCode } = this.state.row;
        if(desigRole!='admin'){
          return yes
        }
        return no;
      }
    render(){
        const { ris_id, purpose, isFormDisabled, requested_by, date_request, quantity_requested, released, pending, purpose_type } = this.props.location.state;
        //const { id, ris_id, quantity, created_at } = this.state.releases_ffp;
        //const {ris_id} = this.state.releases_ffp;
        const { quantity } = this.state;

        //console.log(this.props.release) this.state.init ? <div>
        return (
               
        <Container>
            <div className="text-center">
                <cite title="Source Title">{purpose}</cite>
                <hr/>
            </div>
        
            <Row>
                <Col sm={8}>
                <h5 style={{background:'#f4f4f4'}}>RIS # {ris_id}</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>References</th> 
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.releases_ffp.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.remarks}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.created_at}</td>
                                        <td>
                                            <Button key={item.id} value={item.id} >Edit</Button>
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
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
                <Card className="text-center">
                    <Card.Header>Returned/Pulled Out FFPs</Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.quantity_returned} FFP's</Card.Title>
                        </Card.Body>
                    <Card.Footer className="text-muted">Total Quantity</Card.Footer>
                </Card>  
 

                </Col>
                <Col sm={4}>
                <Card className="text-center">
                    <Card.Header>Request</Card.Header>
                        <Card.Body>
                            <Card.Title>{released}/{quantity_requested} FFP's</Card.Title>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                        <Button block onClick={this.onBack} variant="secondary">
                                    Back
                        </Button>
                        </Card.Footer>

                </Card><br/>
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
                <Card style={{display:this.canSave()}}>
                    <Card.Header>References</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <FormSelect 
                                        name="remarks" 
                                        className="form-control"
                                        value={this.state.remarks||''}
                                        onChange={this.onChange}>
                                            <option value="null">-</option>
                                            <option value="Distributed">Distributed</option>
                                            <option value="Returned">Returned</option>
                                            <option value="Pull Out">Pull Out</option>
                                            <option value="For Reconditioning">For Reconditioning</option>
                                    </FormSelect>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter Quantity"
                                        name="quantity" 
                                        value={quantity}
                                        disabled={this.state.isFormDisabled}
                                        onChange={this.onChange} />
                                </Form.Group>
                                <Button disabled={this.onCheck(purpose_type)} block onClick={this.onSend} variant="primary">
                                    Submit
                                </Button>

                            </Form>
                        </Card.Body>
                </Card>

                </Col>
            </Row>
        </Container>
        );
    }
    
}
export default withRouter(ModalFoodPackStatus);
