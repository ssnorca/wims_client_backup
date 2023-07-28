import React, {Component} from 'react';
import { Form, FormInput, FormGroup } from "shards-react";
import { FormRadio, Button } from "shards-react";
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
//import axios from '../../../../axios';
class AddCategory extends Component{
  constructor(props) {
    super(props);

    this.state = {
      selectedType: '',
      particular:'',
      alert_message:'',
    };

    this.changeType = this.changeType.bind(this);
    this.changeParticular = this.changeParticular.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeType(type) {
    this.setState({
      selectedType: type
    });
  }
  changeParticular(e){
    this.setState({
      particular: e.target.value
    });
  }
  onSubmit(e){
    e.preventDefault();
    const {selectedType, particular} = this.state
    const category = {
      name: selectedType,
      particular: particular
    }
    //console.log(category);

    /*axios.post('/api/category', category)
    .then(res => {
      this.setState({alert_message:"success"})
    }).catch(error=>{
      this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/category`,{
      mode:'cors',
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(category)
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

  }
    render(){
      return(
        <div>        
          {this.state.alert_message=="success"?<SuccessAlert/>:null}
          {this.state.alert_message=="error"?<ErrorAlert/>:null}
          <hr/>
          <Form onSubmit={this.onSubmit}>
          <div>
            <p className="mb-2">Select Category Type:</p>
              <FormRadio
                inline
                name="type"
                checked={this.state.selectedType === "Food Item"}
                onChange={() => {
                  this.changeType("Food Item");
                }}
              >
                Food-Item
              </FormRadio>
              <FormRadio
                inline
                name="type"
                checked={this.state.selectedType === "Non-Food Item"}
                onChange={() => {
                  this.changeType("Non-Food Item");
                }}
              >
                NonFood-Item
              </FormRadio>
          </div>
        <span>
          <strong>Selected Type:</strong>{" "}
          <span>{this.state.selectedType || "none"}</span>
        </span>
        <br/>
        <br/>
        
          <FormGroup>
            <label htmlFor="#particular">Particular</label>
            <FormInput 
            size="lg" 
            type="text"
            id="particular"
            value={this.state.particular}
            onChange={this.changeParticular} 
            placeholder="Particular" 
            className="mb-3"/>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
        </div>
       
      );
    }
  }

export default AddCategory;