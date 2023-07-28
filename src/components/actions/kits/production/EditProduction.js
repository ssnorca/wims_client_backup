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
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    /*axios.get('/api/production/edit/'+this.props.match.params.id)
        .then(res => this.setState({ 
          item:res.data
        }))*/
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
                item:validation
              });
           }
        })
        //console.log(this.state.item)
  }

  onSubmit(e){
    e.preventDefault();
    const {selectedType, particular} = this.state
    const category = {
      name: selectedType,
      particular: particular
    }
    //console.log(category);

    /*axios.put('/api/item/update'+this.props.match.params.id, category)
    .then(res => console.log(res.data))*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/item/update/`+this.props.match.params.id,{
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
    render(){
      const {id, purpose, quantity_available } = this.state.item;
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
                        value={purpose||''}
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
                        name="quantity_available" 
                        value={quantity_available||''}
                        onChange={this.onChange}
                        placeholder="Quantity of Family Food Packs"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

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