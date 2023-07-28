import React, {Component} from 'react';
import {Table, Form, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import ListItemsPurchase from './ListItemsPurchase';
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
//import axios from '../../../../axios';
class ListItemPurchase extends Component{
  constructor(props) {
    super(props);
    this.state = {
      item:[],
      editFields:'',
      result:[],
      name:'',
    };
  }
  
  componentDidMount() {
    //axios.get('/api/itempurchase')
    //    .then(res => this.setState({ item: res.data }))
    fetch(`${process.env.REACT_APP_API_PROXY}/api/itempurchase`,{
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
            item: validation 
          });
       }
    })
  }
  handleOnApproved = (e) =>{
        
    this.setState({
        name: e,
        result:this.state.item.filter(it => it.name.includes(e))
        //approved_id: this.state.signatories.filter(it => it.name.includes(e))
    })
  
  }

    render(){
      const { editFields, name } = this.state; 
      return(
        <div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDivision">
                  <ReactDropdownAutoComplete
                    getItemValue={item => item.name}
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Input Name"
                    data={this.state.item}
                    renderItem={item => (
                      <div
                        role="button"
                        tabIndex="-1"
                        onClick={(val) => { editFields.name = val; }}
                      >{item.name}</div>
                    )}
                    icon="search"
                    iconColor="#ff000"
                    iconClick={() => { /*TODO  */}}
                    value={name}
                    onChange={this.handleOnApproved}
                    onEnter={() => { /*TODO  */}}
                  />
                  
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <ListItemsPurchase  item = {this.state.result}/>
            </Form.Row>
          </Form>
        </div>
        
      );
    }
  }

export default ListItemPurchase;