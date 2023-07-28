import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import { Form, Row, Col, Container, Table } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import { withRouter } from 'react-router-dom';
import history from '../../../history';
import { confirmAlert } from 'react-confirm-alert'; // Import
//import axios from '../../../../../axios';
class NonFoodRelease extends Component{
    constructor(props) {
        super(props);
        this.state = {
          cart:[],
          item:[],
          release:[],
          ris_id:'',
          purpose:'',
          allocated:'',
          percentage:'',
          released:'',
          rpercentage:'',
          quantity:'',
          release_qty:'',
          allocation_id:'',
          item_name:'',
          particular:'',
          quantity_requested:'',
          init:0,
          alert_message:'',
          activePage:1,
          itemsCountPerPage:1,
          pageRangeDisplayed:3,
          totalItemsCount:1
        }
      }
    onChange = e => {this.setState({
        [e.target.name]: e.target.value 
        })
        console.log(this.state);
      };
    async componentDidMount() {
        const arr = this.props.match.params.id;
        const res = arr.split("_");
        this.setState({
          ris_id:res[0],
          particular:res[1]
        });

        /*await axios.get('/api/nonfoodrelease/'+res[0])
        .then(res => this.setState({ 
            cart: res.data.filter(ffp=>{
              return ffp.particular===this.state.particular;
            }),
            init:1,  
        }));*/
      await fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfoodrelease/`+res[0],{
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
                cart: validation.filter(ffp=>{
                  return ffp.particular===this.state.particular;
                }),
                init:1,  
              });
           }
        })

        /*await axios.get('/api/itemallocation/'+res[0])
        .then(res => this.setState({ 
            item: res.data.filter(ffp=>{
              return ffp.particular===this.state.particular;
            }),
            init:1,  
        }));*/
       await fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation/`+res[0],{
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
                  return ffp.particular===this.state.particular;
                }),
                init:1,  
              });
           }
        })
         
    } 
    componentWillUpdate(nextProps, nextState) {
        //const filters = this.state.cart
        if (this.state.item_name !== nextState.item_name) {
         //console.log('did mount food updated'+nextState.item_name);
         //console.log('will');
         this.setState({ 
           release: this.state.cart.filter(ffp=>{
                return ffp.name===nextState.item_name;
              }) 
        });
        /*let sum = this.state.release.reduce(function(prev, current) {
            return prev +current.quantity_release
          }, 0);
        this.setState({ 
            quantity: sum,
          });*/
                         
        }
    }
    handleOnView = (id, name, qtyReleased, qtyAllocated) =>{

        confirmAlert({

            title: name,
            message: 'Please set Quantity to be Release',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  this.setState({
                    allocation_id: id,
                    item_name: name,
                    quantity: qtyReleased,
                    allocated: qtyAllocated
                  })
              }
            ]
          });

        //console.log(id+'-:'+name);
        
      }
    /*handlePageChange(pageNumber) {
        console.log('active page is ${pageNumber}');
        this.setState({activePage: pageNumber});
    }*/
    onSend = () =>{

        if(this.state.release_qty>this.state.allocated||this.state.release_qty<=0){
            this.setState({alert_message:"error"})
        }else{
            const nfi_release ={
                allocation_id: this.state.allocation_id,
                quantity_release: this.state.release_qty,
              }
            //  console.log(nfi_release);
            /*axios.post('/api/nonfoodrelease', nfi_release)
            .then(res => {
                this.setState({
                    alert_message:"success"
                })
            }).catch(error=>{
                this.setState({alert_message:"error"})
            });*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfoodrelease`,{
              mode:'cors',
              method: 'POST',
              headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
              },
                body: JSON.stringify(nfi_release)
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
        }

        /*this.props.onReload(); */
    }

    //Reloads the DaTA froM the DAtabaASe
     onReload =()=>{
        const { ris_id } = this.state;
        this.liveTime = setTimeout(()=>{
           //this.reload();
           /*axios.get('/api/itemallocation/'+ris_id)
           .then(res => this.setState({ 
               item: res.data.filter(ffp=>{
                 return ffp.particular===this.state.particular;
               }), 
               alert_message:'',
               allocation_id:''
           }));*/
           fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation/`+ris_id,{
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
                    return ffp.particular===this.state.particular;
                  }), 
                  alert_message:'',
                  allocation_id:''
                });
             }
          })


        }, 2000);

        /*let sum = this.state.releases_ffp.reduce(function(prev, current) {
            return prev +current.quantity
          }, 0);
        this.setState({ 
            quantity: sum,
          });*/
        this.liveRedirectTime = setTimeout(()=>{ 
        this.redirectToTarget();
        }, 3000);
       }
      redirectToTarget = () => {
        const { ris_id } = this.state;
        this.props.history.push(`/request/viewnonfood/${ris_id}`)
        //this.props.history.goBack
      }
      onBack = e =>{
        e.preventDefault();
        //const { transactionId } = this.state; 
        this.props.history.push(`/request/viewnonfood/${this.state.ris_id}`);
      } 
      onSetQty =(e)=>{
        //console.log(e)
      this.setState({ 
          release_qty: e,
        }); 
    }
    onCheck =(x)=> {
        const parsed = parseInt(x);
      
        if (parsed==='0'||parsed===0) { 
          //console.log(x+'true')
          return 'true';
        }
        //console.log(x+'false')
        return '';
        
      }
      checkID =(x)=> {
        const parsed = parseInt(x);
      
        if (parsed===''||isNaN(parsed)) { 
          //console.log(x+'true')
          return 'true';
        }
        //console.log(x+'false')
        return '';
        
      }
    render(){

        //console.log(this.props.release)
        return this.state.init ? <div>
               
        <Container>
            <div className="text-center">
            <h5 variant="primary">RIS # {this.state.ris_id}</h5>
                <cite title="Source Title"></cite>
                <hr/>
            </div>
            <h5 style={{background:'#f4f4f4'}}>Allocated Non-Food Items</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Particular</th>
                            <th>Item Name</th>
                            <th>Unit</th>
                            <th>Date</th>
                            <th>Requested (Qty)</th>
                            <th>Allocated (Qty)</th>
                            <th>Released (Qty)</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.item.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.particular}</td>
                                        <td>{item.name_}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.quantity_requested}</td>
                                        <td>{item.quantity_allocated}</td>
                                        <td>{item.quantity_release}</td>
                                        <td>
                                            <Button size="sm" disabled={this.onCheck(item.quantity_allocated - item.quantity_release)} onClick={this.handleOnView.bind(this,item.id, item.name_, item.quantity_release, item.quantity_allocated)}>View</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                                            
                        </tbody>
                    </Table>
            <Row>
                <Col sm={8}>
                <h5 style={{background:'#f4f4f4'}}>Releases</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Particular</th>
                            <th>Item Name</th>
                            <th>Unit</th>
                            <th>Quantity Release</th>
                            <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.release.map((item)=>{
                                return(
                                    <tr key={item.rid}>
                                        <td>{item.id}</td>
                                        <td>{item.particular}</td>
                                        <td>{item.name}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.quantity_release}</td>
                                        <td>{item.created_at}</td>
                                    </tr>
                                )
                            })
                        }
                                            
                        </tbody>
                    </Table>
                <Card className="text-center">
                    <Card.Header>Releases</Card.Header>
                        <Card.Body>
                        <Form.Control 
                                        style={{textAlign:'center', fontSize:'15px', fontStyle:'bold'}}
                                        type="text" 
                                        placeholder="Quantity"
                                        name="quantity" 
                                        value={this.state.quantity || ''}
                                        onChange={this.onChange} />
                        </Card.Body>
                    <Card.Footer className="text-muted">Total Quantity</Card.Footer>
                </Card>  

                </Col>
                <Col sm={4}>
                <Card className="text-center">
                <Form.Label>Item Name</Form.Label>
                        
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Item Name"
                                        name="item_name" 
                                        value={this.state.item_name}
                                        onChange={this.onChange} />
                                    <Form.Control 
                                        type="number" 
                                        placeholder="ID #"
                                        name="allocation_id" 
                                        value={this.state.allocation_id}
                                        disabled
                                        onChange={this.onChange} />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                        <Button 
                                onClick={this.onSetQty.bind(this,this.state.allocated - this.state.quantity)}
                                variant='outline-secondary'>Release Allocation</Button>
                        </Card.Footer>
                </Card><br/>
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
                <Card>
                    <Card.Header>Quantity</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicRelease">
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter Quantity"
                                        name="release_qty" 
                                        value={this.state.release_qty}
                                        onChange={this.onChange} />
                                </Form.Group>
                                <Button disabled={this.checkID(this.state.allocation_id)} onClick={this.onSend} variant="primary">
                                    Submit
                                </Button>
                                <Button onClick={this.onBack} variant='secondary'>Back</Button>
                            </Form>
                        </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    </div> : <div>loading...</div>;
    }
    
}
export default withRouter(NonFoodRelease);
