import React from "react";
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserList from "../components/user-profile-lite/UserList";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import ErrorAlert from '../components/actions/ErrorAlert';
import SuccessAlert from '../components/actions/SuccessAlert';
import axios from 'axios';
//import axios from '../axios';
class UserProfileInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: [],
      id:'',
      username:'',
      firstname:'',
      lastname:'',
      division:'',
      section:'',
      designation:'',
      valid:'',
      email:'',
      contact:'',
      init:0,
      alert_message:'',
      area:'',
    };

  }
  async componentDidMount(){
    /*await axios.get('/api/employee/')
    .then(res => this.setState({ 
        employee: res.data,
        init:1,
    }));*/
   var accessToken = localStorage.getItem('token');
   //console.log(accessToken);
   await fetch(`${process.env.REACT_APP_API_PROXY}/api/employee`,{
      mode:'cors',
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${accessToken}`
      },

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
            employee: validation,
            init:1,
          });
       }
    })
  }

 
  handleOnView = (id, username, firstname, lastname, email, division, section, designation, valid, contact, area) =>{
    this.setState({ 
        id:id,
        username:username,
        firstname:firstname,
        lastname:lastname,
        email:email,
        division:division,
        section:section,
        designation:designation,
        valid:valid,
        contact:contact,
        area:area,

    })
  }

  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
    })
    //console.log(this.state);
  };

  onUpdate = (e) =>{
    var accessToken = localStorage.getItem('token');
    //e.preventDefault();
    // this.props.onAdd();
    // window.confirm('Are you sure you wish to delete this item?');
    const {username, firstname, lastname, email, division, section, contact, designation, valid, area} = this.state
    const ffprequest = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email:email,
        division:division,
        section:section,
        contact:contact,
        designation:designation,
        valid:valid,
        area:area,
    }
    //console.log(ffprequest)
    /*axios.put('/api/employee/updates/'+username, ffprequest)
    .then(res => {
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          this.setState({alert_message:''})
          window.location.replace('https://caraga-whims-staging.dswd.gov.ph/whims/');
        }, 2000);
      }).catch(error=>{
        this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/employee/updates/`+username,{
      mode:'cors',
      method: 'PUT',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${accessToken}`
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
        this.setState({alert_message:"success"})
        //console.log(validation)
       }
    })

   
  }

  render() {
    return (
      <Row>
        <Col lg="5">
      <UserList employee={this.state.employee} handleOnView={this.handleOnView}/>
    </Col>
    <Col lg="7">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">User Account Details</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row form>
            
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">First Name</label>
                        <FormInput
                          name="firstname"
                          placeholder="First Name"
                          value={this.state.firstname}
                          onChange={this.onChange}
                        />
                      </Col>
                     
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">Last Name</label>
                        <FormInput
                        name="lastname"
                        placeholder="Last Name"
                        value={this.state.lastname}
                        onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                     
                      <Col md="4" className="form-group">
                        <label htmlFor="feEmail">Email</label>
                        <FormInput
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          value={this.state.email}
                          onChange={this.onChange}
                          autoComplete="email"
                        />
                      </Col>
                 
                      <Col md="4" className="form-group">
                        <label htmlFor="fePassword">Contact</label>
                        <FormInput
                          name="contact"
                          placeholder="Contact"
                          value={this.state.contact}
                          onChange={this.onChange}
                        />
                      </Col>
                   
                      <Col md="4" className="form-group">
                        <label htmlFor="fePassword">Division</label>
                        <FormInput
                          name="division"
                          placeholder="Division"
                          value={this.state.division}
                          onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                    
                      <Col md="6" className="form-group">
                        <label htmlFor="feCity">Section</label>
                        <FormInput
                          name="section"
                          placeholder="Section"
                          value={this.state.section}
                          onChange={this.onChange}
                        />
                      </Col>
                   
                      <Col md="3" className="form-group">
                        <label htmlFor="feZipCode">Designation</label>
                        <FormInput
                          name="designation"
                          placeholder="Designation"
                          value={this.state.designation}
                          onChange={this.onChange}
                        />
                      </Col>
                      <Col md="3" className="form-group">
                        <label htmlFor="feArea">Area</label>
                        <FormSelect 
                            name="area" 
                            className="form-control"
                            value={this.state.area||''}
                            onChange={this.onChange}>
                                <option value="null">-</option>
                                <option value="Agusan del Norte">FO-Caraga</option>
                                <option value="Agusan del Sur">Agusan del Sur</option>
                                <option value="Surigao del Norte">Surigao del Norte</option>
                                <option value="Surigao del Sur">Surigao del Sur</option>
                                <option value="Province of Dinagat Island">Province of Dinagat Island</option>
                          </FormSelect>
                      </Col>
                    </Row>                        
                    <Row form>
                      <Col md="3" className="form-group">
                          <label htmlFor="feZipCode">Valid</label>
                          <FormSelect 
                            name="valid" 
                            className="form-control"
                            value={this.state.valid||''}
                            onChange={this.onChange}>
                                <option value="null">-</option>
                                <option value="0">Deny</option>
                                <option value="1">Confirm</option>
                          </FormSelect>
                      </Col>
                    </Row>
                    {this.state.alert_message=="success"?<SuccessAlert/>:null}
                    {this.state.alert_message=="error"?<ErrorAlert/>:null} 
                    <Button theme="accent" onClick={this.onUpdate}>Update Account</Button>
                  </Form>
                </Col>
  
    
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
    </Col>
      </Row>
    );
  }
}

export default UserProfileInfo;
