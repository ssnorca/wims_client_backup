import React, {Component} from 'react';
import { Container, Button, Link } from 'react-floating-action-button';
import Modal from 'react-responsive-modal';
import { Form, Col } from 'react-bootstrap';
import { DateComponent } from '../DateComponent';
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
import  {Data} from '../Data';
//import axios from '../../../../axios';
const initialState = {
  open: false,
  username:'',
  purpose: '',
  purpose_type:'',
  purpose_typeErr:'',
  purposeErr:'',
  destination: '',
  destinationErr: '',
  quantity_requested: '',
  quantity_requestedErr: '',
  date_request:'',
  alert_message:'',
  province:'',
  warehouse:'',
  cities:[],
  warehousename:[],
  city:'',
  dataJSON:[],
  init:0,
  ratio:[],
  ratio_id:'',
  ratioErr: '',
}
export default class AddRequest extends Component{
    constructor (props){
      super(props);
      this.state = initialState
    }

    async componentDidMount() {
        var username = localStorage.getItem('react-username');
        this.setState({ dataJSON: Data, init: 1, username:username });

        /*axios.get('/api/production/ratio')
        .then(res => this.setState({ 
          ratio: res.data, 
        }));*/

       await fetch(`${process.env.REACT_APP_API_PROXY}/api/production/ratio`,{
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
                ratio: validation, 
              });
           }
        })

      };

      componentWillUpdate(nextProps, nextState) {
        if (this.state.province !== nextState.province) {

          /*axios.get('/api/requestfood/warehouse/'+nextState.province)
          .then(res => this.setState({ 
            warehousename: res.data
          }));*/
          fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood/warehouse/`+nextState.province,{
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
                  warehousename: validation 
                });
             }
          })
          //console.log(this.state);
        }
      }

      validate = () => {
        let purposeErr = '';
        let destinationErr = '';
        let quantity_requestedErr = '';
        let purpose_typeErr = '';
        let ratioErr = '';
        if (!this.state.purpose) {
          purposeErr = "Description cannot be Empty";
          //return false;
        }
        if (!this.state.destination) {
          destinationErr = "Destination cannot be Empty";
          //return false;
        }
        if (!this.state.quantity_requested) {
          quantity_requestedErr = "Quantity cannot be Empty";
          //return false;
        }
        if (!this.state.purpose_type) {
          purpose_typeErr = "Purpose cannot be Empty";
          //return false;
        }
        if (!this.state.ratio_id) {
          ratioErr = "Ratio cannot be Empty";
          //return false;
        }
        if (purposeErr || destinationErr || quantity_requestedErr || purpose_typeErr) {
          this.setState({ 
            purposeErr:purposeErr,
            destinationErr:destinationErr,
            quantity_requestedErr:quantity_requestedErr,
            purpose_typeErr:purpose_typeErr,
            ratioErr:ratioErr,
           });
          return false;
        }

        return true;
     };

      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

      onChange = e => {this.setState({
        [e.target.name]: e.target.value 
        })
        //console.log(this.state);
      };

      prov_onChange = e => {
        //var opt=document.createElement("option");
        this.setState({
          province: e.target.value 
        })
        var val=e.target.value;
        this.getcity(val);
      };
      city_onChange = e => {
        var capsText = this.state.province +', ' + e.target.value
        this.setState({
          city: e.target.value,
          destination:capsText
        })
          var capsText = '';
      };

      getcity = (e) =>{
        //console.log(e);
        var result = [];
        var unique = [["none","Select Municipality/City..."]];
        for (var item, i = 0; item = Data[i++];) {
            var id = i;
            var province = item.Province;
            var city = item.CityorMunicipality;

          if (province===e) {		
          result.push({id,city})	
          }
        }	

        this.setState({cities:result});
      }

      onSetDate = (e)=>{
        this.setState({ date_request: e });
        //console.log(e);
      }
      onSubmit = (e) =>{
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
          this.props.onAdd();
          const {purpose, quantity_requested, destination, date_request, username, purpose_type, ratio_id} = this.state
          const ffprequest ={
            emp_id:username,
            purpose: purpose,
            quantity_requested: quantity_requested,
            destination: destination,
            date_request: date_request,
            pending:true,
            purpose_type:purpose_type,
            ratio_id: ratio_id,
          }
          /*axios.post('/api/requestfood', ffprequest)
        .then(res => {
          this.setState({alert_message:"success"})
          this.setState({ open: false })
          }).catch(error=>{
          this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/requestfood`,{
        mode:'cors',
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem('token')}` 
        },
          body: JSON.stringify(ffprequest)
        }).then(async response => {
          if (!response.ok) {
          const validation = await response.json();
          console.log(validation.errors);
          this.setState({alert_message:"error"})
        }else{
          //history('/categories')
          //const validation = await response.json();
          this.setState({alert_message:"success"});
          this.setState({ open: false })
          //console.log(validation)
        }
      })
          this.setState(initialState);
          //console.log(ffprequest);
        }
        
      }
      
    render(){
        const { open, purpose, purpose_type, quantity_requested, destination, province, city, ratio_id } = this.state;
        /*this.state.dataJSON.map((item)=>{
          console.log(item.region);
        });*/
    return (
      <React.Fragment>
          <Container>
                      <Button
                          tooltip="New Request"
                          icon="fas fa-plus"
                          rotate={true}
                          onClick={this.onOpenModal} ></Button>
                  </Container>
                  
                  <Modal open={open} onClose={this.onCloseModal} center>
                      <h2>Requisition of Family Food Packs</h2>
                      <DateComponent onSetDate={this.onSetDate}/>
                      <br/>
                      <Form onSubmit={this.onSubmit}>
                          <Form.Row>
                              <Form.Group as={Col} md="3" controlId="validationCustom01">
                                <Form.Label>Purpose</Form.Label>
                                    <select 
                                              name="purpose_type" 
                                              class="form-control"
                                              value={purpose_type}
                                              onChange={this.onChange}
                                            >
                                              <option value="">Select</option>
                                              <option value="Augmentation">Augmentation</option>
                                              <option value="Preposition">Preposition</option>
                                              <option value="Replenishment">Replenishment</option>
                                              <option value="Food For Work">Food For Work</option>
                                    </select>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                      {this.state.purpose_typeErr}
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} md="9" controlId="validationCustom01">
                                <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="purpose" 
                                        value={purpose}
                                        onChange={this.onChange}
                                        placeholder="ex. For the replenishment of prepositioned goods in ..."
                                    />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                      {this.state.purposeErr}
                                    </div>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                              </Form.Group>

                                      <Form.Group as={Col}  md="3"controlId="formGridReceived">
                                          <Form.Label>Province</Form.Label><br/>
                                          <select 
                                            id="province" 
                                            class="form-control"
                                            value={province}
                                            onChange={this.prov_onChange}
                                          >
                                            <option value="none">Select Province</option>
                                            <option value="Agusan del Norte">Agusan del Norte</option>
                                            <option value="Agusan del Sur">Agusan del Sur</option>
                                            <option value="Surigao del Norte">Surigao del Norte</option>
                                            <option value="Surigao del Sur">Surigao del Sur</option>
                                            <option value="Province of Dinagat Island">Province of Dinagat Island</option>
                                          </select>
                                      </Form.Group>
                                      <Form.Group as={Col} md="3" controlId="formGridReceived">
                                          <Form.Label>City/Municipality</Form.Label><br/>
                                          <select 
                                          name="city" 
                                          class="form-control"
                                          value={city}
                                          onChange={this.city_onChange}
                                          >
                                              {this.state.cities.map((team) => <option key={team.id} value={team.city}>{team.city}</option>)}
                                          </select>
                                      </Form.Group>

                              <Form.Group as={Col} controlId="validationCustom02">
                              <Form.Label>Destination</Form.Label>
                              <Form.Control
                                  required
                                  type="text"
                                  name="destination" 
                                  value={destination}
                                  onChange={this.onChange}
                                  placeholder="ex. Cantilan, Surigao del Sur"
                              />
                              <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.destinationErr}
                              </div>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                              <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="quantity_requested" 
                                    value={quantity_requested}
                                    onChange={this.onChange}
                                    placeholder="Quantity of Family Food Packs"
                                />
                              <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.quantity_requestedErr}
                              </div>
                              </Form.Group>
                              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Ratio</Form.Label>
                                <br/>
                                      <select 
                                      class="form-control"
                                      name="ratio_id" 
                                      value={ratio_id}
                                      onChange={this.onChange}>
                                          {this.state.ratio.map((team) => <option key={team.ratio_id} value={team.ratio_id}>{team.description}</option>)}
                                      </select>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                      {this.state.ratioErr}
                                    </div>
                                </Form.Group>
                                {/**
                                 <Form.Group style={{display:'none'}} as={Col} md="4" controlId="validationCustomUsername">
                                    <Form.Label>Warehouse</Form.Label>
                                    <br/>
                                        <select name="warehouse" value={warehouse}
                                                onChange={this.onChange}>
                                            {this.state.warehousename.map((team) => <option key={team.id} value={team.name}>{team.name}</option>)}
                                        </select>
                                </Form.Group>
                                 */}
                              
                          </Form.Row>
                          {this.state.alert_message=="success"?<SuccessAlert/>:null}
                          {this.state.alert_message=="error"?<ErrorAlert/>:null}     
                          <Button onClick={this.onSubmit} type="submit">Submit</Button>
                      </Form>
                  </Modal>
          </React.Fragment>
        );
    }
    
}

