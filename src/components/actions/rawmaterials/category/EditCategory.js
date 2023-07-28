import React, {Component} from 'react';
import { Form, FormInput, FormGroup } from "shards-react";
import { FormRadio, Button } from "shards-react";
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
//import axios from '../../../../axios';
class EditCategory extends Component{
  constructor(props) {
    super(props);

    this.state = {
      selectedType: '',
      particular:'',
      alert_message:'',
      purposeErr:''
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

  componentDidMount() {
    //axios.get('/api/category/edit/'+this.props.match.params.id)
    //    .then(res => this.setState({ particular: res.data.particular }))
    fetch(`${process.env.REACT_APP_API_PROXY}/api/category/edit/`+this.props.match.params.id,{
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
            particular: validation.particular 
          });
       }
    })
  }

  onSubmit(e){
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {  
        const {selectedType, particular} = this.state
        const category = {
          name: selectedType,
          particular: particular
        }
        //console.log(category);

        /*axios.put('/api/category/update/'+this.props.match.params.id, category)
        .then(res => {
          this.setState({alert_message:"success"})
          this.liveRedirectTime = setTimeout(()=>{ 
            //this.setState({alert_message:''})
            this.props.history.push(`/rawmaterials/`)
          }, 2000);
        }).catch(error=>{
          this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/category/update/`+this.props.match.params.id,{
          mode:'cors',
          method: 'PUT',
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
  }

  validate = () => {
    let purposeErr = '';
    if (!this.state.selectedType) {
      purposeErr = "Type cannot be Empty";
      //return false;
    }

    if (purposeErr) {
      this.setState({ 
        purposeErr:purposeErr,
       });
      return false;
    }

    return true;
};
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
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.purposeErr}
              </div>
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
          <Button type="submit">Update</Button>
        </Form>
        </div>
       
      );
    }
  }

export default EditCategory;