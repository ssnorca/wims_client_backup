import React, {Component} from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
//import axios from '../../../../axios';
class AddProduction extends Component{
  constructor(props) { 
    super(props);

    this.state = {
      ratio:[],
      ratio_id:'',
      purpose: '',
      quantity_available: '',
      unit: 'packs',
      type_:'production',
      alert_message:'',
      purposeErr: '',
      quanErr: '',
      unitErr: '',
      ratioErr: '',
    };

  }
  componentDidMount() {
    //axios.get('/api/production/ratio')
    //    .then(res => this.setState({ 
    //      ratio: res.data, 
    //}));
    fetch(`${process.env.REACT_APP_API_PROXY}/api/production/ratio`,{
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
            ratio: validation 
          });
       }
    })
  }
  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
    })
    console.log(this.state);
  };
  onSubmit= (e) =>{
    e.preventDefault();

    const isValid = this.validate();
    if (isValid) {   
      
      const {purpose, quantity_available, unit, type_, ratio_id} = this.state
      const ffpproduction ={
        purpose: purpose,
        quantity_available: quantity_available,
        unit: unit,
        type_: type_,
        ratio_id: ratio_id,
        warehouse:'Agusan del Norte'
      }
      //console.log(ffpproduction);
      /*axios.post('/api/production', ffpproduction)
      .then(res => {
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/foodpacks/`)
        }, 2000);
      }).catch(error=>{
        this.setState({alert_message:"error"})
      });*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/production`,{
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

    
  }

  validate =()=>{
    let ratioErr = '';
   /* let purposeErr = '';
    let quanErr = '';
    let unitErr = '';

    if (!this.state.purpose) {
      purposeErr = "Purpose cannot be Empty";
      //return false;
    }
    if (!this.state.quantity_available) {
      quanErr = "Remarks cannot be Empty";
      //return false;
    }
    if (!this.state.unit) {
      unitErr = "Unit cannot be Empty";
      //return false;
    }*/
    if (!this.state.ratio_id) {
      ratioErr = "Ratio cannot be Empty";
      //return false;
    }
    if (ratioErr ) {
      this.setState({ 
        ratioErr:ratioErr,
       });
      return false;
    }
    return true
  }
    render(){
      const { purpose, quantity_available, unit, type_, ratio_id } = this.state;
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
                                                                <br/>
                  <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.purposeErr}
                    </div> 
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="quantity_available" 
                        value={quantity_available}
                        onChange={this.onChange}
                        placeholder="Quantity of Family Food Packs"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Unit</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="unit" 
                        defaultValue="Packs"
                    />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Ratio</Form.Label>
                    <br/>
                          <select name="ratio_id" value={ratio_id}
                                  onChange={this.onChange}>
                              {this.state.ratio.map((team) => <option key={team.ratio_id} value={team.ratio_id}>{team.description}</option>)}
                          </select>
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.ratioErr}
                        </div> 
                    </Form.Group>
                </Form.Row>
                <Button type="submit" onClick={this.onClick}>Submit</Button>
            </Form>
        </div>
       
      );
    }
  }

export default AddProduction;