import React, {Component} from 'react';
import { Button, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
//import axios from '../../../../axios';
class AddCategory extends Component{
  constructor(props) {
    super(props);

    this.state = {
      type:[],
      name: '',
      particular:'',
      unit:'',
      alert_message:'',
    };

  }
  componentDidMount() {
    /*axios.get('/api/category')
        .then(res => this.setState({ 
            type: res.data, 
    }));*/
  }
  onReset = (e) =>{
    e.preventDefault();
    //axios.get('/api/category')
    //    .then(res => this.setState({ 
     //       type: res.data, 
    //}));
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
    })
  }
  onChange = e => {this.setState({
      [e.target.name]: e.target.value 
    })
     console.log(this.state);
  }
  onSend = (e) => {
    e.preventDefault();
    const {name, particular, unit} = this.state
    const item = {
      name: name,
      category_id: particular,
      unit: unit
    }
    //console.log(item);

    /*axios.post('/api/item', item)
    .then(res => {
      this.setState({alert_message:"success"})
      this.liveRedirectTime = setTimeout(()=>{ 
        //this.setState({alert_message:''})
        this.props.history.push(`/rawmaterials/`)
      }, 2000);
    }).catch(error=>{
      this.setState({alert_message:"error"})
    });*/
    fetch(`${process.env.REACT_APP_API_PROXY}/api/item`,{
      mode:'cors',
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}` 
      },
         body: JSON.stringify(item)
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
      const { name, particular, unit} = this.state;
      return(
        <div>        
          <p style={{textAlign:'center', marginLeft:'10px', fontWeight:'bold', color: '#6c757d'}}>ADDITIONAL INFORMATION</p>
            <Form style={{marginRight:'15px',paddingLeft:'.75em'}}>                                                                  
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDivision">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={name} placeholder="Enter Item Name" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridOffice">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control type="text" name="unit" value={unit} placeholder="Enter Item Unit" onChange={this.onChange}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridApproved">
                            <Form.Label>Particular</Form.Label><br/>
                            <Form.Control as="select" name="particular" value={particular}
                                    onChange={this.onChange}
                                    onClick={this.onReset}>
                                {this.state.type.map((team) => <option key={team.id} value={team.id}>{team.particular}</option>)}
                            </Form.Control>
                              
                        </Form.Group>
                    </Form.Row>
              
            </Form>
            {this.state.alert_message=="success"?<SuccessAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}
            <Button variant='primary' onClick={this.onSend} id='update'>Submit</Button> 
        </div>
       
      );
    }
  }

export default AddCategory;