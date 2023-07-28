import React, {Component} from 'react';
import { Container, Button, Link } from 'react-floating-action-button';
import Modal from 'react-responsive-modal';
import { DateComponent } from '../../DateComponent';
import { Form, Col } from 'react-bootstrap';
import ErrorAlert from '../../../ErrorAlert';
import SuccessAlert from '../../../SuccessAlert';
import axios from 'axios';
import  {Data} from '../../Data';
//import axios from '../../../../../axios';
const initialState = {
  open: false,
  purpose: '',
  purposeErr:'',
  destination: '',
  destinationErr: '',
  date_request:'',
  alert_message:'',
  province:'',
  cities:[],
  city:'',
  emp_id:'',
  dataJSON:[],
}
export default class AddRequest extends Component{
   
    constructor (props){
        super(props);
        this.state = initialState
      } 
    componentDidMount() {
      var username = localStorage.getItem('react-username');
      this.setState({ dataJSON: Data, emp_id:username });     
    }

    validate = () => {
        let purposeErr = '';
        let destinationErr = '';
        if (!this.state.purpose) {
          purposeErr = "Purpose cannot be Empty";
          //return false;
        }
        if (!this.state.destination) {
          destinationErr = "Destination cannot be Empty";
          //return false;
        }
        if (purposeErr || destinationErr) {
          this.setState({ 
            purposeErr:purposeErr,
            destinationErr:destinationErr
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

      onSetDate = (e)=>{
        this.setState({ date_request: e });
        //console.log(e);
      }
      onChange = e => {this.setState({
        [e.target.name]: e.target.value 
        })
        console.log(this.state);
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
        console.log(e);
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

      onSubmit_ = (e) =>{
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
          this.props.onAdd();
          const {purpose, destination, date_request, emp_id} = this.state
          const ffprequest ={
          emp_id:emp_id,
          purpose: purpose,
          destination: destination,
          date_request: date_request,
          pending:true

        }
        
        /*axios.post('/api/nonfood', ffprequest)
        .then(res => {
          this.setState({alert_message:"success"})
          this.setState({ open: false })
          }).catch(error=>{
          this.setState({alert_message:"error"})
        });*/
        fetch(`${process.env.REACT_APP_API_PROXY}/api/nonfood`,{
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
            this.setState({ open: false });
            //console.log(validation)
          }
        })

        }
       
      }
      
    render(){
        const { open, purpose, destination, province, city } = this.state;
        
    return(
        <React.Fragment>
        <Container>
            <Button
                tooltip="New Request"
                icon="fas fa-plus"
                rotate={true}
                onClick={this.onOpenModal} ></Button>
        </Container>
        
        <Modal open={open} onClose={this.onCloseModal} center>
            <h2>Requisition of Non Food Items</h2>
            <DateComponent onSetDate={this.onSetDate}/>
            <br/>
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
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
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
                    </Form.Group>
                </Form.Row>
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}     
                <Button onClick={this.onSubmit_} >Submit</Button>
            </Form>
        </Modal>
        </React.Fragment>
        );
    }

    
}

