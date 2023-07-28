import React, {Component} from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
//import axios from '../../../../axios';
class EditProduction extends Component{
  constructor(props) {
    super(props);

    this.state = {
      alert_message:'',
      item:[],
      purpose:'',
      quantity_requested:''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    /*axios.get('/api/production/edit/'+this.props.match.params.id)
        .then(res => this.setState({ 
          purpose:res.data.purpose
          //quantity_requested:res.data.quantity_requested
        }))
        //console.log(this.state.item)*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/production/edit/`+this.props.match.params.id,{
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
                purpose: validation.purpose
              });
          }
        })
  }
  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
  })};
  onSubmit(e){
    e.preventDefault();
    const { purpose} = this.state
    const category = {
      purpose: purpose
      //particular: particular
    }
    //console.log(category);

    /*axios.put('/api/production/updates/'+this.props.match.params.id, category)
    .then(res => {
      this.setState({alert_message:"success"})
      this.liveRedirectTime = setTimeout(()=>{ 
        //this.setState({alert_message:''})
        this.props.history.push(`/foodpacks/`)
      }, 2000);
    }).catch(error=>{
      this.setState({alert_message:"error"})
    })*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/production/updates/`+this.props.match.params.id,{
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
         //console.log(validation.errors);
         this.setState({alert_message:"error"})
       }else{
        //history('/categories')
        //const validation = await response.json();
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/foodpacks/`)
        }, 2000);
       }
    })
  }
    render(){
      const {id, purpose, quantity_available } = this.state;
      return(
        <div>        
          {this.state.alert_message=="success"?<SuccessAlert/>:null}
          {this.state.alert_message=="error"?<ErrorAlert/>:null}
          <hr/>
          <Form onSubmit={this.onSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Purpose</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="purpose" 
                        value={purpose||''}
                        onChange={this.onChange}
                        placeholder="ex. Production of 1000 packs for distribution to..."
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {/*
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                              required
                              type="number"
                              name="quantity_available" 
                              value={quantity_available||''}
                              onChange={this.onChange}
                              placeholder="Quantity of Family Food Packs"
                          />
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          </Form.Group>
                    */}
                    

                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                    <Form.Label>Unit</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="unit" 
                        defaultValue="Packs"
                    />
                    </Form.Group>
                </Form.Row>
                <Button type="submit" onClick={this.onClick}>Submit</Button>
            </Form>
        </div>
       
      );
    }
  }

export default EditProduction;