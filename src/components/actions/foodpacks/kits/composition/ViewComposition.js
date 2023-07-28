import React, {Component} from 'react';
import {Button, InputGroup, Row , FormControl, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import ErrorAlert from '../../../ErrorAlert';
import DeleteAlert from '../../../DeleteAlert';
import { confirmAlert } from 'react-confirm-alert'; 
//import axios from '../../../../../axios';
class ViewComposition extends Component{

  constructor(props) {
    super(props);

    this.state = {
      production:[],
      item:[],
      alert_message:'',
      kit_name:'',
      kit_id:'',
    };

  }
  componentDidMount() {

    /*axios.get('/api/kit/view/'+this.props.match.params.id)
        .then(res => this.setState({ 
          production: res.data,
          myId: this.props.match.params.id,
        }));  */
        this.setState({ 
          kit_name: this.props.location.state.kit,
          kit_id: this.props.match.params.id,
        })

  }
  handleOnDelete = e =>{
    confirmAlert({

      title: this.props.location.state.kit,
      message: 'Delete Selected Item',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
          /*axios.delete('/api/kit/delete/'+this.props.match.params.id)
            .then(res => {
              this.setState({alert_message:"success"})
              this.liveRedirectTime = setTimeout(()=>{ 
                //this.setState({alert_message:''})
                this.props.history.push(`/foodpacks/`)
              }, 2000);
            }).catch(error=>{
              this.setState({alert_message:"error"})
            })*/
            fetch(`${process.env.REACT_APP_API_PROXY}/api/kit/delete/`+this.props.match.params.id, {
              mode:'cors',
              // Adding method type
              method: "DELETE",   
              // Adding headers to the request
              headers: {
                "Content-Type" : "application/json",
                "accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}` 
              }   
            }).then(
              response => response.json()
            ).then(
              data => {
                this.setState({alert_message:''})
                this.liveRedirectTime = setTimeout(()=>{ 
                this.props.history.push(`/foodpacks/`)
                }, 2000);
              }
            ).catch(error=>{
                this.setState({alert_message:"error"})
            })
      

        }
      ]
    });
  }

  onSend = e =>{
    console.log("clicked");
  }
  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
    })
    //console.log(this.state);
  };
    render(){
      return(
         
          <div>  
            {this.state.alert_message=="success"?<DeleteAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}            
            <Row>
            
            <Col sm={5}>
            
              <Row>
              <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Kit ID</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type="number"
                    name="kit_id" 
                    disabled='true'
                    value={this.state.kit_id}
                    onChange={this.onChange}
                    placeholder="Kit ID"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Kit Item</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type="text"
                    name="kit_name" 
                    disabled='true'
                    value={this.state.kit_name}
                    onChange={this.onChange}
                    placeholder="Kit Item"
                  />
                  </InputGroup>

                <Button variant='danger' onClick={this.handleOnDelete}>
                  Delete
                </Button>
                <Button variant='primary' onClick={this.handleBack}>
                  Cancel
                </Button>
              </Row>
            </Col>
            </Row>
            
        </div>
      );
    }
  }

export default ViewComposition;