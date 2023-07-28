import React, {Component} from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import Cookies from 'js-cookie';
//import axios from '../../../../../axios';
class AddProduction extends Component{
  constructor(props) {
    super(props);

    this.state = {
      purpose: '',
      quantity_requested: '',
      kit: '',
      pending:'t',
      request_status:'incomplete',
      alert_message:'',
    };

  }
  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
    })
    //console.log(this.state);
  };
  onSubmit= (e) =>{
    e.preventDefault();
    const {purpose, quantity_requested, kit, pending, request_status} = this.state
    const ffpproduction ={
      purpose: purpose,
      quantity_requested: quantity_requested,
      kit: kit,
      request_status:request_status,
      pending: pending
    }
  /*  axios.post('/api/kit', ffpproduction)
    .then(res => {
      this.setState({alert_message:"success"})
    }).catch(error=>{
      this.setState({alert_message:"error"})
    });*/
//    fetch("http://localhost:8000/api/kit", {
      fetch(`${process.env.REACT_APP_API_PROXY}/api/kit`,{
      mode:'cors',
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(ffpproduction)
       }).then(async response => {
         if (!response.ok) {
         const validation = await response.json();
         //setErrors(validation.errors);
         console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        const validation = await response.json();
        this.setState({alert_message:"success"})
        //console.log(validation)
       }
    })
  }
  canSubmit = (pid) => {

    //console.log(pid)
    if(pid===''||pid==='none'){
      return true
    }
    return false;
  };
    render(){
      const { purpose, quantity_requested, kit, pending } = this.state;
      return(
        <div>        
          {this.state.alert_message=="success"?<SuccessAlert/>:null}
          {this.state.alert_message=="error"?<ErrorAlert/>:null}
          <hr/>
          <Form onSubmit={this.onSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Purpose</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="purpose" 
                        value={purpose}
                        onChange={this.onChange}
                        placeholder="ex. Production of 1000 packs for distribution to..."
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="quantity_requested" 
                        value={quantity_requested}
                        onChange={this.onChange}
                        placeholder="Quantity of Family Food Packs"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col}  md="6"controlId="formGridReceived">
                        <Form.Label>Kit</Form.Label><br/>
                        <select 
                          name="kit" 
                          class="form-control"
                          value={kit}
                          onChange={this.onChange}
                        >
                          <option value="none">Select Kit</option>
                          <option value="Sleeping Kit">Sleeping Kit</option>
                          <option value="Family Kit">Family Kit</option>
                          <option value="Kitchen Kit">Kitchen Kit</option>
                          <option value="Shelter Kit">Shelter Kit</option>
                          <option value="Hygiene Kit">Hygiene Kit</option>
                        </select>
                    </Form.Group>
                </Form.Row>
                <Button type="submit" disabled={this.canSubmit(this.state.kit)} onClick={this.onClick}>Submit</Button>
            </Form>
        </div>
       
      );
    }
  }

export default AddProduction;