import React, {Component} from 'react';
import {Button, Card, Container, InputGroup, Row , FormControl, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import { confirmAlert } from 'react-confirm-alert'; // Import
//import axios from '../../../../../axios';
class NonFoodComposition extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cart:[],
      item:[],
      result:[],
      ris_id:'',
      purpose:'',
      allocated:'',
      percentage:'',
      released:'',
      rpercentage:'',
      item_id:'',
      purchase_id:'',
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

  async componentDidMount() {
    const arr = this.props.match.params.id;
    const res = arr.split("_");
    this.setState({
      ris_id:res[0],
      particular:res[1]
    });

    axios.get('/api/itempurchase/show')
    .then(res => this.setState({ 
        item: res.data.filter(ffp=>{
          return ffp.particular===this.state.particular;
        })
    }));
   /*await fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase/show/`,{
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
            })
          });
       }
    })*/
    //console.log(res[0]);
    /*await axios.get('/api/itemallocation/'+res[0])
    .then(res => this.setState({ 
        cart: res.data.filter(ffp=>{
          return ffp.particular===this.state.particular;
        }),
        init:1,  
    }));*/
  await  fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation/`+res[0],{
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
  }

  onSend =(item_id, purchase_id)=>{
    const composition = {
        allocation_id: item_id,
        purchase_id: purchase_id
    }
    //console.log(composition);
    /*axios.post('/api/itemcomposition', composition)
    .then(res => {
        this.setState({alert_message:"success"})
    }).catch(error=>{
        this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/itemcomposition`,{
      mode:'cors',
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(composition)
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

onReload =()=>{
  this.liveTime = setTimeout(()=>{
     //this.reload();
     /*axios.get('/api/itemallocation/'+this.state.ris_id)
    .then(res => this.setState({ 
        cart: res.data.filter(ffp=>{
          return ffp.particular===this.state.particular;
        }),
        init:1,  
    }));*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation/`+this.state.ris_id,{
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
    });

    axios.get('/api/itempurchase/show')
    .then(res => this.setState({ 
        item: res.data.filter(ffp=>{
          return ffp.particular===this.state.particular;
        }),
        alert_message:"",
        allocation_id: "",
        purchase_id: "",
        particular:""
    }));

    /*fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase/show/`,{
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
            alert_message:"",
            allocation_id: "",
            purchase_id: "",
            particular:""
          });
       }
    });*/

  }, 2000)
 }

handleOnView = (id, name) =>{
  //console.log(e.target.value);
  confirmAlert({

    title: name,
    message: 'Please select an item from the list provided below',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>    this.setState({
          item_id: id,
          result:this.state.item.filter(it => it.name.includes(name))
        })
      }
    ]
  });


}

handleOnSelect = e =>{

  this.setState({
    purchase_id: e.target.id 
  })

}

onCheck =(x)=> {
  const parsed = parseInt(x);

  if (parsed==='100'||parsed===100) { 
    //console.log(x+'true')
    return 'true';
  }
  //console.log(x+'false')
  return '';
  
}

onChange = e => {this.setState({
  [e.target.name]: e.target.value 
  })
  //console.log(this.state);
};
onBack = e =>{
  e.preventDefault();
  //const { transactionId } = this.state; 
  this.props.history.push(`/request/viewnonfood/${this.state.ris_id}`);
} 
    render(){
      return this.state.init ? <div>
      <Container>
                          <div className="text-center">
                              <h5 variant="primary">RIS # {this.state.ris_id}</h5>
                          </div>
                        
                          <hr/>
                          <Row>
                              <Col sm={9}>
                              <h5 style={{background:'#f4f4f4'}}>Requested {this.state.particular} Items</h5>
                                  <Table responsive>
                                    <thead>
                                        <tr>
                                          <th>#</th>
                                          <th>Item</th>
                                          <th>Unit</th> 
                                          <th>Date</th>
                                          <th># Request</th>
                                          <th># Allocated</th>
                                          <th>Percentage</th>
                                          <th>Action</th>
                                        </tr>
                                    </thead>
                                      <tbody>
                                      {
                                          this.state.cart.map((item)=>{
                                              return(
                                                  <tr key={item.id}>
                                                      <td>{item.id}</td>
                                                      <td>{item.name_}</td>
                                                      <td>{item.unit}</td> 
                                                      <td>{item.created_at}</td>
                                                      <td>{item.quantity_requested}</td>
                                                      <td>{item.quantity_allocated}</td>
                                                      <td>{item.percentage}</td>
                                                      <td>
                                                        <Button disabled={this.onCheck(item.percentage)} size="sm" id={item.id} value={item.name_} onClick={this.handleOnView.bind(this, item.id, item.name_)}>Select</Button>
                                                      </td>
                                                  </tr>
                                              )
                                          })
                                      }
                                      </tbody>
                                  </Table>

                                                          </Col>
                              <Col sm={3}>
                                <br/>
                              {this.state.alert_message=="success"?<SuccessAlert/>:null}
                              {this.state.alert_message=="error"?<ErrorAlert/>:null}
                              <Card className="text-center">
                                  <Card.Header>Select</Card.Header>
                                      <Card.Body>
                                      <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text id="basic-addon1">Item</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          type="number"
                                          name="item_id" 
                                          value={this.state.item_id}
                                          onChange={this.onChange}
                                          placeholder="Item ID"
                                          aria-label="Username"
                                          aria-describedby="basic-addon1"
                                          disabled
                                        />
                                      </InputGroup>
                                      <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text id="basic-addon1">Item</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          type="number"
                                          name="purchase_id" 
                                          value={this.state.purchase_id}
                                          onChange={this.onChange}
                                          placeholder="Purchase ID"
                                          aria-label="Username"
                                          aria-describedby="basic-addon1"
                                          disabled
                                        />
                                      </InputGroup>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">Commodities</Card.Footer>
                              </Card><br/>
                              <Button block onClick={this.onSend.bind(this, this.state.item_id, this.state.purchase_id)} variant="primary">
                                      Submit
                              </Button>
                              <Button block onClick={this.onBack} variant='secondary'>Back</Button>
                              </Col>
                          </Row>
                          <Row>
                              <Col sm={12}>
                              <Card>
                                  <Card.Header>Items Available for Provision</Card.Header>
                                      <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Particular</th> 
                                                <th>Description</th>                                               
                                                <th>Cost</th>
                                                <th>Quantity Available</th>
                                                <th>Date Expire</th>
                                                <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.result.map((item)=>{
                                                    return(
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.particular}</td> 
                                                            <td>{item._description}</td>
                                                            <td>{item.cost}</td>
                                                            <td>{item.quantity_available}</td>
                                                            <td>{item.date_expire}</td>
                                                            <td>
                                                              <Button size="sm" id={item.id} value={item.name} onClick={this.handleOnSelect}>Select</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">Lists of Available Items</Card.Footer>
                              </Card><br/>
                             
                              </Col>
                          </Row>
                      </Container> 
          </div> : <div>loading...</div>;
    }
  }

export default NonFoodComposition;