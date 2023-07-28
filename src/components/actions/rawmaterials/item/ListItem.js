import React, {Component} from 'react';
import {Table, Form, Col} from 'react-bootstrap';
import axios from 'axios';
import ListItems from './ListItems';
import ReactDropdownAutoComplete from 'react-dropdown-autocomplete';
//import axios from '../../../../axios';
class ListItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      item:[],
      name:'',
      type:[],
      particular:'',
      editFields:'',
      result:[],
    };
  }
  
  componentDidMount() {
    //axios.get('/api/item')
    //    .then(res => this.setState({ item: res.data }))
    fetch(`${process.env.REACT_APP_API_PROXY}/api/item`,{
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
    });
     //   axios.get('/api/category').then(res => this.setState({ 
     //       type: res.data, 
     //     }));
     fetch(`${process.env.REACT_APP_API_PROXY}/api/category`,{
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
            type: validation 
          });
       }
    });
  }

  handleOnApproved = (e) =>{
        
    //const res = this.state.signatories.filter(it => it.name.includes(e));
    //const [{name, id}] = this.state.signatories.filter(it => it.name.includes(e));
    //console.log(this.state.signatories.filter(it => it.name.includes(e)));
    //console.log(e);
    this.setState({
        name: e,
        result:this.state.item.filter(it => it.name.includes(e))
        //approved_id: this.state.signatories.filter(it => it.name.includes(e))
    })
  
  }
  onChange = e => {this.setState({
    [e.target.name]: e.target.value,
    result:this.state.item.filter(it => it.particular.includes(e.target.value))
  })
}
    render(){
      const { editFields, name, particular } = this.state; 
      return(
        <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDivision">
                <Form.Label>Item Name</Form.Label><br/>
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
                      //icon="search"
                      iconColor="#ff000"
                      iconClick={() => { /*TODO  */}}
                      value={name}
                      onChange={this.handleOnApproved}
                      onEnter={() => { /*TODO  */}}
                    />               
                </Form.Group>
                <Form.Group as={Col} controlId="formGridApproved">
                            <Form.Label>Particular</Form.Label><br/>
                            <Form.Control as="select" name="particular" value={particular}
                                    onChange={this.onChange}>
                                {this.state.type.map((team) => <option key={team.id} value={team.particular}>{team.particular}</option>)}
                            </Form.Control>
                              
                </Form.Group>

              </Form.Row>
              <Form.Row>
                <ListItems  item = {this.state.result}/>
              </Form.Row>
            </Form>

          
        </div>
        
      );
    }
  }

export default ListItem;