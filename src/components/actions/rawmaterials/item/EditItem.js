import React, {Component} from 'react';
import { Button, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
//import axios from '../../../../axios';
class EditItem extends Component{
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      unit:'',
      particular:'',
      type:[],
      alert_message:'',
    };

    /*this.changeName = this.changeName.bind(this);
    this.changeUnit = this.changeUnit.bind(this);*/
    this.onSubmit = this.onSubmit.bind(this);
  }
  /*changeName(type) {
    this.setState({
      name: type
    });
  }
  changeUnit(e){
    this.setState({
      unit: e.target.value
    });
  }*/
  onChange = e => {this.setState({
    [e.target.name]: e.target.value 
  })
 
}

  componentDidMount() {
    //const {name, unit} = this.props.location.particular;
    //console.log(this.props.location.particular);
    /*axios.get('/api/item/edit/'+this.props.match.params.id)
        .then(res => this.setState({ 
          name: res.data.name,
          unit: res.data.unit,
          particular: res.data.category_id
      }))*/
      fetch(`${process.env.REACT_APP_API_PROXY}/api/item/edit/`+this.props.match.params.id,{
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
              name: validation.name,
              unit: validation.unit,
              particular: validation.category_id
            });
         }
      });

      /*axios.get('/api/category')
        .then(res => this.setState({ 
            type: res.data.filter(ffp=>{
              return ffp.particular===this.props.location.particular;
            }), 
    }));*/
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
            type: validation.filter(ffp=>{
              return ffp.particular===this.props.location.particular;
            })
          });
       }
    });
  }

  onSubmit(e){
    e.preventDefault();
       
    const {name, unit, particular} = this.state
    const item = {
      name: name,
      unit: unit,
      category_id: particular
    }

    //console.log(item);

    /*axios.put('/api/item/update/'+this.props.match.params.id, item)
    .then(res => {
      this.setState({alert_message:"success"})
      this.liveRedirectTime = setTimeout(()=>{ 
        //this.setState({alert_message:''})
        this.props.history.push(`/rawmaterials/`)
      }, 2000);
    }).catch(error=>{
      this.setState({alert_message:"error"})
    });*/

    fetch(`${process.env.REACT_APP_API_PROXY}/api/item/update/`+this.props.match.params.id,{
      mode:'cors',
      method: 'PUT',
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
        this.liveRedirectTime = setTimeout(()=>{ 
          //this.setState({alert_message:''})
          this.props.history.push(`/rawmaterials/`)
        }, 2000);
       }
    })
  }
  onReset = (e) =>{
    e.preventDefault();
    /*axios.get('/api/category')
        .then(res => this.setState({ 
            type: res.data, 
    }));*/
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
    render(){
      const { name, particular, unit} = this.state;
      return(
        <div>        
          <p style={{textAlign:'center', marginLeft:'10px', fontWeight:'bold', color: '#6c757d'}}>ADDITIONAL INFORMATION</p>
            <Form style={{marginRight:'15px',paddingLeft:'.75em'}}>                                                                  
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="formGridDivision">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={name} placeholder="Enter Item Name" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="formGridOffice">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control type="text" name="unit" value={unit} placeholder="Enter Item Unit" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="formGridApproved">
                            <Form.Label>Particular</Form.Label><br/>
                            <select class="form-control" name="particular" value={particular}
                                    onChange={this.onChange}
                                    onClick={this.onReset}>
                                {this.state.type.map((team) => <option key={team.id} value={team.id}>{team.particular}</option>)}
                            </select>
                        </Form.Group>
                    </Form.Row>

              
            </Form>
            {this.state.alert_message=="success"?<SuccessAlert/>:null}
            {this.state.alert_message=="error"?<ErrorAlert/>:null}
            <Button variant='primary' onClick={this.onSubmit} id='update'>Update</Button> 
        </div>
       
      );
    }
  }

export default EditItem;