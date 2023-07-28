import React, {Component} from 'react';
import {Button, Card, Container, InputGroup, Row , FormControl, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
import { confirmAlert } from 'react-confirm-alert'; // Import
//import axios from '../../../../../axios';
class NonFoodAllocate extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cart:[],
      request:[],
      item:[],
      result:[],
      ris_id:'',
      purpose:'',
      allocated:'',
      percentage:'',
      released:'',
      rpercentage:'',
      item_id:'',
      quantity_requested:'',
      init:0,
      alert_message:'',
      particular:'',
      approved_by:'',
      editFields:'',
      approved_id:'',
    }
  }

  async componentDidMount() {
    //console.log('did mount index container view');           
    //const { ris_id } = this.props.print;
    const arr = this.props.match.params.id;
    const res = arr.split("_");
    this.setState({
      ris_id:res[0],
      particular:res[1]
    });
    //console.log(res[1]);
    /*await axios.get('/api/itemallocation')
    .then(res => this.setState({ 
        cart: res.data.filter(ffp=>{
          return ffp.ris_id===this.state.ris_id;
        }) 
    }));*/
   await fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation`,{
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
              return ffp.ris_id===this.state.ris_id;
            }),
            init:1,
          });
       }
    })

    this.setState({ 
      request: this.state.cart.filter(ffp=>{
           return ffp.particular===this.state.particular;
         }) 
    });

    /*await axios.get('/api/item')
    .then(res => this.setState({ 
        item: res.data.filter(ffp=>{
          return ffp.particular===this.state.particular;
        }),
        init:1, 
    }));*/
   await fetch(`${process.env.REACT_APP_API_PROXY}/api/item`,{
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
          });
       }
    })
  }
  
    onSend =(ris_id, item_id, quantity_requested)=>{
    const composition = {
        item_id: item_id,
        ris_id: ris_id,
        quantity_requested:quantity_requested
    }
    //console.log(composition);
    /*axios.post('/api/itemallocation', composition)
    .then(res => {
        this.setState({alert_message:"success"})
    }).catch(error=>{
        this.setState({alert_message:"error"})
    }); */
    fetch(`${process.env.REACT_APP_API_PROXY}/api/itemallocation`,{
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
   /*  axios.get('/api/itemallocation/'+this.state.ris_id)
    .then(res => this.setState({ 
      request: res.data.filter(ffp=>{
          return ffp.particular===this.state.particular;
        }),
        init:1,  
        alert_message:"",
        item_id: "",
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
            request: validation.filter(ffp=>{
              return ffp.particular===this.state.particular;
            }),
            init:1,  
            alert_message:"",
            item_id: "",
          });
       }
    })

  }, 2000)
 }

handleOnView = (id, name) =>{


  confirmAlert({

    title: name,
    message: 'Please set Quantity to be Requested',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>    this.setState({
          item_id: id 
        })
      }
    ]
  });

}

onChange = e => {this.setState({
  [e.target.name]: e.target.value 
  })
  //console.log(this.state);
};
handleOnApproved = (e) =>{
        
  //const res = this.state.signatories.filter(it => it.name.includes(e));
  //const [{name, id}] = this.state.signatories.filter(it => it.name.includes(e));
  //console.log(this.state.signatories.filter(it => it.name.includes(e)));
  //console.log(e);
  this.setState({
      approved_by: e,
      result:this.state.item.filter(it => it.name.includes(e))
      //approved_id: this.state.signatories.filter(it => it.name.includes(e))
  })

}
onBack = e =>{
  e.preventDefault();
  //const { transactionId } = this.state; 
  this.props.history.push(`/request/viewnonfood/${this.state.ris_id}`);
} 
checkID =(e)=>{
  const yes = true;
  const no = false;

 if(this.state.cart.filter(it => it.name_.includes(e)).length===1){
   return yes;
 }else{
   return no;
 }

}
onEdit =(id)=>{
  console.log(id);
}
onCancelled = (stats) =>{
  if(stats >0){
      return 'none';
  }
  return '';
}
    render(){
      const { ris_id, purpose, allocated, percentage, released, rpercentage, quantity_requested, approved_by, editFields } = this.state;
      return this.state.init ? <div>
      <Container>
                          <div className="text-center">
                              <h5 variant="primary">RIS # {this.state.ris_id}</h5>
                          </div>
                        
                          <hr/>
                          <Row>
                              <Col sm={9}>
                              <h5 style={{background:'#f4f4f4'}}>List of {this.state.particular} Items</h5>
                              <ReactDropdownAutoComplete
                                                getItemValue={item => item.name}
                                                className="form-control"
                                                id="approved_by"
                                                name="approved_by"
                                                placeholder="Select Name"
                                                data={this.state.item}
                                                renderItem={item => (
                                                  <div
                                                    role="button"
                                                    tabIndex="-1"
                                                    onClick={(val) => { editFields.name = val; }}
                                                  >{item.name}</div>
                                                )}
                                                //icon="search"
                                                iconColor="#ff000"
                                                iconClick={() => { /*TODO  */}}
                                                value={approved_by}
                                                onChange={this.handleOnApproved}
                                                onEnter={() => { /*TODO  */}}
                                              />
                                  <Table responsive>
                                      <thead>
                                          <tr>
                                          <th>#</th>
                                          <th>Particular</th> 
                                          <th>Item</th>
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
                                                      <td>{item.particular}</td> 
                                                      <td>{item.name}</td>
                                                      <td>{item.unit}</td>
                                                      <td>
                                                        <Button size="sm" disabled={this.checkID(item.name)} id={item.id} value={item.name} onClick={this.handleOnView.bind(this, item.id, item.name)}>Select</Button>
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
                                          disabled='true'
                                          value={this.state.item_id}
                                          onChange={this.onChange}
                                          placeholder="Item ID"
                                          aria-label="Username"
                                          aria-describedby="basic-addon1"
                                        />
                                      </InputGroup>
                                      <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text id="basic-addon1">Quantity</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          type="number"
                                          name="quantity_requested" 
                                          value={this.state.quantity_requested}
                                          onChange={this.onChange}
                                          placeholder="Quantity"
                                          aria-label="Username"
                                          aria-describedby="basic-addon1"
                                        />
                                      </InputGroup>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">Commodities</Card.Footer>
                              </Card><br/>
                              <Button block onClick={this.onSend.bind(this, this.state.ris_id, this.state.item_id, this.state.quantity_requested)} variant="primary">
                                      Submit
                              </Button>
                              <Button block onClick={this.onBack} variant='secondary'>Back</Button>
                              </Col>
                          </Row>
                          <Row>
                              <Col sm={12}>
                              <Card>
                                  <Card.Header>Requested Non-Food Items</Card.Header>
                                      <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                <th>Particular</th>
                                                <th>Item</th>
                                                <th>Unit</th> 
                                                <th>Date</th>
                                                <th>Quantity Requested</th>
                                                <th>Quantity Allocated</th>
                                                <th>Percentage</th>
                                                <th>Quantity Released</th>
                                                <th>Percentage</th>
                                                <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.request.map((item)=>{
                                                    return(
                                                        <tr key={item.id}>
                                                            <td>{item.particular}</td>
                                                            <td>{item.name_}</td>
                                                            <td>{item.unit}</td> 
                                                            <td>{item.created_at}</td>
                                                            <td>{item.quantity_requested}</td>
                                                            <td>{item.quantity_allocated}</td>
                                                            <td>{item.percentage}</td>
                                                            <td>{item.quantity_release}</td>
                                                            <td>{item.rpercentage}</td>
                                                            <td>
                                                            <Link style={{ pointerEvents: this.onCancelled(item.quantity_allocated) }}
                                                            to={{
                                                                pathname: `/request/editnonfood/${item.id}`,
                                                                state: {
                                                                    stype: this.props.match.params.id,
                                                                    sname: item.name_,
                                                                    squantity: item.quantity_requested,
                                                                }
                                                                }}
                                                            >Edit</Link>
                                                              {/*<Button variant='primary' size="sm" id={item.id} value={item.name} onClick={this.onEdit.bind(this, item.id)}>Edit</Button>*/}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                      </Card.Body>
                                      <Card.Footer className="text-muted">Cart</Card.Footer>
                              </Card><br/>
                             
                              </Col>
                          </Row>
                          
                      </Container> 
          </div> : <div>loading...</div>;
    }
  }

export default NonFoodAllocate;