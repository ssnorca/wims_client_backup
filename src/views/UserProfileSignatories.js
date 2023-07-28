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
import UserListSign from "../components/user-profile-lite/UserListSign";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import ErrorAlert from '../components/actions/ErrorAlert';
import SuccessAlert from '../components/actions/SuccessAlert';
import DeleteAlert from '../components/actions/DeleteAlert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import axios from 'axios';
import Cookies from 'js-cookie';

//const accessToken = Cookies.get('XSRF-TOKEN')
//const axios = axios.create({
  //baseURL:'http://localhost:8000',
  //  headers:{
   //   Authorization: `Bearer ${accessToken}`
   // }
  //})
class UserSignatories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: [],
      id:'',
      name:'',
      designation:'',
      init:0,
      alert_message:'',
      area:'',
    };

  }
  async componentDidMount(){
    var accessToken = localStorage.getItem('token');
    /*await axios.get('/api/signatories')
    .then(res => this.setState({ 
        employee: res.data,
        init:1,
    }));*/
   await fetch(`${process.env.REACT_APP_API_PROXY}/api/signatories`,{
      mode:'cors',
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${accessToken}`
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
            employee: validation,
            init:1,
          });
       }
    })
  }

 
  handleOnView = (id, name, designation) =>{
    this.setState({ 
        id:id,
        name:name,
        designation:designation

    })
  }

  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
    })
    //console.log(this.state);
  };

  onUpdate = (e) =>{
    //e.preventDefault();
    // this.props.onAdd();
    // window.confirm('Are you sure you wish to delete this item?');
    var accessToken = localStorage.getItem('token');
    const {id, name, designation} = this.state
    const ffprequest = {
        id:id,
        name: name,
        designation: designation,
    }
    //console.log(ffprequest)
    /*axios.put('/api/signatoriesupdate/'+id, ffprequest)
    .then(res => {
        this.setState({alert_message:"success"})
        this.liveRedirectTime = setTimeout(()=>{ 
          this.setState({alert_message:''})
          window.location.replace('/whims/user-profile-lite');
        }, 2000);
      }).catch(error=>{
        this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/signatoriesupdate/`+id,{
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
        this.liveRedirectTime = setTimeout(()=>{ 
          this.setState({alert_message:''})
          window.location.replace('/whims/user-profile-lite');
        }, 2000);
       }
    })

   
  }
  handleOnDelete = (ris_id, designation) =>{
    //window.confirm('Selected ' + name);
    if(designation===''||designation===null){
      confirmAlert({
        title: 'Unable to Delete',
        message: 'Please choose another Signatories',
        buttons: [
          {
            label: 'Yes',
          }]
      });
    }else{
      console.log(designation)
      const ffprequest = {
          id:ris_id, 
        }
      confirmAlert({
  
        title: 'Confirm Delete',
        message: 'You are about to delete a Signatories, Continue?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {         
              axios.delete('/api/signatoriesdelete/'+ris_id, ffprequest)
              .then(res => {
                  this.setState({alert_message:"delete"})
                  this.liveRedirectTime = setTimeout(()=>{ 
                  window.location.replace('/whims/user-profile-lite');
                  }, 2000);
              }).catch(error=>{
                  this.setState({alert_message:"error"})
              });             
            }
  
          }
        ]
      });
    }
    

  }

  render() {
    const { id, designation } = this.state;
    return (
      <Row>
        <Col lg="5">
      <UserListSign employee={this.state.employee} handleOnView={this.handleOnView}/>
    </Col>
    <Col lg="7">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">User Signatories</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row form>
            
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">User Name</label>
                        <FormInput
                          name="name"
                          placeholder="User Name"
                          value={this.state.name}
                          onChange={this.onChange}
                        />
                      </Col>
                     
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">Designation</label>
                        <FormInput
                        name="designation"
                        placeholder="designation"
                        value={this.state.designation}
                        onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                   
                    {this.state.alert_message=="success"?<SuccessAlert/>:null}
                    {this.state.alert_message=="error"?<ErrorAlert/>:null} 
                    {this.state.alert_message=="delete"?<DeleteAlert/>:null} 
                    <Button theme="accent" onClick={this.onUpdate}>Update Account</Button>
                    <Button style={{float:"right"}} theme='danger' onClick={this.handleOnDelete.bind(this,id, designation)}>Delete</Button>
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

export default UserSignatories;
