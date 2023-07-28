import React, {Component} from 'react';
import { Form, Row, Col, Container, Table, Card, Button, InputGroup } from 'react-bootstrap';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Food from './Food';
//import axios from '../../../../../axios';
class ViewStockpile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            foods:[],
            item:[],
            released:[],
            ris_no:'',
            selectedRIS:'',
            type:'',
            init:0,
            province:'', 
            quantity:'',
            quantityTotalReleased:'',
            quantityReleased:'',
            quantityAllowed:'',
            quantityTotal:'',
            destinationRIS:'',
            quantityRequested:'',
          };
    }
    async componentDidMount() {
        //console.log(this.props.preposition_id)
        /*await axios.get('/api/stockpilereference')
        .then(res =>this.setState({ 
            item: res.data.filter(ffp=>{
                return ffp.ris_no===this.props.match.params.id;
              }),
        })); */
      await fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpilereference`,{
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
                  return ffp.ris_no===this.props.match.params.id;
                }),
              });
           }
        }); 
        /*await axios.get('/api/stockpileprepositionreleaseView')
        .then(res =>this.setState({ 
              released: res.data.filter(ffp=>{
                return ffp.ris_no===this.props.match.params.id;
              }),
        }));*/

        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileprepositionreleaseView`,{
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
                released: validation.filter(ffp=>{
                  return ffp.ris_no===this.props.match.params.id;
                }),
              });
           }
        }); 

        /*axios.get('/api/requestfood')
        .then(res => this.setState({ 
          foods: res.data 
        }))*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
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
                foods: validation 
              });
           }
        });
        this.setState({ 
            ris_no:this.props.match.params.id,
            type:this.props.location.type,
            province:this.props.location.province,
            quantity:this.props.location.quantity,
            destinationRIS:this.props.location.destinationRIS,
            //quantityRequested: this.props.location.quantityRequested,
        });


        let sum = this.state.item.reduce(function(prev, current) {
          return prev +current.quantity
        }, 0);

        let sumReleased = this.state.released.reduce(function(prev, current) {
          return prev +current.quantity
        }, 0);

        //console.log('sum'+sum);
        //console.log('sumreleased'+sumReleased);
        //console.log('qty Requested'+this.props.location.quantityRequested);
        //console.log('props.location.quantity'+this.props.location.quantity);
        this.setState({ 
          quantityTotal: sum, //total returned and pull out
          quantityTotalReleased: sumReleased, //total stockpiles released
          quantityReleased: (this.props.location.quantityRequested - sum), //variable holder
          quantityAllowed: (this.props.location.quantity /*- sum*/) - sumReleased //requested quantity subtracted by returned/pull out stockpile then subtracted by total of stockpiles released
        });
        
        if(this.props.location.type!='Preposition'){
          this.setState({ 
            selectedRIS:  this.props.match.params.id
          });
        }
        //console.log(this.state.quantityTotalReleased)

    }
    onOpenModal = () => {
      this.setState({ open: true });
    };
   
    onCloseModal = () => {
      this.setState({ open: false });
    };
    onCheck = () => {
      const {quantityTotalReleased, quantityAllowed, quantityReleased} = this.state;
     
        if(this.state.ris_no!=this.props.preposition_id){
          return true;
        }else{
          if(quantityTotalReleased===""){
            //console.log(quantityTotalReleased +':'+ quantityAllowed);
          }else{
          //console.log(quantityTotalReleased);
          //console.log(quantityAllowed); 
            if(quantityReleased>quantityAllowed||quantityReleased>this.props.location.quantityRequested||quantityReleased<=0){
              return true;
            }
            return false;
          }
        }

      
    }
    checkType = (typ) =>{
      if(typ!='Preposition'){
        return 'none';
      }
    }
    onChange = e => {this.setState({
      [e.target.name]: e.target.value 
      })
      //console.log(this.state);
    };
    onBack = e =>{
      e.preventDefault();
      this.props.history.push(`/request/release/`)
    }
    onSend = (e) =>{     
      e.preventDefault();
      const {ris_no, quantityReleased, quantityAllowed, destinationRIS,quantityRequested} = this.state;
      if (quantityReleased <= 0){
        this.setState({alert_message:"error"})
      //if the quantity to be release > 
      }else if(quantityReleased>quantityAllowed){
        this.setState({alert_message:"error"})
      }
      else{
        //window.alert('Successfully Saved');
        const ffp ={
          ris_no: ris_no,
          quantity: quantityReleased,
          destination: destinationRIS
        }
        //console.log(ffp);
        /*axios.post('/api/stockpileprepositionrelease', ffp)
        .then(res => {
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileprepositionrelease`,{
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
      
    }
    onReload =()=>{
      const {ris_no} = this.state;
      this.liveTime = setTimeout(()=>{
         //this.reload();
         /*axios.get('/api/stockpileprepositionreleaseView')
         .then(res => this.setState({ 
              released: res.data.filter(ffp=>{
              return ffp.ris_no===ris_no;
             })
         }));*/
         fetch(`${process.env.REACT_APP_API_PROXY}/api/stockpileprepositionreleaseView`,{
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
                released: validation.filter(ffp=>{
                  return ffp.ris_no===ris_no;
                 })
              });
           }
        })
      }, 2000);

      this.liveRedirectTime = setTimeout(()=>{ 
      this.redirectToTarget();
      }, 3000);
    }
    redirectToTarget = () => {
      
      this.props.history.push(`/request/release/`)
      //this.props.history.goBack
    }
    render(){
      const {open,ris_no, type, province, quantity, quantityAllowed,quantityTotalReleased, quantityReleased, quantityTotal, selectedRIS, destinationRIS} = this.state;
      //const remBalance = (this.state.quantity - this.state.quantityTotal);
      return(
        <Container>
            <div className="text-center">
              <cite title="Source Title">{type} of Stockpile in {province}</cite>
              <hr/>
                <cite>Destination {destinationRIS}</cite>
            </div>
            <Row>
              <Col sm={8}>
                <h5 style={{background:'#f4f4f4'}}>RIS # {ris_no}</h5>
                <p style={{display:'inline'}}>Warehouse: </p>
                <span style={{fontWeight:'bold', textDecorationLine:'underline'}}>{province} </span>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Release #</th> 
                            <th>Destination</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.released.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.release_no}</td>
                                        <td>{item.destination}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.created_at}</td>
                                        <td><Button>View</Button></td>
                                    </tr>
                                )
                            })
                          }
                                            
                        </tbody>
                </Table>
                <Card className="text-center">
                    <Card.Header>Distributed/Returned/Pulled Out FFPs</Card.Header>
                        <Card.Body>
                        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>RIS #</th> 
                                    <th>Quantity</th>
                                    <th>Remarks</th>
                                    <th>Date Added</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                  {
                                    this.state.item.map((item)=>{
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.ris_no}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.remarks}</td>
                                                <td>{item.created_at}</td>
                                                
                                            </tr>
                                        )
                                    })
                                  }
                                                    
                                </tbody>
                        </Table>
                        </Card.Body>
                                <Card.Footer className="text-muted">Total Quantity {quantityTotal}</Card.Footer>
                </Card> 
              </Col>
              <Col sm={4}>
              <Card className="text-center">
                    <Card.Header>Prepositioned Stockpile</Card.Header>
                        <Card.Body>
                                <Card.Title>{quantity} FFP's</Card.Title>
                        </Card.Body>
                        <Card.Footer className="text-muted">Quantity</Card.Footer>
                </Card><br/>
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
                <Card>
                    <Card.Header>Release Stockpile</Card.Header>
                               {/*<span className="text-left" style={{fontStyle:'italic', color:'#6c757d', fontSize:'12px', marginLeft:'30px'}}>
                                  Remaining Stockpiles Available for Releasing is 
                                  <p style={{fontSize:'20px', textAlign:'right'}}className='badge badge-warning badge-pill'>
                                    {quantityTotalReleased}
                                  </p>
                                </span>*/} 
                          <Card.Body>
                              <Form>
                              <InputGroup className="mb-3" style={{display:this.checkType(type)}}>
                                      <Form.Control 
                                          type="text" 
                                          placeholder="RIS No."
                                          name="destinationRIS" 
                                          value={destinationRIS}
                                          disabled='true'
                                          onChange={this.onChange} />
                                <InputGroup.Append> 
                                  {/** <InputGroup.Text id="basic-addon2">
                                  <Button
                                  variant='outline-primary'
                                  onClick={this.onOpenModal}>Select</Button>
                                  </InputGroup.Text>*/}
                                </InputGroup.Append>
                              </InputGroup>
                              <InputGroup className="mb-3">
                                      <Form.Control 
                                          type="number" 
                                          placeholder="Enter Quantity"
                                          name="quantityReleased" 
                                          value={quantityReleased}
                                          onChange={this.onChange} />
                              </InputGroup>
                              <Button disabled={this.onCheck()} block onClick={this.onSend} variant="primary">
                                  Submit
                              </Button>
                              <Button block onClick={this.onBack} variant="secondary">
                                  Back
                              </Button>
                              </Form>
                          </Card.Body>
                  </Card>
              </Col>
            </Row>
            <Row>
            <Modal open={open} onClose={this.onCloseModal} center>
              <Card>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Food requests  = {this.state.foods}/>
                  
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary">Go somewhere</Button>       
                </Card.Footer>
              </Card>
            </Modal>
            </Row>
        </Container>
      
      );
    }
  }

export default ViewStockpile;