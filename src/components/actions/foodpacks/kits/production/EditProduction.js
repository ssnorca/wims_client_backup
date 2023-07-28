import React, {Component} from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
//import axios from '../../../../../axios';
class EditProduction extends Component{
  constructor(props) {
    super(props);

    this.state = {
      alert_message:'',
      item:[],
      purpose:'',
      quantity_requested:'',
      kit:''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  /*  axios.get('/api/kit/edit/'+this.props.match.params.id)
        .then(res => this.setState({ 
          purpose:res.data.purpose,
          quantity_requested:res.data.quantity_requested,
          kit:res.data.kit
        }))
*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/edit/`+this.props.match.params.id,{
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
              purpose:validation.purpose,
              quantity_requested:validation.quantity_requested,
              kit:validation.kit
            });
        }
      })

  }
   onChange = e => {this.setState({
    [e.target.name]: e.target.value 
  })};
  onSubmit(e){
    e.preventDefault();
    const {purpose, quantity_requested,kit} = this.state
   const category = {
      kit:kit,
      purpose: purpose,
      quantity_requested: quantity_requested
    }
    /* console.log(category);

    axios.put('/api/kit/update/'+this.props.match.params.id, category)
    .then(res => {
      this.setState({alert_message:"success"})
      this.liveRedirectTime = setTimeout(()=>{ 
        //this.setState({alert_message:''})
        this.props.history.push(`/foodpacks/`)
      }, 2000);
    }).catch(error=>{
      this.setState({alert_message:"error"})
    })*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/update/`+this.props.match.params.id,{
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
        //console.log(validation)
       }
    })

  }
    render(){
      const {id, purpose, quantity_requested,kit} = this.state;
      return(
        <div>        
          {this.state.alert_message=="success"?<SuccessAlert/>:null}
          {this.state.alert_message=="error"?<ErrorAlert/>:null}
          <hr/>
          <Form onSubmit={this.onSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Purposes</Form.Label>
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
                    <Form.Group as={Col}  md="6"controlId="formGridReceived">
                        <Form.Label>Kit</Form.Label><br/>
                        <select 
                          name="kit" 
                          class="form-control"
                          value={kit}
                          onChange={this.onChange}
                        >
                          <option value="none">Select Status</option>
                          <option value="Sleeping Kit">Sleeping Kit</option>
                          <option value="Family Kit">Family Kit</option>
                          <option value="Kitchen Kit">Kitchen Kit</option>
                          <option value="Shelter Kit">Shelter Kit</option>
                          <option value="Hygiene Kit">Hygiene Kit</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="quantity_requested" 
                        value={quantity_requested||''}
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